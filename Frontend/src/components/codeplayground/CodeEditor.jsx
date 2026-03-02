import Editor from "@monaco-editor/react";
import React from "react";

function CodeEditor({ language, code, onChange }) {
  return (
    <div className="h-full">
      <Editor
        height="100%"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={onChange}
        options={{
          fontSize: 14,
          minimap: { enabled: true },
          automaticLayout: true,
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}
export default React.memo(CodeEditor);
