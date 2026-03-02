let pyodideInstance = null;

async function loadPyodideScript() {
  return new Promise((resolve, reject) => {
    if (window.loadPyodide) return resolve();

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Pyodide"));
    document.body.appendChild(script);
  });
}

export async function initPyodide() {
  if (pyodideInstance) return pyodideInstance;

  await loadPyodideScript();

  pyodideInstance = await window.loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/",
  });

  return pyodideInstance;
}

export async function runPython(code, inputData) {
  const py = await initPyodide();

  try {
    // Store user input
    py.globals.set("input_data", inputData);

    // Override input() and capture stdout
    py.runPython(`
import sys
from io import StringIO
import ast
import re

# Custom input() that reads from JS
def input(prompt=None):
    if prompt:
        print(prompt, end="")
    data = input_data
    try:
        if isinstance(data, str):
            data = ast.literal_eval(data)  # converts "'hello'" -> "hello"
    except Exception:
        pass
    if isinstance(data, list):
        return data.pop(0)
    return data

# Capture stdout
_buffer = StringIO()
sys.stdout = _buffer
`);

    // Detect the first function defined in the user's code
    const funcMatch = code.match(/def\s+([a-zA-Z0-9_]+)\s*\(/);
    const funcName = funcMatch ? funcMatch[1] : null;

    let wrappedCode;
    if (funcName) {
      // If a function is found, call it with input
      wrappedCode = `
${code}

try:
    result = ${funcName}(input())
except Exception as e:
    result = "ERROR: " + str(e)

result
`;
    } else {
      // If no function is found, just run the code
      wrappedCode = code;
    }

    // Run asynchronously and get the function output
    const result = await py.runPythonAsync(wrappedCode);

    // Get captured stdout
    const outputStr = py.runPython("_buffer.getvalue()");
    const outputLines = outputStr.split(/\r?\n/).filter(Boolean);

    // Include function return value if exists
    if (result !== null && result !== undefined) {
      outputLines.push(result.toString());
    }

    return outputLines;
  } catch (err) {
    return [`ERROR: ${err.toString()}`];
  }
}
