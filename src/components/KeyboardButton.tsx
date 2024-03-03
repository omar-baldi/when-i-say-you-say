import { MAX_ALLOWED_GUESSES_AMOUNT } from "../constants";
import { useGameSession } from "../hook/useGameSession";
import { useLocalStorage } from "../hook/useLocalStorage";
import { GameSessionStorage } from "../types";

export default function KeyboardButton({ letter }: { letter: string }) {
  const { gameState, updateGameState } = useGameSession();
  const { wordTyped, guessesAmount, challenge } = gameState;
  const uppercaseLetter = letter.toUpperCase();
  const [gameSessionStorage, updateGameSessionStorage] =
    useLocalStorage<GameSessionStorage>("gameSession", {
      lastSessionPlayedDate: null,
      streak: 0,
      challengesWon: [],
    });

  //!NOTE: create separate component for "ENTER" and "BACK" to following single responsibility principle
  function handleKeyboardButtonClick() {
    if (uppercaseLetter === "ENTER") {
      const today = new Date();

      updateGameState({ type: "RESET_WORD_TYPED" });

      if (wordTyped === challenge?.answer) {
        updateGameState({ type: "SET_USER_WON" });
        updateGameSessionStorage({
          ...gameSessionStorage,
          streak: gameSessionStorage.streak + 1,
          challengesWon: [
            ...gameSessionStorage.challengesWon,
            {
              date: today,
              guesses: guessesAmount,
              challenge: challenge,
            },
          ],
          lastSessionPlayedDate: today,
        });
        return;
      }

      updateGameState({ type: "INCREASE_AMOUNT_WRONG_GUESSES" });

      if (guessesAmount === MAX_ALLOWED_GUESSES_AMOUNT) {
        updateGameSessionStorage({
          streak: 0,
          challengesWon: gameSessionStorage.challengesWon,
          lastSessionPlayedDate: today,
        });
      }

      return;
    }

    if (uppercaseLetter === "BACK") {
      updateGameState({
        type: "REMOVE_LETTER",
      });
      return;
    }

    updateGameState({
      type: "ADD_LETTER",
      payload: uppercaseLetter,
    });
  }

  return (
    <button
      onClick={handleKeyboardButtonClick}
      className={
        uppercaseLetter === "BACK" || uppercaseLetter === "ENTER"
          ? "specialKey"
          : "keyboardLetter"
      }
    >
      {uppercaseLetter}
    </button>
  );
}
