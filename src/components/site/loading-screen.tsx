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
    // Simulate asset loading progress with a smooth curve
    let raf = 0;
    const start = performance.now();
    const duration = 2600;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease out cubic
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
          {/* fog backdrop */}
          <div className="fog-layer" />
          <div className="dust">
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                style={{
                  left: `${(i * 7.3) % 100}%`,
                  bottom: `-10px`,
                  animationDuration: `${10 + (i % 5) * 3}s`,
                  animationDelay: `${(i % 7) * 0.8}s`,
                  opacity: 0.5,
                }}
              />
            ))}
          </div>

          {/* Logo reveal */}
          <div className="relative flex flex-col items-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.35em" }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-6xl font-light text-foreground"
            >
              DARIYA
              <span className="text-gold-gradient mx-3 sm:mx-5">&</span>
              SORENA
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-4 font-mono text-[10px] sm:text-xs tracking-luxe text-muted-foreground uppercase"
            >
              The Official Archive
            </motion.div>

            {/* progress bar */}
            <div className="mt-12 w-56 sm:w-72">
              <div className="h-px w-full bg-foreground/15 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[oklch(0.82_0.11_80)] to-[oklch(0.62_0.10_65)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-3 flex justify-between font-mono text-[10px] text-muted-foreground">
                <span>ENTERING THE ARCHIVE</span>
                <span>{progress.toString().padStart(3, "0")}%</span>
              </div>
            </div>
          </div>

          {/* film grain on top */}
          <div className="film-grain" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
