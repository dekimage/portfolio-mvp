"use client";
import { useState } from "react";
import { TitleDescription } from "../page";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import {
  formatSeconds,
  formatSecondsToHumanReadable,
  formatTimeRange,
  getDateTimeDay,
  getRelativeTime,
} from "@/utils/date";
import { ChevronDown, ChevronUp } from "lucide-react";
import MobxStore from "../mobx";
import { observer } from "mobx-react";

const STATIC_LOGS = [
  {
    totalDuration: 45,
    idleTime: 12,
    timestamp: 1704370430000,
    startTime: 1704366337000,
    goldEarned: 100,
    distractions: ["youtube", "facebook"],
    feedback: {
      rating: 4,
      comment: "I'm feeling good!",
    },
    stepsCompleted: [
      {
        question: "What are your top 3 things you wanna finish today?",
        response:
          "Beneath the Sakura's delicate bloom, Japan's heart in petals' perfume. Cherry blossoms, a fleeting sight, symbolizing life's transient flight. Cultural traditions, rich and deep, In every season, Japan's secrets keep.",
        timeSpent: 10,
        skipped: false,
        responseType: "text",
      },
      {
        question: "How will you conquer your fear for them?",
        response: "",
        skipped: true,
        timeSpent: 8,
        responseType: "text",
      },
    ],
  },
];

const FancyTag = ({ color, text }) => {
  let backgroundColor, textColor;

  switch (color) {
    case "green":
      textColor = "#16a34a"; // Green
      backgroundColor = "#bbf7d0"; // Lighter Green
      break;

    case "red":
      textColor = "#EF4444"; // Red
      backgroundColor = "#FED7D7"; // Lighter Red
      break;
    case "amber":
      textColor = "#F59E0B"; // Amber
      backgroundColor = "#FCD34D"; // Lighter Amber
      break;
    case "blue":
      textColor = "#3B82F6"; // Blue
      backgroundColor = "#A5B4FC"; // Lighter Blue
      break;

    default:
      textColor = "#000"; // Default background color
      backgroundColor = "#fff"; // Default text color
  }

  const tagStyle = {
    backgroundColor,
    color: textColor,
    display: "inline-block",
    padding: "0.2rem 0.5rem",
    borderRadius: "0.25rem",
    marginRight: "0.5rem",
    maxWidth: "fit-content",
  };

  return <div style={tagStyle}>{text}</div>;
};

const LogDetails = ({ log }) => {
  return (
    <div className="mx-4">
      {/* <div className="text-lg font-semibold text-gray-800  border border-gray-200 rounded py-1 px-2 w-fit h-fit">
        Log Details
      </div> */}

      <div className="flex flex-col gap-2 rounded-md mt-4">
        <span>📅 {getDateTimeDay(log.timestamp)}</span>
        <span>🕝 {formatTimeRange(log.startTime, log.timestamp)}</span>
        <span>⏳ {formatSecondsToHumanReadable(log.totalDuration)}</span>
      </div>

      {log.responses.map((step, index) => (
        <div key={index} className="pt-4">
          <div className="border-t border-gray-200"></div>
          <div className="mt-3">
            <div className="flex">
              <div className="text-sm font-semibold text-gray-800  bg-gray-200 rounded py-1 px-2 w-fit h-fit">
                {index + 1}
              </div>
              <div className="text-xl ml-2">{step.question}</div>
            </div>

            <div className="mt-4 text-sm">{step.response}</div>

            {step.skipped ? (
              <FancyTag color="red" text="Skipped" />
            ) : (
              <div className="flex flex-col gap-2 mt-4">
                <FancyTag color="green" text="Completed" />
                <div>⏳ {formatSecondsToHumanReadable(step.timeSpent)}</div>
              </div>
            )}
          </div>
        </div>
      ))}

      {log.distractions && (
        <div className="mt-4">
          <div className=""></div>
          <div className="mt-3">
            <div className="flex">
              <div className="text-lg font-semibold text-gray-800  border border-gray-200 rounded py-1 px-2 w-fit h-fit">
                Distractions
              </div>
            </div>

            <div className="mt-4 text-sm">
              {log.distractions.map((distraction, index) => (
                <div key={index}>{distraction}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {log.feedback && (
        <div className="mt-4">
          <div className=""></div>
          <div className="mt-3">
            <div className="flex">
              <div className="text-lg font-semibold text-gray-800 border border-gray-200 rounded py-1 px-2 w-fit h-fit">
                Feedback
              </div>
            </div>

            <div className="mt-4 text-sm">{log.feedback.comment}</div>

            <div className="text-gray-600">
              <div className=" p-2 w-fit rounded">
                <span className="">Rating:</span>
                <span className="ml-2">{log.feedback.rating}/5</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {log.goldEarned && (
        <div>
          <div className="text-lg font-semibold text-gray-800 border border-gray-200 rounded py-1 px-2 w-fit h-fit">
            Loot
          </div>
          {log.goldEarned && <div className="">+{log.goldEarned} 🥮</div>}
        </div>
      )}
    </div>
  );
};

const LogCard = ({ log }) => {
  // const pathway = {
  //   name: "Pathway 1",
  //   emoji: "🥮",
  //   backgroundColor: "#FDE68A",
  // };

  const { totalDuration, stepsCompleted, pathway } = log;
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="flex flex-col  justify-between p-2 border border-gray-200 rounded-md">
      <div className="flex items-center">
        <div className="flex items-center">
          <div
            className="text-2xl mr-2 border-gray border p-4 rounded"
            style={{ backgroundColor: pathway.backgroundColor }}
          >
            {pathway.emoji}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-md">{pathway.name}</div>
          <div className="flex gap-2">
            <div className="text-gray-500 text-sm">
              {getRelativeTime(log.timestamp)}
            </div>
            {/* <Badge className="">{totalDuration} seconds</Badge> */}
          </div>
        </div>
        <div className="flex items-center flex-grow justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <>
                Hide
                <ChevronUp size={20} />
              </>
            ) : (
              <>
                View
                <ChevronDown size={20} />
              </>
            )}
          </Button>
        </div>
      </div>

      {isExpanded && <LogDetails log={log} />}
    </div>
  );
};

const LogCardReward = ({ log }) => {
  // const pathway = {
  //   name: "Pathway 1",
  //   emoji: "🥮",
  //   backgroundColor: "#FDE68A",
  // };

  const { totalDuration, stepsCompleted, reward } = log;
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="flex flex-col  justify-between p-2 border border-gray-200 rounded-md">
      <div className="flex items-center">
        <div className="flex items-center">
          <div
            className="text-2xl mr-2 border-gray border p-4 rounded"
            style={{ backgroundColor: reward.backgroundColor }}
          >
            {reward.emoji}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-md">{reward.name}</div>
          <div className="flex gap-2">
            <div className="text-red-500 text-sm">-{reward.cost} 🥮</div>
            {/* <Badge className="">{totalDuration} seconds</Badge> */}
          </div>
        </div>
        <div className="flex items-center flex-grow justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <>
                Hide
                <ChevronUp size={20} />
              </>
            ) : (
              <>
                View
                <ChevronDown size={20} />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* {isExpanded && <LogDetails log={log} />} */}
    </div>
  );
};

const LogsPage = observer(() => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="mx-4">
      <TitleDescription
        title="Logs"
        description="Analyse past data to improve your journey."
      />

      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border w-fit mt-4 mb-8"
      />

      <div className="flex flex-col gap-4">
        {MobxStore.logs.map((log, index) => {
          if (log.pathway) {
            return <LogCard key={index} log={log} />;
          }
          if (log.reward) {
            return <LogCardReward key={index} log={log} />;
          }
        })}
      </div>
    </div>
  );
});

export default LogsPage;
