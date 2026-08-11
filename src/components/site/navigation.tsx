"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore, type ViewId } from "@/lib/store";
import { useLocale } from "@/lib/i18n";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_ITEM_IDS: ViewId[] = ["home", "story", "gallery", "albums"];

export function Navigation() {
  const currentView = useAppStore((s) => s.currentView);
  const setView = useAppStore((s) => s.setView);
  const searchOpen = useAppStore((s) => s.searchOpen);
  const setSearchOpen = useAppStore((s) => s.setSearchOpen);
  const { locale, setLocale, t } = useLocale();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = NAV_ITEM_IDS.map((id) => ({
    id,
    label: t(`nav.${id}`),
  }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: ViewId) => {
    setView(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-500 ${
          scrolled
            ? "glass-strong border-b border-foreground/5"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => handleNav("home")}
            className="group flex items-center cursor-pointer overflow-visible"
            aria-label="Dariya & Sorena — Home"
          >
            <span className="font-display text-lg sm:text-xl font-light tracking-luxe text-foreground whitespace-nowrap">
              DARIYA
              <span className="text-crimson-gradient mx-1.5 sm:mx-2">&</span>
              SORENA
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => {
              const active = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className="relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-mono uppercase tracking-cine text-foreground/60 hover:text-foreground transition-colors duration-300 cursor-pointer"
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute left-3 right-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-[oklch(0.52_0.24_12)] to-transparent"
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Toggle */}
            <div className="flex items-center rounded-full glass border border-foreground/10 overflow-hidden">
              <button
                onClick={() => setLocale("en")}
                className={`px-2.5 py-1 text-[10px] sm:text-xs font-mono uppercase tracking-cine transition-all duration-300 cursor-pointer ${
                  locale === "en"
                    ? "bg-[oklch(0.52_0.24_12)] text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLocale("fa")}
                className={`px-2.5 py-1 text-[10px] sm:text-xs font-mono uppercase tracking-cine transition-all duration-300 cursor-pointer ${
                  locale === "fa"
                    ? "bg-[oklch(0.52_0.24_12)] text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                FN
              </button>
            </div>

            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menu"
              className="sm:hidden p-2 text-foreground cursor-pointer"
            >
              <div className="w-5 flex flex-col gap-1.5">
                <span className={`block h-px bg-current transition-all ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`} />
                <span className={`block h-px bg-current transition-all ${mobileOpen ? "opacity-0" : ""}`} />
                <span className={`block h-px bg-current transition-all ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[79] sm:hidden glass-strong flex flex-col items-center justify-center gap-6"
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                onClick={() => handleNav(item.id)}
                className={`font-display text-4xl font-light tracking-cine ${
                  currentView === item.id ? "text-crimson-gradient" : "text-foreground/80"
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
