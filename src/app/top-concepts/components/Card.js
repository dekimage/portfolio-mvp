import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { gameStore } from "../Store";

export default function Card({ card }) {
  const { completeCard, buyCard, hand, marketplace, deck, allCards } =
    gameStore;
  const isInMarketplace = marketplace.find((c) => c.id === card.id);
  const isInHand = hand.find((c) => c.id === card.id);

  return (
    <div className="border p-4 rounded-lg shadow-lg max-w-[250px] relative">
      <div className="absolute top-[5px] right-[5px]">
        <Popover>
          <PopoverTrigger>
            <Button className="rounded-full px-1 h-4">?</Button>
          </PopoverTrigger>
          <PopoverContent>
            <CardTitle className="text-xl">Summary</CardTitle>
            <CardDescription className="mb-4">
              {card.description}
            </CardDescription>
            <CardTitle className="text-xl">Benefits</CardTitle>
            <CardDescription>{card.content}</CardDescription>
          </PopoverContent>
        </Popover>
      </div>
      <div className="text-3xl">{card.emoji}</div>
      <h2 className="text-xl font-bold">{card.title}</h2>
      <p>{card.description}</p>
      <div className="mt-2">
        {isInHand && (
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            Play
          </button>
        )}
        {isInHand && (
          <Button onClick={() => completeCard(card.id)}>
            Complete {card.goldReward}
          </Button>
        )}

        {isInMarketplace && (
          <Button onClick={() => buyCard(card.id)}>Buy {card.goldCost}</Button>
        )}
      </div>
    </div>
  );
}
