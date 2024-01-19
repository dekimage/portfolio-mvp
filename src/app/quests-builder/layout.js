"use client";
import HeroSection from "../reusable-ui/HeroSection";
import ReusableLayout from "./components/ReusableLayout";

export const backgroundCover =
  "https://cdn.midjourney.com/e9023bf4-7612-40dc-b88f-2e86b490ea66/0_0.png";
import questsLogo from "./assets/gamified-quests-logo.png";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Or placeholder content for SSR
  }
  return (
    <div>
      {/* <HeroSection bgImg={backgroundCover} logo={questsLogo} /> */}
      <ReusableLayout>{children}</ReusableLayout>
    </div>
  );
}
