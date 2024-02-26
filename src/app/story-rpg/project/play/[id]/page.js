"use client";
import { ChevronLeft } from "lucide-react";

import bookIcon from "../../../assets/bookIcon.png";
import lockIcon from "../../../assets/lockIcon.png";

import Image from "next/image";
import MobxStore from "../../../mobx";
import { observer } from "mobx-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

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

  const Stats = ({ stats }) => (
    <div className="flex gap-4 border-t p-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="min-w-[100px] flex flex-col gap-1 items-center justify-center p-2 border  rounded-lg shadow"
          // bg-gradient-to-r from-cyan-500 to-blue-500
        >
          <div className="text-md font-semibold">{stat.name}</div>
          <div className="text-4xl">{stat.value}</div>
        </div>
      ))}
    </div>
  );

  const Item = ({ item }) => (
    <div className="cursor-pointer">
      <Image src={item.img} alt="item" height={100} width={100} />
    </div>
  );

  const Option = ({ option, unlocked, remainingUses, usageCount, index }) => {
    const [showLock, setShowLock] = useState(false);
    return (
      <div
        className="flex flex-col border relative"
        onClick={() => {
          !unlocked && setShowLock(!showLock);
          unlocked && handleOptionClick(option, index);
        }}
      >
        <div
          className={`flex  rounded items-center justify-between  transition duration-300 ease-in-out ${
            !unlocked ? "opacity-99" : "hover:shadow-lg cursor-pointer"
          }`}
        >
          {remainingUses != undefined && (
            <Badge className="absolute top-[-5px] right-[-5px] bg-green-300 px-1 rounded flex justify-center items-center font-bold">
              {remainingUses}/{usageCount + remainingUses}
            </Badge>
          )}

          <div className="bg-yellow-200 w-6 h-full min-h-[60px]"></div>
          <div className="flex w-full pl-2 text-md">{option.label}</div>
          <div className="flex gap-1 bg-yellow-200 h-full w-24 justify-center items-center px-2 text-black font-bold">
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
          {option.locked && !unlocked && showLock && (
            <div className="py-2 border-top border-t w-full h-full flex items-center gap-2 ">
              <div className="text-xs ml-1">Requires:</div>
              {option.locked.map((lock, i) => {
                const item = lock.item && findItem(lock.item);
                const statName = lock.stat && findStat(lock.stat[0]).name;
                const itemConditionMet = item && hasItem(lock.item);
                const statConditionMet =
                  lock.stat && meetsStatCondition(lock.stat);

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
  };

  const Options = ({ options }) => {
    return (
      <div className="flex flex-col gap-8">
        {options.map((option, index) => {
          const usageCount = MobxStore.getOptionUsage(index);
          const remainingUses = option.uses
            ? option.uses - usageCount
            : undefined;

          const unlocked = !option.locked || isOptionUnlocked(option.locked);
          const hidden = option.hidden && !isOptionUnlocked(option.hidden);

          if (hidden) return null;

          return (
            <Option
              key={index}
              index={index}
              option={option}
              unlocked={unlocked}
              usageCount={usageCount}
              remainingUses={remainingUses}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <Button className="w-fit m-4 ml-8" variant="outline">
        <ChevronLeft size={20} />
        Back
      </Button>
      <Card className="m-8 flex flex-col m-0 mx-8">
        <div className="w-full h-full flex flex-grow">
          <div className="w-1/2 flex  p-8 flex flex-col">
            <div className="flex gap-1 text-4xl mb-2">
              <Image src={bookIcon} alt="book" height={36} width={36} />
              {page}
            </div>
            <div className="text-4xl mb-4 flex gap-2">{name}</div>

            <div className="text-md mb-12">{description}</div>

            <Options options={options} />
          </div>

          <div className="w-1/2 flex justify-center items-center">
            <Image src={img} alt="item" height={600} width={600} />
          </div>
        </div>
        <Stats stats={stats} />
        <div className="w-full flex items-center border-t gap-2 p-4">
          {inventory.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </div>
      </Card>
    </div>
  );
});

export default StoryPage;
