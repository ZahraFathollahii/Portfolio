"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Tracks the current route's sections, batching scroll measurements once per frame. */
export function useActiveSection(ids: readonly string[]): string | null {
  const pathname = usePathname();
  const [active, setActive] = useState<{
    pathname: string;
    id: string | null;
  } | null>(null);

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      const elements = ids
        .map((id) => document.getElementById(id))
        .filter((element): element is HTMLElement => element !== null);
      const middle = window.innerHeight / 2;
      const passed = elements.filter(
        (element) => element.getBoundingClientRect().top <= middle,
      );
      const atBottom =
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 2;
      const id = (atBottom ? elements.at(-1)?.id : passed.at(-1)?.id) ?? null;

      setActive((previous) =>
        previous?.pathname === pathname && previous.id === id
          ? previous
          : { pathname, id },
      );
    }

    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [ids, pathname]);

  // The shared header survives client navigation; never expose another route's selection.
  return active?.pathname === pathname ? active.id : null;
}
