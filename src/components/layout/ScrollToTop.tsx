"use client";

import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { useTranslation } from "react-i18next";

import { IconButton } from "@/components/ui";
import { cn } from "@/lib/cn";

const SHOW_AFTER_PX = 320;

/** Floating back-to-top control shown once the reader scrolls past the fold. */
export function ScrollToTop() {
  const { t } = useTranslation("actions");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      setVisible(window.scrollY > SHOW_AFTER_PX);
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, []);

  function handleClick() {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <IconButton
      icon={FiArrowUp}
      label={t("backTop")}
      title={t("backTop")}
      onClick={handleClick}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed end-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-30 size-11 border border-border bg-surface/90 text-text shadow-card-hover backdrop-blur-md transition-[opacity,transform,border-color,color,background-color] duration-200 hover:border-accent hover:bg-surface hover:text-accent active:scale-95 sm:end-8 sm:bottom-8",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    />
  );
}
