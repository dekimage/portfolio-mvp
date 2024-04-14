"use client";
import Image from "next/image";
import arrowImg from "./assets/arrow-down.png";
import exitImg from "./assets/exit.png";
import emailImg from "./assets/email.png";
import vipImg from "./assets/vip.png";
import denoImg from "./assets/deno.png";
import penoImg from "./assets/predrag.png";
import toniImg from "./assets/toni.png";
import pirateHatImg from "./assets/piratehat.png";
import kickstarterImg from "./assets/kickstarter.png";
import messengerImg from "./assets/messanger.png";
import ecoImg from "./assets/eco.png";
import veganImg from "./assets/vegan.png";
import sugarImg from "./assets/sugar.png";
import pipeImg from "./assets/pipe.png";
import winconImg from "./assets/wincon.png";

import handsImg from "./assets/hands.png";
import handsFullImg from "./assets/handsFull.png";

import attackCommandImg from "./assets/attackComand.png";
import recruitCommandImg from "./assets/recruitComand.png";
import exploreCommandImg from "./assets/exploreComand.png";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CountdownTimer from "./CountdownTimer";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const timeLeft = Date.now() + 1000 * 60 * 60 * 24 * 12;
const fakeTimeLeft = Date.now() + 1000 * 4 * 60;

const VideoSection = () => {
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/kAkRKuv5Rts?start=1"
        title="YouTube video player"
        frameBorder="0" // React uses camelCase for attribute names, so 'frameborder' should be 'frameBorder'
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen // In React, 'allowfullscreen' should be 'allowFullScreen'
      ></iframe>
    </div>
  );
};

const LaunchingInTopTimer = () => {
  return (
    <div className="bg-yellow-400 flex justify-center w-full text-black">
      <h2>
        Launching in
        <CountdownTimer timeLeft={timeLeft} />
        ...
      </h2>
    </div>
  );
};

const SingleCta = () => {
  return (
    <div className="flex flex-col border p-4 w-[300px] items-center">
      <div className="h-[500px] flex flex-col  items-center">
        <div className="text-2xl font-bold">FREE TIER</div>
        <div>(Sad ☹️)</div>
        <div className="text-xl mt-4">OPTION 1:</div>
        <div className="mb-4">
          I don`t think this is a cool game. I am sorry but bye
        </div>
        <Image
          className="mb-4"
          src={arrowImg}
          width={50}
          height={50}
          alt="arrow down"
        />
        <div className="flex items-center text-xl gap-2 mb-4">
          Exit Page. We will cry a little bit but have a great day!{" "}
          <Image src={exitImg} width={35} height={35} alt="exit" />
        </div>
        <div className="mt-[72px]">
          Starting at: <span className="line-through text-gray-400">FREE</span>{" "}
          <span className="text-2xl font-bold">$0</span>
        </div>
        <Button className="w-full mt-2 bg-red-400 hover:bg-red-600">
          Exit Page
        </Button>
        <div className="text-gray-400 mt-2">(Ctrl/Cmd + W) shortcut</div>
      </div>

      <div className="flex flex-col items-center mt-4 border-t pt-2">
        <div className="text-lg font-bold">Pros & Cons</div>
        <div>✔️ Save time now by leaving this page early</div>
        <div>❌ Miss out on the best game of the year</div>
      </div>
    </div>
  );
};

const SingleCta2 = () => {
  return (
    <div className="flex flex-col border p-4 w-[300px] items-center">
      <div className="h-[500px] flex flex-col  items-center">
        <div className="text-2xl font-bold">FREE TIER</div>
        <div>(Happy 😀)</div>
        <div className="text-xl mt-4">OPTION 2:</div>
        <div className="mb-4">
          Your game looks promising, but I am not sure if I want to back it
        </div>
        <Image
          className="mb-4"
          src={arrowImg}
          width={50}
          height={50}
          alt="arrow down"
        />

        <div className="flex items-center text-xl gap-2 mb-4">
          Notify me when you launch, and I`ll think about it
          <Image src={emailImg} width={35} height={35} alt="exit" />
        </div>
        <Input className="w-full mt-2" placeholder="Enter your email" />
        <div>
          Only Today at:{" "}
          <span className="line-through text-gray-400">$499</span>{" "}
          <span className="text-2xl font-bold">$0</span>
        </div>

        <Button className="w-full mt-2 bg-yellow-400 hover:bg-yellow-600">
          I`m in, take my email
        </Button>
        <div className="text-gray-400 mt-2">Join 794 fellow pirates</div>
      </div>

      <div className="flex flex-col items-center mt-4 border-t pt-2">
        <div className="text-lg font-bold">Pros & Cons</div>
        <div>✔️ Get Early Bird Discount $5 OFF </div>
        <div>❌ We will try to sell you the VIP offer</div>
      </div>
    </div>
  );
};

const SingleCta3 = () => {
  return (
    <div className="flex flex-col border p-4 w-[300px] items-center relative">
      <Image
        src={veganImg}
        width={100}
        height={100}
        alt="vegan"
        className="absolute top-[-5px] right-[-5px]"
      />
      <div className="h-[500px] flex flex-col  items-center">
        <div className="text-2xl font-bold">VIP TIER</div>
        <div>(Very Happy 🦜)</div>
        <div className="text-xl mt-4">OPTION 3:</div>
        <div className="mb-4">
          You are not a true pirate and want to give your money to us
        </div>

        <Image
          className="mb-4"
          src={arrowImg}
          width={50}
          height={50}
          alt="arrow down"
        />

        <div className="flex items-center text-xl gap-2 mb-4">
          {/* Reserve my spot for $1 to unlock VIP rewards */}
          I am sure I want to back this game. Take my money!
          <Image src={vipImg} width={35} height={35} alt="exit" />
        </div>
        <div className="mt-[48px]">
          Pumped Price <span className="line-through text-gray-400">FREE</span>{" "}
          <span className="text-2xl font-bold">$1</span>
        </div>

        <Link href="/landing-page/checkout">
          <Button className="w-full mt-2 bg-green-400 hover:bg-green-600">
            Reserve VIP $1 (Checkout)
          </Button>
        </Link>
        <div className="text-gray-400 mt-2">Join 129 fellow rich pirates</div>
      </div>
      {/* <div className="flex gap-1">
        <Image src={ecoImg} width={75} height={75} alt="eco friendly" />
        <Image src={veganImg} width={100} height={100} alt="vegan" />
        <Image src={sugarImg} width={75} height={75} alt="sugar free" />
      </div> */}
      <div className="flex flex-col items-center mt-4 border-t pt-2">
        <div className="text-lg font-bold">Pros & Cons</div>
        <div>✔️ Get Early Bird Discount $5 OFF</div>
        <div>✔️ Get 2 Exclusive Cards (not available for other backers)</div>
        <div>✔️ Access to the VIP Facebook Group</div>
      </div>
    </div>
  );
};

const CallToActionSection = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-4xl">SO... NOW YOU HAVE 3 OPTIONS:</div>
      <CountdownTimer timeLeft={fakeTimeLeft} onlyNumbers />
      <div>
        Quick! You are running out of time!
        <div className="text-gray-400 w-[400px]">
          (The countdown increases conversion rates by 21% by evoking fear of
          missing out in your mind. But don`t worry! It&apos;s a fake one of
          course... or is it??)
        </div>
      </div>
      <div className="flex">
        <SingleCta />
        <SingleCta2 />
        <SingleCta3 />
      </div>
    </div>
  );
};

const team = [
  {
    name: "Toni Manolov",
    role: "Product Design & Operations",
    img: toniImg,
  },
  {
    name: "Dejan Gavrilovic",
    role: "Game Designer",
    img: denoImg,
  },
  {
    name: "Predrag Gavrilovic",
    role: "Illustrator & Graphic Designer",
    img: penoImg,
  },
];

const Person = ({ name, role, img }) => {
  return (
    <Card className="p-2 rounded-lg flex flex-col items-center gap-4 w-[250px]">
      <div className="relative">
        <Image
          src={img}
          alt="deno"
          width={150}
          height={150}
          className="rounded-full"
        />
        <div className="absolute top-[-30px] right-[18px]">
          <Image src={pirateHatImg} alt="deno" width={100} height={100} />
        </div>
        <Image
          src={pipeImg}
          alt="deno"
          width={100}
          height={100}
          className="absolute top-[58px] left-[-20px]"
        />
      </div>

      <div className="text-2xl">{name}</div>
      <div>{role}</div>
    </Card>
  );
};

const TeamSection = () => {
  return (
    <div className="flex flex-col items-center gap-4 mt-24">
      <div className="text-4xl mb-8">MEET THE TEAM</div>
      <div className="flex gap-4">
        {team.map((person) => (
          <Person key={person.name} {...person} />
        ))}
      </div>
      <div className="text-2xl">Got questions?</div>
      <div>Chat with us on Facebook</div>
      <a
        href="https://www.facebook.com/dejan.gavrilovic.73"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-class"
      >
        <Button className="flex gap-1">
          Message us
          <Image src={messengerImg} alt="messenger" width={25} height={25} />
        </Button>
      </a>
      <div className="text-gray-400">
        We usually don`t reply at all, but who knows, you might be lucky.
      </div>
    </div>
  );
};

const HowItWorksSection = () => {
  return (
    <div className="flex flex-col items-center gap-4 bg-gray-900 w-full py-4">
      <div className="text-4xl">HOW IT WORKS</div>
      <div className="flex flex-col items-center gap-4 text-2xl">
        <div>YOU HAVE 3 ACTIONS TO CHOOSE FROM:</div>
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <Image src={attackCommandImg} alt="eco" width={200} height={200} />
            <div className=" bg-gray-500 text-white px-4 font-bold rounded flex justify-center mt-2 w-fit bg-red-500">
              Attack
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Image src={recruitCommandImg} alt="eco" width={200} height={200} />
            <div className=" bg-gray-500 text-white px-4 font-bold rounded flex justify-center mt-2 w-fit bg-green-500">
              Recruit
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Image src={exploreCommandImg} alt="eco" width={200} height={200} />
            <div className=" bg-gray-500 text-white px-4 font-bold rounded flex justify-center mt-2 w-fit bg-yellow-500">
              Explore
            </div>
          </div>
        </div>

        <div className="mt-8">
          EACH ROUND, ALL PLAYERS CHOOSE 1 ACTION SECRETLY AT THE SAME TIME.
        </div>

        <Image src={handsImg} alt="hands" width={350} height={350} />

        <div>
          ON 3, 2, 1... YOU ALL REVEAL THEM AND SEE WHAT EACH OF YOU WILL DO.
        </div>

        <div>FOR EXAMPLE: </div>
        <Image src={handsFullImg} alt="hands" width={350} height={350} />
        <div className="text-lg">
          3 <span className="text-green-500">RECRUIT</span> AND 1{" "}
          <span className="text-yellow-500">EXPLORE</span>
        </div>
        <div>NOW EACH PLAYER WILL DO THEIR SELECTED ACTION</div>
        <div>HOWEVER...</div>
        <div>THE PLAYER WHO IS ALONE ON A LOCATION ACTION GETS MORE STUFF</div>
        <div>img with solo/sharing</div>
        <div>SO YOU NEED TO PREDICT YOUR OPPONNENT`S MOVES TO GET AHEAD</div>

        <div>You WIN when you capture the 3rd Boss Card.</div>
        <Image src={winconImg} alt="hands" width={350} height={350} />
        <div>To do that, you`ll need to collect Swords</div>

        <div>Which you can get from </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 mb-40">
      {/* <LaunchingInTopTimer /> */}
      <div className="text-4xl font-bold flex flex-col items-center pt-[48px]">
        PIRATE`S DECEPTION BOARD GAME
        <div className="text-xl my-2">COMING SOON ON</div>
        <Image src={kickstarterImg} alt="ks" width={300} height={100} />
        <div className="mt-4"></div>
        <CountdownTimer timeLeft={timeLeft} />
      </div>
      <VideoSection />

      <HowItWorksSection />
      <CallToActionSection />
      <TeamSection />
    </div>
  );
};

export default LandingPage;
