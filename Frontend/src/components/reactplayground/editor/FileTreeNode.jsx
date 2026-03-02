import { useState } from "react";
import {
  FaFile,
  FaFolder,
  FaFolderOpen,
  FaTrash,
} from "react-icons/fa";
import { useWebContainer } from "../../../context/WebContainerContext";

const FileTreeNode = ({ node, onOpenFile, onDelete, onAddItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { setActiveFile } = useWebContainer();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleNodeClick = () => {
    if (node.type === "file") {
      onOpenFile(node.path);
    }
    else {
      handleToggle();
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(node.path, node.type);
  };

  const handleAddItem = (e, type) => {
    e.stopPropagation();
    onAddItem(node.path, type);
  };

  return (
    <div className="ml-4">
      <div
        className="flex items-center justify-between cursor-pointer hover:bg-indigo-700/30 p-1 rounded"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleNodeClick}
      >
        <div className="flex items-center">
          {node.type === "folder" ? (
            isOpen ? (
              <FaFolderOpen className="mr-2 text-yellow-400 flex-shrink-0" />
            ) : (
              <FaFolder className="mr-2 text-yellow-400 flex-shrink-0" />
            )
          ) : (
            <FaFile className="mr-2 text-gray-300 flex-shrink-0" />
          )}
          <span>{node.name}</span>
        </div>
        {isHovered && (
          <div className="flex items-center">
            {node.type === "folder" && (
              <>
                <button onClick={(e) => handleAddItem(e, "file")} className="text-gray-300 hover:text-white mr-2">
                  <FaFile />
                </button>
                <button onClick={(e) => handleAddItem(e, "folder")} className="text-gray-300 hover:text-white mr-2">
                  <FaFolder />
                </button>
              </>
            )}
            <button onClick={handleDelete} className="text-red-500 hover:text-red-400">
              <FaTrash />
            </button>
          </div>
        )}
      </div>
      {isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeNode
              key={child.path}
              node={child}
              onOpenFile={onOpenFile}
              onDelete={onDelete}
              onAddItem={onAddItem} // Ensure onAddItem is passed down
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileTreeNode;