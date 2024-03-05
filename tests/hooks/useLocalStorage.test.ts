import { useLocalStorage } from "@/hook/useLocalStorage";
import { renderHook } from "@testing-library/react";

describe("useLocalStorage", () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it("should custom hook return default value provided if no key is found", () => {
    const { result } = renderHook(() => {
      return useLocalStorage("testKey", "defaultTestValue");
    });
    const [storageValue] = result.current;
    expect(storageValue).toBe("defaultTestValue");
  });

  it("should custom hook return stored value if key is found", () => {
    window.localStorage.setItem("testKey", JSON.stringify("storedValue"));
    const { result } = renderHook(() => {
      return useLocalStorage("testKey", "defaultTestValue");
    });
    const [storageValue] = result.current;
    expect(storageValue).toBe("storedValue");
  });
});
