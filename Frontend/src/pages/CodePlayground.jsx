import { useState, useEffect, useCallback, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Split from "react-split";

import Toolbar from "../components/codeplayground/Toolbar";
import Panel from "../components/codeplayground/Panel";
import ProblemDescription from "../components/codeplayground/ProblemDescription";
import CodeEditor from "../components/codeplayground/CodeEditor";
import OutputConsole from "../components/codeplayground/OutputConsole";
import TestcasePanel from "../components/codeplayground/TestcasePanel";
import WebPreviewPane from "../components/codeplayground/WebPreviewPane";
import UserInputBox from "../components/codeplayground/UserInputBox";
import SavePopup from "../components/codeplayground/SavePopup";

import {
  loadFiles,
  saveFiles,
} from "../components/codeplayground/corelogic/fileSystem";
import { runJavaScript } from "../components/codeplayground/corelogic/jsRunner";
import { runPython } from "../components/codeplayground/corelogic/pythonRunner";
import { runTestcases } from "../components/codeplayground/corelogic/testRunner";
import { buildWebPreview } from "../components/codeplayground/corelogic/webPreview";

const MainSplit = memo(
  ({
    language,
    html,
    onHtmlChange,
    css,
    onCssChange,
    js,
    onJsChange,
    python,
    onPythonChange,
    javascript,
    onJavascriptChange,
    previewCode,
    userInput,
    setUserInput,
    output,
    testResults,
  }) => (
    <Split
      className="flex h-full w-full"
      sizes={[70, 30]} // editor : right panel
      minSize={200}
      gutterSize={12}
      direction="horizontal"
    >
      {/* Editor Panel */}
      <Panel className="flex flex-col overflow-hidden">
        {language === "web" ? (
          <Split
            className="flex flex-col flex-1"
            sizes={[33, 33, 34]}
            minSize={50}
            gutterSize={8}
            direction="vertical"
          >
            <div className="flex flex-col h-full border-b border-gray-700">
              <div className="bg-gray-800 p-2 text-sm font-semibold">HTML</div>
              <CodeEditor
                language="html"
                code={html}
                onChange={onHtmlChange}
                className="flex-1"
              />
            </div>
            <div className="flex flex-col h-full border-b border-gray-700">
              <div className="bg-gray-800 p-2 text-sm font-semibold">CSS</div>
              <CodeEditor
                language="css"
                code={css}
                onChange={onCssChange}
                className="flex-1"
              />
            </div>
            <div className="flex flex-col h-full">
              <div className="bg-gray-800 p-2 text-sm font-semibold">
                JavaScript
              </div>
              <CodeEditor
                language="javascript"
                code={js}
                onChange={onJsChange}
                className="flex-1"
              />
            </div>
          </Split>
        ) : (
          <CodeEditor
            language={language}
            code={language === "python" ? python : javascript}
            onChange={
              language === "python" ? onPythonChange : onJavascriptChange
            }
            className="flex-1"
          />
        )}
      </Panel>

      {/* Right Panel */}
      <Panel className="flex flex-col overflow-hidden">
        {language === "web" ? (
          <WebPreviewPane html={previewCode} />
        ) : (
          <Split
            className="flex flex-col flex-1"
            sizes={[30, 30, 40]}
            minSize={50}
            gutterSize={8}
            direction="vertical"
          >
            <div className="flex flex-col border-b border-gray-700">
              <div className="bg-gray-800 p-2 text-sm font-semibold">
                User Input
              </div>
              <UserInputBox
                value={userInput}
                setValue={setUserInput}
                className="flex-1"
              />
            </div>
            <div className="flex flex-col border-b border-gray-700">
              <div className="bg-gray-800 p-2 text-sm font-semibold">
                Output
              </div>
              <OutputConsole output={output} className="flex-1" />
            </div>
            <div className="flex flex-col">
              <div className="bg-gray-800 p-2 text-sm font-semibold">
                Test Results
              </div>
              <TestcasePanel results={testResults} className="flex-1" />
            </div>
          </Split>
        )}
      </Panel>
    </Split>
  )
);

export default function Playground() {
  const location = useLocation();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("javascript");

  const [python, setPython] = useState("# Write Python code here");
  const [javascript, setJavascript] = useState("// Write JS code here");
  const [html, setHtml] = useState("<h1>Hello</h1>");
  const [css, setCss] = useState("h1 { color: blue }");
  const [js, setJs] = useState("console.log('Hello from JS')");
  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [previewCode, setPreviewCode] = useState("");

  const [files, setFiles] = useState(loadFiles());
  const [currentFile, setCurrentFile] = useState(null);

  const [showSavePopup, setShowSavePopup] = useState(false);

  const onHtmlChange = useCallback((value) => setHtml(value || ""), []);
  const onCssChange = useCallback((value) => setCss(value || ""), []);
  const onJsChange = useCallback((value) => setJs(value || ""), []);
  const onPythonChange = useCallback((value) => setPython(value || ""), []);
  const onJavascriptChange = useCallback(
    (value) => setJavascript(value || ""),
    []
  );

  // Load problem or file
  useEffect(() => {
    if (location.state?.problem) {
      const prob = location.state.problem;
      setProblem(prob);
      setLanguage(prob.type);
      if (prob.type === "python") setPython(prob.starterCode);
      else setJavascript(prob.starterCode);
      setCurrentFile(null);
    } else if (location.state?.file && location.state?.fileName) {
      const { file, fileName } = location.state;
      setCurrentFile(fileName);
      if (file.type === "js") {
        setLanguage("javascript");
        setJavascript(file.code);
      } else if (file.type === "py") {
        setLanguage("python");
        setPython(file.code);
      } else if (file.type === "web") {
        setLanguage("web");
        setHtml(file.html);
        setCss(file.css);
        setJs(file.js);
      }
      setProblem(null);
    }
  }, [location.state]);

  // Build Web Preview
  useEffect(() => {
    setPreviewCode(buildWebPreview(html, css, js));
  }, [html, css, js]);

  // Handle console logs from web preview
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.source === "web-preview") {
        const { type, message } = event.data;
        setOutput((prevOutput) => [
          ...prevOutput,
          `[${type}] ${message.join(" ")}`,
        ]);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  // Run Code
  async function runCode() {
    if (problem && userInput.trim() === "") {
      runTests();
      return;
    }
    console.log(language);
    if (language === "javascript") {
      const res = await runJavaScript(javascript, userInput);
      setOutput(res);
    } else if (language === "python") {
      const res = await runPython(python, userInput);
      setOutput(res);
    } else if (language === "web") {
      setOutput([]); // Clear the output for web preview
    }
  }

  // Run Testcases
  async function runTests() {
    if (language === "web") return;

    const executor = language === "python" ? runPython : runJavaScript;
    const code = language === "python" ? python : javascript;
    const testcases = problem ? problem.testcases : [];

    const results = await runTestcases(executor, code, testcases);
    setTestResults(results);

    if (problem) {
      localStorage.setItem(
        `testResults-${problem.id}`,
        JSON.stringify(results)
      );
    }
  }

  // Save / Load Files
  function saveFile(name) {
    const updated = { ...files };
    if (language === "javascript")
      updated[name] = { type: "js", code: javascript };
    else if (language === "python")
      updated[name] = { type: "py", code: python };
    else updated[name] = { type: "web", html, css, js };

    setFiles(updated);
    saveFiles(updated);
    setCurrentFile(name);
    setShowSavePopup(false);
  }

  function loadFile(name) {
    const file = files[name];
    if (!file) return;
    setCurrentFile(name);

    if (file.type === "js") {
      setLanguage("javascript");
      setJavascript(file.code);
    } else if (file.type === "py") {
      setLanguage("python");
      setPython(file.code);
    } else {
      setLanguage("web");
      setHtml(file.html);
      setCss(file.css);
      setJs(file.js);
    }
  }

  function handleDownload() {
    let content = "";
    let extension = "";
    let fileName = currentFile || "download";

    if (language === "javascript") {
      content = javascript;
      extension = ".js";
    } else if (language === "python") {
      content = python;
      extension = ".py";
    } else if (language === "web") {
      content = buildWebPreview(html, css, js);
      extension = ".html";
    }

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName + extension;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function handleSaveAndBack(name) {
    saveFile(name);
    navigate(-1);
  }

  function handleDiscardAndBack() {
    setShowSavePopup(false);
    navigate(-1);
  }

  function handleCancelPopup() {
    setShowSavePopup(false);
  }

  const currentMode = problem ? "practice" : "project";
  const projectFixedLanguage = location.state?.file?.type || language;

  // -----------------------
  // Render
  // -----------------------
  return (
    <>
      <div className="flex flex-col h-screen bg-gray-900 text-white">
        <Toolbar
          language={language}
          setLanguage={setLanguage}
          onRun={runCode}
          onTest={runTests}
          onSaveClick={() => setShowSavePopup(true)}
          onDownload={handleDownload}
          currentFile={currentFile}
          mode={currentMode}
          projectFixedLanguage={projectFixedLanguage}
        />

        <div className="flex flex-1 overflow-hidden">
          {problem ? (
            <Split
              className="flex h-full w-full"
              direction="horizontal"
              gutterSize={12}
              minSize={[200, 200]}
              sizes={[30, 70]}
            >
              {/* Left Problem Panel */}
              <Panel>
                {problem && <ProblemDescription problem={problem} />}
              </Panel>

              {/* Main Editor + Right Panel */}
              <MainSplit
                language={language}
                html={html}
                onHtmlChange={onHtmlChange}
                css={css}
                onCssChange={onCssChange}
                js={js}
                onJsChange={onJsChange}
                python={python}
                onPythonChange={onPythonChange}
                javascript={javascript}
                onJavascriptChange={onJavascriptChange}
                previewCode={previewCode}
                userInput={userInput}
                setUserInput={setUserInput}
                output={output}
                testResults={testResults}
              />
            </Split>
          ) : (
            /* No problem: full width main area */
            <MainSplit
              language={language}
              html={html}
              onHtmlChange={onHtmlChange}
              css={css}
              onCssChange={onCssChange}
              js={js}
              onJsChange={onJsChange}
              python={python}
              onPythonChange={onPythonChange}
              javascript={javascript}
              onJavascriptChange={onJavascriptChange}
              previewCode={previewCode}
              userInput={userInput}
              setUserInput={setUserInput}
              output={output}
              testResults={testResults}
            />
          )}
        </div>
      </div>

      {showSavePopup && (
        <SavePopup
          initialName={currentFile}
          onSaveAndBack={handleSaveAndBack}
          onDiscardAndBack={handleDiscardAndBack}
          onCancel={handleCancelPopup}
          message="Enter a file name to save your code"
        />
      )}
    </>
  );
}
