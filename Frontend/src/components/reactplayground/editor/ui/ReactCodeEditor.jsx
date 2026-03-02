import React, { useRef } from "react";
import { useWebContainer } from "../../../../context/WebContainerContext";
import { useMonacoEditor } from "../../../../hooks/useMonacoEditor";

const ReactCodeEditor = () => {
  const editorRef = useRef(null);
  const { activeFile, files, writeFile, setEditorInstance } = useWebContainer();

  useMonacoEditor({
    editorRef,
    activeFile,
    files,
    writeFile,
    setEditorInstance,
  });

  return (
    <div
      ref={editorRef}
      style={{
        height: "90%",
        width: "100%",
      }}
    />
  );
};

export default ReactCodeEditor;
