export default function FileBrowser({ files, onOpen }) {
  return (
    <div className="w-48 bg-gray-850 border-r border-gray-700 p-2">
      <h3 className="font-bold text-gray-300 mb-2">Files</h3>
      {Object.keys(files).length === 0 && (
        <p className="text-gray-600 text-sm">No files saved</p>
      )}

      {Object.keys(files).map((name) => (
        <div
          key={name}
          className="p-1 rounded hover:bg-gray-700 cursor-pointer"
          onClick={() => onOpen(name)}
        >
          {name}
        </div>
      ))}
    </div>
  );
}
