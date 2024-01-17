"use client";

import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { VerticalNavbar } from "./VerticalNavbar";

import { Gamepad2, GaugeCircle, LayoutDashboard, Search } from "lucide-react";
import MobxStore from "../mobx";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { observer } from "mobx-react";
import { LoadingSpinner } from "./LoadingSpinner";
import { UserNav } from "./ReusableProfileMenu";
import Image from "next/image";
import logoImg from "../assets/pathway-logo.png";
import streakImg from "../assets/streak.png";
import coinImg from "../assets/coin.png";
import MobileHeader from "./MobileHeader";

const defaultLayout = [20, 80];

const ReusableLayout = observer(({ children }) => {
  const handleSignIn = async () => {
    await MobxStore.signInAnonymously();
  };
  const pathname = usePathname();
  const isRoute = (route) => {
    return pathname.endsWith(route.toLowerCase()) ? "default" : "ghost";
  };

  const user = MobxStore.user;

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
              <div className="text-2xl font-bold ml-1">PathWays</div>
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
                  + Create List
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
            <div>
              {/* {MobxStore.loading ? (
              <LoadingSpinner />
            ) : (
              <div>
              {MobxStore.user ? (
                  <p>Logo</p>
                ) : (
                  <div>
                    <Button onClick={handleSignIn}>Sign In Anonymously</Button>
                  </div>
                )}
              </div>
            )} */}

              <div className="w-full h-[53px] flex justify-end items-center p-2 border-b border-gray-200 gap-4">
                <div className="flex items-center gap-1">
                  {MobxStore.user?.streak || 0}{" "}
                  <Image src={streakImg} width={20} height={20} alt="streak" />
                </div>
                <div className="flex items-center gap-1">
                  {" "}
                  {MobxStore.user?.gold}{" "}
                  <Image src={coinImg} width={28} height={28} alt="coin" />
                </div>
                <Link href="/quests-builder/new-pathway">
                  <Button>+ Create New</Button>
                </Link>
                {user ? <UserNav user={user} /> : <div>Sign In</div>}
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
