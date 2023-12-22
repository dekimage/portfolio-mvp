import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { gameStore } from "../Store"; // Adjust the path as needed

const PlayerCard = observer(({ playerNumber }) => {
  const [playerName, setPlayerName] = useState("");
  const [playerColor, setPlayerColor] = useState("");
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [editing, setEditing] = useState(false);

  const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

  useEffect(() => {
    if (editing) {
      const player = gameStore.players.find((p) => p.number === playerNumber);
      if (player) {
        setPlayerName(player.name);
        setPlayerColor(player.color);
      }
    }
  }, [editing, playerNumber]);

  const savePlayer = () => {
    if (playerName.trim() && playerColor) {
      gameStore.addOrUpdatePlayer({
        name: playerName,
        color: playerColor,
        number: playerNumber,
        vp: 0,
      });
      setIsPlayerReady(true);
      setEditing(false);
    }
  };

  return (
    <div className="card bg-white shadow-lg rounded-lg p-4 h-52">
      <div className="font-bold text-lg mb-2">{`Player ${playerNumber}`}</div>
      {!isPlayerReady || editing ? (
        <>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter player's name"
            className="border rounded p-2 mb-2 w-full"
          />

          <div className="flex space-x-2 my-4">
            {colors.map((color) =>
              gameStore.isColorAvailable(color) || color === playerColor ? (
                <div
                  key={color}
                  onClick={() => setPlayerColor(color)}
                  className={`w-6 h-6 rounded-full cursor-pointer ${
                    color === playerColor
                      ? "ring-2 ring-offset-2 ring-black"
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                />
              ) : null
            )}
          </div>

          <button
            onClick={savePlayer}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="text-green-500 mb-2">Player Ready!</div>
          <div className="flex gap-2 items-center">
            <div className="text-2xl">{playerName}</div>
            <div
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: playerColor }}
            />
          </div>

          <button
            onClick={() => setEditing(true)}
            className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-600 mt-2"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
});

export default PlayerCard;
