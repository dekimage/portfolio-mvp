import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const toolImageMap = {
  gpt: "/tool-logos/gpt.png",
  make: "/tool-logos/make.png",
  notion: "/tool-logos/notion.png",
  // Add more tools as needed
};

const AutomationCard = ({ title, description, estimateTimeSave, tools }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200"
        >
          Saves approximately {estimateTimeSave} per day
        </Badge>
      </CardContent>
      <CardFooter className="flex gap-2">
        {tools.map((tool) => (
          <div
            key={tool}
            className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100 p-1"
          >
            <Image
              src={toolImageMap[tool.toLowerCase()]}
              alt={`${tool} logo`}
              fill
              className="object-contain p-1"
            />
          </div>
        ))}
      </CardFooter>
    </Card>
  );
};

export default AutomationCard;
