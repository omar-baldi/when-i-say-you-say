/* eslint-disable */
import { createContext, useEffect, useReducer } from "react";
import type { Challenge, GameReducerAction, GameReducerState } from "../types";

type GameContextOptions = {};

export const GameContext = createContext<GameContextOptions | null>(null);

const initialGameReducerState = {
  isRetrievingChallenge: true,
  error: null,
  wordTyped: "",
  hasUserWonChallenge: false,
  hasUserLostChallenge: false,
  challenge: null,
  guessesAmount: 0,
} satisfies GameReducerState;

export default function GameSessionProvider({ children }: { children: React.ReactNode }) {
  const [gameState, updateGameState] = useReducer(function (
    state: GameReducerState,
    action: GameReducerAction
  ) {
    switch (action.type) {
      case "UPDATE_LOADING": {
        const { payload: updatedLoadingState } = action;
        return {
          ...state,
          isRetrievingChallenge: updatedLoadingState,
        };
      }

      case "UPDATE_ERROR": {
        const { payload: updatedError } = action;
        return {
          ...state,
          error: updatedError,
        };
      }

      case "UPDATE_CHALLENGE": {
        const { payload: updatedChallenge } = action;
        return {
          ...state,
          challenge: updatedChallenge,
        };
      }

      case "ADD_LETTER": {
        const { payload: letterToAdd } = action;
        return {
          ...state,
          wordTyped: state.wordTyped.concat(letterToAdd),
        };
      }

      case "REMOVE_LETTER": {
        return {
          ...state,
          wordTyped: state.wordTyped.slice(0, -1),
        };
      }

      case "INCREASE_AMOUNT_WRONG_GUESSES": {
        return {
          ...state,
          guessesAmount: state.guessesAmount + 1,
        };
      }

      case "SET_USER_WON": {
        return {
          ...state,
          hasUserWonChallenge: true,
        };
      }

      case "SET_USER_LOST": {
        return {
          ...state,
          hasUserLostChallenge: true,
        };
      }

      default: {
        return state;
      }
    }
  },
  initialGameReducerState);

  useEffect(() => {
    const mockDelay = 2000;
    new Promise<Challenge>((resolve) =>
      setTimeout(async function () {
        const challenges = (await import("../json/words.json")).default;
        const randomNumber = Math.floor(Math.random() * challenges.length);
        const randomChallenge = challenges[randomNumber];

        resolve(randomChallenge);
      }, mockDelay)
    )
      .then((challenge) =>
        updateGameState({ type: "UPDATE_CHALLENGE", payload: challenge })
      )
      .catch((error) => updateGameState({ type: "UPDATE_ERROR", payload: error }))
      .finally(() => updateGameState({ type: "UPDATE_LOADING", payload: false }));
  }, []);

  const content = gameState.isRetrievingChallenge ? (
    <h3>Retrieving challenge for you...</h3>
  ) : gameState.error ? (
    <h3>Unfortunately we could not retrieve a challenge. Try it again later!</h3>
  ) : (
    children
  );

  return <GameContext.Provider value={{}}>{content}</GameContext.Provider>;
}
