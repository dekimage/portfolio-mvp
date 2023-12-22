import React from "react";
import { observer } from "mobx-react";
import { gameStore } from "../Store"; // Adjust the path as needed
import Image from "next/image";

// Icons for different card types - You can replace these with actual icons
const cardTypeIcons = {
  action: "⚡", // Placeholder icon for 'action'
  question: "❓", // Placeholder icon for 'question'
  tip: "💡", // Placeholder icon for 'tip'
};

const deckBackgroundColors = {
  Creativity: "bg-purple-400",
  Health: "bg-green-400",
  Mindfulness: "bg-blue-500",
  Productivity: "bg-red-400",
  Minimalism: "bg-slate-600",
};

const SingleCard = observer(({ card, hasActions = false }) => {
  const { playCard, discardCard } = gameStore;

  return (
    <div
      className={`w-48 h-72 border-4 border-black rounded-lg overflow-hidden flex flex-col justify-between ${
        deckBackgroundColors[card.category]
      }`}
    >
      <div className="p-2 text-white font-bold flex justify-between">
        <span>{card.name}</span>
        <span>{cardTypeIcons[card.type]}</span>
      </div>
      <div className="p-2">
        {/* Placeholder for image */}
        {/* <Image
          src={card.image}
          alt={card.name}
          height={128}
          width={128}
          className="h-32 w-full object-cover"
        /> */}
      </div>
      <div className="p-2 bg-slate-300 h-1/2">
        <p>{card.effect}</p>
      </div>
      {hasActions && (
        <div className="flex justify-between p-2">
          <button
            onClick={playCard}
            className="bg-white text-black px-3 py-1 rounded"
          >
            Play
          </button>
          <button
            onClick={discardCard}
            className="bg-white text-black px-3 py-1 rounded"
          >
            Discard
          </button>
        </div>
      )}
    </div>
  );
});

export default SingleCard;
