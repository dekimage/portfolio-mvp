import React, { useState } from "react";
import { useGame } from "./GameContext";
import Action from "./Action";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import handIcon from "./assets/hand.png";
import marketIcon from "./assets/market.png";
import boardIcon from "./assets/board.png";

const boardImages = {
  hand: handIcon,
  market: marketIcon,
  board: boardIcon,
};

const ProcessorToken = ({ index, onUse }) => {
  const { processorTokens, setProcessorTokens } = useGame();

  const handleClick = () => {
    if (!processorTokens[index]) {
      setProcessorTokens(
        processorTokens.map((token, i) => (i === index ? true : token))
      );
      onUse();
    }
  };
  const isUsed = processorTokens[index];

  return (
    <div
      onClick={handleClick}
      className={`w-20 h-20 rounded-full flex items-center justify-center cursor-pointer 
        ${isUsed ? "bg-red-500 cursor-not-allowed" : "bg-blue-500"}`}
    >
      {isUsed ? "❌" : "🔄"}{" "}
    </div>
  );
};

const ControlRoom = () => {
  const { basicActions } = useGame();
  const [actionsEnabled, setActionsEnabled] = useState(0);
  const {
    nextTurn,
    turn,
    showHand,
    setShowHand,
    showMarket,
    setShowMarket,
    showPlayedCards,
    setShowPlayedCards,
  } = useGame();

  const handleUseToken = () => {
    setActionsEnabled(actionsEnabled + 1);
  };

  const handleActionTaken = () => {
    setActionsEnabled(actionsEnabled - 1);
  };

  return (
    <div>
      <div className="flex space-x-2 justify-between items-center mb-8">
        <div className="flex gap-4">
          {[...Array(2)].map((_, index) => (
            <ProcessorToken key={index} index={index} onUse={handleUseToken} />
          ))}
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => setShowHand(!showHand)}
            className={showHand ? "bg-red-400" : "bg-green-400"}
          >
            <Image
              src={boardImages.hand}
              alt="energy"
              width={20}
              height={20}
              className="mr-2"
            />
            {showHand ? "Hide Hand" : "Show Hand"}
          </Button>

          <Button
            onClick={() => setShowPlayedCards(!showPlayedCards)}
            className={showPlayedCards ? "bg-red-400" : "bg-green-400"}
          >
            <Image
              src={boardImages.board}
              alt="energy"
              width={20}
              height={20}
              className="mr-2"
            />
            {showPlayedCards ? "Hide Board" : "Show Board"}
          </Button>
          <Button
            onClick={() => setShowMarket(!showMarket)}
            className={showMarket ? "bg-red-400" : "bg-green-400"}
          >
            <Image
              src={boardImages.market}
              alt="energy"
              width={20}
              height={20}
              className="mr-2"
            />
            {showMarket ? "Hide Market" : "Show Market"}
          </Button>
        </div>

        <div className="flex">
          <Button
            onClick={nextTurn}
            className="bg-green-500 text-white rounded shadow"
          >
            Next Turn
          </Button>

          <div className="ml-4">
            <span className="text-4xl">{turn}</span> Turn
          </div>
        </div>
      </div>

      <div className="text-2xl mb-2">Basic Actions</div>
      <div className="flex gap-8 mb-6">
        {basicActions.map((action, index) => (
          <Action
            key={index}
            action={action}
            actionAvailable={actionsEnabled > 0}
            onActionTaken={handleActionTaken}
          />
        ))}
      </div>
    </div>
  );
};

export default ControlRoom;
