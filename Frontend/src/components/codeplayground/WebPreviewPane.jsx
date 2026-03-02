export default function WebPreviewPane({ html }) {
  return (
    <iframe
      className="w-full h-full border-0"
      srcDoc={html}
      title="web-preview"
    />
  );
}
