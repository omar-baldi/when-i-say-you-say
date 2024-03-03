export type Challenge = {
  clue: string;
  answer: string;
};

export type GameReducerState = {
  isRetrievingChallenge: boolean;
  allowedToPlayChallenge: boolean;
  error: Error | null;
  wordTyped: string;
  hasUserWonChallenge: boolean;
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
  | { type: "INCREASE_AMOUNT_WRONG_GUESSES" }
  | { type: "UPDATE_CURRENT_GUESS"; payload: string }
  | { type: "ALLOWED_TO_PLAY"; payload: boolean }
  | { type: "RESET_WORD_TYPED" };

export type ChallengeWonStorage = {
  challenge: Challenge;
  guesses: number;
  date: Date;
};

export type GameSessionStorage = {
  lastSessionPlayedDate: Date | null;
  streak: number;
  challengesWon: ChallengeWonStorage[];
};
