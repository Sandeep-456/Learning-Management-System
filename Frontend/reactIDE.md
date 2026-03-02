
# React IDE Flow

This document outlines the flow of the React IDE, from the main component to the individual parts that make up the editor and preview.

## Component Flow

1.  **`ReactPlayground`**: The main component that wraps the entire IDE in the `WebContainerProvider`.

2.  **`WebContainerProvider`**: This is a React Context provider that holds the WebContainer instance and related state. It provides this context to all child components, allowing them to interact with the WebContainer.

3.  **`PlaygroundInner`**: This component is the main layout of the playground. It uses a state variable to conditionally render either the editor layout (`ReactPlaygroundLayout`) or the live preview (`PreviewFrameReact`).

4.  **`ReactPlaygroundLayout`**: This component arranges the different parts of the editor using a flexbox layout. It receives the following components as props:
    *   `sidebar`: The file explorer.
    *   `editorTabs`: The tabs for open files.
    *   `editor`: The code editor.
    *   `terminal`: The terminal interface.

5.  **`ReactFileExplorer`**: This component displays the file system of the WebContainer as a tree structure. It allows the user to open, add, and delete files. It uses the `webContainer.fs` API to perform file system operations.

6.  **`ReactEditorTabs`**: This component displays tabs for the files that are currently open. It allows the user to switch between files and close them.

7.  **`ReactCodeEditor`**: This component is a wrapper around the Monaco Editor. It keeps the editor content in sync with the active file from the `WebContainerContext`. When the user types in the editor, the changes are saved to the WebContainer's in-memory file system.

8.  **`Terminal`**: This component integrates XTerm.js to provide a terminal interface. It spawns a shell process in the WebContainer and connects it to the terminal, allowing the user to interact with the shell.

9.  **`PreviewFrameReact`**: This component displays the live preview of the React application. It renders an `iframe` with the `src` set to the `previewUrl` provided by the `WebContainerContext`.

## Extra Editor Space Issue

The extra editor space issue is caused by the `ReactCodeEditor` component having a fixed height of `400px`. To fix this, the `height` should be set to `100%` so that it fills the available space in the flex container.
