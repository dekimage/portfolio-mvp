"use client";
// import Card from "./components/Card";
import { Button } from "@/components/ui/button";

import { observer } from "mobx-react";
import { gameStore } from "./Store";
import { allDecks } from "./data";
import { useState } from "react";

const WisdomExplorersPage = observer(() => {
  return <WisdomExplorersApp />;
});

const WisdomExplorersApp = observer(() => {
  const {
    nextTurn,
    activeCard,
    discardPile,
    deck,
    createDeck,
    vp,
    turn,
    isGameStarted,
  } = gameStore;

  const [selectedDecks, setSelectedDecks] = useState([]);

  return (
    <div>
      {isGameStarted ? (
        <div>
          <div className="m-4 mb-8 text-2xl">Your VP: {vp} 🌕</div>
          <div className="m-4 mb-8 text-2xl">Turn: {turn} 🎲</div>
          <Button onClick={nextTurn}>Next Turn</Button>
          <div>{deck.length}</div>
        </div>
      ) : (
        <div>
          <h1>No Active Games</h1>
          <h1>Selected Decks [{selectedDecks.length}/3]</h1>
          {allDecks.map((deck) => {
            const isDeckSelected = selectedDecks.includes(deck.id);
            return (
              <Button
                className={isDeckSelected ? "bg-blue-500" : ""}
                onClick={() =>
                  isDeckSelected
                    ? setSelectedDecks(
                        selectedDecks.filter((id) => id !== deck.id)
                      )
                    : setSelectedDecks([...selectedDecks, deck.id])
                }
              >
                {deck.name}
              </Button>
            );
          })}
          <Button
            disabled={selectedDecks.length !== 3}
            onClick={() => createDeck(selectedDecks)}
          >
            Start New Game
          </Button>
        </div>
      )}
    </div>
  );
});

export default WisdomExplorersPage;
