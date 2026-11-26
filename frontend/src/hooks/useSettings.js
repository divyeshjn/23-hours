import useLocalStorage from "./useLocalStorage";

import { DEFAULT_TARGETS } from "../constants/nutrition";
import { DEFAULT_HABITS } from "../constants/habits";

const DEFAULT_SETTINGS = {
  targets: DEFAULT_TARGETS,
  habits: DEFAULT_HABITS
};

function useSettings() {
  const [settings, setSettings] = useLocalStorage(
    "23-hours:settings",
    DEFAULT_SETTINGS
  );

  function updateTargets(targets) {
    setSettings(previous => ({
      ...previous,
      targets: {
        ...previous.targets,
        ...targets
      }
    }));
  }

  function addHabit(habit) {
    setSettings(previous => ({
      ...previous,
      habits: [
        ...previous.habits,
        {
          ...habit,
          id: crypto.randomUUID()
        }
      ]
    }));
  }

  function updateHabit(id, habit) {
    setSettings(previous => ({
      ...previous,
      habits: previous.habits.map(item =>
        item.id === id
          ? { ...item, ...habit, id }
          : item
      )
    }));
  }

  function deleteHabit(id) {
    setSettings(previous => ({
      ...previous,
      habits: previous.habits.filter(
        habit => habit.id !== id
      )
    }));
  }

  return {
    settings,
    updateTargets,
    addHabit,
    updateHabit,
    deleteHabit
  };
}

export default useSettings;