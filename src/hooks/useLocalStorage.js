import { useEffect, useState } from "react";

function getSavedValue(key, initValue) {
  const savedValue = JSON.parse(localStorage.getItem(key));

  if (savedValue) return savedValue;
  if (initValue instanceof Function) return initValue();
  return initValue;
}

export default function useLocalStorage(key, initValue) {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initValue);
  });

  useEffect(() => {
    if (value instanceof Array && value.length >= 3) {
      localStorage.setItem(key, JSON.stringify(value.slice(0, 3)));
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
