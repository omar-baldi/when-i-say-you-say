import { useCountdown } from "@/hook/useCountdown";
import { renderHook } from "@testing-library/react";

describe("useCountdown", () => {
  it("should custom hook be initialized with correct default values", () => {
    const { result } = renderHook(() => {
      const d = new Date();
      return useCountdown({ eventDate: d });
    });

    expect(result.current.hours).toBe(0);
    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(0);
  });
});
