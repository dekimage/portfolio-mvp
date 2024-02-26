"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { TitleDescription } from "./components/TitleDescription";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const projects = [
  {
    id: 1,
    name: "Magi's Mart",
    description: "A game about a magical shop.",
    img: "https://cdn.midjourney.com/a70065b2-9c69-4189-a6fe-ae6ae6f449eb/0_0.png",
    isPublished: true,
  },
  {
    id: 2,
    name: "The Lost City",
    description: "A game about a lost city.",
    img: "https://cdn.midjourney.com/201b09a7-2681-4e95-8efd-6b4843d31dc3/0_3.png",
    isPublished: false,
  },
];

const StoryRpgPage = () => {
  {
    /* return <StoryPage />; */
  }
  return (
    <div className="m-4 sm:m-8 flex flex-col">
      <TitleDescription
        title="Projects"
        description="Manage different projects."
        // button={
        //   <Button onClick={() => setIsCreate(true)}>+ New Project</Button>
        // }
      />
      <div className="flex flex-wrap gap-4">
        {projects.map((project, index) => (
          <Card key={index} className="max-w-[200px] relative">
            <div className="absolute top-[5px] right-[5px]">
              {project.isPublished ? (
                <Badge className="w-fit bg-green-400">Published</Badge>
              ) : (
                <Badge className="w-fit bg-yellow-400">In Progress</Badge>
              )}
            </div>
            <img src={project.img} alt="project" />
            <div className="flex justify-center  flex-col p-2">
              <div>{project.name}</div>
              <div className="text-xs text-gray-400">{project.description}</div>
              <div className="flex gap-2 pt-6">
                <Link href={`/story-rpg/project/play/${project.id}`}>
                  <Button className="p-2 px-4 h-8" variant="outline">
                    Play
                  </Button>
                </Link>
                <Link href={`/story-rpg/project/edit/${project.id}`}>
                  <Button className="p-2 px-4 h-8" variant="outline">
                    Edit
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StoryRpgPage;
