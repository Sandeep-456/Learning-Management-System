import { useState, useEffect } from 'react';
import { useWebContainer } from '../context/WebContainerContext';

export function useTerminalHook() {
  const { shellProcess, writeToTerminal } = useWebContainer();
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (shellProcess) {
      const controller = new AbortController();
      const signal = controller.signal;
      const stream = new WritableStream({
        write(data) {
          setOutput((prev) => prev + data);
        },
      });
      shellProcess.output.pipeTo(stream, { signal }).catch((e) => {
        if (e.name !== 'AbortError') {
          console.error('[useTerminal] Pipe error:', e);
        }
      });
      return () => {
        controller.abort();
      };
    }
  }, [shellProcess]);

  return {
    output,
    writeToTerminal,
    clearOutput: () => setOutput(''),
  };
}