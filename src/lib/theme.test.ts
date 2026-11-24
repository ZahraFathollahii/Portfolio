import { beforeEach, describe, expect, it, vi } from "vitest";

import { THEME_STORAGE_KEY, themeScript } from "@/lib/theme";

describe("initial theme", () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.theme;
  });

  it.each([
    [null, "light"],
    ["invalid", "light"],
    ["light", "light"],
    ["dark", "dark"],
  ])("uses %s from storage to select %s before paint", (stored, expected) => {
    if (stored !== null) localStorage.setItem(THEME_STORAGE_KEY, stored);

    window.eval(themeScript);

    expect(document.documentElement.dataset.theme).toBe(expected);
  });

  it("uses light when storage is unavailable", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementationOnce(() => {
      throw new Error("Storage unavailable");
    });

    window.eval(themeScript);

    expect(document.documentElement.dataset.theme).toBe("light");
  });
});
