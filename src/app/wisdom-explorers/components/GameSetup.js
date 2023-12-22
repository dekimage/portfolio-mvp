import ButtonGroup from "@/app/reusable-ui/ButtonGroup";
import ViewCards from "@/app/reusable-ui/ViewCards";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import PlayerCard from "./PlayerCard";

import creativityImg from "../assets/creativity-deck.png";
import healthImg from "../assets/health-deck.png";
import mindfulnessImg from "../assets/mindfulness-deck.png";
import minimalismImg from "../assets/minimalism-deck.png";
import productivityImg from "../assets/productivity-deck.png";
import { observer } from "mobx-react";
import { gameStore } from "../Store";
import { useState } from "react";
import { allDecks } from "../data";
import SingleCard from "./SingleCard";

const imagesLookup = {
  Creativity: creativityImg,
  Health: healthImg,
  Mindfulness: mindfulnessImg,
  Minimalism: minimalismImg,
  Productivity: productivityImg,
};

const playersCountButtons = [
  { label: "1 Player", value: 1 },
  { label: "2 Players", value: 2 },
  { label: "3 Players", value: 3 },
  { label: "4 Players", value: 4 },
  { label: "5 Players", value: 5 },
  { label: "6 Players", value: 6 },
];

const GameSetup = observer(({}) => {
  const { createDeck, setPlayersCount, playersCount } = gameStore;

  const [selectedDecks, setSelectedDecks] = useState([]);

  const isGameReady = selectedDecks.length == 3 && playersCount !== 0;
  return (
    <div className="flex justify-center items-center flex-col">
      <div class="text-2xl text-gray-600 my-4 mt-8 ">
        {playersCount !== 0 && "✔️"} 1. Select the number of players
      </div>

      <ButtonGroup
        buttons={playersCountButtons}
        handleClick={(value) => setPlayersCount(value)}
      />

      <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
        {[...Array(playersCount)].map((_, index) => (
          <PlayerCard key={index} playerNumber={index + 1} />
        ))}
      </div>

      <div class="text-2xl text-gray-600 my-4 mt-8">
        {selectedDecks.length === 3 && "✔️"} 2. Select 3 decks for your game.
      </div>

      <h1 class="text-l text-blue-600">
        Selected Decks [{selectedDecks.length}/3]
      </h1>

      <div className="flex flex-wrap">
        {allDecks.map((deck) => {
          const isDeckSelected = selectedDecks.includes(deck.id);
          return (
            <Card
              key={deck.id}
              className="w-[150px] h-64 m-4 p-2 flex justify-center flex-col items-center gap-3 relative"
            >
              {isDeckSelected && (
                <div className="absolute top-[-5px] right-[-5px]">✔️</div>
              )}
              <CardDescription>{deck.name} Deck</CardDescription>
              <Image
                src={imagesLookup[deck.name]}
                height="100"
                width="100"
                alt="deck"
              />
              <Button
                className={isDeckSelected ? "" : "bg-blue-500"}
                onClick={() =>
                  isDeckSelected
                    ? setSelectedDecks(
                        selectedDecks.filter((id) => id !== deck.id)
                      )
                    : setSelectedDecks([...selectedDecks, deck.id])
                }
              >
                {isDeckSelected ? "Remove" : "+ Add Deck"}
              </Button>

              <ViewCards
                cards={deck.deck}
                buttonText="View Cards"
                CardComponent={SingleCard}
              />
            </Card>
          );
        })}
      </div>

      <Button
        className={
          isGameReady
            ? "bg-green-500 w-32 h-16 mt-8"
            : "bg-gray-400 w-32 h-16 mt-8"
        }
        disabled={!isGameReady}
        onClick={() => createDeck(selectedDecks)}
      >
        {isGameReady ? "Play" : "Not Ready"}
      </Button>
    </div>
  );
});

export default GameSetup;
