"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";

// Common emojis for habits
const COMMON_EMOJIS = [
  "💧",
  "🏋️",
  "📚",
  "🧘",
  "✏️",
  "🥗",
  "🚶",
  "😴",
  "🧹",
  "🧠",
  "🎯",
  "🎨",
  "🎸",
  "🧩",
  "🌱",
  "🍎",
  "💊",
  "🚿",
  "🦷",
  "💤",
  "🧺",
  "📱",
  "💻",
  "📝",
  "🧼",
  "🧴",
  "🥤",
  "🍵",
  "☕",
  "🧃",
];

const CreateHabitDialog = ({ onSaveHabit }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("");
  const [timing, setTiming] = useState("morning");

  const handleSave = () => {
    if (!name || !emoji) return;

    onSaveHabit({
      name,
      description,
      emoji,
      timing,
    });

    // Reset form and close dialog
    setName("");
    setDescription("");
    setEmoji("");
    setTiming("morning");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Habit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Habit</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="habit-name">Habit Name</Label>
            <Input
              id="habit-name"
              placeholder="e.g., Drink Water"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="habit-description">Description</Label>
            <Textarea
              id="habit-description"
              placeholder="e.g., Drink 8 glasses of water"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Emoji</Label>
            <div className="grid grid-cols-10 gap-2 p-2 border rounded-md">
              {COMMON_EMOJIS.map((e) => (
                <button
                  key={e}
                  type="button"
                  className={`text-2xl p-1 rounded-md hover:bg-gray-100 ${
                    emoji === e ? "bg-gray-200" : ""
                  }`}
                  onClick={() => setEmoji(e)}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="habit-timing">Default Timing</Label>
            <Select value={timing} onValueChange={setTiming}>
              <SelectTrigger id="habit-timing">
                <SelectValue placeholder="Select timing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning</SelectItem>
                <SelectItem value="afternoon">Afternoon</SelectItem>
                <SelectItem value="night">Night</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={!name || !emoji}>
            Save Habit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateHabitDialog;
