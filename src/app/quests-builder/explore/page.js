"use client";
import { observer } from "mobx-react";
import { useState } from "react";
import MobxStore from "../mobx";
import { HorizontalPathwaysList, PathwayPlayer } from "../page";

const ExplorePage = observer(() => {
  const { pathwayPlaying } = MobxStore;

  if (pathwayPlaying) {
    return <PathwayPlayer pathway={pathwayPlaying} />;
  }
  return (
    <div className="mx-4">
      <HorizontalPathwaysList
        pathways={MobxStore.pathways}
        title="Community Pathways"
        description="Explore what others have built"
      />
    </div>
  );
});

export default ExplorePage;
