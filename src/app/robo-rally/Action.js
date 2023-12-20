import React from "react";
import { useGame } from "./GameContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import energyIcon from "./assets/energy.png";

const Action = ({ action, actionAvailable, onActionTaken }) => {
  const { resources, actions } = useGame();

  const handleActivate = () => {
    if (actionAvailable && resources.energy >= action.cost) {
      actions[action.func](1, action.cost); // Perform the action
      onActionTaken(); // Notify the GameBoard that an action was taken
    }
  };

  return (
    <div className="flex gap-4 flex-col p-4  rounded shadow w-[200px] relative">
      {/* <div className="absolute top-[-15px] left-[-15px] flex text-xl bg-gray-200 rounded p-1">
        {action.cost}
        <Image src={energyIcon} alt="energy" width={20} height={20} />
      </div> */}
      <p className="text-lg">{action.name}</p>

      <p className="text-sm">{action.effect}</p>
      <Button
        onClick={handleActivate}
        className={`px-4 py-2 rounded ${
          actionAvailable ? "bg-green-500" : "bg-gray-500"
        }`}
        disabled={!actionAvailable || resources.energy < action.cost}
      >
        <div className=" flex text-xl  rounded p-1">
          {action.cost}
          <Image src={energyIcon} alt="energy" width={20} height={20} />
        </div>
      </Button>
    </div>
  );
};

export default Action;
