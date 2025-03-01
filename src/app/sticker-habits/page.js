"use client";
import { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {
  getHabits,
  addHabit,
  getTrackers,
  addTracker,
  updateTracker,
  deleteTracker,
} from "./utils/storage";
import HabitEditor from "./components/HabitEditor";
import A4Preview from "./components/A4Preview";
import CreateHabitDialog from "./components/CreateHabitDialog";
import SavedTrackers from "./components/SavedTrackers";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Printer, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function StickerHabits() {
  const [habits, setHabits] = useState([]);
  const [trackers, setTrackers] = useState([]);
  const [currentTracker, setCurrentTracker] = useState({
    id: null,
    name: "",
    habits: [],
  });
  const previewRef = useRef(null);
  const { toast } = useToast();

  // Load habits and trackers from local storage
  useEffect(() => {
    setHabits(getHabits());
    setTrackers(getTrackers());
  }, []);

  // Handle adding a new habit
  const handleSaveHabit = (newHabit) => {
    const updatedHabits = addHabit(newHabit);
    setHabits(updatedHabits);
    toast({
      title: "Habit Created",
      description: `${newHabit.name} has been added to your habits.`,
    });
  };

  // Handle adding a habit to the current tracker
  const handleAddHabitToTracker = (habit) => {
    // Check if habit already exists in tracker
    const existingHabit = currentTracker.habits.find((h) => h.id === habit.id);

    if (existingHabit) {
      // Update existing habit
      const updatedHabits = currentTracker.habits.map((h) =>
        h.id === habit.id
          ? { ...h, quantity: habit.quantity, timing: habit.timing }
          : h
      );
      setCurrentTracker({ ...currentTracker, habits: updatedHabits });
    } else {
      // Add new habit
      setCurrentTracker({
        ...currentTracker,
        habits: [...currentTracker.habits, habit],
      });
    }
  };

  // Handle removing a habit from the current tracker
  const handleRemoveHabit = (habitId) => {
    const updatedHabits = currentTracker.habits.filter((h) => h.id !== habitId);
    setCurrentTracker({ ...currentTracker, habits: updatedHabits });
  };

  // Handle saving the current tracker
  const handleSaveTracker = () => {
    if (!currentTracker.name) {
      toast({
        title: "Name Required",
        description: "Please give your tracker a name before saving.",
        variant: "destructive",
      });
      return;
    }

    if (currentTracker.habits.length === 0) {
      toast({
        title: "No Habits Added",
        description: "Please add at least one habit to your tracker.",
        variant: "destructive",
      });
      return;
    }

    let updatedTrackers;
    if (currentTracker.id) {
      // Update existing tracker
      updatedTrackers = updateTracker(currentTracker.id, currentTracker);
      toast({
        title: "Tracker Updated",
        description: `${currentTracker.name} has been updated.`,
      });
    } else {
      // Add new tracker
      updatedTrackers = addTracker(currentTracker);
      toast({
        title: "Tracker Saved",
        description: `${currentTracker.name} has been saved to your trackers.`,
      });
    }

    setTrackers(updatedTrackers);
  };

  // Handle creating a new tracker
  const handleNewTracker = () => {
    setCurrentTracker({
      id: null,
      name: "",
      habits: [],
    });
  };

  // Handle loading a saved tracker
  const handleLoadTracker = (trackerId) => {
    const tracker = trackers.find((t) => t.id === trackerId);
    if (tracker) {
      setCurrentTracker(tracker);
    }
  };

  // Handle deleting a tracker
  const handleDeleteTracker = (trackerId) => {
    const updatedTrackers = deleteTracker(trackerId);
    setTrackers(updatedTrackers);

    // If the current tracker is deleted, reset to a new tracker
    if (currentTracker.id === trackerId) {
      handleNewTracker();
    }

    toast({
      title: "Tracker Deleted",
      description: "The tracker has been deleted.",
    });
  };

  // Handle printing a tracker
  const handlePrintTracker = async (trackerId) => {
    // If trackerId is provided, load that tracker first
    if (trackerId && trackerId !== currentTracker.id) {
      handleLoadTracker(trackerId);
      // Need to wait for state update before printing
      setTimeout(() => generatePDF(), 100);
    } else {
      generatePDF();
    }
  };

  // Generate PDF from the preview
  const generatePDF = async () => {
    if (!previewRef.current) return;

    try {
      toast({
        title: "Generating PDF",
        description: "Please wait while we prepare your tracker...",
      });

      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // A4 dimensions: 210 x 297 mm
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save(`${currentTracker.name || "habit-tracker"}.pdf`);

      toast({
        title: "PDF Generated",
        description: "Your tracker has been downloaded as a PDF.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "There was a problem generating your PDF.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Habit Stickers Tracker</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Editor */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleNewTracker} variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Tracker
            </Button>

            <SavedTrackers
              trackers={trackers}
              onLoadTracker={handleLoadTracker}
              onDeleteTracker={handleDeleteTracker}
              onPrintTracker={handlePrintTracker}
            />

            <CreateHabitDialog onSaveHabit={handleSaveHabit} />
          </div>

          <Separator />

          <HabitEditor
            habits={habits}
            trackerName={currentTracker.name}
            onTrackerNameChange={(name) =>
              setCurrentTracker({ ...currentTracker, name })
            }
            onAddHabitToTracker={handleAddHabitToTracker}
          />

          <div className="flex gap-3">
            <Button onClick={handleSaveTracker} className="flex-1">
              <Save className="mr-2 h-4 w-4" />
              Save Tracker
            </Button>
            <Button onClick={generatePDF} variant="outline" className="flex-1">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="w-full lg:w-2/3 overflow-auto">
          <div className="sticky top-0 bg-background z-10 py-2 mb-4">
            <h2 className="text-xl font-semibold">Preview</h2>
            <p className="text-sm text-muted-foreground">
              Click on a habit sticker to remove it from the tracker
            </p>
          </div>

          <div className="max-h-[800px] overflow-auto">
            <A4Preview
              trackerName={currentTracker.name}
              selectedHabits={currentTracker.habits}
              onRemoveHabit={handleRemoveHabit}
              previewRef={previewRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
