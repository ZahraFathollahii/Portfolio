import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useActiveSection } from "@/hooks/useActiveSection";

const navigation = vi.hoisted(() => ({ pathname: "/en/" }));
vi.mock("next/navigation", () => ({ usePathname: () => navigation.pathname }));

const ids = ["work", "contact"];
let frames: FrameRequestCallback[];
let workTop: number;
let contactTop: number;
let scrollY: number;
let sections: HTMLElement[];

function flushFrame() {
  const callbacks = frames.splice(0);
  act(() => callbacks.forEach((callback) => callback(0)));
}

beforeEach(() => {
  navigation.pathname = "/en/";
  frames = [];
  workTop = 200;
  contactTop = 3000;
  scrollY = 0;
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    frames.push(callback);
    return frames.length;
  });
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  vi.spyOn(window, "innerHeight", "get").mockReturnValue(960);
  vi.spyOn(window, "scrollY", "get").mockImplementation(() => scrollY);
  vi.spyOn(document.documentElement, "scrollHeight", "get").mockReturnValue(
    5000,
  );
  sections = ids.map((id) => {
    const section = document.createElement("section");
    section.id = id;
    vi.spyOn(section, "getBoundingClientRect").mockImplementation(
      () => new DOMRect(0, id === "work" ? workTop : contactTop, 800, 1000),
    );
    document.body.append(section);
    return section;
  });
});

afterEach(() => {
  sections.forEach((section) => section.remove());
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("useActiveSection", () => {
  it("tracks scrolling in both directions without retaining the previous section", () => {
    const { result } = renderHook(() => useActiveSection(ids));
    flushFrame();
    expect(result.current).toBe("work");

    workTop = -2500;
    contactTop = 200;
    act(() => window.dispatchEvent(new Event("scroll")));
    flushFrame();
    expect(result.current).toBe("contact");

    workTop = 700;
    contactTop = 3500;
    act(() => window.dispatchEvent(new Event("scroll")));
    flushFrame();
    expect(result.current).toBeNull();
  });

  it("drops the home selection on client navigation and measures again on return", () => {
    const { result, rerender } = renderHook(() => useActiveSection(ids));
    contactTop = 200;
    flushFrame();
    expect(result.current).toBe("contact");

    navigation.pathname = "/en/projects/mssp/";
    sections.forEach((section) => section.remove());
    rerender();
    expect(result.current).toBeNull();
    flushFrame();
    expect(result.current).toBeNull();

    navigation.pathname = "/en/";
    sections.forEach((section) => document.body.append(section));
    contactTop = 3000;
    rerender();
    flushFrame();
    expect(result.current).toBe("work");
  });

  it("selects the last section at the bottom even if it cannot reach the viewport midpoint", () => {
    scrollY = 4040;
    workTop = -3000;
    contactTop = 700;
    const { result } = renderHook(() => useActiveSection(ids));
    flushFrame();
    expect(result.current).toBe("contact");
  });
});
