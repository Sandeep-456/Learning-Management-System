import { useState } from "react";
import { useWebContainer } from "../../context/WebContainerContext";
import ReactFileExplorer from "../../components/reactplayground/editor/ReactFileExplorer";
import ReactEditorTabs from "../../components/reactplayground/editor/ReactEditorTabs";
import ReactCodeEditor from "../../components/reactplayground/editor/ui/ReactCodeEditor";
import Terminal from "../../components/reactplayground/Terminal";
import PreviewFrameReact from "../../components/reactplayground/PreviewFrameReact";
import ToggleButton from "../../components/reactplayground/ui/ToggleButton";
import ReactPlaygroundLayout from "./ReactPlaygroundLayout";
import GlobalLoader from "../../components/ui/GlobalLoader";

export default function PlaygroundInner() {
  const [showPreview, setShowPreview] = useState(false);
  const { previewUrl, isBooting, error } = useWebContainer();

  if (isBooting) {
    return <GlobalLoader message="Booting WebContainer..." />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-950 via-violet-950 to-blue-950">
      <div className="flex h-full">
        {!showPreview ? (
          <ReactPlaygroundLayout
            sidebar={<ReactFileExplorer />}
            editorTabs={<ReactEditorTabs />}
            editor={<ReactCodeEditor />}
            terminal={<Terminal />}
          />
        ) : (
          <PreviewFrameReact url={previewUrl} />
        )}
      </div>

      <ToggleButton
        active={showPreview}
        onClick={() => setShowPreview(!showPreview)}
      />
    </div>
  );
}