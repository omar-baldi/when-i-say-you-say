export type Challenge = {
  clue: string;
  answer: string;
};

export type GameReducerState = {
  isRetrievingChallenge: boolean;
  error: Error | null;
  wordTyped: string;
  hasUserWonChallenge: boolean;
  hasUserLostChallenge: boolean;
  challenge: Challenge | null;
  guessesAmount: number;
};

export type GameReducerAction =
  | { type: "UPDATE_LOADING"; payload: boolean }
  | { type: "UPDATE_ERROR"; payload: Error }
  | { type: "UPDATE_CHALLENGE"; payload: Challenge }
  | { type: "ADD_LETTER"; payload: string }
  | { type: "REMOVE_LETTER" }
  | { type: "SET_USER_WON" }
  | { type: "SET_USER_LOST" }
  | { type: "INCREASE_AMOUNT_WRONG_GUESSES" };
