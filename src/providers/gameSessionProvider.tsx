/* eslint-disable */
import { createContext, useEffect, useReducer } from "react";
import { MILLISECONDS_IN_A_DAY } from "../constants";
import { useLocalStorage } from "../hook/useLocalStorage";
import gameReducer, { initialGameReducerState } from "../reducers/gameReducer";
import type {
  Challenge,
  GameReducerAction,
  GameReducerState,
  GameSessionStorage,
} from "../types";

type GameContextOptions = {
  gameState: GameReducerState;
  updateGameState: React.Dispatch<GameReducerAction>;
};

export const GameContext = createContext<GameContextOptions | null>(null);

export default function GameSessionProvider({ children }: { children: React.ReactNode }) {
  const [gameState, updateGameState] = useReducer(gameReducer, initialGameReducerState);

  //!NOTE: lastSessionPlayed is only set when either the user has won or when he lost
  const [gameSessionStorage, updateGameSessionStorage] =
    useLocalStorage<GameSessionStorage>("gameSession", {
      lastSessionPlayedDate: null,
      streak: 0,
      challengesWon: [],
    });

  //!NOTE: update dependencies array to include "allowedToPlayChallenge"
  //!NOTE: otherwise when countdown finishes he will not be able to play game
  useEffect(() => {
    if (!gameState.allowedToPlayChallenge) return;

    /**
     * Before retrieving the challenge, I need to make
     * sure that the user is not playing if the last session
     * played was less than a day ago.
     *
     * If less than a day ago -> we inform the user that he needs to wait
     * and we show a countdown of the time remaining.
     *
     * If no value is found or more than a day ago -> we continue with
     * retrieving the challenge.
     */

    if (gameSessionStorage.lastSessionPlayedDate) {
      const today = new Date();
      const lastSessionPlayedDate =
        new Date(gameSessionStorage.lastSessionPlayedDate) ?? new Date();
      const millisecondsDifference = today.getTime() - lastSessionPlayedDate.getTime();

      /**
       * TODO: better description
       * We calculate the difference in milliseconds
       * as we want to prevent the user from accessing
       * the challenge even if a millisecond have passed.
       * Using seconds or minutes or hours is not suitable in this case.
       */
      if (millisecondsDifference > 0 && millisecondsDifference < MILLISECONDS_IN_A_DAY) {
        updateGameState({ type: "ALLOWED_TO_PLAY", payload: false });
        return;
      }

      updateGameSessionStorage({
        ...gameSessionStorage,
        lastSessionPlayedDate: null,
      });
    }

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
  }, [gameState.allowedToPlayChallenge]);

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
      {children}
    </GameContext.Provider>
  );
}
