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
    </div>
  );
};

export default MyHabitsApp;
