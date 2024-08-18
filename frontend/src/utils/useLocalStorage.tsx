import { useState } from "react";

const useLocalStorage = (keyName: string, defaultValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      return value ? JSON.parse(value) : defaultValue;
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: any) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) { /* empty */ }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
