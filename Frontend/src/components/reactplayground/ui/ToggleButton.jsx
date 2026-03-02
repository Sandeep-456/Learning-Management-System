export default function ToggleButton({ active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-6 right-6 px-4 py-2
      bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg"
    >
      {active ? "Editor" : "Preview"}
    </button>
  );
}
