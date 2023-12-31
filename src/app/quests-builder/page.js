"use client";
import React, { useState, useEffect, useRef } from "react";
import questsLogo from "./assets/gamified-quests-logo.png";
import {
  FaArrowLeft,
  FaCog,
  FaPlay,
  FaPause,
  FaRedo,
  FaStar,
} from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

import { MdClose } from "react-icons/md";
import HeroSection from "../reusable-ui/HeroSection";

import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineMusicNote, MdOutlineMusicOff } from "react-icons/md";
import Link from "next/link";
import { EmojiBox } from "./new-pathway/page";

const backgroundCover =
  "https://cdn.midjourney.com/e9023bf4-7612-40dc-b88f-2e86b490ea66/0_0.png";

// import HeroSection from "../reusable-ui/HeroSection";
// import habitsLogo from "./assets/habits-logo.png";

const pathways = [
  {
    name: "Morning Reflection",
    description: "A simple process to help you focus on what matters most.",
    duration: "10 min",
    time: "Morning",
    emoji: "📜",
    autoPlayMusic: true,
    background: backgroundCover,
    steps: [
      {
        question: "What's your main goal for today?",
        context:
          "Think about your goals for the day. Try to write down at least 1 that is very important for you, and if you don't do it that you will feel bad.",
        timer: 120,
        currentStep: 1,
        buttonText: "Next",
        minText: 50,
        inputType: "text",
        allowSkip: true,
        autoplay: true,
      },
      {
        question: "List three tasks you want to accomplish.",
        timer: 180,
        currentStep: 2,
        buttonText: "Next",
        minText: 50,
        inputType: "text",
        allowSkip: true,
        autoplay: true,
      },
      {
        question: "What's your motivational quote for the day?",
        timer: 90,
        currentStep: 3,
        buttonText: "Complete",
        minText: 30,
        inputType: "text",
        allowSkip: true,
        autoplay: true,
      },
    ],
  },
  {
    name: "Evening Reflection",
    description: "A simple process to help you focus on what matters most.",
    duration: "10 min",
    time: "Morning",
    emoji: "🧘",
    background: backgroundCover,
    steps: [
      {
        question: "What was the highlight of your day?",
        timer: 120,
        currentStep: 1,
        buttonText: "Next",
        minText: 50,
        inputType: "text",
        allowSkip: true,
        autoplay: true,
      },
      {
        question:
          "Did you face any challenges today? How did you overcome them?",
        context:
          "Try to identify some problems with that, brainstorm at least 5 options!",
        timer: 180,
        currentStep: 2,
        buttonText: "Next",
        minText: 50,
        inputType: "text",
        allowSkip: true,
        autoplay: true,
      },
      {
        question: "What are you grateful for today?",
        timer: 90,
        currentStep: 3,
        buttonText: "Complete",
        minText: 30,
        inputType: "text",
        autoplay: true,
      },
    ],
  },
  {
    name: "Find your Most Important Tasks",
    description: "A simple process to help you focus on what matters most.",
    duration: "10 min",
    time: "Morning",
    emoji: "📖",
    autoPlayMusic: true,
    background: backgroundCover,
    steps: [
      {
        question: "What new thing did you learn today?",
        timer: 120,
        currentStep: 1,
        buttonText: "Next",
        minText: 50,
        inputType: "text",
        allowSkip: true,
        autoplay: true,
      },
      {
        question:
          "Reflect on how you applied yesterday's learning in today's activities.",
        timer: 150,
        currentStep: 2,
        buttonText: "Next",
        minText: 50,
        inputType: "text",
        autoplay: false,
      },
      {
        question: "Set a small goal for personal improvement for tomorrow.",
        timer: 120,
        currentStep: 3,
        buttonText: "Complete",
        minText: 30,
        inputType: "text",
        allowSkip: true,
        autoplay: false,
      },
    ],
  },
];

const ResponseItem = ({ response, index }) => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <div className="flex flex-col bg-gray-100 mb-2 p-2 rounded-lg w-full">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          Step {index + 1}:{" "}
          {response.skipped ? (
            <div className="text-yellow-400">Skipped</div>
          ) : (
            <div className="text-green-500">Answered</div>
          )}
        </span>
        <span className="text-sm text-gray-500">
          {response.timeSpent} seconds
        </span>

        {response.skipped ? (
          <div className="w-[60px]"></div>
        ) : (
          <button
            className="py-2 px-4 bg-gray-400 text-white rounded hover:bg-gray-500 text-sm"
            onClick={() => setIsShowing(!isShowing)}
          >
            {isShowing ? "Hide" : "View"}
          </button>
        )}
      </div>
      {isShowing && (
        <div className="rounded-lg mt-2 p-4 bg-gray-200">{response.input}</div>
      )}
    </div>
  );
};

const PathwayPlayerHeader = ({
  pathway,
  isMusicPlaying,
  handlePreviousStep,
  setIsMusicPlaying,
  onClose,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <button
        className=" rounded-full hover:bg-gray-100"
        onClick={handlePreviousStep}
      >
        <IoIosArrowBack size={20} className="text-slate-600" />
      </button>
      <div>
        {pathway.emoji} {pathway.name}
      </div>
      <div>
        <button
          className="mr-2 rounded-full hover:bg-gray-100"
          onClick={() => setIsMusicPlaying(!isMusicPlaying)}
        >
          {isMusicPlaying ? (
            <MdOutlineMusicOff size={20} className="text-slate-600" />
          ) : (
            <MdOutlineMusicNote size={20} className="text-slate-600" />
          )}
        </button>

        <button className="mr-2 rounded-full hover:bg-gray-100">
          <HiOutlineCog6Tooth size={20} className="text-slate-600" />
        </button>
        <button className="rounded-full hover:bg-gray-100" onClick={onClose}>
          <MdClose size={20} className="text-slate-600" />
        </button>
      </div>
    </div>
  );
};

const ProgressBar = ({ currentStep, pathway }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex-1 mr-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-slate-500 h-2.5 rounded-full"
            style={{
              width: `${(currentStep / pathway.steps.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
      <span className="text-sm font-medium text-gray-700">
        {currentStep + 1}/{pathway.steps.length}
      </span>
    </div>
  );
};

const Timer = ({ timer, restartTimer, isPlaying, setIsPlaying }) => {
  return (
    <div className="mb-4 flex items-center justify-between bg-gray-50 p-2 rounded-lg">
      <div className="flex items-center">
        {isPlaying ? (
          <button
            className="text-slate-600 hover:text-slate-800 mr-2"
            onClick={() => setIsPlaying(false)}
          >
            <FaPause size={12} />
          </button>
        ) : (
          <button
            className="text-slate-600 hover:text-slate-800 mr-2"
            onClick={() => setIsPlaying(true)}
          >
            <FaPlay size={12} />
          </button>
        )}
      </div>

      <div className="text-lg font-semibold text-slate-600">
        {Math.floor(timer / 60)}:
        {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
      </div>
      <button
        className="text-slate-600 hover:text-slate-800"
        onClick={() => restartTimer()}
      >
        <FaRedo size={12} />
      </button>
    </div>
  );
};

const PathwayPlayer = ({ pathway, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const step = pathway.steps[currentStep];
  const [timer, setTimer] = useState(step.timer);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(step.autoplay);
  const [userInput, setUserInput] = useState("");
  const [responses, setResponses] = useState([]);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(pathway.autoPlayMusic);

  const audioRef = useRef(null);

  useEffect(() => {
    const audioElement = audioRef.current;

    const playAudio = async () => {
      if (!audioElement) return;

      try {
        await audioElement.play();
      } catch (error) {
        console.error("Error attempting to play audio:", error);
      }
    };

    const pauseAudio = () => {
      if (!audioElement || audioElement.paused) return;

      audioElement.pause();
    };

    if (isMusicPlaying) {
      playAudio();
    } else {
      pauseAudio();
    }
  }, [isMusicPlaying]);

  useEffect(() => {
    if (isMusicPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isMusicPlaying]);

  useEffect(() => {
    let interval = null;
    let totalDurationInterval = null;

    if (!sessionComplete) {
      totalDurationInterval = setInterval(() => {
        setTotalDuration((prevDuration) => prevDuration + 1);
      }, 1000);
    }

    if (isPlaying && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (!isPlaying && timer !== 0) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
      clearInterval(totalDurationInterval);
    };
  }, [isPlaying, timer, sessionComplete]);

  const handleNextStep = () => {
    const newResponses = [
      ...responses,
      { input: userInput, timeSpent: step.timer - timer },
    ];
    setResponses(newResponses);

    if (currentStep < pathway.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setTimer(pathway.steps[currentStep + 1].timer);
      setUserInput("");
    } else {
      setSessionComplete(true);
    }
  };

  const handleSkipStep = () => {
    const newResponses = [
      ...responses,
      { input: "", timeSpent: 0, skipped: true },
    ];
    setResponses(newResponses);

    if (currentStep < pathway.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setTimer(pathway.steps[currentStep + 1].timer);
    } else {
      setSessionComplete(true);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setTimer(pathway.steps[currentStep - 1].timer);
    } else {
      onClose();
    }
  };

  const restartTimer = () => {
    setTimer(step.timer);
  };

  const canProceed = true;
  // timer === 0 && userInput.length >= step.minText;

  if (sessionComplete) {
    return (
      <div className="flex flex-col items-center max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-4 border border-gray">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Congratulations!
        </h2>
        <div className="flex justify-center mb-4">
          {responses.map((res, i) => (
            <div key={i}>
              {!res.skipped && (
                <FaStar key={i} className="text-yellow-400 text-3xl" />
              )}
            </div>
          ))}
        </div>
        <p className="text-gray-700 mb-4">You ve completed the session!</p>
        <p className="text-sm text-gray-600 mb-2">
          Total Duration: {Math.floor(totalDuration / 60)}:
          {totalDuration % 60 < 10
            ? `0${totalDuration % 60}`
            : totalDuration % 60}
        </p>
        <div className="flex flex-col w-full">
          {responses.map((response, index) => (
            <ResponseItem response={response} key={index} index={index} />
          ))}
        </div>
        <Button className="w-full mt-2" onClick={onClose}>
          Complete
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md mt-4 border border-gray">
      <audio
        // controls
        ref={audioRef}
        src={`rpg-music-${pathway.musicPack || 2}.mp3`}
        loop
      />

      <PathwayPlayerHeader
        pathway={pathway}
        isMusicPlaying={isMusicPlaying}
        handlePreviousStep={handlePreviousStep}
        setIsMusicPlaying={setIsMusicPlaying}
        onClose={onClose}
      />

      <ProgressBar currentStep={currentStep} pathway={pathway} />

      <div
        className="h-24 bg-cover  bg-no-repeat bg-center w-full"
        style={{ backgroundImage: `url(${pathway.background})` }}
      ></div>

      <Timer
        timer={timer}
        restartTimer={restartTimer}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />

      <h2 className="text-md text-gray-800 mb-2">
        <div>Step {currentStep + 1}:</div>
        <div className="text-2xl my-2">{step.question}</div>

        {step.context && <div className="py-2 text-sm">💡 {step.context}</div>}
      </h2>

      <textarea
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent mb-4 min-h-[250px]"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Your response..."
      />

      <button
        className={`w-full py-3 rounded text-white ${
          canProceed ? "bg-slate-800 hover:bg-slate-900" : "bg-gray-300"
        }`}
        disabled={!canProceed}
        onClick={handleNextStep}
      >
        {step.buttonText}
      </button>
      {step.allowSkip && (
        <button
          className="py-2 mt-2 px-4 bg-gray-400 text-white rounded hover:bg-gray-500"
          onClick={handleSkipStep}
        >
          Skip
        </button>
      )}
    </div>
  );
};

const PathwayCard = ({ pathway, onPlay }) => {
  const { name, description, emoji, time, duration, steps } = pathway;

  return (
    <Card className="m-4 p-4 w-80">
      <EmojiBox emoji={emoji} />
      <div className="my-2">
        <div className="text-xl bold mb-2">{name}</div>
        <CardDescription>{description}</CardDescription>
      </div>
      <div className="my-2">
        <Badge variant="screen" className="mr-2">
          {duration}
        </Badge>
        <Badge variant="screen" className="mr-2">
          {steps.length} Steps
        </Badge>

        <Badge variant="screen" className="mr-2">
          {time}
        </Badge>
      </div>

      <Button className="w-full mt-2" onClick={onPlay}>
        <span className="mr-2">Play</span> <FaPlay />
      </Button>
    </Card>
  );
};

const QuestsBuilder = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(false);
  return (
    <div m2>
      {/* <HeroSection bgImg={backgroundCover} logo={questsLogo} /> */}

      {currentlyPlaying ? (
        <PathwayPlayer
          pathway={currentlyPlaying}
          onClose={() => setCurrentlyPlaying(false)}
        />
      ) : (
        <div className="flex flex-wrap justify-center">
          <Link href="/quests-builder/new-pathway">
            <Button className="">+ New Pathway</Button>
          </Link>

          {pathways.map((pathway, i) => (
            <PathwayCard
              key={i}
              pathway={pathway}
              onPlay={() => {
                setCurrentlyPlaying(pathway);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestsBuilder;

// const StardewValleyStyle = () => {
//   return (
//     <div className="bg-[#F5F5DC] border-4 border-[#A0522D] shadow-lg p-4 rounded-lg flex items-center space-x-4">
//       <div
//         className="w-12 h-12 bg-cover rounded-full bg-no-repeat bg-center"
//         style={{ backgroundImage: `url('path/to/your/icon.png')` }}
//       ></div>
//       <div className="flex flex-col">
//         <h2 className="text-lg font-bold" style={{ color: "#8B4513" }}>
//           Process Name
//         </h2>
//         <p className="text-sm" style={{ color: "#BC8F8F" }}>
//           Short description of the process...
//         </p>
//         <button className="bg-[#DEB887] hover:bg-[#D2B48C] text-white font-semibold py-2 px-4 border border-[#8B4513] rounded mt-2">
//           Start
//         </button>
//       </div>
//     </div>
//   );
// };
