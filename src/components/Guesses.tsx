import { MAX_ALLOWED_GUESSES_AMOUNT } from "../constants";
import "../css/Guesses.css";
import { useGameSession } from "../hook/useGameSession";

export default function Guesses() {
  const { gameState } = useGameSession();
  const { guessesAmount } = gameState;

  const GuessesElements = [...Array(MAX_ALLOWED_GUESSES_AMOUNT)].map((_, index) => {
    return (
      <div
        className="guessesBox"
        style={{ backgroundColor: index + 1 > guessesAmount ? "white" : "red" }}
        key={index}
      />
    );
  });

  return (
    <div>
      <h6 className="guessesText">GUESSES</h6>
      <div className="guessesBoxWrapper">{GuessesElements}</div>
    </div>
  );
}
