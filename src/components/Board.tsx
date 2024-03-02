import { useGameSession } from "../hook/useGameSession";

export default function Board() {
  //TODO: change the name from "wordTyped" to "currentGuess"
  const { gameState, updateGameState } = useGameSession();
  const { wordTyped } = gameState;

  return (
    <div className="board">
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateGameState({ type: "VERIFY_WORD_VALIDITY" });
          }}
        >
          <input
            value={wordTyped}
            className="answerInput"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateGameState({
                type: "UPDATE_CURRENT_GUESS",
                payload: e.target.value.toUpperCase(),
              })
            }
          />
        </form>
      </div>
    </div>
  );
}
