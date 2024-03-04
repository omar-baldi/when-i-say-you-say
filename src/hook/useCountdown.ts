/* eslint-disable */
import { useEffect, useReducer } from "react";

type ReducerState = {
  hours: number;
  minutes: number;
  seconds: number;
};

const initialReducerState = {
  hours: 0,
  minutes: 0,
  seconds: 0,
} satisfies ReducerState;

/**
 * @description Custom hook responsible
 * of calculating days, minutes and seconds
 * remaining from today's Date and a eventDate.
 *
 * TODO: provide optional callback function called "onTimeEnd" so parent element can set "allowedToPlay: true"...
 * TODO: ...as well as setting "lastSessionPlayed: null"
 */
export const useCountdown = (eventDate: Date, cbFunc: () => void) => {
  const [countdownState, updateCountdownState] = useReducer(function (
    state: ReducerState,
    updatedState: Partial<ReducerState>
  ) {
    return {
      ...state,
      ...updatedState,
    };
  },
  initialReducerState);

  useEffect(() => {
    const timeoutAmount = 1000;
    const interval = setInterval(function () {
      const today = new Date();
      const difference = eventDate.getTime() - today.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        cbFunc();
        return;
      }

      const hoursDifference = Math.floor(difference / (1000 * 60 * 60));
      const minutesDifference = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const secondsDifference = Math.floor((difference % (1000 * 60)) / 1000);

      updateCountdownState({
        hours: hoursDifference,
        minutes: minutesDifference,
        seconds: secondsDifference,
      });
    }, timeoutAmount);

    return function () {
      clearInterval(interval);
    };
  }, [eventDate]);

  return {
    ...countdownState,
  };
};
