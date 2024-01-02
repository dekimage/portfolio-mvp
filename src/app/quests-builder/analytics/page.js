"use client";
import { useState } from "react";
import { TitleDescription } from "../page";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

const STATIC_LOGS = [
  {
    totalDuration: 45,
    stepsCompleted: [
      {
        question: "What is your name?",
        response: "John Doe",
        timeSpent: 10,
      },
      {
        question: "How old are you?",
        response: "30",
        timeSpent: 8,
      },
    ],
  },
  {
    totalDuration: 60,
    stepsCompleted: [
      {
        question: "Where are you from?",
        response: "New York",
        timeSpent: 12,
      },
      {
        question: "Favorite color?",
        response: "Blue",
        timeSpent: 9,
      },
    ],
  },
  {
    totalDuration: 35,
    stepsCompleted: [
      {
        question: "What's your job?",
        response: "Engineer",
        timeSpent: 7,
      },
    ],
  },
  {
    totalDuration: 55,
    stepsCompleted: [
      {
        question: "Favorite movie?",
        response: "Inception",
        timeSpent: 15,
      },
      {
        question: "Hobby?",
        response: "Painting",
        timeSpent: 10,
      },
    ],
  },
  {
    totalDuration: 40,
    stepsCompleted: [
      {
        question: "Favorite book?",
        response: "The Great Gatsby",
        timeSpent: 8,
      },
      {
        question: "Pets?",
        response: "Cat",
        timeSpent: 7,
      },
    ],
  },
];

const LogDetails = ({ log }) => {
  return (
    <div className="mt-4">
      <div className="text-gray-700">
        <div>
          <strong>Total Duration:</strong> {log.totalDuration} minutes
        </div>
        {log.stepsCompleted.map((step, index) => (
          <div key={index} className="mt-2">
            <div>
              <strong>Step {index + 1}:</strong> {step.question}
            </div>
            <div>
              <strong>Response:</strong> {step.response}
            </div>
            <div>
              <strong>Time Spent:</strong> {step.timeSpent} seconds
            </div>
          </div>
        ))}
        {/* Additional details can be added here */}
      </div>
    </div>
  );
};

const LogCard = ({ log }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-bold text-lg">{log.pathwayName}</div>
          <div className="text-gray-600">
            {new Date(log.timestamp).toLocaleDateString()}
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Hide Details" : "View Details"}
        </button>
      </div>
      {isExpanded && <LogDetails log={log} />}
    </div>
  );
};

const LogsPage = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div className="container mx-auto p-4">
      <TitleDescription
        title="Logs"
        description="Analyse past data to improve your journey."
      />

      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border w-fit mt-4 ml-4"
      />

      <div className="space-y-4">
        {STATIC_LOGS.map((log, index) => (
          <LogCard key={index} log={log} />
        ))}
      </div>
    </div>
  );
};

export default LogsPage;
