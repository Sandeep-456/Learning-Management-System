import { WebContainerProvider, useWebContainer } from "../../context/WebContainerContext";
import { TerminalProvider } from "../../context/TerminalProvider";
import PlaygroundInner from "./PlaygroundInner";

const ReactPlaygroundContent = () => {
  const { syncFileTree, syncFile } = useWebContainer();

  const onCommandComplete = () => {
    syncFileTree();
    syncFile('package.json');
  };

  return (
    <TerminalProvider onCommandComplete={onCommandComplete}>
      <PlaygroundInner />
    </TerminalProvider>
  );
}

export default function ReactPlayground() {
  return (
    <WebContainerProvider project="my-react-app">
      <ReactPlaygroundContent />
    </WebContainerProvider>
  );
}
