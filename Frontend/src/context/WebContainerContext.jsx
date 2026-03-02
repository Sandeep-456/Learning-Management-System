import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { bootWebContainer } from "../components/reactplayground/services/webcontainer";
import { initialFiles } from "../components/reactplayground/services/files";
import {
  getProject,
  saveProject,
} from "../components/reactplayground/services/db";

const WebContainerContext = createContext();

// Helper function to recursively flatten the file tree
const flattenTree = (tree, prefix = "") => {
  let fileMap = {};
  for (const name in tree) {
    const path = prefix ? `${prefix}/${name}` : name;
    if (tree[name].file) {
      // It's a file
      fileMap[path] = tree[name].file.contents;
    } else {
      // It's a directory
      Object.assign(fileMap, flattenTree(tree[name].directory, path));
    }
  }
  return fileMap;
};

const unflattenTree = (fileMap) => {
  const tree = {};

  for (const path in fileMap) {
    const parts = path.split("/");
    let current = tree;

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] = { directory: {} };
      }
      current = current[part].directory;
    }

    const fileName = parts[parts.length - 1];
    current[fileName] = { file: { contents: fileMap[path] } };
  }

  return tree;
};

const CONSOLE_BRIDGE_SCRIPT = `
  <script>
    // --- Console Bridge ---
    // This script intercepts console logs and errors from within the iframe
    // and forwards them to the parent window.

    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info,
      debug: console.debug,
    };

    const sendMessage = (level, ...args) => {
      // Keep original console behavior
      originalConsole[level](...args);
      // Post message to parent window
      window.parent.postMessage({
        type: 'console',
        level: level,
        message: args.map(arg => 
          arg instanceof Error ? arg.stack : JSON.stringify(arg, null, 2)
        ).join(' ')
      }, '*');
    };

    console.log = (...args) => sendMessage('log', ...args);
    console.error = (...args) => sendMessage('error', ...args);
    console.warn = (...args) => sendMessage('warn', ...args);
    console.info = (...args) => sendMessage('info', ...args);
    console.debug = (...args) => sendMessage('debug', ...args);

    window.addEventListener('error', (event) => {
      sendMessage('error', event.error || event.message);
    });

    window.addEventListener('unhandledrejection', (event) => {
      sendMessage('error', 'Unhandled promise rejection:', event.reason);
    });
  </script>
`;

export function WebContainerProvider({ children, project }) {
  const [webContainer, setWebContainer] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [files, setFiles] = useState({});
  const [activeFile, setActiveFile] = useState("src/main.jsx");
  const [openTabs, setOpenTabs] = useState(["src/main.jsx"]);
  const [isBooting, setIsBooting] = useState(true);
  const [error, setError] = useState(null);
  const [shellProcess, setShellProcess] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [editorInstance, setEditorInstance] = useState(null);
  const [logs, setLogs] = useState([]);

  const isMounted = useRef(true);

  // Effect to listen for messages from the iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "console") {
        const { level, message } = event.data;
        const browserLevel = level === "error" ? "stderr" : "stdout";
        setLogs((prev) => [
          ...prev,
          { level: browserLevel, message: `[Browser] ${message}` },
        ]);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const syncFileTree = useCallback(async () => {
    if (!webContainer) return;

    const fileList = await webContainer.fs.readdir("/", { recursive: true });
    const fileMap = {};
    const IGNORED_DIRS = ["node_modules", ".git"];

    for (const path of fileList) {
      if (IGNORED_DIRS.some((d) => path.startsWith(d))) continue;
      if (!/\.(js|jsx|json|html|css)$/.test(path)) continue;

      try {
        const content = await webContainer.fs.readFile(`/${path}`, "utf-8");
        fileMap[path] = content;
      } catch (e) {
        console.error(`Failed to read file: ${path}`, e);
      }
    }

    setFiles(fileMap);
    const newTree = unflattenTree(fileMap);
    await saveProject(project, newTree);
  }, [webContainer, project]);

  const syncFile = useCallback(
    async (path) => {
      if (!webContainer) return;
      try {
        const content = await webContainer.fs.readFile(path, "utf-8");
        setFiles((prevFiles) => {
          const updatedFiles = { ...prevFiles, [path]: content };
          const newTree = unflattenTree(updatedFiles);
          saveProject(project, newTree);
          return updatedFiles;
        });
      } catch (e) {
        console.error(`Failed to read file: ${path}`, e);
      }
    },
    [webContainer, project]
  );

  const runCommand = useCallback(
    async (command, args = [], onComplete) => {
      if (!shellProcess) return;
      const commandString = `${command} ${args.join(" ")}\n`;
      const writer = shellProcess.input.getWriter();
      await writer.write(commandString);
      writer.releaseLock();

      if (onComplete) {
        onComplete();
      }
    },
    [shellProcess]
  );

  useEffect(() => {
    isMounted.current = true;
    async function init() {
      try {
        if (webContainer) return;
        const wc = await bootWebContainer();
        if (!isMounted.current) return;
        setWebContainer(wc);

        const projectFiles = await getProject(project);
        if (projectFiles) {
          await wc.mount(projectFiles);
          const fileMap = flattenTree(projectFiles);
          setFiles(fileMap);
        } else {
          await wc.mount(initialFiles);
          await saveProject(project, initialFiles);
          const fileMap = flattenTree(initialFiles);
          setFiles(fileMap);
        }

        const shell = await wc.spawn("jsh");
        setShellProcess(shell);
        setIsBooting(false);

        wc.on("server-ready", (_port, url) => {
          if (isMounted.current) {
            setPreviewUrl(url);
            setIsRunning(false);
          }
        });
      } catch (err) {
        setError(err);
        setIsBooting(false);
      }
    }
    init();
    return () => {
      isMounted.current = false;
    };
  }, [project]);

  const writeFile = async (path, content) => {
    if (!webContainer) return;
    await webContainer.fs.writeFile(path, content);
    const updatedFiles = { ...files, [path]: content };
    setFiles(updatedFiles);
    const newTree = unflattenTree(updatedFiles);
    await saveProject(project, newTree);
  };

  const saveActiveFile = useCallback(() => {
    if (!editorInstance || !activeFile) return;
    const content = editorInstance.getValue();
    writeFile(activeFile, content);
  }, [editorInstance, activeFile, writeFile]);

  const writeToTerminal = (data) => {
    if (shellProcess) {
      const writer = shellProcess.input.getWriter();
      writer.write(data);
      writer.releaseLock();
    }
  };

  const runDevServer = useCallback(async () => {
    if (!webContainer) return;

    setIsRunning(true);
    setLogs([]);

    try {
      // Inject the console bridge script into index.html
      const indexHtml = await webContainer.fs.readFile("index.html", "utf-8");
      if (!indexHtml.includes("Console Bridge")) {
        const modifiedHtml = indexHtml.replace(
          "</head>",
          `${CONSOLE_BRIDGE_SCRIPT}</head>`
        );
        await webContainer.fs.writeFile("index.html", modifiedHtml);
      }

      const streamToLogs = (stream, level) => {
        const reader = stream.getReader();
        const decoder = new TextDecoder();
        const read = async () => {
          const { done, value } = await reader.read();
          if (done) return;
          const message = decoder.decode(value, { stream: true });
          setLogs((prev) => [...prev, { level, message }]);
          read();
        };
        read();
      };

      setLogs((prev) => [
        ...prev,
        { level: "stdout", message: "Installing dependencies...\n" },
      ]);
      const installProcess = await webContainer.spawn("npm", ["install"]);
      streamToLogs(installProcess.stdout, "stdout");
      streamToLogs(installProcess.stderr, "stderr");
      const installExitCode = await installProcess.exit;

      if (installExitCode !== 0) {
        setLogs((prev) => [
          ...prev,
          {
            level: "stderr",
            message: `Installation failed with exit code ${installExitCode}\n`,
          },
        ]);
        setIsRunning(false);
        return;
      }

      try {
        const pkg = await webContainer.fs.readFile("/package.json", "utf-8");
        const lock = await webContainer.fs.readFile(
          "/package-lock.json",
          "utf-8"
        );

        console.log(pkg);
        console.log(lock);

        const updatedFiles = {
          ...files,
          "package.json": pkg,
          "package-lock.json": lock,
        };

        setFiles(updatedFiles);
        await saveProject(project, unflattenTree(updatedFiles));
      } catch (e) {
        console.error("Failed to sync package files:", e);
        setLogs((prev) => [
          ...prev,
          {
            level: "stderr",
            message: "Failed to sync package files after install.\n",
          },
        ]);
      }

      setLogs((prev) => [
        ...prev,
        { level: "stdout", message: "\nStarting dev server...\n" },
      ]);
      const devProcess = await webContainer.spawn("npm", ["run", "dev"]);
      streamToLogs(devProcess.stdout, "stdout");
      streamToLogs(devProcess.stderr, "stderr");
    } catch (err) {
      setLogs((prev) => [
        ...prev,
        { level: "stderr", message: err.toString() },
      ]);
      setIsRunning(false);
    }
  }, [webContainer, syncFileTree, syncFile]);

  const value = {
    webContainer,
    previewUrl,
    files,
    setFiles,
    activeFile,
    setActiveFile,
    openTabs,
    setOpenTabs,
    writeFile,
    isBooting,
    error,
    runCommand,
    writeToTerminal,
    shellProcess,
    isRunning,
    syncFileTree,
    syncFile,
    setEditorInstance,
    saveActiveFile,
    logs,
    runDevServer,
  };

  return (
    <WebContainerContext.Provider value={value}>
      {children}
    </WebContainerContext.Provider>
  );
}

export function useWebContainer() {
  const context = useContext(WebContainerContext);
  if (!context) {
    throw new Error(
      "useWebContainer must be used within a WebContainerProvider"
    );
  }
  return context;
}
