import { Button } from "@/components/ui/button";
import ViewCards from "../../reusable-ui/ViewCards";
import SingleCard from "./SingleCard";
import { observer } from "mobx-react";
import { gameStore } from "../Store";

const Deck = ({ deck, discardPile, onDraw }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow flex flex-col justify-between">
      <div className="text-lg font-bold mb-2">Deck ({deck.length})</div>
      <ViewCards
        cards={deck}
        buttonText="View Deck"
        CardComponent={SingleCard}
      />
      <Button
        onClick={onDraw}
        className="bg-blue-500 hover:bg-blue-600 w-full"
        disabled={deck.length === 0}
      >
        Draw Card
      </Button>

      {discardPile && discardPile.length > 0 && (
        <div className="mt-4">
          <div className="text-lg font-bold mb-2">
            Discard Pile ({discardPile.length})
          </div>
          <ViewCards
            cards={discardPile}
            buttonText="View Discard Pile"
            CardComponent={SingleCard}
          />
        </div>
      )}
    </div>
  );
};

const GameStatus = observer(() => {
  const { totalVP, globalRound, activePlayer, nextTurn } = gameStore;

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Game Status</h2>
        <div className="my-4 text-2xl">Total VP: {totalVP} 🌕</div>
        <div className="my-4 text-2xl">Round: {globalRound} 🎲</div>
      </div>

      {activePlayer && (
        <div className="p-4 bg-white rounded-lg shadow mb-6 max-w-[250px]">
          <h3 className="text-lg font-bold">Active Player</h3>
          <div className="flex items-center space-x-4">
            <div
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: activePlayer.color }}
            ></div>
            <div>
              <p className="text-md">
                {activePlayer.name} (Player {activePlayer.number})
              </p>
              <p className="text-md">VP: {activePlayer.vp}</p>
            </div>
          </div>
        </div>
      )}
      <Button
        className="bg-blue-500 w-full hover:bg-blue-600"
        onClick={() => nextTurn()}
      >
        Next Turn
      </Button>
    </div>
  );
});

const GameStarted = observer(({}) => {
  return (
    <div className="flex flex-col justify-center gap-4 sm:flex-row p-4">
      <GameStatus />
      <Deck
        deck={gameStore.deck}
        discardPile={gameStore.discardPile}
        onDraw={gameStore.drawCard}
      />
      <div className="flex justify-center">
        {gameStore.activeCard ? (
          <SingleCard
            card={gameStore.activeCard}
            deckName={gameStore.activeCard.deckName}
            hasActions
          />
        ) : (
          <div className="w-48 h-72 border-4 border-dashed border-black rounded-lg overflow-hidden flex flex-col justify-center items-center text-4xl">
            +
          </div>
        )}
      </div>
    </div>
  );
});

export default GameStarted;
