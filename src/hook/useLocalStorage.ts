import { useEffect, useState } from "react";

/**
 * @description Custom hook responsible
 * for storing a specific value and retrieving it
 */
export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [storageValue, setStorageValue] = useState<T>(() => getStorageValue(key));

  function getStorageValue(key: string): T {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : defaultValue;
    } catch (err) {
      return defaultValue;
    }
  }

  function updateStorageValue(value: T) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setStorageValue(value);
    } catch (err) {
      console.error(`Cannot set new value for following storage key: ${key}`);
    }
  }

  useEffect(() => {
    setStorageValue(getStorageValue(key));
  }, [key]);

  return [storageValue, updateStorageValue] as const;
};

/* 

    const key = "userGameSession";
    const [storageValue, updateStorageValue] = useLocalStorage(key, );


    updateStorageValue({

    })

*/
