import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useGame } from "./GameContext";
import { Button } from "@/components/ui/button";

const Card = ({ card, onDraw, onPlay, onActivate }) => {
  const cardTypeEmoji = {
    function: "🔧",
    resource: "💎",
    sabotage: "🔥",
    variable: "❓",
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{card.title}</div>
        <p className="text-gray-700 text-base">{card.effect}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block  rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {cardTypeEmoji[card.type]} {card.type}
        </span>
        {onDraw && (
          <button
            onClick={onDraw}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          >
            Draw
          </button>
        )}
        {onPlay && (
          <button
            onClick={onPlay}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-2"
          >
            Play
          </button>
        )}
        {onActivate && (
          <button
            onClick={onActivate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2"
          >
            Use
          </button>
        )}
      </div>
    </div>
  );
};

const Hand = () => {
  const { hand, playCard } = useGame();

  return (
    <div className="grid grid-cols-6 gap-4 border-4 relative">
      <div className="absolute left-[50%] top-[-20px] text-xl font-bold p-1 px-4 rounded">
        Hand
      </div>
      {hand.length === 0 && (
        <div className="col-span-6 text-center py-12">No cards in hand</div>
      )}
      {hand.length > 0 &&
        hand.map((card, index) => (
          <Card key={index} card={card} onPlay={() => playCard(index)} />
        ))}
    </div>
  );
};

const PlayArea = () => {
  const { playedCards, activateCard } = useGame();
  return (
    <div className="grid grid-cols-6 gap-4 border-4 relative">
      <div className="absolute left-[50%] top-[-20px] text-xl font-bold  p-1 px-4 rounded">
        Board
      </div>
      {playedCards.length === 0 && (
        <div className="col-span-6 text-center py-12">No cards played yet</div>
      )}
      {playedCards.length > 0 &&
        playedCards.map((card, index) => (
          <Card
            key={index}
            card={card}
            onActivate={() => activateCard(index)}
          />
        ))}
    </div>
  );
};

const Marketplace = () => {
  const { deck, faceUpCards, drawCard, discardPile, setFaceUpCards } =
    useGame();

  const handleCardDraw = (index) => {
    drawCard(index);
    const newFaceUpCards = [...faceUpCards];
    if (deck.length > 0) {
      newFaceUpCards[index] = deck.shift();
    } else {
      newFaceUpCards.splice(index, 1);
    }
    setFaceUpCards(newFaceUpCards);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex gap-4 mb-4">
        <DiscardPileView deck={discardPile} />
        <DeckView deck={deck} />
      </div>

      <div className="grid grid-cols-5 gap-4 mb-4">
        {faceUpCards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            onDraw={() => handleCardDraw(index)}
          />
        ))}
      </div>
    </div>
  );
};

export const CardsBoard = () => {
  const { showHand, showMarket, showPlayedCards } = useGame();
  return (
    <div className="container mx-auto p-4">
      {showHand && <Hand />}
      {showPlayedCards && <PlayArea />}
      {showMarket && <Marketplace />}
    </div>
  );
};

const DeckView = ({ deck }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="bg-black border-4 border-gray-500 p-4 shadow-xl rounded-lg">
          <p className="text-white text-2xl">Deck: {deck.length}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-full w-[800px]">
        <div className="grid grid-cols-5 gap-4 justify-center overflow-y-auto max-h-[400px]">
          {deck.map((card, index) => (
            <div key={card.id} className="w-full">
              <Card card={card} onDraw={() => handleCardDraw(index)} />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const DiscardPileView = ({ deck }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="bg-gray-800 border-4 border-gray-500 p-4 shadow-xl rounded-lg">
          <p className="text-white text-2xl">Discard Pile: {deck.length}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-full w-[800px]">
        <div className="grid grid-cols-5 gap-4 justify-center overflow-y-auto max-h-[400px]">
          {deck.map((card, index) => (
            <div key={card.id} className="w-full">
              <Card card={card} onDraw={() => handleCardDraw(index)} />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
