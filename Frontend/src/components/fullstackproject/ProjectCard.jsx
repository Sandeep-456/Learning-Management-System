import { useNavigate } from "react-router-dom";
import { projectIcons } from "../../data/projectIcons";

export default function ProjectCard({ name, file }) {
  const navigate = useNavigate();
  const iconData = projectIcons[file.type];

  const handleOpen = () => {
    navigate("/code-playground", { state: { file, fileName: name } });
  };

  return (
    <div className="bg-white border rounded-lg shadow-md p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>

        <div className="flex space-x-2 mt-2">
          {iconData?.Icon.map((Icon, index) => (
            <Icon
              key={index}
              className="text-2xl"
              style={{ color: iconData.color[index] }}
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleOpen}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full"
      >
        Open
      </button>
    </div>
  );
}
