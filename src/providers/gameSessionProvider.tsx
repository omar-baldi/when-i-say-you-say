/* eslint-disable */
import { createContext, useEffect, useReducer } from "react";
import gameReducer, { initialGameReducerState } from "../reducers/gameReducer";
import type { Challenge } from "../types";

type GameContextOptions = {};

export const GameContext = createContext<GameContextOptions | null>(null);

export default function GameSessionProvider({ children }: { children: React.ReactNode }) {
  const [gameState, updateGameState] = useReducer(gameReducer, initialGameReducerState);

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
