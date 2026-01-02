// GameContext.js
import React, { createContext, useEffect, useState } from "react";
import { data } from "./data";

const HAND_SIZE = 3;

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [allCards, setAllCards] = useState(data.allCards);
  const [hand, setHand] = useState([]);
  const [discardPile, setDiscardPile] = useState([]);
  const [deck, setDeck] = useState(data.startingDeck);
  const [marketplace, setMarketplace] = useState([]);
  const [gold, setGold] = useState(0);
  const [turn, setTurn] = useState(1);

  const drawRandomCards = (sourceArray, number) => {
    let result = [];
    let arrayCopy = [...sourceArray];

    for (let i = 0; i < number && arrayCopy.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * arrayCopy.length);
      result.push(arrayCopy[randomIndex]);
      arrayCopy.splice(randomIndex, 1);
    }

    return [result, arrayCopy];
  };

  useEffect(() => {
    const [marketCards, remainingCardsAfterMarket] = drawRandomCards(
      allCards,
      3
    );
    setMarketplace(marketCards);
    setAllCards(remainingCardsAfterMarket);

    const [handCards, remainingCardsAfterHand] = drawRandomCards(deck, 2);
    setHand(handCards);
    setDeck(remainingCardsAfterHand);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const completeCard = (cardId) => {
    const completedCard = hand.find((card) => card.id === cardId);
    setHand(hand.filter((card) => card.id !== cardId));
    setDiscardPile([...discardPile, completedCard]);
    setGold(gold + completedCard.goldReward);
  };

  const buyCard = (cardId) => {
    const cardToBuy = marketplace.find((card) => card.id === cardId);
    if (gold >= cardToBuy.goldCost) {
      setDeck([...deck, cardToBuy]);
      setMarketplace(marketplace.filter((card) => card.id !== cardId));
      setGold(gold - cardToBuy.goldCost);
    } else {
      // Handle insufficient gold - show message to user or similar
    }
  };

  //   const reshuffleDiscardIntoDeck = () => {
  //     setDeck([...deck, ...discardPile]);
  //     setDiscardPile([]);
  //   };

  const reshuffleDiscardIntoDeck = () => {
    // Combine the discard pile and the remaining deck, then shuffle
    const newDeck = [...deck, ...discardPile];
    newDeck.sort(() => Math.random() - 0.5); // Simple shuffle
    setDeck(newDeck);
    setDiscardPile([]);
  };

  const drawCards = (currentDeck, currentHand, numCards) => {
    const drawnCards = currentDeck.slice(0, numCards);
    setHand([...currentHand, ...drawnCards]);
    setDeck(currentDeck.slice(numCards));
  };

  const nextTurn = () => {
    console.log(deck.length, hand.length, discardPile.length);
    setTurn(turn + 1);
    let newDeck = [...deck];
    let newDiscardPile = [...discardPile, ...hand];
    let newHand = [];

    setDiscardPile(newDiscardPile);
    setHand(newHand);

    if (newDeck.length < HAND_SIZE) {
      drawCards(newDeck, newHand, newDeck.length);
      newDeck = [...newDeck.slice(newDeck.length), ...newDiscardPile];
      newDiscardPile = [];
      setDeck(newDeck);
      setDiscardPile(newDiscardPile);
      drawCards(newDeck, newHand, HAND_SIZE - newDeck.length);
    } else {
      drawCards(newDeck, newHand, HAND_SIZE);
    }
  };

  const discardHand = () => {
    setDiscardPile([...discardPile, ...hand]);
    setHand([]);
  };

  return (
    <GameContext.Provider
      value={{
        turn,
        setTurn,
        gold,
        setGold,
        allCards,
        setAllCards,
        hand,
        setHand,
        discardPile,
        setDiscardPile,
        deck,
        setDeck,
        marketplace,
        setMarketplace,
        // actions
        completeCard,
        buyCard,
        reshuffleDiscardIntoDeck,
        drawCards,
        nextTurn,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
