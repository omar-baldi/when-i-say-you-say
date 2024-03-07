import { useGameSession } from "@/hook/useGameSession";
import GameSessionProvider from "@/providers/gameSessionProvider";
import { render, renderHook } from "@testing-library/react";

function TestComponent() {
  const { gameState } = useGameSession();
  return <div>{gameState.wordTyped}</div>;
}

describe("useGameSession", () => {
  it("should throw error if game context is not provided", () => {
    renderHook(() => {
      const expectedError = new Error("Unable to use game context");
      expect(useGameSession).toThrow(expectedError);
    });
  });

  it("should pass test", () => {
    expect(() => {
      render(
        <GameSessionProvider>
          <TestComponent />
        </GameSessionProvider>
      );
    }).not.toThrow(expect.any(Error));
  });
});
