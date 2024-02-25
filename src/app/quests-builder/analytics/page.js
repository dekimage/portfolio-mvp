"use client";
import { useEffect, useMemo, useState } from "react";
import { TitleDescription } from "../page";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  formatSeconds,
  formatSecondsToHumanReadable,
  formatTimeRange,
  getDateTimeDay,
  getRelativeTime,
} from "@/utils/date";
import {
  CalendarCheck,
  CalendarDays,
  CalendarIcon,
  ChevronDown,
  ChevronUp,
  Clock4,
  Hourglass,
  Sigma,
  WalletCards,
  X,
} from "lucide-react";
import MobxStore from "../mobx";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { PodcastEmptyPlaceholder } from "../components/EmptyList";
import Link from "next/link";

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
    padding: "0.2rem 0.3rem",
    borderRadius: "0.25rem",
    marginRight: "0.5rem",
    maxWidth: "fit-content",
    height: "fit-content",
  };

  return (
    <div className="text-xs" style={tagStyle}>
      {text}
    </div>
  );
};

const LogDetails = ({ log }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { deleteLog } = MobxStore;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const isSpecificPathway = searchParams.get("pathwayId");

  return (
    <div className="mx-2">
      <div className="flex flex-col gap-2 rounded-md my-4 text-sm ">
        <div className="flex flex-row gap-2 items-center">
          <div className="border border-slate-200 p-1 rounded items-center">
            <CalendarDays size="16px" />
          </div>

          {getDateTimeDay(log.timestamp.seconds * 1000)}
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div className="border border-slate-200 p-1 rounded">
            <Clock4 size="16px" />
          </div>
          {formatTimeRange(log.startTime, log.timestamp.seconds * 1000)}
        </div>
        <div className="flex flex-row gap-2 items-center">
          <div className="border border-slate-200 p-1 rounded">
            <Hourglass size="16px" />
          </div>
          {formatSecondsToHumanReadable(log.totalDuration)}
        </div>
      </div>

      <Button
        onClick={() =>
          isSpecificPathway
            ? router.replace("/quests-builder/analytics", undefined, {
                shallow: true,
              })
            : router.push(
                `/quests-builder/analytics?pathwayId=${log.pathway.id}`
              )
        }
      >
        {isSpecificPathway ? "Hide All Time" : "All Time Analysis"}
      </Button>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogTrigger>
          <Button className="ml-2" variant="destructive">
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              log.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowDeleteDialog(false);
                deleteLog(log.id);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col gap-2">
        {log.responses.map((step, index) => (
          <div key={index} className="border-t mt-3">
            <div className="mt-3">
              <div className="flex">
                <div className="text-lg font-semibold  rounded  px-2 w-fit h-fit">
                  {index + 1}.
                </div>
                <div className="text-xl">{step.question}</div>
              </div>

              <div className="mt-4 text-md bg-slate-100 p-2 rounded">
                {step.response}
              </div>

              {step.skipped ? (
                <FancyTag color="red" text="Skipped" />
              ) : (
                <div className="flex gap-2 mt-4 items-center">
                  <FancyTag color="green" text="Completed" />
                  <div className="border border-slate-200 p-1 rounded">
                    <Hourglass size="16px" />
                  </div>
                  <div className="text-sm">
                    {formatSecondsToHumanReadable(step.timeSpent)}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {log.distractions && (
        <div className="mt-4">
          <div className=""></div>
          <div className="mt-3">
            <div className="flex">
              <div className="text-lg font-semibold  border rounded py-1 px-2 w-fit h-fit">
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
              <div className="text-lg font-semibold border  rounded py-1 px-2 w-fit h-fit">
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
          <div className="text-lg font-semibold  border rounded py-1 px-2 w-fit h-fit">
            Loot
          </div>
          {log.goldEarned && <div className="">+{log.goldEarned} 🥮</div>}
        </div>
      )}
    </div>
  );
};

const LogCard = ({ log }) => {
  const { totalDuration, stepsCompleted, pathway } = log;
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="flex flex-col  justify-between p-2 border  rounded-md">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
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
              {getRelativeTime(log.timestamp.seconds * 1000)}
            </div>
          </div>
        </div>
        <div className="flex items-center flex-grow justify-end gap-2">
          <div className="mr-4">
            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
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
    <div className="flex flex-col  justify-between p-2 border rounded-md">
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
            <div className="text-gray-500 text-sm">
              {getRelativeTime(log.timestamp.seconds * 1000)}
            </div>
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
                {/* Hide */}
                <ChevronUp size={20} />
              </>
            ) : (
              <>
                {/* View */}
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
  const { isMobileOpen, logs } = MobxStore;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filterType, setFilterType] = useState("pathways");

  const pathwayId = searchParams.get("pathwayId");
  const rewardId = searchParams.get("rewardId");

  const filteredLogs = logs
    .filter((log) => {
      const logDate = new Date(log.timestamp.seconds * 1000);
      const isSelectedDate = logDate.toDateString() === date?.toDateString();

      if (pathwayId) {
        return log.pathwayId === pathwayId;
      }
      if (rewardId) {
        return log.rewardId === rewardId;
      }

      if (filterType === "all") {
        return isSelectedDate;
      } else if (filterType === "pathways") {
        return log.pathway && isSelectedDate;
      } else if (filterType === "rewards") {
        return log.reward && isSelectedDate;
      }
    })
    .sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);

  const filteredPathwayLogs = filteredLogs.filter((log) => log.pathway);

  const getLogName = (id, type) => {
    if (type === "pathway") {
      const log = logs.find((log) => log.pathway?.id === id);
      return log?.pathway.name;
    }
    if (type === "reward") {
      const log = logs.find((log) => log.reward?.id === id);
      return log?.reward.name;
    }
  };

  return (
    <div className="h-[90vh] max-w-[600px] m-4 sm:mx-8">
      <TitleDescription
        title="Analysis"
        description="Analyse past data to improve your journey."
      />

      <div className="flex items-center h-fit gap-4">
        <Tabs defaultValue="pathways">
          <TabsList>
            <TabsTrigger
              onClick={() => setFilterType("pathways")}
              value="pathways"
            >
              Pathways
            </TabsTrigger>
            <TabsTrigger
              onClick={() => setFilterType("rewards")}
              value="rewards"
            >
              Rewards
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className={`grid gap-2`}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={`w-fit justify-start text-left font-normal ${
                  !date && "text-muted-foreground"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  <>{format(date, "LLL dd, y")}</>
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="single"
                defaultMonth={date}
                selected={date}
                onSelect={setDate}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {(pathwayId || rewardId) && (
        <div className="my-4">
          <Badge
            className="cursor-pointer"
            onClick={() =>
              router.replace("/quests-builder/analytics", undefined, {
                shallow: true,
              })
            }
          >
            {getLogName(
              pathwayId || rewardId,
              pathwayId ? "pathway" : "reward"
            )}
            <div className="ml-2 w-4 h-4 flex items-center justify-center rounded-full border border-transparent  cursor-pointer transition duration-300">
              <X size="14px" />
            </div>
          </Badge>
        </div>
      )}
      {filteredPathwayLogs.length > 0 && (
        <div className="flex gap-4 my-4">
          <Card className="py-2 px-2 w-1/3">
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-between w-full flex-col">
                <div className="flex justify-between items-between w-full">
                  <div className="">Average</div>
                  <div className="flex justify-center items-center border border-slate-200 p-1 rounded w-8 h-8">
                    <Hourglass size="16px" />
                  </div>
                </div>

                <div className="text-2xl flex items-center">
                  {formatSecondsToHumanReadable(
                    filteredPathwayLogs.reduce(
                      (acc, log) => acc + log.totalDuration,
                      0
                    ) / filteredPathwayLogs.length,
                    false
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card className="py-2 px-2 w-1/3">
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-between w-full flex-col">
                <div className="flex justify-between items-between w-full">
                  <div>Total Duration</div>
                  <div className="flex justify-center items-center border border-slate-200 p-1 rounded w-8 h-8">
                    <Sigma size="16px" />
                  </div>
                </div>
                <div className="text-2xl flex items-center">
                  {formatSecondsToHumanReadable(
                    filteredPathwayLogs.reduce(
                      (acc, log) => acc + log.totalDuration,
                      0
                    ),
                    false
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card className="py-2 px-2 w-1/3">
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-between w-full flex-col">
                <div className="flex justify-between items-between w-full">
                  <div> Total Sessions</div>
                  <div className="flex justify-center items-center border border-slate-200 p-1 rounded w-8 h-8">
                    <WalletCards size="16px" />
                  </div>
                </div>
                <div className="text-2xl flex items-center">
                  {filteredPathwayLogs.length}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="flex flex-col gap-4 mt-4">
        {filteredLogs.map((log, index) => {
          if (log.pathway) {
            return <LogCard key={log.id} log={log} />;
          }
          if (log.reward) {
            return <LogCardReward key={log.id} log={log} />;
          }
        })}
        {filteredLogs.length === 0 && (
          <PodcastEmptyPlaceholder
            title="No Logs Today"
            description="Play Pathways to add logs."
          >
            <Link href="/quests-builder">
              <Button>Go to Dashboard</Button>
            </Link>
          </PodcastEmptyPlaceholder>
        )}
      </div>
    </div>
  );
});

export default LogsPage;
