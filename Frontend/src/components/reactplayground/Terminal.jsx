import { useEffect, useRef } from "react";
import { useTerminal } from "../../context/TerminalProvider";

export default function Terminal() {
  const ref = useRef(null);
  const { initTerminal } = useTerminal();

  useEffect(() => {
    initTerminal(ref.current);
  }, [ref, initTerminal]);

  return <div ref={ref} className="h-full bg-slate-950" />;
}
