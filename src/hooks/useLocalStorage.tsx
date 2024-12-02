import { useEffect, useState } from "react";

export function useLocalStorage<T>(initialState: [], key: string) {
  const [value, setValue] = useState<T>(function () {
    const storedVal = localStorage.getItem(key);
    return storedVal ? JSON.parse(storedVal) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue] as const;
}
