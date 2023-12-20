import React, { createContext, useState, useContext, useEffect } from "react";
import { initialDeck } from "./data";
import { shuffleDeck } from "./utils";

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

const basicActions = [
  {
    name: "Mine Credits",
    cost: 1,
    effect: "+1 Credit",
    func: "increaseCredit",
  },
  { name: "Move", cost: 1, effect: "+1 MP", func: "increaseMp" },
];

export const GameProvider = ({ children }) => {
  // RESOURCES
  const [resources, setResources] = useState({
    credit: 0,
    energy: 10,
    mp: 0,
    reputation: 0,
  });

  // VARIABLES
  const [variables, setVariables] = useState({
    converter: 1,
    generator: 1,
    speed: 1,
    influence: 1,
    iterator: 1,
  });

  // VIEWS
  const [showMarket, setShowMarket] = useState(false);
  const [showHand, setShowHand] = useState(false);
  const [showPlayedCards, setShowPlayedCards] = useState(false);

  // TURN
  const [turn, setTurn] = useState(1);
  const [processorTokens, setProcessorTokens] = useState([false, false]);

  // DECKS
  const [hand, setHand] = useState([]);
  const [discardPile, setDiscardPile] = useState([]);
  const [playedCards, setPlayedCards] = useState([]);
  const [deck, setDeck] = useState([]);
  const [faceUpCards, setFaceUpCards] = useState([]);

  useEffect(() => {
    const shuffledDeck = shuffleDeck([...initialDeck]);
    setDeck(shuffledDeck.slice(5));
    setFaceUpCards(shuffledDeck.slice(0, 5));
  }, []);

  const activateCard = (index) => {
    // do somthng
  };

  const playCard = (index) => {
    const card = hand[index];
    if (card.type !== "function") {
      setDiscardPile([...discardPile, card]);
    } else {
      setPlayedCards([...playedCards, card]);
    }
    setHand(hand.filter((_, i) => i !== index));
  };

  const drawCard = (index) => {
    const newHand = [...hand, faceUpCards[index]];
    const newFaceUpCards = [...faceUpCards];
    const newDeck = [...deck];

    newFaceUpCards.splice(index, 1, newDeck.shift());

    setHand(newHand);
    setFaceUpCards(newFaceUpCards);
    setDeck(newDeck);
  };

  const nextTurn = () => {
    setTurn((prev) => prev + 1);
    setProcessorTokens([false, false]);
    setResources((prev) => ({
      ...prev,
      energy: prev.energy + 3,
    }));
  };

  const increaseCredit = (amount, energyCost) => {
    setResources((prev) => ({
      ...prev,
      credit: prev.credit + amount,
      energy: prev.energy - energyCost,
    }));
  };

  const increaseEnergy = (amount, energyCost) => {
    setResources((prev) => ({
      ...prev,
      energy: prev.energy + amount - energyCost,
    }));
  };

  const increaseMp = (amount, energyCost) => {
    setResources((prev) => ({
      ...prev,
      mp: prev.mp + amount,
      energy: prev.energy - energyCost,
    }));
  };

  const increaseReputation = (amount, energyCost) => {
    setResources((prev) => ({
      ...prev,
      reputation: prev.reputation + amount,
      energy: prev.energy - energyCost,
    }));
  };

  const updateResource = (resource, amount) => {
    setResources((prevResources) => ({
      ...prevResources,
      [resource]: prevResources[resource] + amount,
    }));
  };

  const rainbowFunction = (keywords) => {
    const keywordActions = {
      mp: (value) => gainResource("mp", value),
      credit: (value) => gainResource("credit", value),
      rep: (value) => gainResource("reputation", value),
      energy: (value) => gainResource("energy", value),

      func: () => someFunction(),
      draw: (value) => drawCards(value),

      converter: (value) => modifyVariable("converter", value),
      generator: (value) => modifyVariable("generator", value),
      speed: (value) => modifyVariable("speed", value),
      influence: (value) => modifyVariable("influence", value),
      iterator: (value) => modifyVariable("iterator", value),
    };

    keywords.forEach((keyword) => {
      const [action, valueStr] = keyword.split("-");

      if (keywordActions.hasOwnProperty(action)) {
        const value = valueStr ? parseInt(valueStr) : undefined;
        keywordActions[action](value);
      } else {
        console.log(`No function found for keyword: ${keyword}`);
      }
    });
  };

  return (
    <GameContext.Provider
      value={{
        resources,
        variables,
        updateResource,
        basicActions,
        actions: {
          increaseCredit,
          increaseEnergy,
          increaseMp,
          increaseReputation,
        },
        turn,
        nextTurn,
        processorTokens,
        setProcessorTokens,
        deck,
        setDeck,
        faceUpCards,
        setFaceUpCards,
        playedCards,
        setPlayedCards,
        hand,
        setHand,
        discardPile,
        setDiscardPile,
        drawCard,
        playCard,
        activateCard,
        showMarket,
        setShowMarket,
        showHand,
        setShowHand,
        showPlayedCards,
        setShowPlayedCards,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
