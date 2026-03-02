import { useWebContainer } from "../../../context/WebContainerContext";

export default function ReactEditorTabs() {
  const { openTabs, activeFile, setActiveFile, setOpenTabs } = useWebContainer();

  function closeTab(e, path) {
    e.stopPropagation();
    const newTabs = openTabs.filter((t) => t !== path);
    setOpenTabs(newTabs);

    // If the closed tab was the active one, set a new active file
    if (activeFile === path && newTabs.length > 0) {
      setActiveFile(newTabs[0]);
    } else if (newTabs.length === 0) {
      setActiveFile(null);
    }
  }

  return (
    <div className="flex bg-indigo-900 border-b border-indigo-500/20 h-10">
      {openTabs.map((path) => (
        <div
          key={path}
          onClick={() => setActiveFile(path)}
          className={`flex items-center px-4 py-2 cursor-pointer text-sm
            ${
              activeFile === path
                ? "bg-indigo-800 text-white"
                : "text-indigo-300 hover:bg-indigo-700/40"
            }`}
        >
          {path.split("/").pop()}
          <span
            className="ml-3 text-indigo-400 hover:text-red-400 text-xs font-bold"
            onClick={(e) => closeTab(e, path)}
          >
            ✕
          </span>
        </div>
      ))}
    </div>
  );
}

