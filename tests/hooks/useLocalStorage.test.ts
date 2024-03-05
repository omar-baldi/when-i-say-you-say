import { useLocalStorage } from "@/hook/useLocalStorage";
import { act, renderHook } from "@testing-library/react";

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

  it("should update both storage value and state when invoking function", () => {
    window.localStorage.setItem("testKey", JSON.stringify("storedValue"));
    const { result } = renderHook(() => {
      return useLocalStorage("testKey", "defaultTestValue");
    });

    act(() => {
      const [, updateStorageValue] = result.current;
      updateStorageValue("updatedStoredValue");
    });

    const [storageValue] = result.current;
    expect(storageValue).toBe("updatedStoredValue");
    expect(window.localStorage.getItem("testKey")).toBe(
      JSON.stringify("updatedStoredValue")
    );
  });
});
