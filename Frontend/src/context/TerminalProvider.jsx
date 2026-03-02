import { createContext, useContext, useRef, useEffect, useCallback } from "react";
import { useTerminalHook } from "../hooks/useTerminal";
import { Terminal as XTerm } from "xterm";
import "xterm/css/xterm.css";

const TerminalContext = createContext();

export function TerminalProvider({ children, onCommandComplete }) {
  const terminalHook = useTerminalHook();
  const term = useRef(null);

  if (!term.current) {
    term.current = new XTerm({
      theme: {
        background: "#020617",
        foreground: "#e0e7ff",
        cursor: "#e0e7ff",
      },
      convertEol: true,
      cursorBlink: true,
    });
  }

  useEffect(() => {
    const onData = term.current.onData(terminalHook.writeToTerminal);
    return () => onData.dispose();
  }, [terminalHook.writeToTerminal]);

  useEffect(() => {
    if (terminalHook.output) {
      term.current.write(terminalHook.output);
      if (terminalHook.output.trim().endsWith('jsh$ ')) {
        if (onCommandComplete) {
          onCommandComplete();
        }
      }
      terminalHook.clearOutput();
    }
  }, [terminalHook.output, onCommandComplete, terminalHook]);

  const initTerminal = useCallback((container) => {
    if (container && !container.children.length) {
      term.current.open(container);
    }
  }, []);

  const value = {
    ...terminalHook,
    term: term.current,
    initTerminal,
  };

  return (
    <TerminalContext.Provider value={value}>{children}</TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error("useTerminal must be used within a TerminalProvider");
  }
  return context;
}
