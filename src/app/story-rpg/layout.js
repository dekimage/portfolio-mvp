"use client";
import ReusableLayout from "./components/ReusableLayout";

import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <div>
      <ReusableLayout>{children}</ReusableLayout>
    </div>
  );
}
