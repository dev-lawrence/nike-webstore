import { useState, useEffect } from 'react';

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
      const storedItems = window.localStorage.getItem(key);
      return storedItems ? JSON.parse(storedItems) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  // save items to local storage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
