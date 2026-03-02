export function buildWebPreview(html, css, js) {
  const consoleLogger = `
    // Store the original console
    const originalConsole = { ...window.console };

    // Override console methods
    window.console = {
      ...originalConsole,
      log: (...args) => {
        originalConsole.log(...args);
        window.parent.postMessage({ source: 'web-preview', type: 'log', message: args.map(arg => JSON.stringify(arg, null, 2)) }, '*');
      },
      warn: (...args) => {
        originalConsole.warn(...args);
        window.parent.postMessage({ source: 'web-preview', type: 'warn', message: args.map(arg => JSON.stringify(arg, null, 2)) }, '*');
      },
      error: (...args) => {
        originalConsole.error(...args);
        const errorMessages = args.map(arg => {
          if (arg instanceof Error) {
            return JSON.stringify({ message: arg.message, stack: arg.stack }, null, 2);
          }
          return JSON.stringify(arg, null, 2);
        });
        window.parent.postMessage({ source: 'web-preview', type: 'error', message: errorMessages }, '*');
      },
    };

    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', event => {
      console.error('Unhandled promise rejection:', event.reason);
    });
  `;

  return `
<html>
<head>
<style>${css}</style>
</head>
<body>
${html}
<script>
  try {
    ${consoleLogger}
    ${js}
  } catch (err) {
    console.error(err);
  }
<\/script>
</body>
</html>
`;
}
