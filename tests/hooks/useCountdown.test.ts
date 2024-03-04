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

  it("should update both seconds and minutes values when 2 minutes have passed", async () => {
    const { result } = renderHook(() => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      return useCountdown({ eventDate: d });
    });

    act(() => vi.advanceTimersByTime(60000 * 2));
    expect(result.current.hours).toBe(23);
    expect(result.current.minutes).toBe(58);
    expect(result.current.seconds).toBe(0);
  });

  it("should update all values when 2 hours have passed", async () => {
    const { result } = renderHook(() => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      return useCountdown({ eventDate: d });
    });

    act(() => vi.advanceTimersByTime(3600000 * 2));
    expect(result.current.hours).toBe(22);
    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(0);
  });

  it("should cbFunc be executed when countdown has reached eventDate and clearInterval be called", async () => {
    const cbFuncSpy = vi.fn();
    const clearIntervalSpy = vi.spyOn(global, "clearInterval");

    renderHook(() => {
      const d = new Date();
      d.setTime(d.getTime() + 1000);
      return useCountdown({ eventDate: d, onTimerEnd: cbFuncSpy });
    });

    act(() => vi.advanceTimersByTime(1000));
    expect(cbFuncSpy).toHaveBeenCalled();
    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});
