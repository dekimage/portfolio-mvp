"use client";

import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { VerticalNavbar } from "./VerticalNavbar";

import {
  BookOpen,
  CalendarCheck,
  Gamepad2,
  GaugeCircle,
  ImagePlus,
  LayoutDashboard,
  ListMinus,
  Plus,
  Search,
  Settings,
  Store,
  User,
} from "lucide-react";
import MobxStore from "../mobx";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { observer } from "mobx-react";
import { UserNav } from "./ReusableProfileMenu";
import Image from "next/image";
import logoImg from "../assets/story-rpg-logo.png";
import MobileHeader from "./MobileHeader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ModeToggle } from "@/components/ui/themeButton";

const defaultLayout = [20, 80];

const CreateListDialog = () => {
  const [listName, setListName] = useState("");
  const { addList } = MobxStore;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus size={16} className="mr-2" /> Create List
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New List</DialogTitle>
          <DialogDescription>
            Store different pathways across custom lists.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">List Name</Label>
              <Input
                id="name"
                placeholder="Morning Routine"
                onChange={(e) => setListName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowDialog(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => {
              // setShowDialog(false);
              addList(listName);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ReusableLayout = observer(({ children }) => {
  const { user, lists, logout } = MobxStore;

  const pathname = usePathname();
  const isRoute = (route) => {
    if (route === "story-rpg") {
      return pathname.toLowerCase() === `/${route.toLowerCase()}`
        ? "default"
        : "ghost";
    }

    return pathname.toLowerCase().includes(route.toLowerCase())
      ? "default"
      : "ghost";
  };

  return (
    <div>
      <div className="hidden sm:block">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full max-h-[950px] items-stretch"
        >
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            maxSize={20}
            className="max-w-[200px] min-w-[200px] h-[950px]"
          >
            <div className="flex h-[52px] items-center justify-center px-2">
              <Image src={logoImg} width={32} height={32} alt="logo" />
              <div className="text-2xl font-bold ml-1">Story RPG</div>
            </div>
            <Separator />
            <VerticalNavbar
              links={[
                {
                  title: "Projects",
                  icon: BookOpen,
                  variant: isRoute("story-rpg"),
                  href: "story-rpg",
                },
                {
                  title: "Games",
                  icon: Gamepad2,
                  variant: isRoute("Games"),
                  href: "story-rpg/games",
                },
                {
                  title: "Marketplace",
                  icon: Store,
                  variant: isRoute("Marketplace"),
                  href: "story-rpg/marketplace",
                },
                {
                  title: "Assets",
                  icon: ImagePlus,
                  variant: isRoute("Analytics"),
                  href: "story-rpg/analytics",
                },
                {
                  title: "Profile",
                  icon: User,
                  variant: isRoute("Profile"),
                  href: "story-rpg/profile",
                },
                {
                  title: "Settings",
                  icon: Settings,
                  variant: isRoute("Settings"),
                  href: "story-rpg/settings",
                },
              ]}
            />
            <Separator />
            <div className="flex justify-center items-center w-[185px] m-2">
              <CreateListDialog />
            </div>

            {/* {lists.length > 0 && (
              <VerticalNavbar
                links={lists.map((list) => ({
                  title: list.name,
                  icon: ListMinus,
                  variant: isRoute(list.id),
                  href: `story-rpg/list/${list.id}`,
                }))}
              />
            )} */}
          </ResizablePanel>

          <ResizablePanel
            className="border-l border-gray-[#e5e7eb]"
            defaultSize={defaultLayout[1]}
            minSize={30}
            style={{ overflow: "auto" }}
          >
            <div>
              <div className="w-full h-[53px] flex justify-end items-center p-2 border-b gap-4">
                {user ? (
                  <>
                    {/* <Link href="/story-rpg/new-pathway">
                      <Button>
                        <Plus size={16} className="mr-2" /> Create Pathway
                      </Button>
                    </Link> */}
                    <ModeToggle />
                    <UserNav user={user} logout={logout} />
                  </>
                ) : (
                  <div className="flex gap-2">
                    <Link href="/story-rpg/login">
                      <Button variant="outline">Login</Button>
                    </Link>
                    <Link href="/story-rpg/signup">
                      <Button>Create Free Account</Button>
                    </Link>
                  </div>
                )}
              </div>
              <div className="">{children}</div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="block sm:hidden">
        <MobileHeader />
        {children}
      </div>
    </div>
  );
});

export default ReusableLayout;
