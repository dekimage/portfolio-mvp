import { Toaster } from "./components/ui-toaster";

export default function StickerHabitsLayout({ children }) {
  return (
    <div>
      {children}
      <Toaster />
    </div>
  );
}
