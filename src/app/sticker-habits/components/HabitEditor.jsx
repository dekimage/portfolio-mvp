"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

const HabitEditor = ({
  habits,
  trackerName,
  onTrackerNameChange,
  onAddHabitToTracker,
}) => {
  const [selectedHabitId, setSelectedHabitId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [timing, setTiming] = useState("morning");

  const handleAddHabit = () => {
    if (!selectedHabitId) return;

    const habit = habits.find((h) => h.id === selectedHabitId);
    if (!habit) return;

    onAddHabitToTracker({
      ...habit,
      quantity,
      timing,
    });

    // Reset form
    setSelectedHabitId("");
    setQuantity(1);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Make Your Own Habit Stickers Tracker</CardTitle>
        <CardDescription>
          Customize your habit tracker sheet with stickers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tracker Name */}
        <div className="space-y-2">
          <Label htmlFor="tracker-name">Tracker Name</Label>
          <Input
            id="tracker-name"
            placeholder="e.g., Sunday Cleanup Day"
            value={trackerName}
            onChange={(e) => onTrackerNameChange(e.target.value)}
          />
        </div>

        {/* Add Habit Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Add Habit Stickers</h3>

          {/* Habit Selection */}
          <div className="space-y-2">
            <Label htmlFor="habit-select">Select Habit</Label>
            <Select value={selectedHabitId} onValueChange={setSelectedHabitId}>
              <SelectTrigger id="habit-select">
                <SelectValue placeholder="Select a habit" />
              </SelectTrigger>
              <SelectContent>
                {habits.map((habit) => (
                  <SelectItem key={habit.id} value={habit.id}>
                    <div className="flex items-center">
                      <span className="mr-2">{habit.emoji}</span>
                      <span>{habit.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Timing Selection */}
          <div className="space-y-2">
            <Label htmlFor="timing-select">Time of Day</Label>
            <Select value={timing} onValueChange={setTiming}>
              <SelectTrigger id="timing-select">
                <SelectValue placeholder="Select timing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning</SelectItem>
                <SelectItem value="afternoon">Afternoon</SelectItem>
                <SelectItem value="night">Night</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quantity Selection */}
          <div className="space-y-2">
            <Label htmlFor="quantity-input">Quantity</Label>
            <Input
              id="quantity-input"
              type="number"
              min="1"
              max="20"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            />
            <p className="text-sm text-muted-foreground">
              How many times you want to track this habit
            </p>
          </div>

          {/* Add Button */}
          <Button
            onClick={handleAddHabit}
            disabled={!selectedHabitId}
            className="w-full"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Habit to Tracker
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitEditor;
