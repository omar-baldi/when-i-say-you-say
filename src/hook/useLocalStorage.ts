import { useCallback, useEffect, useState } from "react";

/**
 * @description Custom hook responsible
 * for storing a specific value and retrieving it
 */
export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const getStorageValue = useCallback(
    function () {
      try {
        const v = window.localStorage.getItem(key);
        return v ? JSON.parse(v) : defaultValue;
      } catch (err) {
        return defaultValue;
      }
    },
    [defaultValue, key]
  );

  const [storageValue, setStorageValue] = useState<T>(() => getStorageValue());

  function updateStorageValue(value: T) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setStorageValue(value);
    } catch (err) {
      console.error(`Cannot set new value for following storage key: ${key}`);
    }
  }

  useEffect(() => {
    setStorageValue(getStorageValue());
  }, [getStorageValue]);

  return [storageValue, updateStorageValue] as const;
};

/* 

    const key = "userGameSession";
    const [storageValue, updateStorageValue] = useLocalStorage(key, );


    updateStorageValue({

    })

*/
