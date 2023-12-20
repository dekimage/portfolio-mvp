"use client";
import React, { useState } from "react";
import { GameProvider, useGame } from "./GameContext";
import ControlRoom from "./ControlRoom";
import { CardsBoard } from "./Decks";
import Image from "next/image";
import energyIcon from "./assets/energy.png";
import mpIcon from "./assets/mp.png";
import reputationIcon from "./assets/reputation.png";
import creditIcon from "./assets/credit.png";

const imageLookup = {
  energy: energyIcon,
  mp: mpIcon,
  reputation: reputationIcon,
  credit: creditIcon,
};

const GameBoard = () => {
  const { resources } = useGame();
  const cells = Array.from({ length: 30 }, (_, i) => i);

  return (
    <div>
      <div className="text-2xl mb-2">Track</div>
      <div className="grid grid-cols-10 gap-1">
        {cells.map((cell) => (
          <div
            key={cell}
            className={`p-2 bg-gray-300 ${
              resources.mp === cell ? "bg-green-300" : ""
            }`}
          >
            {resources.mp === cell ? "🧍" : cell}
          </div>
        ))}
      </div>
    </div>
  );
};

const ResourcesDisplay = () => {
  const { resources, variables } = useGame();

  return (
    <div className="flex space-x-4 my-4 justify-between">
      <div>
        <div className="text-2xl mb-2">Resources</div>
        <div className="flex gap-4">
          {Object.entries(resources).map(([key, value]) => (
            <div key={key} className="p-2  rounded shadow w-[130px]">
              <h2 className="text-lg font-bold capitalize">{key}</h2>
              <div className="flex gap-1">
                <p className="text-4xl">{value}</p>
                <Image
                  src={imageLookup[key]}
                  alt="energy"
                  width={30}
                  height={30}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-2xl mb-2">Variables</div>
        <div className="flex gap-4">
          {Object.entries(variables).map(([key, value]) => (
            <div key={key} className="p-2  rounded shadow w-[130px]">
              <h2 className="text-lg font-bold uppercase">{key}</h2>
              <p className="text-4xl">[{value}]</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RoboRally = () => {
  return (
    <GameProvider>
      <div className="container mx-auto p-4">
        <ControlRoom />
        <CardsBoard />
        <ResourcesDisplay />

        <GameBoard />
      </div>
    </GameProvider>
  );
};

export default RoboRally;
