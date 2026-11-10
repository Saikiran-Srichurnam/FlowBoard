
import { createContext, useContext, useEffect, useState } from "react";

const ActivityContext = createContext();

export function ActivityProvider({ children }) {
  const [activities, setActivities] = useState(() => {
    try {
      const saved = localStorage.getItem("myActivities");

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Error loading activities from localStorage:", error);
      localStorage.removeItem("myActivities");
    }

    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem("myActivities", JSON.stringify(activities));
    } catch (error) {
      console.error("Error saving activities to localStorage:", error);
    }
  }, [activities]);

  const addActivity = (text, task) => {
    const activity = {
      id: `${Date.now()}-${Math.random()}`,
      text,
      task,
      timestamp: new Date().toISOString(),
    };

    setActivities((previous) => [activity, ...previous].slice(0, 20));
  };

  return (
    <ActivityContext.Provider value={{ activities, addActivity }}>
      {children}
    </ActivityContext.Provider>
  );
}

export const useActivity = () => {
  const context = useContext(ActivityContext);

  if (!context) {
    throw new Error("useActivity must be used within ActivityProvider");
  }

  return context;
};
