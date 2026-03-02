import { useMemo } from "react";
import { useWebContainer } from "../../../context/WebContainerContext";
import { buildFileTree } from "./services/tree";
import FileTreeNode from "./FileTreeNode";
import { FaFile, FaFolder } from "react-icons/fa";

export default function ReactFileExplorer() {
  const {
    files,
    setFiles,
    openTabs,
    setOpenTabs,
    setActiveFile,
    activeFile,
    webContainer,
  } = useWebContainer();

  const fileTree = useMemo(() => buildFileTree(files), [files]);

  const openFile = (path) => {
    setActiveFile(path);
    if (!openTabs.includes(path)) {
      setOpenTabs([...openTabs, path]);
    }
  };

  const handleAddItem = async (parentPath, type) => {
    let name = prompt(`Enter new ${type} name:`);
    if (!name) return;

    // If parentPath is null, it means we're at the root.
    const basePath = parentPath ? `${parentPath}/` : "";
    let path = `${basePath}${name}`;

    if (type === "folder") {
      path = `${path}/`; // Mark as folder for the tree builder
    }

    if (files[path]) {
      return alert("A file or folder with that name already exists.");
    }
    
    if (type === "file") {
      await webContainer.fs.writeFile(path, "");
    } else {
      await webContainer.fs.mkdir(path.slice(0, -1)); // mkdir needs path without trailing slash
    }

    setFiles((prevFiles) => ({
      ...prevFiles,
      [path]: "",
    }));
  };

  const handleDeleteItem = async (path, type) => {
    if (!confirm(`Are you sure you want to delete ${path}?`)) return;

    await webContainer.fs.rm(path, { recursive: type === "folder" });

    // Update files state
    const newFiles = { ...files };
    if (type === "folder") {
      for (const p in newFiles) {
        if (p.startsWith(path)) {
          delete newFiles[p];
        }
      }
    } else {
      delete newFiles[path];
    }
    setFiles(newFiles);

    // Update open tabs
    const newOpenTabs = openTabs.filter(p => !p.startsWith(path));
    setOpenTabs(newOpenTabs);

    if (activeFile && activeFile.startsWith(path)) {
      setActiveFile(newOpenTabs.length > 0 ? newOpenTabs[0] : null);
    }
  };

  return (
    <div className="p-3 text-sm text-indigo-100">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-indigo-300 uppercase tracking-wide">Explorer</h3>
        <div className="flex gap-2">
          <button
            onClick={() => handleAddItem(null, "file")}
            className="text-indigo-300 hover:text-white"
            title="New File"
          >
            <FaFile />
          </button>
          <button
            onClick={() => handleAddItem(null, "folder")}
            className="text-indigo-300 hover:text-white"
            title="New Folder"
          >
            <FaFolder />
          </button>
        </div>
      </div>

      {fileTree.map((node) => (
        <FileTreeNode
          key={node.path}
          node={node}
          onOpenFile={openFile}
          onDelete={handleDeleteItem}
          onAddItem={handleAddItem}
        />
      ))}
    </div>
  );
}
