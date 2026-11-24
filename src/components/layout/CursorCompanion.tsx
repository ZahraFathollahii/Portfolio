"use client";

import { useEffect, useRef } from "react";

import styles from "./CursorCompanion.module.css";

const POINTER_QUERY =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const SIZE = 44;
const GAP = 12;

/** A decorative mouse companion. Coordinates stay out of React's render cycle. */
export function CursorCompanion() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof window.matchMedia !== "function") return;
    const node = element;

    const media = window.matchMedia(POINTER_QUERY);
    const hasPopover = typeof node.showPopover === "function";
    let frame = 0;
    let restingTimer = 0;
    let listening = false;
    let x = 0;
    let y = 0;
    let lastX: number | null = null;
    let tilt = 0;
    let overControl = false;
    let dialog: Element | null = null;
    let previousDialog: Element | null = null;

    function hide() {
      cancelAnimationFrame(frame);
      window.clearTimeout(restingTimer);
      frame = 0;
      lastX = null;
      node.dataset.visible = "false";
      node.dataset.moving = "false";
      if (hasPopover && node.isConnected && node.matches(":popover-open")) {
        node.hidePopover();
      }
    }

    function paint() {
      frame = 0;
      // Locale navigation can detach the node before React cleans up this effect.
      if (!node.isConnected) return;
      // Flip the offset at viewport edges, keeping the butterfly beside the pointer.
      const left = x + GAP + SIZE > innerWidth ? x - GAP - SIZE : x + GAP;
      const top = y + GAP + SIZE > innerHeight ? y - GAP - SIZE : y + GAP;
      node.style.transform = `translate3d(${Math.max(0, left)}px, ${Math.max(0, top)}px, 0)`;
      node.style.setProperty("--tilt", `${tilt}deg`);
      node.dataset.control = String(overControl);
      node.dataset.visible = "true";
      node.dataset.moving = "true";

      // Manual popovers keep decoration above a native dialog without taking focus.
      if (
        hasPopover &&
        (!node.matches(":popover-open") || previousDialog !== dialog)
      ) {
        if (node.matches(":popover-open")) node.hidePopover();
        node.showPopover();
      }
      previousDialog = dialog;
      window.clearTimeout(restingTimer);
      restingTimer = window.setTimeout(() => {
        node.dataset.moving = "false";
      }, 160);
    }

    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse" || event.buttons !== 0) {
        hide();
        return;
      }
      x = event.clientX;
      y = event.clientY;
      tilt =
        lastX === null ? 0 : Math.max(-18, Math.min(18, (x - lastX) * 0.6));
      lastX = x;
      const target = event.target instanceof Element ? event.target : null;
      overControl = Boolean(
        target?.closest("a, button, input, textarea, select"),
      );
      dialog = target?.closest("dialog[open]") ?? null;
      if (!frame) frame = requestAnimationFrame(paint);
    }

    function leave(event: PointerEvent) {
      if (event.relatedTarget === null) hide();
    }

    function detach() {
      window.removeEventListener("pointermove", move, true);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", hide);
      window.removeEventListener("keydown", hide);
      window.removeEventListener("resize", hide);
      document.removeEventListener("visibilitychange", hide);
      listening = false;
    }

    function syncPreference() {
      hide();
      detach();
      if (!media.matches) return;
      window.addEventListener("pointermove", move, {
        passive: true,
        capture: true,
      });
      window.addEventListener("pointerout", leave, { passive: true });
      window.addEventListener("blur", hide);
      window.addEventListener("keydown", hide);
      window.addEventListener("resize", hide);
      document.addEventListener("visibilitychange", hide);
      listening = true;
    }

    syncPreference();
    media.addEventListener("change", syncPreference);
    return () => {
      if (listening) detach();
      hide();
      media.removeEventListener("change", syncPreference);
    };
  }, []);

  return (
    <div
      ref={ref}
      popover="manual"
      aria-hidden="true"
      inert
      data-visible="false"
      data-moving="false"
      className={styles.companion}
    >
      <svg viewBox="0 0 64 64" fill="none" className={styles.butterfly}>
        <g className={styles.wing}>
          <path d="M31 32C25 13 8 6 8 21C8 33 21 39 31 32ZM31 33C20 28 12 37 18 46C25 54 30 43 31 33Z" />
          <path
            d="M28 31C23 27 18 23 14 17M28 36C25 38 23 41 21 44"
            className={styles.vein}
          />
        </g>
        <g className={styles.wing}>
          <path d="M33 32C39 13 56 6 56 21C56 33 43 39 33 32ZM33 33C44 28 52 37 46 46C39 54 34 43 33 33Z" />
          <path
            d="M36 31C41 27 46 23 50 17M36 36C39 38 41 41 43 44"
            className={styles.vein}
          />
        </g>
        <path
          d="M32 27C30 32 30 39 32 44C34 39 34 32 32 27Z"
          className={styles.body}
        />
        <path d="M31 28C30 23 28 21 25 20M33 28C34 23 36 21 39 20" />
      </svg>
    </div>
  );
}
