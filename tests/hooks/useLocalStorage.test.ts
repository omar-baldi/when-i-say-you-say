import { useLocalStorage } from "@/hook/useLocalStorage";
import { renderHook } from "@testing-library/react";

describe("useLocalStorage", () => {
  it("should custom hook return default value provided if no key is found", () => {
    const { result } = renderHook(() => {
      return useLocalStorage("testKey", "defaultTestValue");
    });
    const [storageValue] = result.current;
    expect(storageValue).toBe("defaultTestValue");
  });
});
