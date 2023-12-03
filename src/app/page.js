import ProjectCard from "@/components/projects/ProjectCard";

const projects = [
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
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 pt-12">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">Dejan Gavrilovic</h1>
        <p className="text-xl text-center">Creations</p>
      </div>
      <div className="flex flex-wrap w-full">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </main>
  );
}
