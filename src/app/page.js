import ProjectCard from "@/components/projects/ProjectCard";

const projects = [
  {
    title: "Mini Actionise",
    description: "Small free version of the original Actionise.com App",
    image: "actionise",
    tags: ["App", "Personal Development"],
    url: "actionise",
  },
  {
    title: "My Habits",
    description:
      "A place for all of my habits. I share how I use them and how you can use them too.",
    image: "myHabits",
    tags: ["App", "Personal Development"],
    url: "my-habits",
  },
  {
    title: "Top 50 Concepts",
    description:
      "Implement the top 50 ideas from books into your life with actionable steps.",
    image: "concepts",
    tags: ["App", "Personal Development"],
    url: "top-concepts",
  },
  {
    title: "Atomic Habits Builder",
    description: "Build habits based on the book Atomic Habits by James Clear.",
    image: "habits",
    tags: ["App", "Personal Development"],
    url: "atomic-habits-builder",
  },
  {
    title: "Gamified Quests",
    description: "Gamify your todo lists with quests & rewards",
    image: "quests",
    tags: ["App", "Personal Development"],
    url: "quests-builder",
  },
  {
    title: "Wisdom Explorers",
    description:
      "Tile based game to explore questions and actions that improve your life.",
    tags: ["Board Game", "Card Game", "Personal Development"],
    url: "wisdom-explorers",
    image: "wisdomExplorer",
  },
  {
    title: "Robo Rally",
    description:
      "Race game, engine builder game that teaches programming principles and logic while having fun.",
    tags: ["Board Game", "Card Game", "Programming"],
    url: "robo-rally",
    image: "roboRally",
  },
  {
    title: "Ugly Tasks",
    description:
      "Todo list app for difficult tasks. It helps you optimize them using the 6 aspects of procrastination.",
    tags: ["App", "Personal Development"],
    url: "ugly-tasks",
    image: "uglyTasks",
  },
];

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between pt-12">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">Dejan Gavrilovic</h1>
        <p className="text-xl text-center mt-6">Explore Projects</p>
      </div>
      <div className="flex flex-wrap w-full mt-12">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </main>
  );
}
