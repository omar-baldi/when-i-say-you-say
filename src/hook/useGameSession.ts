import { useContext } from "react";
import { GameContext } from "../providers/gameSessionProvider";

export const useGameSession = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("Unable to use game context");
  }

  return context;
};
