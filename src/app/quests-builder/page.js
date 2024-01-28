"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaRedo, FaStar } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { MdClose } from "react-icons/md";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineMusicNote, MdOutlineMusicOff } from "react-icons/md";
import PathwayBuilder from "./new-pathway/page";

import { observer } from "mobx-react";
import MobxStore from "./mobx";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// import HeroSection from "../reusable-ui/HeroSection";
// import habitsLogo from "./assets/habits-logo.png";

import { LoadingSpinner } from "./components/LoadingSpinner";
import { backgroundCover } from "./layout";
import { Slider } from "@/components/ui/slider";
import { MoreVertical, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatTimeFromSteps } from "@/utils/transformers";

// to reusable UI
const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center space-x-3 cursor-pointer my-2 w-fit">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`form-checkbox h-5 w-5 text-black ${
          checked ? "bg-black" : "bg-white border border-gray-300"
        }`}
      />
      <span className="text-xl">{label}</span>
    </label>
  );
};

const pathways = [
  {
    id: "aHd3mnf2uw8Ixx7Lp8Ys",
    name: "Plan my Day",
    description: "A simple process to help you focus on what matters most.",
    duration: "3 min",
    time: "Morning",
    emoji: "📜",
    autoPlayMusic: false,
    background: backgroundCover,
    steps: [
      {
        question: "What is the most important task for today?",
        context: "Write down the absolute must for today, 1 main FROG.",
        timer: 30,
        currentStep: 1,
        buttonText: "Next",
        minText: 5,
        responseType: "text",
        allowSkip: false,
        autoplay: false,
      },
      {
        question: "List 2 bonus tasks for today.",
        context: "These are important but not as much as the FROG.",
        timer: 45,
        currentStep: 2,
        buttonText: "Next",
        minText: 10,
        responseType: "text",
        allowSkip: false,
        autoplay: false,
      },
      {
        question: "Add 2 more extra tasks that are nice to have.",
        context:
          "These DONT add pressure! They are fun extras if I want to have fun.",
        timer: 30,
        currentStep: 3,
        buttonText: "Complete",
        minText: 10,
        responseType: "text",
        allowSkip: true,
        autoplay: false,
      },
    ],
  },
  {
    id: "LiuGGIFtC38QfzZp93MP",
    name: "Deep Work",
    description:
      "Get 80% of your daily work done in just 90 minutes of laser focused time.",
    duration: "90 min",
    time: "Morning",
    emoji: "🧘",
    background: backgroundCover,
    steps: [
      {
        question:
          "Remove all possible distractions, all notifications off and all people OFF. Tell everyone you are getting into BEAST MODE.",
        context: "this should be a checklist",
        timer: 30,
        currentStep: 1,
        buttonText: "Next",
        minText: 0,
        responseType: "text",
        allowSkip: true,
        autoplay: false,
      },
      {
        question: "Get your FROG READY.",
        context:
          "POTENTIAL TASK: LINKING OF PATHWAYS, LIKE NOW I NEED TO LINK FIND MY PRIORITIES TASK HERE. OR THE RESULT OF IT?? THINK ABOUT THIS! DENI",
        timer: 10,
        currentStep: 2,
        buttonText: "Next",
        minText: 0,
        responseType: "text",
        allowSkip: true,
      },
      {
        question: "Focus Session #1",
        context:
          "This is type nothing? you just need to do something, maybe timer will be in focus with bonus reminders? or somthn that you might require",
        timer: 60 * 60,
        currentStep: 3,
        buttonText: "Next",
        minText: 0,
        responseType: "text",
      },
      {
        question:
          "Small Break, Get up and stretch, drink water and juggle with balls. Get hyped and ready to complete a tough session!",
        context: "probably checklist again",
        timer: 5 * 60,
        currentStep: 3,
        buttonText: "Next",
        minText: 0,
        responseType: "text",
      },
      {
        question: "Focus Session #2",
        context:
          "This is type nothing? you just need to do something, maybe timer will be in focus with bonus reminders? or somthn that you might require",
        timer: 60 * 60,
        currentStep: 3,
        buttonText: "Next",
        minText: 0,
        responseType: "text",
      },
    ],
  },
  {
    id: "LiuGGIFtC38QfzZp93MP",
    name: "Reflect on Learning",
    description: "Learn by reflection",
    duration: "5 min",
    time: "Night",
    emoji: "📖",
    autoPlayMusic: true,
    background: backgroundCover,
    steps: [
      {
        question: "What new thing did you learn today?",
        context: "Write down at least 1 thing.",
        timer: 60,
        currentStep: 1,
        buttonText: "Next",
        minText: 20,
        responseType: "text",
        allowSkip: false,
        autoplay: false,
      },
      {
        question:
          "Reflect on how you applied yesterday's learning in today's activities.",
        context:
          "Think of something that i have applied today that i learned in a previous session, and try to note what specifically i did and from where i learned it.",
        timer: 150,
        currentStep: 2,
        buttonText: "Next",
        minText: 15,
        responseType: "text",
        allowSkip: true,
      },
    ],
  },
];

const MoodSelector = ({ mood, onSelectMood, showSingle = false }) => {
  const moodEmojis = [
    { mood: "Happy", emoji: "😊" },
    { mood: "Sad", emoji: "😔" },
    { mood: "Angry", emoji: "😠" },
    { mood: "Surprised", emoji: "😲" },
    { mood: "Calm", emoji: "😌" },
  ];

  const [selectedMood, setSelectedMood] = useState(mood || "");

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    onSelectMood(mood);
  };

  if (showSingle) {
    const { mood, emoji } = moodEmojis.find((m) => m.mood === selectedMood) || {
      mood: "",
      emoji: "",
    };
    return (
      <div
        key={mood}
        className={`text-4xl ${
          selectedMood === mood ? "opacity-100" : "opacity-60"
        } focus:outline-none`}
      >
        {emoji}
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-2 mb-8">
      {moodEmojis.map(({ mood, emoji }) => (
        <button
          key={mood}
          className={`text-4xl ${
            selectedMood === mood ? "opacity-100" : "opacity-60"
          } focus:outline-none`}
          onClick={() => handleMoodClick(mood)}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export const TitleDescription = ({ title, description, button }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="space-y-1 mr-4">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {button && button}
    </div>
  );
};

{
  /* <Carousel
opts={{
  align: "start",
}}
className="w-full"
>
<CarouselContent>
  {pathways.map((pathway, i) => (
    <CarouselItem key={i} className="lg:basis-1/4 w-[270px]">
      <PathwayCard key={i} pathway={pathway} />
    </CarouselItem>
  ))}
</CarouselContent>
<CarouselPrevious />
<CarouselNext />
</Carousel> */
}

export const HorizontalPathwaysList = ({ pathways, title, description }) => {
  return (
    <div className="mb-8">
      <TitleDescription title={title} description={description} />
      {MobxStore.loading ? (
        <LoadingSpinner />
      ) : (
        <ScrollArea>
          <div className="flex gap-4">
            {pathways.map((pathway, i) => (
              <PathwayCard key={i} pathway={pathway} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  );
};

const ResponseItem = ({ response, index }) => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <div className="flex flex-col bg-gray-100 mb-2 p-2 rounded-lg w-full">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          Step {index + 1}:
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
        <div className="rounded-lg mt-2 p-4 bg-gray-200">
          {response.responseType == "checklist" &&
            response.response.map((r) => <div key={r}>{r}</div>)}

          {response.responseType == "text" && <div>{response.response}</div>}

          {response.responseType == "slider" && <div>{response.response}</div>}

          {response.responseType == "mood" && (
            <MoodSelector mood={response.response} showSingle />
          )}
        </div>
      )}
    </div>
  );
};

const PathwayPlayerHeader = ({
  pathway,
  isMusicPlaying,
  handlePreviousStep,
  setIsMusicPlaying,
  setIsPathwayEditView,
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

        <button
          className="mr-2 rounded-full hover:bg-gray-100"
          onClick={() => setIsPathwayEditView(true)}
        >
          <HiOutlineCog6Tooth size={20} className="text-slate-600" />
        </button>
        <button
          className="rounded-full hover:bg-gray-100"
          onClick={() => setPathwayPlaying(null)}
        >
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

export const PathwayPlayer = observer(({ pathway }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const step = pathway.steps[currentStep];
  const [timer, setTimer] = useState(step.timer);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(step.autoplay);
  const [userInput, setUserInput] = useState();
  const [userInputCheckbox, setUserInputCheckbox] = useState([]);
  const [responses, setResponses] = useState([]);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(pathway.autoPlayMusic);

  const [distractions, setDistractions] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [startTime, setStartTime] = useState(Date.now());

  const { setPathwayPlaying } = MobxStore;

  const audioRef = useRef(null);

  const { isPathwayEditView, setIsPathwayEditView } = MobxStore;

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
      audioRef?.current?.play();
    } else {
      audioRef?.current?.pause();
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
      {
        question: step.question,
        responseType: step.responseType,
        // variable response type based on the responseType
        response: userInput || userInputCheckbox || "",
        timeSpent: step.timer - timer,
        skipped: false,
        // idleTime: 0,
      },
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
      {
        question: step.question,
        responseType: step.responseType,
        response: "",
        timeSpent: 0,
        skipped: true,
      },
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
      setPathwayPlaying(null);
    }
  };

  const restartTimer = () => {
    setTimer(step.timer);
  };

  const canProceed = true;
  // timer === 0 && userInput.length >= step.minText;
  console.log(isPathwayEditView);
  if (isPathwayEditView) {
    return <PathwayBuilder pathwayToEdit={pathway} />;
  }

  if (sessionComplete) {
    return (
      <div className="flex flex-col max-w-lg  p-6 bg-white rounded-lg shadow-md mt-8 ml-8 border border-gray">
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
        <Button
          className="w-full mt-2"
          onClick={() => {
            MobxStore.addLog(pathway, {
              pathway: pathway,
              startTime,
              totalDuration,
              timestamp: Date.now(),
              ...(distractions && {
                distractions: distractions,
              }),
              ...(feedback && { feedback }),
              ...(pathway.gold && { goldEarned: pathway.gold }),
              responses,
            });
            setPathwayPlaying(false);
          }}
        >
          Complete
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-lg  p-4 bg-white rounded-lg shadow-md mt-8 ml-8 border border-gray">
      <audio
        ref={audioRef}
        src={`rpg-music-${pathway.musicPack || 2}.mp3`}
        loop
      />

      <PathwayPlayerHeader
        pathway={pathway}
        isMusicPlaying={isMusicPlaying}
        handlePreviousStep={handlePreviousStep}
        setIsMusicPlaying={setIsMusicPlaying}
        setIsPathwayEditView={setIsPathwayEditView}
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

      {step.responseType === "text" && (
        <textarea
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent mb-4 min-h-[250px]"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Your response..."
        />
      )}

      {step.responseType === "checklist" && (
        <div className="my-4">
          {step.options?.map((option, optionIndex) => (
            <Checkbox
              key={optionIndex}
              label={option}
              checked={(userInputCheckbox || []).includes(option)}
              onChange={() => {
                setUserInputCheckbox((prevUserInput) =>
                  prevUserInput.includes(option)
                    ? prevUserInput.filter((item) => item !== option)
                    : [...prevUserInput, option]
                );
              }}
            />
          ))}
        </div>
      )}

      {step.responseType === "slider" && (
        <div className="mb-8">
          <Slider
            defaultValue={[userInput || 1]}
            max={step.sliderMax || 10}
            step={step.sliderMin || 1}
            onValueChange={(value) => {
              setUserInput(value);
            }}
            className="mt-4"
          />
          <div className="flex justify-between mt-2">
            <div>{step.sliderMin}</div>
            <div>{step.sliderMax}</div>
          </div>
          <div className="text-2xl w-full flex justify-center">
            {userInput || 1} / {step.sliderMax || 10}
          </div>
        </div>
      )}

      {step.responseType === "mood" && (
        <MoodSelector
          mood={userInput}
          onSelectMood={(mood) => setUserInput(mood)}
        />
      )}

      <button
        className={`w-full py-3 rounded text-white ${
          canProceed ? "bg-slate-800 hover:bg-slate-900" : "bg-gray-300"
        }`}
        disabled={!canProceed}
        onClick={handleNextStep}
      >
        {step.buttonText || "Next"}
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
});

export const PathwayCard = observer(({ pathway }) => {
  const { name, description, emoji, time, duration, steps, backgroundColor } =
    pathway;
  const {
    setIsPathwayEditView,
    setPathwayPlaying,
    isMobileOpen,
    deletePathway,
  } = MobxStore;

  const totalDurationCalced = formatTimeFromSteps(steps);

  return (
    !isMobileOpen && (
      <Card className="p-4 w-64 h-[320px] flex flex-col justify-between relative">
        <div className="flex flex-grow flex-col">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-[16px] right-[16px] p-2"
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More</span>
                {/* <HiOutlineCog6Tooth size={20} className="text-slate-600" /> */}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setPathwayPlaying(pathway);
                  setIsPathwayEditView(false);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>View Stats</DropdownMenuItem>
              <DropdownMenuItem onClick={() => deletePathway(pathway.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div
            className="flex justify-center items-center border border-slate w-fit p-4 text-4xl"
            style={{ backgroundColor: backgroundColor }}
          >
            {emoji}
          </div>
          <div className="my-2">
            <div className="text-xl bold mb-2">{name}</div>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="my-2">
            <Badge variant="screen" className="mr-2">
              {totalDurationCalced}
            </Badge>
            <Badge variant="screen" className="mr-2">
              {steps?.length} Steps
            </Badge>
          </div>
        </div>
        {pathway.timeType == "time" && (
          <div>
            {pathway.progress || 0} / {pathway.completionLimit}
          </div>
        )}

        <Button
          className="w-full mt-2"
          onClick={() => MobxStore.setPathwayPlaying(pathway)}
        >
          <span className="mr-2">Play</span> <FaPlay />
        </Button>
      </Card>
    )
  );
});

const QuestsBuilder = observer(() => {
  const pathwaysNotOwnedByUser = MobxStore.pathways.filter(
    (pathway) => pathway.creatorId !== MobxStore.user?.uid
  );

  const { userPathways, pathwayPlaying } = MobxStore;

  return (
    <div className="m-4 sm:mx-8">
      {/* <HeroSection bgImg={backgroundCover} logo={questsLogo} /> */}

      {pathwayPlaying ? (
        <PathwayPlayer pathway={pathwayPlaying} />
      ) : (
        <>
          {/* <HorizontalPathwaysList
            pathways={pathways}
            title="Featured"
            description="Get started with these pathways."
          /> */}

          <HorizontalPathwaysList
            pathways={MobxStore.recentPathways}
            title="Recently Played"
            description="Continue where you left off..."
          />

          <HorizontalPathwaysList
            pathways={MobxStore.topPlayedPathways}
            title="Most Played"
            description="Continue with your most played pathways."
          />

          <HorizontalPathwaysList
            pathways={userPathways}
            title="My Pathways"
            description="From Subcollection Users"
          />
        </>
      )}
    </div>
  );
});

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
