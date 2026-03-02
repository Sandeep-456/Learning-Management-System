export function runJavaScript(code, inputStr = "") {
  return new Promise((resolve) => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.sandbox = "allow-scripts";
    document.body.appendChild(iframe);

    function handler(e) {
      if (e.data.type === "js-result") {
        resolve(e.data.payload);
        window.removeEventListener("message", handler);
        iframe.remove();
      }
    }

    window.addEventListener("message", handler);

    const escapedCode = JSON.stringify(code);
    const escapedInput = JSON.stringify(inputStr);

    iframe.srcdoc = `
      <script>
        let output = [];
        const console = {
          log: (...args) => output.push(args.join(" ")),
          error: (...args) => output.push("ERROR: " + args.join(" "))
        };

        let inputValue;
        try {
          inputValue = JSON.parse(${escapedInput});
        } catch(e) {
          inputValue = ${escapedInput};
        }
        if (typeof inputValue === "string" && inputValue.startsWith("'") && inputValue.endsWith("'")) {
          inputValue = inputValue.slice(1, -1);
        }
        const input = () => inputValue;

        try {
          const userCode = ${escapedCode};
          eval(userCode);

          // Detect function name dynamically
          const funcMatch = userCode.match(/function\\s+([a-zA-Z0-9_]+)\\s*\\(/);
          const funcName = funcMatch ? funcMatch[1] : null;

          if (funcName && typeof window[funcName] === 'function') {
            const result = window[funcName](input());
            if (result !== undefined) {
              output.push(result);
            }
          }
          // If no function is found, the logs have already been captured.

          parent.postMessage({ type: "js-result", payload: output }, "*");
        } catch (err) {
          parent.postMessage({ type: "js-result", payload: ["ERROR: " + err.toString()] }, "*");
        }
      <\/script>
    `;
  });
}
