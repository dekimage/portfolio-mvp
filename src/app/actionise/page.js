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
import "./actionise.css";

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
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { cardStore } from "./mobx";
import { ModeToggle } from "@/components/ui/themeButton";
import { toJS } from "mobx";
import { Badge } from "@/components/ui/badge";

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
  const [isFlipped, setIsFlipped] = useState(false);
  const { name, spells, description, realm, realmImgUrl } = card;
  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Card
      className={`m-4 p-4 w-80 flex justify-center flex-col items-center relative ${
        isFlipped ? "flip-vertical-right" : ""
      }`}
      onClick={toggleFlip}
    >
      {/* className="m-4 p-4 w-80 flex justify-center flex-col items-center relative"> */}

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
        {spells?.map((spell, y) => {
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

const CardComponent = ({ card }) => {
  console.log(toJS(card.actions));
  return (
    <div
      className="max-w-sm rounded-[20px] overflow-hidden relative shadow-lg m-4"
      style={{ border: `4px solid ${card.color}` }}
    >
      <Image
        className="absolute top-[5px] left-[5px]"
        src={card.realmImageUrl}
        alt={card.realmName}
        width={35}
        height={35}
      />
      <div className="flex justify-center items-center p-4 rounded-full">
        <Image src={card.imageUrl} alt={card.name} width={250} height={250} />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{card.name}</div>
        <p className="text-base">{card.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {card.rarity}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {card.type}
        </span>

        <Badge className="text-black" style={{ backgroundColor: card.color }}>
          {card.realmName}
        </Badge>
      </div>
      <div className="px-6 pt-4 pb-2">
        <h3 className="font-bold">Benefits:</h3>
        <ul className="list-disc ml-4">
          {card.benefits?.split("\n").map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>

      {card.actions.map((action) => (
        <div key={action.id} className="action mt-2 p-2 w-full">
          <h3 className="text-md font-bold">{action.name}</h3>
          <ul className="steps list-disc ml-4">
            {action.steps?.map((step) => (
              <li key={step.id} className="step">
                <strong>{step.task}</strong> ({step.timer} minutes) -{" "}
                {step.content}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const ActioniseApp = observer(() => {
  useEffect(() => {
    cardStore.fetchCards();
  }, []);

  // console.log(toJS(cardStore.cards));
  return (
    <div>
      <ModeToggle />
      {/* <HeroSection
        bgImg="https://cdn.midjourney.com/28d8d887-5766-4c31-ac91-ab8abc431fd4/0_1.webp"
        logo={actioniseLogo}
      /> */}

      {/* <div className="flex flex-wrap justify-center">
        {ACTIONISE_CARDS.map((card, i) => (
          <ConceptCard key={i} card={card} />
        ))}
      </div> */}

      <div className="flex flex-wrap justify-center">
        {cardStore.cards.map((card) => (
          <CardComponent key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
});

export default ActioniseApp;
