"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const ioRef = useRef<IntersectionObserver | null>(null);
  const scrollRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Clean up previous observers/listeners
    const cleanup = () => {
      if (ioRef.current) {
        ioRef.current.disconnect();
        ioRef.current = null;
      }
      if (scrollRef.current) {
        scrollRef.current();
        scrollRef.current = null;
      }
    };

    const setup = () => {
      cleanup();

      const sentinel = document.getElementById("scroll-top-sentinel");

      if (sentinel) {
        // Use IntersectionObserver on the sentinel (home view legacy section)
        ioRef.current = new IntersectionObserver(
          ([entry]) => {
            setVisible(!entry.isIntersecting);
          },
          { threshold: 0 }
        );
        ioRef.current.observe(sentinel);
      } else {
        // Fallback: no sentinel in DOM (other views)
        // Show button when scrolled past 50% of document height
        const onScroll = () => {
          const scrollY = window.scrollY || document.documentElement.scrollTop;
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          setVisible(docHeight > 0 && scrollY > docHeight * 0.5);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        scrollRef.current = () =>
          window.removeEventListener("scroll", onScroll);
      }
    };

    // Initial setup
    setup();

    // Re-check every 500ms to handle view transitions (AnimatePresence)
    const retry = setInterval(() => {
      const hasSentinel = !!document.getElementById("scroll-top-sentinel");
      const hasObserver = !!ioRef.current;
      const hasScroll = !!scrollRef.current;

      // If state mismatch (sentinel appeared but we have scroll listener, or vice versa)
      if (hasSentinel && !hasObserver) setup();
      else if (!hasSentinel && !hasScroll) setup();
    }, 500);

    return () => {
      clearInterval(retry);
      cleanup();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 left-6 z-[100] w-11 h-11 rounded-full glass-strong flex items-center justify-center text-foreground hover:bg-foreground/10 hover:glow-crimson transition-all duration-300 cursor-pointer group"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
