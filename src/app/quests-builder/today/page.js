"use client";
import { observer } from "mobx-react";
import MobxStore from "../mobx";
import {
  HorizontalPathwaysList,
  PathwayCard,
  PathwayPlayer,
  TitleDescription,
} from "../page";
import { shouldShowToday } from "@/utils/date";

const TodayPage = observer(() => {
  const { userPathways, pathwayPlaying, loading } = MobxStore;

  if (pathwayPlaying) {
    return <PathwayPlayer pathway={pathwayPlaying} />;
  }

  return (
    <div className="mx-4 flex flex-col gap-4">
      <TitleDescription
        title="Daily"
        description="Start your day with fresh pathways"
      />
      <div className="flex flex-col gap-4">
        {userPathways
          ?.filter((p) => shouldShowToday(p.days))
          .map((pathway, i) => (
            <PathwayCard key={i} pathway={pathway} />
          ))}
      </div>

      <TitleDescription title="Weekly" description="" />
      <div className="flex flex-col gap-4">
        {userPathways
          ?.filter((p) => shouldShowToday(p.days))
          .map((pathway, i) => (
            <PathwayCard key={i} pathway={pathway} />
          ))}
      </div>

      <TitleDescription title="Monthly" description="" />
      <div className="flex flex-col gap-4">
        {userPathways
          ?.filter((p) => shouldShowToday(p.days))
          .map((pathway, i) => (
            <PathwayCard key={i} pathway={pathway} />
          ))}
      </div>

      <TitleDescription title="Yearly" description="" />
      <div className="flex flex-col gap-4">
        {userPathways
          ?.filter((p) => shouldShowToday(p.days))
          .map((pathway, i) => (
            <PathwayCard key={i} pathway={pathway} />
          ))}
      </div>

      <TitleDescription title="Anytime" description="" />
      <div className="flex flex-col gap-4">
        {userPathways
          ?.filter((p) => shouldShowToday(p.days))
          .map((pathway, i) => (
            <PathwayCard key={i} pathway={pathway} />
          ))}
      </div>
    </div>
  );
});

export default TodayPage;
