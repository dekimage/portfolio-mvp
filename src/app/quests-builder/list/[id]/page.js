"use client";
import { observer } from "mobx-react";
import MobxStore from "../../mobx";
import { PathwayCard, PathwayPlayer, TitleDescription } from "../../page";
import { PodcastEmptyPlaceholder } from "../../components/EmptyList";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Combobox } from "../../components/ComboBox";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CustomListPage = observer(({ params }) => {
  const {
    userPathways,
    pathwayPlaying,
    findPathwaysByListId,
    addPathwayToList,
  } = MobxStore;
  const [showDialog, setShowDialog] = useState(false);
  const [selectedPathway, setSelectedPathway] = useState(false);

  const listId = params.id;
  const listPathways = findPathwaysByListId(listId);

  if (pathwayPlaying) {
    return <PathwayPlayer pathway={pathwayPlaying} />;
  }

  const userPathwaysInCombobox = userPathways
    .filter((p) => !listPathways.includes(p.id))
    .map((pathway) => ({
      id: pathway.id,
      label: `${pathway.emoji} ${pathway.name}`,
      value: pathway.name,
    }));

  console.log(selectedPathway);

  return (
    <div className="mx-4">
      <TitleDescription
        title="Today's Pathways"
        description="Start your day with fresh pathways"
      />
      {!listPathways.length && (
        <PodcastEmptyPlaceholder
          title="Your List is Empty"
          description="Add your first pathway to this list"
        >
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogTrigger asChild>
              <Button onClick={() => setShowDialog(true)}>
                <Plus size={16} className="mr-2" />
                Add Pathway
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Pathway</DialogTitle>
                <DialogDescription>
                  Select a pathway to add to this list
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Combobox
                    value={
                      selectedPathway?.value || userPathwaysInCombobox[0]?.value
                    }
                    setValue={(value) => {
                      setSelectedPathway(
                        userPathwaysInCombobox.find(
                          (p) => p.value.toLowerCase() === value.toLowerCase()
                        )
                      );
                    }}
                    searchLabel="Pathway"
                    options={userPathwaysInCombobox}
                  />
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setShowDialog(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    addPathwayToList(listId, selectedPathway.id);
                    setShowDialog(false);
                  }}
                >
                  Add
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </PodcastEmptyPlaceholder>
      )}
      <div className="flex flex-col gap-4">
        {listPathways.map((pathway, i) => (
          <PathwayCard key={i} pathway={pathway} />
        ))}
      </div>
    </div>
  );
});

export default CustomListPage;
