"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

import bookIcon from "./assets/bookIcon.png";
import lockIcon from "./assets/lockIcon.png";

import Image from "next/image";
import MobxStore from "./mobx";
import { observer } from "mobx-react";
import { TitleDescription } from "./components/TitleDescription";
import { Badge } from "@/components/ui/badge";

const StoryPage = observer(() => {
  const {
    activePage,
    inventory,
    stats,
    handleOptionClick,
    isOptionUnlocked,
    findItem,
    findStat,
    hasItem,
    meetsStatCondition,
  } = MobxStore;
  const { name, description, options, page, img } = activePage;

  return (
    <div>
      <Card className="w-[90%]  min-h-[70vh] m-8 flex flex-col">
        <div className="flex gap-2">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col gap-1">
              <div>{stat.name}</div>
              <div>{stat.value}</div>
            </div>
          ))}
        </div>
        <div className="w-full h-full flex flex-grow">
          <div className="w-1/2 flex border p-8 flex flex-col">
            {/* <Button className="w-fit mb-4" variant="outline">
              <ChevronLeft size={20} />
              Back
            </Button> */}
            <div className="flex gap-1 text-2xl">
              <Image src={bookIcon} alt="book" height={24} width={24} />
              {page}
            </div>
            <div className="text-2xl mb-4 flex gap-2">{name}</div>

            <div className="text-sm mb-12">{description}</div>

            <div className="flex flex-col gap-8">
              {options.map((option, index) => {
                const usageCount = MobxStore.getOptionUsage(index);
                const remainingUses = option.uses
                  ? option.uses - usageCount
                  : undefined;
                // Check if the option is unlocked
                const unlocked = option.locked
                  ? isOptionUnlocked(option.locked)
                  : true;
                const hidden = option.hidden
                  ? !isOptionUnlocked(option.hidden)
                  : false;

                // Skip rendering if option is hidden
                if (hidden) return null;

                return (
                  <div
                    className="flex flex-col border"
                    key={index}
                    onClick={() => unlocked && handleOptionClick(option, index)}
                  >
                    <div
                      className={`flex  rounded items-center justify-between  transition duration-300 ease-in-out ${
                        !unlocked
                          ? "opacity-99"
                          : "hover:shadow-lg cursor-pointer "
                      }`}
                    >
                      {remainingUses !== undefined && (
                        <span>(uses: {remainingUses})</span>
                      )}
                      <div className="bg-yellow-200 w-6 h-full min-h-[60px]"></div>
                      <div className="flex w-full pl-2">{option.label}</div>
                      <div className="flex gap-1 bg-yellow-200 h-full w-24 justify-center items-center px-2">
                        {/* Optional: Conditional rendering for the icon or page number */}
                        <Image
                          src={unlocked ? bookIcon : lockIcon}
                          alt="icon"
                          height={20}
                          width={20}
                        />
                        {unlocked && option.page}
                      </div>
                    </div>
                    <div className="flex">
                      {option.locked && !unlocked && (
                        <div className="py-2 border-top border-t w-full h-full flex items-center gap-2 bg-gray-100">
                          <div className="text-xs ml-1">Requires:</div>
                          {option.locked.map((lock, i) => {
                            const item = lock.item ? findItem(lock.item) : null;

                            const statName = lock.stat
                              ? findStat(lock.stat[0]).name
                              : null;
                            const itemConditionMet = item
                              ? hasItem(lock.item)
                              : false;
                            const statConditionMet = lock.stat
                              ? meetsStatCondition(lock.stat)
                              : false;
                            return (
                              <div key={i} className="flex items-center gap-2 ">
                                {lock.item && (
                                  <>
                                    <Image
                                      src={item.img}
                                      alt={item.name}
                                      height={30}
                                      width={30}
                                    />
                                    {/* Show checkmark if item condition is met */}
                                    {itemConditionMet && (
                                      <svg
                                        className="h-4 w-4 text-green-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M5 13l4 4L19 7"
                                        />
                                      </svg>
                                    )}
                                  </>
                                )}

                                {lock.stat && (
                                  <>
                                    <span className="text-xs">
                                      {statName}: {lock.stat.slice(1).join(" ")}
                                    </span>
                                    {/* Show checkmark if stat condition is met */}
                                    {statConditionMet && (
                                      <svg
                                        className="h-4 w-4 text-green-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M5 13l4 4L19 7"
                                        />
                                      </svg>
                                    )}
                                  </>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <Image src={img} alt="item" height={600} width={600} />
          </div>
        </div>

        <div className="w-full h-1/4 flex items-center border gap-2 p-4">
          {inventory.map((item, index) => (
            <div key={index} className="w-20 h-20 bg-slate-200 cursor-pointer">
              <Image src={item.img} alt="item" height={100} width={100} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
});

const projects = [
  {
    id: 1,
    name: "Magi's Mart",
    description: "A game about a magical shop.",
    img: "https://cdn.midjourney.com/a70065b2-9c69-4189-a6fe-ae6ae6f449eb/0_0.png",
    isPublished: true,
  },
  {
    id: 2,
    name: "The Lost City",
    description: "A game about a lost city.",
    img: "https://cdn.midjourney.com/201b09a7-2681-4e95-8efd-6b4843d31dc3/0_3.png",
    isPublished: false,
  },
];

const StoryRpgPage = () => {
  {
    /* return <StoryPage />; */
  }
  return (
    <div className="m-4 sm:m-8 flex flex-col">
      <TitleDescription
        title="Projects"
        description="Manage different projects."
        // button={
        //   <Button onClick={() => setIsCreate(true)}>+ New Project</Button>
        // }
      />
      <div className="flex flex-wrap gap-4">
        {projects.map((project, index) => (
          <Card key={index} className="max-w-[200px] relative">
            <div className="absolute top-[5px] right-[5px]">
              {project.isPublished ? (
                <Badge className="w-fit bg-green-400">Published</Badge>
              ) : (
                <Badge className="w-fit bg-yellow-400">In Progress</Badge>
              )}
            </div>
            <img src={project.img} alt="project" />
            <div className="flex justify-center  flex-col p-2">
              <div>{project.name}</div>
              <div className="text-xs text-gray-400">{project.description}</div>
              <div className="flex gap-2 pt-6">
                <Button className="p-2 px-4 h-8" variant="outline">
                  Play
                </Button>
                <Button className="p-2 px-4 h-8" variant="outline">
                  Edit
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StoryRpgPage;
