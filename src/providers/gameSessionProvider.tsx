/* eslint-disable */
import { createContext, useEffect, useReducer } from "react";

export type APIReducerState = {
  isLoading: boolean;
  error: Error | null;
  challenge: Challenge | null;
};

export type Challenge = {
  clue: string;
  answer: string;
};

type GameContextOptions = {};

export const GameContext = createContext<GameContextOptions | null>(null);

const initialApiReducerState = {
  isLoading: true,
  error: null,
  challenge: null,
} satisfies APIReducerState;

export default function GameSessionProvider({ children }: { children: React.ReactNode }) {
  const [apiState, updateAPIState] = useReducer(function (
    state: APIReducerState,
    updatedState: Partial<APIReducerState>
  ) {
    return {
      ...state,
      ...updatedState,
    };
  },
  initialApiReducerState);

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
      .then((challenge) => updateAPIState({ challenge }))
      .catch((error) => updateAPIState({ error }))
      .finally(() => updateAPIState({ isLoading: false }));
  }, []);

  const content = apiState.isLoading ? (
    <h3>Retrieving challenge for you...</h3>
  ) : apiState.error ? (
    <h3>Unfortunately we could not retrieve a challenge. Try it again later!</h3>
  ) : (
    children
  );

  return <GameContext.Provider value={{}}>{content}</GameContext.Provider>;
}
