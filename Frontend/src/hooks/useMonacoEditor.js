import { useEffect, useRef } from "react";
import { loader } from "@monaco-editor/react";

// Language detection utility
export function getLanguageForFile(filePath) {
  const extension = filePath.split(".").pop();
  switch (extension) {
    case "js":
    case "jsx":
      return "javascript";
    case "ts":
    case "tsx":
      return "typescript";
    case "json":
      return "json";
    case "html":
      return "html";
    case "css":
      return "css";
    case "md":
      return "markdown";
    default:
      return "plaintext";
  }
}

/**
 * @description A hook to manage the Monaco Editor lifecycle, models, and other editor-related logic.
 * @param {object} options
 * @param {React.RefObject<HTMLDivElement>} options.editorRef - Ref to the editor container element.
 * @param {string | null} options.activeFile - The path of the currently active file.
 * @param {{ [path: string]: string }} options.files - A map of file paths to their content.
 * @param {(instance: import('monaco-editor').editor.IStandaloneCodeEditor) => void} options.setEditorInstance - Function to set the editor instance.
 */
export function useMonacoEditor({
  editorRef,
  activeFile,
  files,
  setEditorInstance,
}) {
  const monacoRef = useRef(null);
  const editorInstanceRef = useRef(null);
  const modelsRef = useRef(new Map());

  useEffect(() => {
    if (editorInstanceRef.current) return;

    loader.init().then((monaco) => {
      if (editorRef.current && !editorInstanceRef.current) {
        const editor = monaco.editor.create(editorRef.current, {
          theme: "vs-dark",
          automaticLayout: true,
        });

        monacoRef.current = monaco;
        editorInstanceRef.current = editor;
        setEditorInstance(editor);

        // Initial file
        if (activeFile && files.hasOwnProperty(activeFile)) {
          const fileContent = files[activeFile];
          const modelUri = monaco.Uri.parse(`file:///${activeFile}`);
          const model = monaco.editor.createModel(
            fileContent,
            getLanguageForFile(activeFile),
            modelUri
          );
          editor.setModel(model);
          modelsRef.current.set(modelUri.toString(), model);
        }
      }
    });

    return () => {
      editorInstanceRef.current?.dispose();
      editorInstanceRef.current = null;
      setEditorInstance(null);
      modelsRef.current.forEach((model) => model.dispose());
      modelsRef.current.clear();
    };
  }, [editorRef, setEditorInstance, activeFile, files]);

  useEffect(() => {
    const editor = editorInstanceRef.current;
    const monaco = monacoRef.current;

    if (!editor || !monaco || !activeFile) return;

    if (!files.hasOwnProperty(activeFile)) {
      editor.setModel(null);
      return;
    }

    const fileContent = files[activeFile];
    const modelUri = monaco.Uri.parse(`file:///${activeFile}`);
    let model = modelsRef.current.get(modelUri.toString());

    if (!model) {
      model = monaco.editor.createModel(
        fileContent,
        getLanguageForFile(activeFile),
        modelUri
      );
      modelsRef.current.set(modelUri.toString(), model);
    } else {
      if (model.getValue() !== fileContent) {
        model.pushEditOperations(
          [],
          [
            {
              range: model.getFullModelRange(),
              text: fileContent,
            },
          ],
          () => null
        );
      }
    }

    if (editor.getModel() !== model) {
      editor.setModel(model);
    }
  }, [activeFile, files]);
}
