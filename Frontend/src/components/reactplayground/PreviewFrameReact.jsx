import { useWebContainer } from "../../context/WebContainerContext";
import { FaSpinner } from "react-icons/fa";

export default function PreviewFrameReact() {
  const { previewUrl } = useWebContainer();

  if (!previewUrl) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-white gap-4">
        <FaSpinner className="animate-spin text-4xl" />
        <p className="text-lg">Waiting for dev server to start...</p>
        <p className="text-sm text-slate-400">
          This can take a moment, especially on first load.
        </p>
      </div>
    );
  }

  return (
    <iframe
      src={previewUrl}
      className="w-full h-full border-0"
      title="React Playground Preview"
    />
  );
}
