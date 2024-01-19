"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HeroSection from "../reusable-ui/HeroSection";
import habitsLogo from "./assets/habits-logo.png";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { habits } from "./data";

import img1 from "./assets-ideas/instagram-ai-channel.png";
import img2 from "./assets-ideas/pathways-usecases.png";
import img3 from "./assets-ideas/small-change-everyday.png";

const Habit = ({ habit }) => {
  const { name, type, duration, frequency, notes } = habit;

  return (
    <Card className="m-4 p-y-4 w-80">
      <div className="flex justify-center items-center pb-0">
        {/* <Image src={imagesLookup[image]} alt={name} width={100} /> */}
      </div>

      <CardHeader>
        <CardTitle>{name}</CardTitle>
        {/* <CardDescription>{description}</CardDescription> */}
      </CardHeader>
      <CardContent>
        <Badge variant="screen" key={type} className="mr-2">
          {type}
        </Badge>
        <Badge variant="screen" key={duration} className="mr-2">
          {duration}
        </Badge>
        <Badge variant="screen" key={frequency} className="mr-2">
          {frequency}
        </Badge>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        <Button className="w-full">View Habit</Button>

        {notes.map((note, y) => (
          <div key={y} className="text-sm text-gray-500">
            {note}
          </div>
        ))}
      </CardFooter>
    </Card>
  );
};

const myIdeas = [
  {
    type: "task",
    title: "Research and Brainstorm for Pathways App",
    description:
      "Dedicate 2-3 hours to researching and brainstorming the best possible use cases for the personal app 'Pathways'. The goal is to identify relevant use cases personally beneficial, and then integrate them into the app for testing their validity.",
    project: "Pathways",
    image: img2,
    results: "1. Questions Leo - put with context when to ask them. ",
  },
  {
    type: "strategy",
    title: "Launch an Instagram Channel with Unique Designs",
    description:
      "Create an Instagram channel, drawing inspiration from an existing channel with awesome tips. The strategy involves redesigning or 'stealing' ideas, making them unique, and posting them on the new channel. The ultimate goal is to develop a product based on the channel's content and audience, potentially collaborating to create a game or product tied to the brand.",
    project: "Social Media Expansion",
    original:
      "instagram that channel with awesome tips - maybe steal all duplicate make fancy my unique design of it and start the channel and just send all those posts, and finally make aproduct bbased on it and sell it to that audience. ez pez - or maki collab make game/product on his brand and sell to the audience.",
    image: img1,
  },
  {
    type: "self-improvement strategy",
    title: "Daily Personal Improvement Inspired by Sadhguru",
    description:
      "Adopt a daily practice of self-improvement, inspired by Sadhguru's teachings. Each day, write down a specific, detailed goal for personal growth with enthusiastic effort. Identify one change to implement the next day and strive to evolve one step daily. Over a year, this approach will amount to 365 incremental changes, leading to significant personal transformation.",
    original:
      "Sadhguru trigger how to become a little better human being a little better than yestersay? Omgg 1% btletter accumulates, we need powerful questions X BHC like question is: erite down speckfically and detailedly with gusyo effort and power force ur srlf, how  will i be tonorrow a little changed for better? Like what 1 change j will do, name the change and try to do it from tomorrow: like try to evolve 1 step every day in 1 year that is log of 365 changes, thats a looooot of changes wow app product process for this!",
    project: "365 Days of Change",
    image: img3,
  },
];

const Idea = ({ idea }) => {
  return (
    <div className="flex flex-col p-4 gap-4 w-[300px] border border-gray-200">
      <Image src={idea.image} alt={idea.title} width={200} height={200} />
      <div className="text-xl font-bold">{idea.title}</div>
      <div className="text-md">{idea.description}</div>
      {idea.original && <div className="text-md">{idea.original}</div>}
      <div className="bg-blue-500 p-4 rounded">{idea.project}</div>
      <Badge>{idea.type}</Badge>
    </div>
  );
};

const MyHabitsApp = () => {
  return (
    <div>
      <HeroSection
        bgImg="https://cdn.midjourney.com/28d8d887-5766-4c31-ac91-ab8abc431fd4/0_1.webp"
        logo={habitsLogo}
      />
      <div className="flex flex-wrap justify-center">
        {habits.map((habit, i) => (
          <Habit key={i} habit={habit} />
        ))}
      </div>

      <div className="flex flex-wrap">
        {myIdeas.map((idea, i) => (
          <Idea key={i} idea={idea} />
        ))}
      </div>
    </div>
  );
};

export default MyHabitsApp;
