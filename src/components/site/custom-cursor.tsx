"use client";

import { useEffect, useState, useCallback, useRef } from "react";

function useMediaQuery(query: string): boolean {
  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  }, [query]);

  const [matches, setMatches] = useState(getSnapshot);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = () => setMatches(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const enabled = useMediaQuery("(hover: hover) and (pointer: fine)");
  const rafRef = useRef(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!enabled || !mounted) return;

    const micEl = document.getElementById("cursor-mic");
    const signalEl = document.getElementById("cursor-signal");
    if (!micEl || !signalEl) return;

    // Current target positions (set from mousemove)
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    // Smoothed positions for rendering
    let micX = targetX;
    let micY = targetY;
    let sigX = targetX;
    let sigY = targetY;

    // Use a single rAF loop for ALL positioning — eliminates jank
    const loop = () => {
      // Mic follows mouse with very high interpolation (near-instant)
      micX += (targetX - micX) * 0.85;
      micY += (targetY - micY) * 0.85;

      // Signal follows with noticeable lag
      sigX += (targetX - sigX) * 0.12;
      sigY += (targetY - sigY) * 0.12;

      // Use left/top for positioning (GPU-friendly, no transform conflicts)
      micEl.style.left = `${micX}px`;
      micEl.style.top = `${micY}px`;
      signalEl.style.left = `${sigX}px`;
      signalEl.style.top = `${sigY}px`;

      rafRef.current = requestAnimationFrame(loop);
    };

    // Only update target coords in mousemove — no DOM writes here
    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    // Hover detection for signal wave animation
    const SELECTOR =
      "a, button, [role='button'], input, textarea, [data-cursor='hover'], [data-cursor='mic-signal']";

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(SELECTOR)) {
        document.body.classList.add("cursor-hover");
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(SELECTOR)) {
        document.body.classList.remove("cursor-hover");
      }
    };

    // Start loop
    loop();

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.body.classList.add("custom-cursor-active");

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.body.classList.remove("custom-cursor-active", "cursor-hover");
    };
  }, [enabled, mounted]);

  if (!mounted || !enabled) return null;

  return (
    <>
      {/* Signal waves — follows with lag, only animates on hover */}
      <div id="cursor-signal" className="cursor-signal-wrap" aria-hidden="true">
        <div className="cursor-signal-wave" />
        <div className="cursor-signal-wave" />
        <div className="cursor-signal-wave" />
      </div>

      {/* Microphone cursor — follows mouse near-instantly */}
      <div id="cursor-mic" className="cursor-mic-wrap" aria-hidden="true">
        <svg
          width="22"
          height="34"
          viewBox="0 0 22 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer glow halo */}
          <circle className="mic-glow" cx="11" cy="10" r="14" fill="oklch(0.52 0.24 12 / 12%)" />
          {/* Mic head capsule — outer shell */}
          <rect x="3.5" y="1" width="15" height="18" rx="7.5" fill="oklch(0.52 0.24 12)" />
          {/* Mic head capsule — inner grille area */}
          <rect x="5" y="2.5" width="12" height="15" rx="6" fill="oklch(0.10 0.006 270)" />
          {/* Grille horizontal lines */}
          <line x1="7" y1="5.5" x2="15" y2="5.5" stroke="oklch(0.52 0.24 12 / 40%)" strokeWidth="0.6" />
          <line x1="7" y1="7.5" x2="15" y2="7.5" stroke="oklch(0.52 0.24 12 / 35%)" strokeWidth="0.6" />
          <line x1="7" y1="9.5" x2="15" y2="9.5" stroke="oklch(0.52 0.24 12 / 40%)" strokeWidth="0.6" />
          <line x1="7" y1="11.5" x2="15" y2="11.5" stroke="oklch(0.52 0.24 12 / 35%)" strokeWidth="0.6" />
          <line x1="7" y1="13.5" x2="15" y2="13.5" stroke="oklch(0.52 0.24 12 / 30%)" strokeWidth="0.6" />
          {/* Mic body / stem */}
          <rect x="9" y="19" width="4" height="7" rx="2" fill="oklch(0.52 0.24 12)" />
          {/* Mic holder arc */}
          <path d="M5.5 26 C5.5 29 7 30 11 30 C15 30 16.5 29 16.5 26" stroke="oklch(0.52 0.24 12)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Stand stem */}
          <line x1="11" y1="30" x2="11" y2="33" stroke="oklch(0.52 0.24 12 / 50%)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </>
  );
}
