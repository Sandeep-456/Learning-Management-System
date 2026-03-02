import { useEffect, useRef } from "react";

const AnsiToHtml = ({ text }) => {
  const convert = (ansiText) => {
    // Basic ANSI to HTML conversion
    const ansiRegex = /\u001b[[](\d+;)*\d+m/g;
    let html = ansiText.replace(ansiRegex, (match) => {
      const codes = match.slice(2, -1).split(";");
      let styles = "";
      codes.forEach((code) => {
        if (code === "31") styles += "color: red;";
        else if (code === "32") styles += "color: green;";
        else if (code === "33") styles += "color: yellow;";
        else if (code === "34") styles += "color: blue;";
      });
      return `</span><span style="${styles}">`;
    });
    return `<span>${html}</span>`;
  };

  return <pre dangerouslySetInnerHTML={{ __html: convert(text) }} />;
};

export default function OutputPanel({ logs }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  const renderLog = (log, index) => {
    const style = {
      color: log.level === "stderr" ? "#ff5555" : "#cccccc",
      whiteSpace: "pre-wrap",
      wordBreak: "break-all",
    };

    return (
      <div key={index} style={style}>
        <AnsiToHtml text={log.message} />
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="h-full bg-black p-4 font-mono text-sm overflow-y-auto"
    >
      {logs.length === 0 ? (
        <div className="text-gray-500">
          Click the "Run" button to start the development server and see the
          output.
        </div>
      ) : (
        logs.map(renderLog)
      )}
    </div>
  );
}
