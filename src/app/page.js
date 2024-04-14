"use client";
import ProjectCard from "@/components/projects/ProjectCard";
import { useEffect, useState } from "react";

const initialProjects = [
  {
    title: "Focus Timer",
    description: "Minimalistic Focus Timer to boost producitvity",
    tags: ["App"],
    url: "focus-timer",
    image: "focustimer",
    tag: "in progress",
  },
  {
    title: "One Arena",
    description: "Print & Play One Page Skrimish Game 3v3 Champions",
    tags: ["Print & Play"],
    url: "one-arena",
    image: "onearena",
    tag: "in progress",
  },
  {
    title: "Mini Actionise",
    description: "Small free version of the original Actionise.com App",
    image: "actionise",
    tags: ["App", "Personal Development"],
    url: "actionise",
    tag: "in progress",
  },
  {
    title: "My Habits",
    description:
      "A place for all of my habits. I share how I use them and how you can use them too.",
    image: "myHabits",
    tags: ["App", "Personal Development"],
    url: "my-habits",
    tag: "paused",
  },
  {
    title: "Top 50 Concepts",
    description:
      "Implement the top 50 ideas from books into your life with actionable steps.",
    image: "concepts",
    tags: ["App", "Personal Development"],
    url: "top-concepts",
    tag: "paused",
  },
  {
    title: "Atomic Habits Builder",
    description: "Build habits based on the book Atomic Habits by James Clear.",
    image: "habits",
    tags: ["App", "Personal Development"],
    url: "atomic-habits-builder",
    tag: "not started",
  },
  {
    title: "Pansynergy",
    description: "Practice Yoga, Breathing, Qigong, and Meditation.",
    image: "pansynergy",
    tags: ["App", "Yoga", "Breathing"],
    deployedUrl: "https://pathways-orpin.vercel.app/",
    tag: "in progress",
  },
  {
    title: "Pathways",
    description: "Craft personal gamified routines",
    image: "quests",
    tags: ["App", "Personal Development"],
    url: "quests-builder",
    deployedUrl: "https://pathways-orpin.vercel.app/",
    tag: "in progress",
  },
  {
    title: "Wisdom Explorers",
    description:
      "Tile based game to explore questions and actions that improve your life.",
    tags: ["Board Game", "Card Game", "Personal Development"],
    url: "wisdom-explorers",
    image: "wisdomExplorer",
    tag: "paused",
  },
  {
    title: "Robo Rally",
    description:
      "Race game, engine builder game that teaches programming principles and logic while having fun.",
    tags: ["Board Game", "Card Game", "Programming"],
    url: "robo-rally",
    image: "roboRally",
    tag: "paused",
  },
  {
    title: "Ugly Tasks",
    description:
      "Todo list app for difficult tasks. It helps you optimize them using the 6 aspects of procrastination.",
    tags: ["App", "Personal Development"],
    url: "ugly-tasks",
    image: "uglyTasks",
    tag: "not started",
  },
  {
    title: "Story RPG Tool",
    description: "Create your own advanture game.",
    tags: ["App", "Personal Development"],
    url: "story-rpg",
    deployedUrl: "https://story-rpg.vercel.app/",
    image: "storyRpg",
    tag: "in progress",
  },
];

export default function Home() {
  const [sortedProjects, setSortedProjects] = useState([]);
  useEffect(() => {
    // Function to sort projects by their tag
    const sortProjects = () => {
      const sorted = [...initialProjects].sort((a, b) => {
        const tagsOrder = { "not started": 3, "in progress": 1, paused: 2 };
        return tagsOrder[a.tag] - tagsOrder[b.tag];
      });
      setSortedProjects(sorted);
    };

    // Call the sort function
    sortProjects();
  }, []);
  return (
    <main className="flex  flex-col items-center justify-between pt-12">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">Dejan Gavrilovic</h1>
        <p className="text-xl text-center mt-6">Explore Projects</p>
      </div>
      <div className="flex flex-wrap w-full mt-12">
        {sortedProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </main>
  );
}
