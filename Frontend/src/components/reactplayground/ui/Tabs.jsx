export default function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex bg-indigo-900 border-b-2 border-indigo-500/30">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => setActiveTab(tab.name)}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === tab.name
              ? "bg-indigo-800 text-white"
              : "text-gray-400 hover:bg-indigo-800/50"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}