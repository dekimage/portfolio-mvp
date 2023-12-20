"use client";
import Card from "./components/Card";
import { Button } from "@/components/ui/button";

import { observer } from "mobx-react";
import { gameStore } from "./Store";

const TopConcepts = observer(() => {
  return <TopConceptsBoards />;
});

const CardsMapper = ({ cards, title }) => {
  return (
    <div className="m-4 mb-8">
      <div className="text-2xl bold mb-2">{title}</div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

const TopConceptsBoards = observer(() => {
  const {
    nextTurn,
    hand,
    marketplace,
    discardPile,
    deck,
    allCards,
    gold,
    turn,
  } = gameStore;

  return (
    <div>
      <div className="m-4 mb-8 text-2xl">Your Balance: {gold} 🌕</div>
      <div className="m-4 mb-8 text-2xl">Turn: {turn} 🎲</div>
      <Button onClick={nextTurn}>Next Turn</Button>
      <CardsMapper title="Your Hand 🖐️" cards={hand} />
      <CardsMapper title="Upgrade Your Deck 🛍️" cards={marketplace} />
    </div>
  );
});

export default TopConcepts;
