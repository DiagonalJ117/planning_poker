import { useState } from "react";

const useSessionStorage = (keyName: string, defaultValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.sessionStorage.getItem(keyName);
      return value ? JSON.parse(value) : defaultValue;
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: any) => {
    try {
      window.sessionStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) { /* empty */ }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useSessionStorage;
