import { useGameSession } from "@/hook/useGameSession";
import { renderHook } from "@testing-library/react";

describe("useGameSession", () => {
  it("should throw error if game context is not provided", () => {
    renderHook(() => {
      const expectedError = new Error("Unable to use game context");
      expect(useGameSession).toThrow(expectedError);
    });
  });
});
