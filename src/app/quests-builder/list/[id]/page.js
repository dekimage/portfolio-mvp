"use client";
import { observer } from "mobx-react";
import MobxStore from "../../mobx";
import { PathwayCard, PathwayPlayer, TitleDescription } from "../../page";
import { PodcastEmptyPlaceholder } from "../../components/EmptyList";
import { MoreVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Combobox } from "../../components/ComboBox";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { set } from "date-fns";

const CustomListPage = observer(({ params }) => {
  const {
    userPathways,
    pathwayPlaying,
    findPathwaysByListId,
    addPathwayToList,
    lists,
    deleteList,
    editListName,
  } = MobxStore;
  const [showDialog, setShowDialog] = useState(false);
  const [showEditListDialog, setShowEditListDialog] = useState(false);

  const listId = params.id;
  const list = lists.filter((list) => list.id === listId)[0];
  const listPathways = findPathwaysByListId(listId);

  const [listName, setListName] = useState(list?.name || "New List");

  const onListNameChange = (e) => {
    setListName(e.target.value);
  };

  const [isPathwayListEditNameDialogOpen, setIsPathwayListEditNameDialogOpen] =
    useState(false);

  const userPathwaysInCombobox = userPathways
    .filter((p) => !listPathways.some((lp) => lp.id === p.id))
    .map((pathway) => ({
      id: pathway.id,
      label: `${pathway.emoji} ${pathway.name}`,
      value: pathway.name,
    }));

  const [selectedPathway, setSelectedPathway] = useState(
    userPathwaysInCombobox[0]
  );

  // THIS SETS IT TO DEFAULT CORRECTLY 1ST PATHWAY BUT PRODUCES BUG
  // useEffect(() => {
  //   if (
  //     userPathwaysInCombobox.length > 0 &&
  //     selectedPathway?.id !== userPathwaysInCombobox[0].id
  //   ) {
  //     setSelectedPathway(userPathwaysInCombobox[0]);
  //   }
  // }, [userPathwaysInCombobox, selectedPathway]);

  if (pathwayPlaying) {
    return <PathwayPlayer pathway={pathwayPlaying} />;
  }

  const router = useRouter();

  const AddPathway = ({ trigger }) => {
    return (
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
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
    );
  };

  return (
    <div className="h-[90vh] m-4 sm:mx-8">
      <TitleDescription
        title={list?.name}
        button={
          <div>
            <Dialog
              open={showEditListDialog}
              onOpenChange={setShowEditListDialog}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="p-2 mr-2">
                    <HiOutlineCog6Tooth className="h-4 w-4" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <DialogTrigger className="w-full flex">
                      Edit List
                    </DialogTrigger>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      deleteList(listId);
                      router.push("/quests-builder");
                    }}
                  >
                    Delete List
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* 🔴 DialogContent ouside of DropdownMenuContent */}
              <DialogContent>
                {/* DELETE LIST DIALOG ----> */}
                {/* <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    Do you want to delete the entry? Deleting this entry cannot
                    be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button>Delete</Button>
                </DialogFooter> */}
                <DialogHeader>
                  <DialogTitle>Edit List Name</DialogTitle>
                  <DialogDescription>
                    Choose a name for your list.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      onChange={onListNameChange}
                      defaultValue={list?.name}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={listName === list?.name}
                    onClick={() => {
                      editListName(listId, listName);
                      setShowEditListDialog(false);
                    }}
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button onClick={() => setShowDialog(true)}>
              <Plus size={16} className="mr-2" />
              Add Pathway
            </Button>
          </div>
        }
      />
      {!listPathways.length && (
        <PodcastEmptyPlaceholder
          title="Your List is Empty"
          description="Add your first pathway to this list"
        >
          <AddPathway
            trigger={
              <Button onClick={() => setShowDialog(true)}>
                <Plus size={16} className="mr-2" />
                Add Pathway
              </Button>
            }
          />
        </PodcastEmptyPlaceholder>
      )}
      <div className="flex flex-wrap gap-4">
        {listPathways.map((pathway, i) => (
          <PathwayCard key={i} pathway={pathway} listId={listId} />
        ))}
        {listPathways.length > 0 && (
          <AddPathway
            trigger={
              <div className="cursor-pointer hover:bg-gray-100 rounded-lg border bg-card text-card-foreground shadow-sm p-4 w-64 h-[320px] flex flex-col justify-center items-center relative text-gray-400">
                <div className="flex items-center gap-1">
                  <span className="text-2xl">+</span>Add
                </div>
              </div>
            }
          />
        )}
      </div>
    </div>
  );
});

export default CustomListPage;
