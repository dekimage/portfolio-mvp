"use client";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { ChevronDown, Pause, Play, RotateCcw, Settings } from "lucide-react";
import { useEffect, useState } from "react";

const milestones = [
  {
    id: "m1", // Unique ID for the milestone
    name: "Project Launch Website",
    emoji: "🚀",
    color: "#3a86ff", // Optional, if you want colors for milestones
    tasks: [
      {
        id: "t1", // Unique ID for the task
        description: "Design the landing page",
        estimate: 30, // Estimated time in minutes
        isCompleted: false,
        totalTimeSpent: 0, // Accumulated time spent on the task
      },
      {
        id: "t2",
        description: "Implement the landing page",
        estimate: 60,
        isCompleted: false,
        totalTimeSpent: 0,
      },
      {
        id: "t3",
        description: "Write the blog post",
        estimate: 45,
        isCompleted: false,
        totalTimeSpent: 0,
      },
      {
        id: "t4",
        description: "Prepare the launch email",
        estimate: 15,
        isCompleted: false,
        totalTimeSpent: 0,
      },
    ],
  },
  {
    id: "m2",
    name: "Chocolate Factory Game",
    emoji: "🍫",
    color: "#e9c46a",
    tasks: [
      {
        id: "t1",
        description: "Code it up",
        estimate: 30,
        isCompleted: false,
        totalTimeSpent: 0,
      },
      {
        id: "t2",
        description: "Test it",
        estimate: 50,
        isCompleted: false,
        totalTimeSpent: 0,
      },
      {
        id: "t3",
        description: "Deploy it",
        estimate: 60,
        isCompleted: false,
        totalTimeSpent: 0,
      },
    ],
  },
];

const Timer = ({ initialTime = 1500 }) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(intervalId);
            alert("Done!");
            return prevTime; // Prevent further countdown
          } else {
            return prevTime - 1;
          }
        });
      }, 1000); // Decrement every second
    }

    return () => clearInterval(intervalId); // Cleanup function for the effect
  }, [isRunning, timeRemaining]); // Rerun effect if isRunning or timeRemaining change

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeRemaining(initialTime);
  };

  // Helper to format time display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };
  const progress = Math.floor((timeRemaining / initialTime) * 100);

  return (
    <div className="flex justify-center  flex-col  items-center border px-24 py-8 w-full">
      <div className="w-fit text-center">
        <div className="text-[92px] font-bold">{formatTime(timeRemaining)}</div>
      </div>

      <div className="w-full h-2 bg-gray-500 rounded-full">
        <div className={`w-${progress}% h-full bg-white rounded-full`}></div>
      </div>
      <div className="flex gap-4 mt-8">
        {isRunning ? (
          <Button className="gap-1" onClick={handlePause}>
            <Pause size={14} /> Pause
          </Button>
        ) : (
          <Button className="gap-1" onClick={handleStart}>
            <Play size={14} /> Start
          </Button>
        )}
        <Button variant="outline" className="gap-1" onClick={handleReset}>
          <RotateCcw size={14} /> Reset
        </Button>
      </div>
    </div>
  );
};

const FocusTask = ({ focusTask }) => {
  return (
    <div className="flex flex-col items-center justify-center my-6">
      <h2 className="text-xl font-bold">Focus Now On</h2>
    </div>
  );
};

const MilestoneCard = ({ milestone }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalEstimatedTime = milestone.tasks.reduce(
    (sum, task) => sum + task.estimate,
    0
  );
  const totalCompletedTasks = milestone.tasks.filter(
    (task) => task.isCompleted
  ).length;
  const progressPercentage = Math.floor(
    (totalCompletedTasks / milestone.tasks.length) * 100
  );

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="p-2 flex flex-col relative w-full">
      <div className="flex gap-2 justify-between">
        <div
          className="flex justify-center items-center border border-slate w-[40px] h-[40px] p-2 text-md rounded"
          style={{ backgroundColor: milestone.color }}
        >
          {milestone.emoji}
        </div>
        <div className="flex items-center flex-grow">
          <h3 className="font-semibold">{milestone.name}</h3>
        </div>
        <Button
          variant="outline"
          className="w-[40px] h-[40px] p-2"
          onClick={toggleExpanded}
        >
          <ChevronDown />
        </Button>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full mt-4">
        <div
          className={`w-${progressPercentage}% h-full bg-gray-800 rounded-full`}
        ></div>
      </div>
      <div className="text-xs mt-1">
        {totalCompletedTasks} / {milestone.tasks.length} tasks
      </div>

      <div className="flex items-center justify-between mt-2">
        <Button variant="outline" onClick={toggleExpanded}>
          <Play size={14} className="mr-1" /> Play
        </Button>
      </div>
      {isExpanded && (
        <>
          <div className="mt-2">{/*  Progress bar */}</div>
          <div className="mt-2">
            Estimated Time: {totalEstimatedTime} minutes
          </div>

          {/* Task List - Render Task components here */}
          <div className="mt-4">
            {milestone.tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </div>
        </>
      )}
    </Card>
  );
};

const Task = ({ task, onTaskUpdate }) => {
  // Pass onTaskUpdate callback
  const [showMore, setShowMore] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted); // Task completion state

  const handleStartTask = () => {
    // 1. Update UI - Example: Visually indicate task is started
    // 2. Call a function in the parent component to initiate the Timer with task.estimate
    if (onTaskUpdate) {
      onTaskUpdate(task.id, true); // Indicate task started
    }
  };

  const handleTaskCompletion = (event) => {
    setIsCompleted(event.target.checked);

    // Update task data and pass changes to parent component
    if (onTaskUpdate) {
      onTaskUpdate(task.id, false, event.target.checked);
    }
  };

  return (
    <div className="border rounded-md p-2 mb-2 flex items-center justify-between">
      {" "}
      {/* Add styling as needed */}
      <div>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleTaskCompletion}
        />
        <span className={`ml-2 ${isCompleted ? "line-through" : ""}`}>
          {" "}
          {task.description}
        </span>

        {/* Show More/Less */}
        {task.description.length > 30 && (
          <button
            className="text-xs text-blue-500"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        )}
        {showMore && <div className="mt-1 text-sm">{task.description}</div>}
      </div>
      <div className="flex items-center">
        <div className="mr-4">{task.estimate} min</div>
        <button onClick={handleStartTask}>Start</button>
      </div>
    </div>
  );
};

const FocusTimerPage = () => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-center flex-col items-center w-full p-4 mt-8 sm:w-[500px] sm:p-0">
        <Timer />

        <FocusTask focusTask="Coding the focus app" />

        <MilestoneCard milestone={milestones[0]} />

        <div className="flex items-center justify-between w-full mt-4">
          <div className="font-bold text-lg">All Milestones</div>
          <Button variant="outline">+ Add New</Button>
        </div>
        <div className="mt-8 flex flex-col gap-4 w-full">
          {milestones.map((milestone) => (
            <MilestoneCard key={milestone.id} milestone={milestone} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default FocusTimerPage;
