import { useCountdown } from "@/hook/useCountdown";
import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";

describe("useCountdown", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  it("should custom hook be initialized with correct default values", () => {
    const { result } = renderHook(() => {
      const d = new Date();
      return useCountdown({ eventDate: d });
    });

    expect(result.current.hours).toBe(0);
    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(0);
  });

  it("should update only seconds value when 2 second have passed", async () => {
    const { result } = renderHook(() => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      return useCountdown({ eventDate: d });
    });

    act(() => vi.advanceTimersByTime(1000 * 2));
    expect(result.current.hours).toBe(23);
    expect(result.current.minutes).toBe(59);
    expect(result.current.seconds).toBe(58);
  });
});
