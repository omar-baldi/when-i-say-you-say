/* eslint-disable */
import { createContext, useEffect, useReducer } from "react";
import gameReducer, { initialGameReducerState } from "../reducers/gameReducer";
import type { Challenge, GameReducerAction, GameReducerState } from "../types";

type GameContextOptions = {
  gameState: GameReducerState;
  updateGameState: React.Dispatch<GameReducerAction>;
};

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

  /**
   * TODO: feature to implement
   * !NOTE: see consideration below
   * When returning a random word, you're gonna have
   * to using a while loop if the user has already guessed
   * a specific challenge and at the same time keeping
   * track of all random challenges. If going though all the challenges,
   * we then exit the while loop and return a warning label.
   */

  return (
    <GameContext.Provider
      value={{
        gameState,
        updateGameState,
      }}
    >
      {content}
    </GameContext.Provider>
  );
}
