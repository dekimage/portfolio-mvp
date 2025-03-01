// Local storage keys
const HABITS_KEY = "sticker-habits-habits";
const TRACKERS_KEY = "sticker-habits-trackers";

// Default habits
const DEFAULT_HABITS = [
  {
    id: "1",
    name: "Drink Water",
    description: "Stay hydrated",
    emoji: "💧",
    timing: "morning",
  },
  {
    id: "2",
    name: "Exercise",
    description: "30 minutes workout",
    emoji: "🏋️",
    timing: "morning",
  },
  {
    id: "3",
    name: "Read",
    description: "Read a book",
    emoji: "📚",
    timing: "night",
  },
  {
    id: "4",
    name: "Meditate",
    description: "10 minutes meditation",
    emoji: "🧘",
    timing: "morning",
  },
  {
    id: "5",
    name: "Journal",
    description: "Write in journal",
    emoji: "✏️",
    timing: "night",
  },
  {
    id: "6",
    name: "Healthy Meal",
    description: "Eat a balanced meal",
    emoji: "🥗",
    timing: "afternoon",
  },
  {
    id: "7",
    name: "Walk",
    description: "Take a walk outside",
    emoji: "🚶",
    timing: "afternoon",
  },
  {
    id: "8",
    name: "Sleep Early",
    description: "Go to bed before 11pm",
    emoji: "😴",
    timing: "night",
  },
];

// Get habits from local storage or use defaults
export const getHabits = () => {
  if (typeof window === "undefined") return DEFAULT_HABITS;

  const storedHabits = localStorage.getItem(HABITS_KEY);
  if (!storedHabits) {
    localStorage.setItem(HABITS_KEY, JSON.stringify(DEFAULT_HABITS));
    return DEFAULT_HABITS;
  }

  return JSON.parse(storedHabits);
};

// Save habits to local storage
export const saveHabits = (habits) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
};

// Add a new habit
export const addHabit = (habit) => {
  const habits = getHabits();
  const newHabit = {
    ...habit,
    id: Date.now().toString(),
  };
  const updatedHabits = [...habits, newHabit];
  saveHabits(updatedHabits);
  return updatedHabits;
};

// Get trackers from local storage
export const getTrackers = () => {
  if (typeof window === "undefined") return [];

  const storedTrackers = localStorage.getItem(TRACKERS_KEY);
  if (!storedTrackers) {
    localStorage.setItem(TRACKERS_KEY, JSON.stringify([]));
    return [];
  }

  return JSON.parse(storedTrackers);
};

// Save trackers to local storage
export const saveTrackers = (trackers) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TRACKERS_KEY, JSON.stringify(trackers));
};

// Add a new tracker
export const addTracker = (tracker) => {
  const trackers = getTrackers();
  const newTracker = {
    ...tracker,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  const updatedTrackers = [...trackers, newTracker];
  saveTrackers(updatedTrackers);
  return updatedTrackers;
};

// Update an existing tracker
export const updateTracker = (trackerId, updatedTracker) => {
  const trackers = getTrackers();
  const updatedTrackers = trackers.map((tracker) =>
    tracker.id === trackerId ? { ...tracker, ...updatedTracker } : tracker
  );
  saveTrackers(updatedTrackers);
  return updatedTrackers;
};

// Delete a tracker
export const deleteTracker = (trackerId) => {
  const trackers = getTrackers();
  const updatedTrackers = trackers.filter(
    (tracker) => tracker.id !== trackerId
  );
  saveTrackers(updatedTrackers);
  return updatedTrackers;
};
