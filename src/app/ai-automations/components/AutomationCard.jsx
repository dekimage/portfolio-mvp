import Image from "next/image";

const toolImageMap = {
  gpt: "/tool-logos/gpt.png",
  make: "/tool-logos/make.png",
  notion: "/tool-logos/notion.png",
  // Add more tools as needed
};

const AutomationCard = ({ title, description, estimateTimeSave, tools }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mb-4">
        <span className="text-green-600 font-semibold">
          Saves approximately {estimateTimeSave} per day
        </span>
      </div>
      <div className="flex gap-3">
        {tools.map((tool) => (
          <div key={tool} className="relative w-8 h-8">
            <Image
              src={toolImageMap[tool.toLowerCase()]}
              alt={`${tool} logo`}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutomationCard;
