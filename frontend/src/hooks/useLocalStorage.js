import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);

      return stored !== null
        ? JSON.parse(stored)
        : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(value)
      );
    } catch (error) {
      console.error("Unable to save data:", error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;