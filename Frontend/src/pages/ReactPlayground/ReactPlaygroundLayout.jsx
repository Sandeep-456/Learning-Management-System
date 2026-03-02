import { useState, useRef } from "react";
import { useWebContainer } from "../../context/WebContainerContext";
import { useTerminal } from "../../context/TerminalProvider";
import Tabs from "../../components/reactplayground/ui/Tabs";
import OutputPanel from "../../components/reactplayground/OutputPanel";

export default function ReactPlaygroundLayout({
  sidebar,
  editorTabs,
  editor,
  terminal,
}) {
  const { saveActiveFile, isRunning, runDevServer, logs } = useWebContainer();
  const [terminalHeight, setTerminalHeight] = useState(200);
  const resizerRef = useRef(null);
  const [activeTab, setActiveTab] = useState("terminal");

  const startResizing = (e) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = terminalHeight;

    const onMouseMove = (moveEvent) => {
      const newHeight = startHeight - (moveEvent.clientY - startY);
      if (newHeight >= 50 && newHeight <= 600) {
        setTerminalHeight(newHeight);
      }
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const TABS = [
    { name: "terminal", label: "Terminal" },
    { name: "output", label: "Output" },
  ];

  return (
    <div className="flex h-full">
      <aside className="w-60 bg-indigo-950 border-r border-indigo-500/20">
        {sidebar}
      </aside>

      <main className="flex flex-col h-full flex-1">
        {editorTabs}

        <div className="flex items-center gap-4 px-4 py-2 border-b border-indigo-500/20">
          <button
            onClick={saveActiveFile}
            className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 rounded-md"
          >
            Save File
          </button>
          <button
            onClick={runDevServer}
            disabled={isRunning}
            className="px-3 py-1 text-sm bg-green-600 hover:bg-green-500 rounded-md disabled:opacity-50"
          >
            Run
          </button>
          <div className="flex-1" />
          {isRunning ? (
            <div className="text-sm text-yellow-400">Running...</div>
          ) : (
            <div className="text-sm text-green-400">Ready</div>
          )}
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <section className="flex-1 overflow-auto">{editor}</section>

          <div
            ref={resizerRef}
            onMouseDown={startResizing}
            className="h-2 cursor-row-resize bg-indigo-500/50 hover:bg-indigo-400"
          />

          <div style={{ height: terminalHeight }}>
            <Tabs
              tabs={TABS}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <div className="h-full overflow-auto bg-black">
              {activeTab === "terminal" && terminal}
              {activeTab === "output" && <OutputPanel logs={logs} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
