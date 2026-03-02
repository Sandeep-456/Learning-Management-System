export default function UserInputBox({ value, setValue }) {
  return (
    <div className="p-3 bg-gray-800 border-b border-gray-700">
      <p className="text-sm font-semibold mb-1">User Input</p>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full h-24 bg-gray-900 border border-gray-700 p-2 text-white rounded"
      />
    </div>
  );
}
