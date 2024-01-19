"use client";
import { observer } from "mobx-react";
import MobxStore from "../mobx";
import {
  HorizontalPathwaysList,
  PathwayCard,
  PathwayPlayer,
  TitleDescription,
} from "../page";

const TodayPage = observer(() => {
  const { userPathways, pathwayPlaying, loading } = MobxStore;

  if (pathwayPlaying) {
    return <PathwayPlayer pathway={pathwayPlaying} />;
  }

  return (
    <div className="mx-4">
      <TitleDescription
        title="Today's Pathways"
        description="Start your day with fresh pathways"
      />
      <div className="flex flex-col gap-4">
        {userPathways?.map((pathway, i) => (
          <PathwayCard key={i} pathway={pathway} />
        ))}
      </div>
    </div>
  );
});

export default TodayPage;
