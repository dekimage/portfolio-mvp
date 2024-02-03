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
import actioniseLogo from "./assets/actioniseLogo.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ACTIONISE_CARDS } from "./data";
import { AlignCenterVertical, ChevronRight } from "lucide-react";

export function CardView({ card }) {
  return (
    <Dialog className="w-full">
      <DialogTrigger asChild>
        <Button className="w-full">Play</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const ConceptCard = ({ card }) => {
  const { name, spells, description, realm, realmImgUrl } = card;
  return (
    <Card className="m-4 p-4 w-80 flex justify-center flex-col items-center relative">
      <Image
        className="absolute top-[5px] left-[5px]"
        src={card.realmImg}
        alt={realm}
        width={35}
        height={35}
      />

      <CardTitle className="ml-2 flex-grow mb-4">{name}</CardTitle>

      <div className="flex justify-center items-center bg-slate-100 p-8 rounded-full">
        <Image src={card.img} alt={name} width={170} height={170} />
      </div>

      <div className="flex flex-col gap-4 my-4 w-full">
        {spells.map((spell, y) => {
          const { name, spellImgUrl, description, fullText } = spell;
          return (
            <Card
              key={y}
              className="flex justify-between items-center p-2 w-full"
            >
              <div className="w-[50px] h-[50px] border flex justify-center items-center">
                <AlignCenterVertical />
              </div>
              <div className="flex flex-col items-between flex-grow ml-2 cursor-pointer">
                <div className="text-lg font-bold">{name}</div>
                <div className="text-xs"> {description}</div>
              </div>
              <div>
                <ChevronRight />
              </div>
            </Card>
          );
        })}
      </div>

      <CardView card={card} />
    </Card>
  );
};

const ActioniseApp = () => {
  return (
    <div>
      {/* <HeroSection
        bgImg="https://cdn.midjourney.com/28d8d887-5766-4c31-ac91-ab8abc431fd4/0_1.webp"
        logo={actioniseLogo}
      /> */}

      <div className="flex flex-wrap justify-center">
        {ACTIONISE_CARDS.map((card, i) => (
          <ConceptCard key={i} card={card} />
        ))}
      </div>
    </div>
  );
};

export default ActioniseApp;
