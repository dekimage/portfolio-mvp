"use client";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// A4 dimensions in mm
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

// Convert to pixels (assuming 96 DPI)
const MM_TO_PX = 3.78; // 96 DPI / 25.4 mm per inch
const A4_WIDTH_PX = A4_WIDTH_MM * MM_TO_PX;
const A4_HEIGHT_PX = A4_HEIGHT_MM * MM_TO_PX;

const A4Preview = ({
  trackerName,
  selectedHabits,
  onRemoveHabit,
  previewRef,
}) => {
  // Group habits by timing
  const morningHabits = selectedHabits.filter((h) => h.timing === "morning");
  const afternoonHabits = selectedHabits.filter(
    (h) => h.timing === "afternoon"
  );
  const nightHabits = selectedHabits.filter((h) => h.timing === "night");

  return (
    <div className="flex justify-center">
      <Card
        ref={previewRef}
        className="bg-white shadow-sm overflow-hidden"
        style={{
          width: `${A4_WIDTH_PX}px`,
          height: `${A4_HEIGHT_PX}px`,
          padding: "20px",
        }}
      >
        {/* Tracker Name */}
        <h1 className="text-2xl font-bold text-center mb-6">
          {trackerName || "My Habit Tracker"}
        </h1>

        {/* Morning Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">Morning</h2>
          <Separator className="mb-4" />
          <div className="flex flex-wrap gap-3">
            {morningHabits.map((habit) =>
              Array.from({ length: habit.quantity || 1 }).map((_, index) => (
                <div
                  key={`${habit.id}-${index}`}
                  className="flex items-center justify-center p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                  onClick={() => onRemoveHabit(habit.id)}
                  title={`${habit.name} - ${habit.description}`}
                >
                  <span className="text-2xl">{habit.emoji}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Afternoon Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-amber-600">
            Afternoon
          </h2>
          <Separator className="mb-4" />
          <div className="flex flex-wrap gap-3">
            {afternoonHabits.map((habit) =>
              Array.from({ length: habit.quantity || 1 }).map((_, index) => (
                <div
                  key={`${habit.id}-${index}`}
                  className="flex items-center justify-center p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                  onClick={() => onRemoveHabit(habit.id)}
                  title={`${habit.name} - ${habit.description}`}
                >
                  <span className="text-2xl">{habit.emoji}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Night Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-indigo-600">Night</h2>
          <Separator className="mb-4" />
          <div className="flex flex-wrap gap-3">
            {nightHabits.map((habit) =>
              Array.from({ length: habit.quantity || 1 }).map((_, index) => (
                <div
                  key={`${habit.id}-${index}`}
                  className="flex items-center justify-center p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                  onClick={() => onRemoveHabit(habit.id)}
                  title={`${habit.name} - ${habit.description}`}
                >
                  <span className="text-2xl">{habit.emoji}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default A4Preview;
