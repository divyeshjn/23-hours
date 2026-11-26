import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef
} from "react";

import { settingsService } from "../services/settingsService";

export const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const savingRef = useRef(false);

  const loadSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await settingsService.getSettings();

      setSettings(data);

    } catch (error) {
      setError(error.message);

    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  async function executeUpdate(operation) {
    if (savingRef.current) {
      return false;
    }

    try {
      savingRef.current = true;

      setSaving(true);
      setError(null);

      const updatedSettings = await operation();

      setSettings(updatedSettings);

      return true;

    } catch (error) {
      setError(error.message);

      return false;

    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  }

  function updateTargets(targets) {
    return executeUpdate(() =>
      settingsService.updateTargets(targets)
    );
  }

  function addHabit(habit) {
    return executeUpdate(() =>
      settingsService.createHabit(habit)
    );
  }

  function updateHabit(id, habit) {
    return executeUpdate(() =>
      settingsService.updateHabit(id, habit)
    );
  }

  function deleteHabit(id) {
    return executeUpdate(() =>
      settingsService.deleteHabit(id)
    );
  }

  function updatePreferences(preferences) {
    return executeUpdate(() =>
      settingsService.updatePreferences(preferences)
    );
  }

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        saving,
        error,
        loadSettings,
        updateTargets,
        addHabit,
        updateHabit,
        deleteHabit,
        updatePreferences
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}