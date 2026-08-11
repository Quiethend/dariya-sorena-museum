"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";

export function LoadingScreen() {
  const isLoading = useAppStore((s) => s.isLoading);
  const setIsLoading = useAppStore((s) => s.setIsLoading);
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 3200;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [setIsLoading]);

  useEffect(() => {
    if (!isLoading) {
      const t = setTimeout(() => setHidden(true), 1100);
      return () => clearTimeout(t);
    }
  }, [isLoading]);

  if (hidden) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Fog backdrop */}
          <div className="fog-layer" />
          <div className="dust">
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                style={{
                  left: `${(i * 7.3) % 100}%`,
                  bottom: "-10px",
                  animationDuration: `${10 + (i % 5) * 3}s`,
                  animationDelay: `${(i % 7) * 0.8}s`,
                  opacity: 0.5,
                }}
              />
            ))}
          </div>

          {/* Logo reveal */}
          <div className="relative flex flex-col items-center px-6 text-center mb-16">
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.35em" }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-foreground"
            >
              DARIYA
              <span className="text-crimson-gradient mx-2 sm:mx-4">&</span>
              SORENA
            </motion.div>
          </div>

          {/* DJ figure + progress line */}
          <div className="relative w-[80%] max-w-lg mx-auto" style={{ height: "160px" }}>
            {/* Progress line */}
            <div className="absolute bottom-12 left-0 right-0 h-px bg-foreground/15">
              <div
                className="h-full bg-gradient-to-r from-[oklch(0.52_0.24_12)] to-[oklch(0.35_0.18_6)] relative"
                style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
              >
                {/* Gold glow on leading edge */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[oklch(0.52_0.24_12)] shadow-[0_0_12px_4px_oklch(0.52_0.24_12/50%)]" />
              </div>
            </div>

            {/* DJ figure — moves along progress line */}
            <div
              className="absolute bottom-12"
              style={{
                left: `${progress}%`,
                transform: "translate(-50%, -100%)",
                transition: "left 0.1s linear",
              }}
            >
              {/* Whole figure */}
              <div className="relative" style={{ animation: "dj-bob 1.2s ease-in-out infinite", width: "60px", height: "80px" }}>
                {/* Headphones band */}
                <div className="absolute" style={{ top: "0px", left: "10px", width: "40px", height: "6px", background: "oklch(0.52 0.24 12)", borderRadius: "3px" }} />
                {/* Head */}
                <div className="absolute rounded-full" style={{ top: "4px", left: "14px", width: "32px", height: "28px", background: "oklch(0.15 0.01 270)", animation: "dj-head-nod 0.8s ease-in-out infinite alternate" }}>
                  {/* Headphone left cup */}
                  <div className="absolute rounded-full" style={{ top: "6px", left: "-4px", width: "8px", height: "12px", background: "oklch(0.52 0.24 12)", borderRadius: "2px" }} />
                  {/* Headphone right cup */}
                  <div className="absolute rounded-full" style={{ top: "6px", right: "-4px", width: "8px", height: "12px", background: "oklch(0.52 0.24 12)", borderRadius: "2px" }} />
                </div>
                {/* Torso */}
                <div className="absolute" style={{ top: "34px", left: "16px", width: "28px", height: "24px", background: "oklch(0.12 0.008 270)", borderRadius: "4px 4px 0 0" }} />
                {/* Left arm (on left deck) */}
                <div className="absolute" style={{ top: "36px", left: "2px", width: "16px", height: "6px", background: "oklch(0.15 0.01 270)", borderRadius: "3px", transformOrigin: "right center", animation: "dj-scratch-arm-left 1.6s ease-in-out infinite alternate" }} />
                {/* Right arm (scratching) */}
                <div className="absolute" style={{ top: "36px", right: "2px", width: "16px", height: "6px", background: "oklch(0.15 0.01 270)", borderRadius: "3px", transformOrigin: "left center", animation: "dj-scratch-arm-right 0.8s ease-in-out infinite alternate" }}>
                  {/* Scratching finger glow */}
                  <div className="absolute rounded-full" style={{ right: "-2px", top: "-2px", width: "4px", height: "4px", background: "oklch(0.52 0.24 12)", boxShadow: "0 0 6px oklch(0.52 0.24 12 / 70%)" }} />
                </div>
                {/* Shadow */}
                <div className="absolute" style={{ bottom: "-4px", left: "10px", width: "40px", height: "4px", background: "oklch(0 0 0 / 30%)", borderRadius: "50%", filter: "blur(2px)" }} />
              </div>

              {/* Left turntable */}
              <div className="absolute" style={{ bottom: "-28px", left: "-22px", width: "22px", height: "22px" }}>
                <div className="rounded-full border border-[oklch(0.52_0.24_12/30%)]" style={{ width: "22px", height: "22px", background: "oklch(0.08 0.006 270)", animation: "dj-vinyl-spin 2s linear infinite" }}>
                  <div className="absolute rounded-full" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "6px", height: "6px", background: "oklch(0.52 0.24 12)", borderRadius: "50%" }} />
                </div>
              </div>

              {/* Right turntable */}
              <div className="absolute" style={{ bottom: "-28px", right: "-22px", width: "22px", height: "22px" }}>
                <div className="rounded-full border border-[oklch(0.52_0.24_12/30%)]" style={{ width: "22px", height: "22px", background: "oklch(0.08 0.006 270)", animation: "dj-vinyl-spin 1.5s linear infinite reverse" }}>
                  <div className="absolute rounded-full" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "6px", height: "6px", background: "oklch(0.52 0.24 12)", borderRadius: "50%" }} />
                </div>
              </div>

              {/* EQ bars between decks */}
              <div className="absolute flex items-end gap-[2px]" style={{ bottom: "-22px", left: "50%", transform: "translateX(-50%)", height: "14px" }}>
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-[3px] rounded-t-sm bg-[oklch(0.52_0.24_12/60%)]"
                    style={{
                      animation: "dj-eq 0.5s ease-in-out infinite alternate",
                      animationDelay: `${i * 0.12}s`,
                      height: "4px",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Progress percentage — below bar, centered */}
          <div className="mt-6 font-mono text-[10px] text-muted-foreground text-center">
            {progress.toString().padStart(3, "0")}%
          </div>

          {/* Film grain */}
          <div className="film-grain" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
