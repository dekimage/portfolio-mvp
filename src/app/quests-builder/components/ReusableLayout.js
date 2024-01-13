"use client";

import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { VerticalNavbar } from "./VerticalNavbar";
import { cn } from "@/lib/utils";
import { useState } from "react";

import {
  Boxes,
  Gamepad2,
  GaugeCircle,
  LayoutDashboard,
  Search,
  Settings,
  User,
} from "lucide-react";
import MobxStore from "../mobx";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { observer } from "mobx-react";
import { LoadingSpinner } from "./LoadingSpinner";

const defaultLayout = [20, 80];

const ReusableLayout = observer(({ children }) => {
  const handleSignIn = async () => {
    await MobxStore.signInAnonymously();
  };
  const pathname = usePathname();

  const isRoute = (route) => {
    return pathname.endsWith(route.toLowerCase()) ? "default" : "ghost";
  };

  return (
    <div>
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
            {MobxStore.loading ? (
              <LoadingSpinner />
            ) : (
              <div>
                {MobxStore.user ? (
                  <p>
                    User:
                    {MobxStore.user.gold} 🥮
                  </p>
                ) : (
                  <div>
                    <Button onClick={handleSignIn}>Sign In Anonymously</Button>
                  </div>
                )}
              </div>
            )}
          </div>
          <Separator />
          <VerticalNavbar
            links={[
              {
                title: "Dashboard",
                icon: LayoutDashboard,
                variant: isRoute("quests-builder"),
                href: "quests-builder",
              },
              {
                title: "Explore",
                icon: Search,
                variant: isRoute("Explore"),
                href: "quests-builder/explore",
              },
              {
                title: "Analytics",
                icon: GaugeCircle,
                variant: isRoute("Analytics"),
                href: "quests-builder/analytics",
              },
              {
                title: "Gamify",
                icon: Gamepad2,
                variant: isRoute("Gamify"),
                href: "quests-builder/gamify",
              },
              // {
              //   title: "Collection",
              //   icon: Boxes,
              //   variant: isRoute("Collection"),
              //   href: "quests-builder/collection",
              // },
              // {
              //   title: "Profile",
              //   icon: User,
              //   variant: isRoute("Profile"),
              //   href: "quests-builder/profile",
              // },
              // {
              //   title: "Settings",
              //   icon: Settings,
              //   variant: isRoute("Settings"),
              //   href: "quests-builder/settings",
              // },
            ]}
          />
          <Separator />
          <div className="flex justify-center items-center w-[185px] m-2">
            <Link href="/quests-builder/new-pathway" className="w-full">
              <Button variant="outline" className="w-full">
                + Create Pathway
              </Button>
            </Link>
          </div>
        </ResizablePanel>
        {/* <ResizableHandle /> */}
        <ResizablePanel
          className="border-l border-gray-[#e5e7eb]"
          defaultSize={defaultLayout[1]}
          minSize={30}
          style={{ overflow: "auto" }}
        >
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
});

export default ReusableLayout;
