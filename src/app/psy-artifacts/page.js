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

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import psyLogo from "./assets/psylogo.png";
import Link from "next/link";

import flyImg from "./assets/fly.png";
import orbImg from "./assets/orb.png";
import databaseImg from "./assets/database.png";
import brainscannerImg from "./assets/brainscanner.png";
import treebuildingsImg from "./assets/treebuilding.png";

//1573172060a5485e8a0f540675d43569

// draw me image in psychedelic style that best captures the following description of this item called "NAME", with description : "DESCRIPTION"

export const artifacts = [
  {
    name: "Recycling Fly",
    content:
      "This is a relaxing activity better than wasting time, because I can learn mechanics about board games while i enjoy and relax before bed time.",
    image: flyImg,
  },
  {
    name: "The All-Relative Orb",
    content:
      "This is a relaxing activity better than wasting time, because I can learn mechanics about board games while i enjoy and relax before bed time.",

    image: orbImg,
  },
  {
    name: "Alien Database",
    content:
      "Alien database where the id of each row is a human xD (cus humans are unique with dna and combinations so much that you can easily use a human as id xD but the funny part is that their database is so complex that the most simple thing like what we would use a number like 1 or 2 for id, they use an entire human xD) And they can easily count in humans, like we count 1, 2, 3 ,4 they can count in humans as easily and distunqish and remember them. (such is the complexity of their brain)",

    image: databaseImg,
  },
  {
    name: "Brain Scanner",
    content:
      "Engine machine that can scan your brain for a movie or series id, and delete that part of long term memory such that you can reenjoy watching your favorite show again and again.",

    image: brainscannerImg,
  },
  {
    name: "Tree-like Buildings",
    content:
      "Combination of natures alghortim on trees + react components code design + byildings flats houses, into higher order inteligent craftsmanship of buildings in a way that you write code alghoritm and you put physical materials as inputs and as output it auto builds the building according to deaign pattern, and you can add random twist in the code such that each building can be unique if you wish like each tree is unique but follows same pattern design.",
    image: treebuildingsImg,
  },
];

const Habit = ({ habit }) => {
  const { name, content, image } = habit;

  return (
    <Card className="m-4 p-y-4 w-80" style={{ border: "10px solid black" }}>
      <div className="flex justify-center items-center pb-0">
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          className="mt-6"
        />
      </div>

      <CardHeader>
        <div className="flex justify-center text-center">
          {" "}
          <CardTitle>{name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {/* <CardDescription>{content}</CardDescription> */}
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        <Button className="w-full">Open Artifact</Button>
      </CardFooter>
    </Card>
  );
};

const MyHabitsApp = () => {
  return (
    <div>
      <HeroSection logo={psyLogo} />
      <div className="flex flex-wrap justify-center">
        {artifacts.map((habit, i) => (
          <Habit key={i} habit={habit} />
        ))}
      </div>
    </div>
  );
};

export default MyHabitsApp;
