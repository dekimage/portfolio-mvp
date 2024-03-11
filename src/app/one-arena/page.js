"use client";
import { ModeToggle } from "@/components/ui/themeButton";
import { useState } from "react";

import char1Img from "./assets/char1.png";
import char2Img from "./assets/char2.png";
import char3Img from "./assets/char3.png";
import char4Img from "./assets/char4.png";
import char5Img from "./assets/char5.png";
import char6Img from "./assets/char6.png";
import char7Img from "./assets/char7.png";
import char8Img from "./assets/char8.png";
import char9Img from "./assets/char9.png";
import char10Img from "./assets/char10.png";
import char11Img from "./assets/char11.png";
import char12Img from "./assets/char12.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { current } from "tailwindcss/colors";

const characters = [
  {
    id: 1,
    name: "Aether, Wind Walker",
    image: char1Img,
    abilities: [
      {
        name: "Gust Slash",
        description: "A swift air slash dealing 1 damage to an enemy.",
        cost: [2, "any"],
      },
      {
        name: "Wind Barricade",
        description:
          "Creates a barrier reducing incoming damage by 1 for one turn.",
        cost: ["odd"],
      },
      {
        name: "Cyclone Spear",
        description: "Summons a spear of wind dealing 3 damage to an enemy.",
        cost: [6, "even", 1],
      },
    ],
    hp: 5,
  },
  {
    id: 2,
    name: "Terra, Earth Shaker",
    image: char2Img,
    abilities: [
      {
        name: "Rock Throw",
        description: "Hurls a rock at an enemy, dealing 2 damage.",
        cost: ["even", 3],
      },
      {
        name: "Quake Guard",
        description:
          "Fortifies defense, reducing the next incoming damage by 2.",
        cost: [4, 4],
      },
      {
        name: "Landslide",
        description:
          "Unleashes a massive landslide, dealing 3 damage to an enemy.",
        cost: [5, "odd", 2],
      },
    ],
    hp: 6,
  },
  {
    id: 3,
    name: "Pyra, Flame Caster",
    image: char3Img,
    abilities: [
      {
        name: "Ember Strike",
        description: "Casts a fiery bolt at an enemy, dealing 1 damage.",
        cost: ["any", 1],
      },
      {
        name: "Flame Wall",
        description:
          "Engulfs in flames, dealing 2 damage to anyone who attacks Pyra for one turn.",
        cost: ["even", "odd"],
      },
      {
        name: "Inferno Wrath",
        description:
          "Summons an inferno, dealing 4 damage divided among enemies as Pyra chooses.",
        cost: [6, 6, 3],
      },
    ],
    hp: 4,
  },
  {
    id: 4,
    name: "Hydro, Water Bender",
    image: char4Img,
    abilities: [
      {
        name: "Aqua Shot",
        description: "Shoots a jet of water at an enemy, dealing 1 damage.",
        cost: [2, 2],
      },
      {
        name: "Tidal Shield",
        description:
          "Summons a shield of water, reducing incoming damage by 1 for two turns.",
        cost: ["odd", 5],
      },
      {
        name: "Deluge",
        description:
          "Unleashes a torrent of water, dealing 2 damage to all enemies.",
        cost: [4, 4, "even"],
      },
    ],
    hp: 5,
  },
  {
    id: 5,
    name: "Zephyr, Storm Caller",
    image: char5Img,
    abilities: [
      {
        name: "Lightning Jab",
        description: "Strikes an enemy with lightning, dealing 2 damage.",
        cost: [3, "any"],
      },
      {
        name: "Gale Force Shield",
        description: "Summons a stormy shield, negating the next attack.",
        cost: [1, 5],
      },
      {
        name: "Tempest Fury",
        description:
          "Calls down a fierce storm, dealing 3 damage to two enemies.",
        cost: [6, "odd", 2],
      },
    ],
    hp: 4,
  },
  {
    id: 6,
    name: "Geo, Rock Crusher",
    image: char6Img,
    abilities: [
      {
        name: "Boulder Bash",
        description: "Slams a giant boulder onto an enemy, dealing 2 damage.",
        cost: [3, "even"],
      },
      {
        name: "Stone Skin",
        description:
          "Geo's skin turns to stone, reducing damage taken by 2 for the next turn.",
        cost: ["odd", 4],
      },
      {
        name: "Earthquake",
        description:
          "Causes a mighty earthquake, dealing 1 damage to all enemies and stunning them for a turn.",
        cost: [5, 5, 1],
      },
    ],
    hp: 7,
  },
  {
    id: 7,
    name: "Ignis, Fire Forger",
    image: char7Img,
    abilities: [
      {
        name: "Flame Flick",
        description: "Throws a small fireball, dealing 1 damage to an enemy.",
        cost: [2, 2],
      },
      {
        name: "Blaze Armor",
        description:
          "Engulfs in protective flames, dealing 1 retaliatory damage for two turns.",
        cost: [4, "odd"],
      },
      {
        name: "Volcano",
        description:
          "Summons a volcano under the enemy team, dealing 3 damage to two random enemies.",
        cost: [6, 3, 3],
      },
    ],
    hp: 5,
  },
  {
    id: 8,
    name: "Aqua, Water Weaver",
    image: char8Img,
    abilities: [
      {
        name: "Stream Slice",
        description: "Cuts an enemy with a blade of water, dealing 1 damage.",
        cost: [1, "any"],
      },
      {
        name: "Healing Rain",
        description: "Calls down rain to heal an ally or self by 2 HP.",
        cost: ["even", 4],
      },
      {
        name: "Flood",
        description:
          "Floods the battlefield, dealing 2 damage to all enemies and healing allies by 1.",
        cost: [5, 5, "even"],
      },
    ],
    hp: 4,
  },
  {
    id: 9,
    name: "Volt, Lightning Striker",
    image: char9Img,
    abilities: [
      {
        name: "Spark Shock",
        description: "Zaps an enemy with electricity, dealing 2 damage.",
        cost: [3, "odd"],
      },
      {
        name: "Static Field",
        description:
          "Creates a field that stuns the next enemy who attacks Volt.",
        cost: [4, 2],
      },
      {
        name: "Thunderstorm",
        description:
          "Summons a thunderstorm to strike all enemies, dealing 3 damage.",
        cost: [6, 6, "even"],
      },
    ],
    hp: 5,
  },
  {
    id: 10,
    name: "Terra II, Earth Shaker",
    image: char10Img,
    abilities: [
      {
        name: "Mud Slide",
        description: "Causes a mudslide to slow and deal 1 damage to an enemy.",
        cost: ["odd", 2],
      },
      {
        name: "Granite Grasp",
        description: "Grasps an enemy in stone, stunning them for one turn.",
        cost: [4, 4],
      },
      {
        name: "Fissure",
        description:
          "Opens a fissure under the enemy team, dealing 2 damage to each.",
        cost: [5, 3, "odd"],
      },
    ],
    hp: 6,
  },
  {
    id: 11,
    name: "Lumina, Light Guardian",
    image: char11Img,
    abilities: [
      {
        name: "Radiant Beam",
        description:
          "Emits a beam of light, dealing 1 damage to an enemy and illuminating them for a turn (illuminated enemies take double damage next turn).",
        cost: [2, 4],
      },
      {
        name: "Blinding Flash",
        description:
          "Blinds all enemies, reducing their accuracy and causing them to miss their next attack.",
        cost: ["odd", "odd"],
      },
      {
        name: "Solar Flare",
        description:
          "Unleashes a devastating solar flare, dealing 3 damage to all enemies.",
        cost: [6, 5, "even"],
      },
    ],
    hp: 4,
  },
  {
    id: 12,
    name: "Nox, Shadow Enchanter",
    image: char12Img,
    abilities: [
      {
        name: "Shadow Pierce",
        description:
          "Sends a piercing shadow through an enemy, dealing 1 damage and ignoring armor.",
        cost: [3, 1],
      },
      {
        name: "Nightfall",
        description:
          "Engulfs the enemy in darkness, stunning them for one turn.",
        cost: ["even", 4],
      },
      {
        name: "Eclipse",
        description:
          "Casts an eclipse over the battlefield, dealing 2 damage to all enemies and healing Nox by 1.",
        cost: [5, "odd", 2],
      },
    ],
    hp: 5,
  },
];

const DiceSlot = ({ value }) => {
  const DiceFace = ({ number }) => {
    // Mapping from number to pip positions
    const layout = {
      1: ["center"],
      2: ["top-left", "bottom-right"],
      3: ["top-left", "center", "bottom-right"],
      4: ["top-left", "top-right", "bottom-left", "bottom-right"],
      5: ["top-left", "top-right", "center", "bottom-left", "bottom-right"],
      6: [
        "top-left",
        "top-right",
        "middle-left",
        "middle-right",
        "bottom-left",
        "bottom-right",
      ],
    };

    return (
      <div className="w-full h-full flex flex-wrap content-between justify-between p-1">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className={`w-1/3 h-1/3 flex justify-center items-center`}
          >
            {/* Render pip if position is included in the layout for this number */}
            {layout[number]?.includes(getPosition(index + 1)) && (
              <span className="w-2 h-2 bg-black rounded-full"></span>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Helper function to map index to dice position
  const getPosition = (index) => {
    const positions = {
      1: "top-left",
      2: "top-center",
      3: "top-right",
      4: "middle-left",
      5: "center",
      6: "middle-right",
      7: "bottom-left",
      8: "bottom-center",
      9: "bottom-right",
    };
    return positions[index];
  };

  let content;
  if (value === "any") {
    content = <span className="text-xs">X</span>;
  } else if (value === "odd") {
    content = <span className="text-xs">Odd</span>;
  } else if (typeof value === "number" && value >= 1 && value <= 6) {
    content = <DiceFace number={value} />;
  } else {
    content = <span className="text-xs">{value}</span>; // Directly use the value
  }

  return (
    <div className="inline-flex justify-center items-center w-16 h-16 border border-gray-400 rounded-md font-semibold text-gray-700 mr-1">
      {content}
    </div>
  );
};

const PrintableCharactersLayout = ({
  playerOnePicks,
  playerTwoPicks,
  characters,
}) => {
  // Function to get the full character details based on picked IDs
  const getCharacterDetails = (ids) =>
    ids.map((id) => characters.find((character) => character.id === id));

  const playerOneCharacters = getCharacterDetails(playerOnePicks);
  const playerTwoCharacters = getCharacterDetails(playerTwoPicks);

  return (
    <div className="">
      <div className="flex flex-col h-full">
        {/* Player One's Characters (Top Half) */}
        <div className="flex  items-center justify-center h-1/2  transform rotate-180">
          {playerOneCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>

        {/* Player Two's Characters (Bottom Half, Reversed) */}
        <div className="flex items-center justify-center h-1/2">
          {playerTwoCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CharacterCard = ({ character }) => {
  return (
    <Card className="w-[335px] h-[650px] p-4">
      <div className="flex gap-3">
        <Image
          width={100}
          height={100}
          src={character.image}
          alt={character.name}
          className="cursor-pointer"
        />
        <div className="flex flex-col">
          <div className="font-bold text-xl mb-2">{character.name}</div>
          <div className="flex">
            {Array.from({ length: character.hp }).map((_, index) => (
              <div key={index}>❤️</div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4">
        {character?.abilities?.map((ability, index) => (
          <div key={index} className="mb-4">
            <div className="font-semibold">{ability.name}</div>
            <div className="text-gray-700 text-base mb-2">
              {ability.description}
            </div>
            <div className="flex">
              {ability.cost.map((cost, index) => (
                <DiceSlot key={index} value={cost} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const CharactersGrid = ({
  playerOnePicks,
  playerTwoPicks,
  setPlayerOnePicks,
  setPlayerTwoPicks,
  setIsPrintView,
}) => {
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const [selectedHero, setSelectedHero] = useState(characters[0]);

  const addOrRemoveCharacter = (character) => {
    const heroId = character.id;

    if (currentPlayer === 1) {
      setPlayerOnePicks((prevSelectedHeroes) => {
        if (prevSelectedHeroes.includes(heroId)) {
          return prevSelectedHeroes.filter((id) => id !== heroId);
        } else {
          return [...prevSelectedHeroes, heroId];
        }
      });
    } else {
      setPlayerTwoPicks((prevSelectedHeroes) => {
        if (prevSelectedHeroes.includes(heroId)) {
          return prevSelectedHeroes.filter((id) => id !== heroId);
        } else {
          return [...prevSelectedHeroes, heroId];
        }
      });
    }
    setCurrentPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));
    const calculatedHero = characters.find((c) =>
      c.id !== heroId && currentPlayer == 1
        ? !playerOnePicks.includes(c.id)
        : !playerTwoPicks.includes(c.id)
    );
    setSelectedHero(calculatedHero);
  };

  const isHeroAlreadyPicked =
    (currentPlayer === 1 && playerOnePicks.includes(selectedHero?.id)) ||
    (currentPlayer === 2 && playerTwoPicks.includes(selectedHero?.id));

  const isHeroBoardFull =
    (currentPlayer === 1 && playerOnePicks.length === 3) ||
    (currentPlayer === 2 && playerTwoPicks.length === 3);

  const showLockInButton =
    selectedHero && !isHeroAlreadyPicked && !isHeroBoardFull;

  return (
    <div className="w-full h-full flex-col p-4">
      <div className="flex gap-6">
        <div className="grid grid-cols-3 w-fit h-fit flex gap-1">
          {characters.map((character) => {
            const isHeroPicked =
              (currentPlayer === 1 && playerOnePicks.includes(character.id)) ||
              (currentPlayer === 2 && playerTwoPicks.includes(character.id));
            return (
              <div
                key={character.id}
                className={`relative w-32 h-32 border cursor-pointer bg-black`}
                onClick={() => setSelectedHero(character)}
              >
                {/* Image as background with lower opacity when selected */}
                <div
                  className={`absolute inset-0 ${
                    selectedHero === character ? "opacity-80" : "opacity-100"
                  }`}
                >
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={character.image}
                    alt={character.name}
                    className="cursor-pointer"
                  />
                </div>

                {isHeroPicked && (
                  <div className="absolute z-10000 top-[1px] right-[1px] text-2xl">
                    ✅
                  </div>
                )}

                {/* Selection Indicator Overlay */}
                {selectedHero == character && (
                  <div className="absolute z-1000 w-[126px] h-[126px]">
                    <div className="flex justify-between w-full h-full">
                      <div className="flex flex-col justify-between h-full">
                        <div className="w-4 h-4 border-t-4 border-l-4 border-red-500"></div>
                        <div className="w-4 h-4 border-b-4 border-l-4 border-red-500"></div>
                      </div>
                      <div className="flex flex-col justify-between h-full">
                        <div className="w-4 h-4 border-t-4 border-r-4 border-red-500"></div>
                        <div className="w-4 h-4 border-b-4 border-r-4 border-red-500"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div>
          <CharacterCard character={selectedHero || characters[0]} />

          {showLockInButton && (
            <Button
              className="w-full mt-2 bg-green-500 hover:bg-green-700"
              onClick={() => addOrRemoveCharacter(selectedHero)}
            >
              Lock In
            </Button>
          )}

          {isHeroAlreadyPicked && (
            <Button
              className="w-full mt-2 bg-red-500 hover:bg-red-700"
              onClick={() => addOrRemoveCharacter(selectedHero)}
            >
              Remove Hero
            </Button>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <Card
          className="flex flex-col gap-2 p-2 w-[40%]"
          style={currentPlayer == 1 ? { border: "3px solid orange" } : {}}
        >
          <div className="text-2xl font-bold">
            Player 1 {currentPlayer == 1 && "(Your Turn!)"}
          </div>
          <div>Team:</div>
          <div className="flex gap-2">
            {playerOnePicks.map((heroId, i) => (
              <div className="flex gap-3" key={i}>
                <Image
                  width={100}
                  height={100}
                  src={characters.find((c) => c.id == heroId).image}
                  alt={"hero"}
                  className="cursor-pointer"
                />
              </div>
            ))}
          </div>
        </Card>

        <Card
          className="flex flex-col gap-2 p-2 w-[40%]"
          style={currentPlayer == 2 ? { border: "3px solid orange" } : {}}
        >
          <div className="text-2xl font-bold">
            Player 2 {currentPlayer == 2 && "(Your Turn!)"}
          </div>
          <div>Team:</div>
          <div className="flex gap-2">
            {playerTwoPicks.map((heroId, i) => (
              <div className="flex gap-3" key={i}>
                <Image
                  width={100}
                  height={100}
                  src={characters.find((c) => c.id == heroId).image}
                  alt={"hero"}
                  className="cursor-pointer"
                />
              </div>
            ))}
          </div>
        </Card>
        <Button onClick={setIsPrintView}>Print & Play</Button>
      </div>
    </div>
  );
};

const OneArenaPage = () => {
  const [playerOnePicks, setPlayerOnePicks] = useState([]);
  const [playerTwoPicks, setPlayerTwoPicks] = useState([]);
  const [isPrintView, setIsPrintView] = useState(false);
  return (
    <div className="">
      <div className="flex">
        {!isPrintView && (
          <CharactersGrid
            playerOnePicks={playerOnePicks}
            playerTwoPicks={playerTwoPicks}
            setPlayerOnePicks={setPlayerOnePicks}
            setPlayerTwoPicks={setPlayerTwoPicks}
            setIsPrintView={setIsPrintView}
          />
        )}

        {isPrintView && (
          <PrintableCharactersLayout
            playerOnePicks={playerOnePicks}
            playerTwoPicks={playerTwoPicks}
            characters={characters}
          />
        )}
      </div>
    </div>
  );
};
export default OneArenaPage;
