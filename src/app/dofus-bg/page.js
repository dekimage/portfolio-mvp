"use client";
import React, { useEffect, useState } from "react";

const resources = [
  { name: "Bronze Ore", deck: "mining", type: "ore", emoji: "⛏️" },
  { name: "Silver Ore", deck: "mining", type: "ore", emoji: "⚒️" },
  { name: "Gold Ore", deck: "mining", type: "ore", emoji: "🪓" },
  { name: "Wheat", deck: "farming", type: "crop", emoji: "🌾" },
  { name: "Barley", deck: "farming", type: "crop", emoji: "🌿" },
  { name: "Malt", deck: "farming", type: "crop", emoji: "🌱" },
  { name: "Salmon", deck: "fishing", type: "fish", emoji: "🐟" },
  { name: "Trout", deck: "fishing", type: "fish", emoji: "🐠" },
  { name: "Carp", deck: "fishing", type: "fish", emoji: "🐡" },
  { name: "Oak Wood", deck: "lumberjack", type: "wood", emoji: "🌳" },
  { name: "Pine Wood", deck: "lumberjack", type: "wood", emoji: "🌲" },
  { name: "Birch Wood", deck: "lumberjack", type: "wood", emoji: "🍂" },
];

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const DeckBox = ({ deckName, drawCard }) => {
  const [deck] = useState(() =>
    shuffleArray(resources.filter((resource) => resource.deck === deckName))
  );

  const handleDrawCard = () => {
    // Randomly select a card to draw
    const randomIndex = Math.floor(Math.random() * deck.length);
    const drawnCard = deck[randomIndex];

    // Pass the drawn card to the parent component
    drawCard(drawnCard);
  };

  return (
    <div className="border p-4 max-h-[170px]">
      <h2 className="text-xl font-bold mb-2">{deckName} Deck</h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleDrawCard}
      >
        Draw Card
      </button>
    </div>
  );
};

const Card = ({ resource, count, onUseCard }) => {
  const typeColors = {
    ore: "bg-gray-300",
    crop: "bg-green-300",
    fish: "bg-blue-300",
    wood: "bg-yellow-300",
  };

  return (
    <div className="relative border p-6 h-[160px] w-[100px]">
      {count > 1 && (
        <div className="absolute bottom-0 right-0 bg-red-500 text-white rounded-full px-2 py-1">
          x{count}
        </div>
      )}
      <div className={`absolute top-0 left-0 ${typeColors[resource.type]}`}>
        {resource.type.toUpperCase()}
      </div>
      <h3 className="text-lg font-bold">{resource.name}</h3>
      <p>{resource.emoji}</p>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mt-2"
        onClick={onUseCard}
      >
        Use
      </button>
    </div>
  );
};

const Inventory = ({ drawnCards, onUseCard }) => {
  // Function to create a unique list of resources with quantities
  const createUniqueResourceList = (cards) => {
    const resourceMap = {};

    cards.forEach((card) => {
      if (!resourceMap[card.name]) {
        resourceMap[card.name] = { ...card, count: 1 };
      } else {
        resourceMap[card.name].count += 1;
      }
    });

    return Object.values(resourceMap);
  };

  const uniqueResources = createUniqueResourceList(drawnCards);

  return (
    <div>
      {/* <h2 className="text-xl font-bold mb-2">Inventory</h2> */}
      <div className="flex flex-wrap gap-2">
        {uniqueResources
          .sort((a, b) => a.deck.localeCompare(b.deck))
          .map((resource, index) => (
            <Card
              key={index}
              resource={resource}
              count={resource.count}
              onUseCard={() => onUseCard(resource)}
            />
          ))}
      </div>
    </div>
  );
};

const Page = () => {
  const [drawnCards, setDrawnCards] = useState([]);

  const handleDrawCard = (card) => {
    setDrawnCards([...drawnCards, card]);
  };

  const handleUseCard = (usedCard) => {
    setDrawnCards((prevDrawnCards) => {
      const cardIndex = prevDrawnCards.findIndex(
        (card) => card.name === usedCard.name
      );
      if (cardIndex !== -1) {
        return [
          ...prevDrawnCards.slice(0, cardIndex),
          ...prevDrawnCards.slice(cardIndex + 1),
        ];
      }
      return prevDrawnCards;
    });
  };

  return (
    <div className="flex">
      <div className="flex flex-col gap-2">
        <DeckBox deckName="farming" drawCard={handleDrawCard} />
        <DeckBox deckName="fishing" drawCard={handleDrawCard} />
        <DeckBox deckName="lumberjack" drawCard={handleDrawCard} />
        <DeckBox deckName="mining" drawCard={handleDrawCard} />
      </div>
      <div className="ml-8">
        <Inventory drawnCards={drawnCards} onUseCard={handleUseCard} />
      </div>
    </div>
  );
};

export default Page;
