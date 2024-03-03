import type { GameReducerAction, GameReducerState } from "../types";

export const initialGameReducerState = {
  isRetrievingChallenge: true,
  allowedToPlayChallenge: true,
  error: null,
  wordTyped: "",
  hasUserWonChallenge: false,
  challenge: null,
  guessesAmount: 0,
} satisfies GameReducerState;

export default function (state: GameReducerState, action: GameReducerAction) {
  switch (action.type) {
    case "UPDATE_LOADING": {
      const { payload: updatedLoadingState } = action;
      return {
        ...state,
        isRetrievingChallenge: updatedLoadingState,
      };
    }

    case "ALLOWED_TO_PLAY": {
      const { payload: allowedToPlay } = action;
      return {
        ...state,
        allowedToPlayChallenge: allowedToPlay,
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

    case "UPDATE_CURRENT_GUESS": {
      const { payload: updatedCurrentGuess } = action;

      return {
        ...state,
        wordTyped: updatedCurrentGuess,
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

    case "RESET_WORD_TYPED": {
      return {
        ...state,
        wordTyped: "",
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

    default: {
      return state;
    }
  }
}
