"use client";
import { observer } from "mobx-react";
import { gameStore } from "./Store";

import Image from "next/image";
import titleImg from "./assets/title.png";

import GameStarted from "./components/GameStarted";
import GameSetup from "./components/GameSetup";

const backgroundImg =
  "https://media.discordapp.net/attachments/1151710646296137809/1187353425013387264/tonibg__background_cover_horizontal_wallpaper_of_repeated_stard_73574c7f-89d9-47e3-a668-5fed68db995e.png?ex=6596940c&is=65841f0c&hm=f352d06e9c923408810b77c9fef6af4bd231399ddf8e157542f0b6763d57f6ab&=&format=webp&quality=lossless&width=1440&height=484";

const WisdomExplorersApp = observer(() => {
  const { isGameStarted } = gameStore;
  return (
    <div>
      <HeroSection bgImg={backgroundImg} logo={titleImg} />
      {isGameStarted ? <GameStarted /> : <GameSetup />}
    </div>
  );
});

const HeroSection = ({ logo, bgImg }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        height: "200px",
        backgroundPosition: "center",
      }}
      className="flex justify-center items-center"
    >
      <Image src={logo} alt="title" width={200} height={200} />
    </div>
  );
};

export default WisdomExplorersApp;
