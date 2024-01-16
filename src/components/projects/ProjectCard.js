import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";
import habitsImg from "@/assets/home/habits.png";
import conceptsImg from "@/assets/home/concepts.png";
import questsImg from "@/assets/home/quests.png";
import wisdomExplorerImg from "@/assets/home/wisdom-explorer.png";
import roboRallyImg from "@/assets/home/robo-rally.png";
import myHabitsImg from "@/assets/home/my-habits.png";

const imagesLookup = {
  habits: habitsImg,
  concepts: conceptsImg,
  quests: questsImg,
  wisdomExplorer: wisdomExplorerImg,
  roboRally: roboRallyImg,
  myHabits: myHabitsImg,
};

const ProjectCard = ({ project }) => {
  const { title, description, image, tags, url } = project;

  return (
    <Card className="m-4 p-y-4 w-80">
      <div className="flex justify-center items-center pb-0">
        <Image src={imagesLookup[image]} alt={title} width={300} />
      </div>

      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {tags.map((tag) => (
          <Badge variant="screen" key={tag} className="mr-2">
            {tag}
          </Badge>
        ))}
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        <Link href={`/${url}`} className="w-full">
          <Button className="w-full">Play</Button>
        </Link>

        <p className="text-sm text-gray-500">No Signup Required</p>
        <p className="text-sm text-gray-500">
          Created By <span className="font-bold">Dejan Gavrilovic</span>
        </p>
      </CardFooter>
    </Card>
  );
};
export default ProjectCard;
