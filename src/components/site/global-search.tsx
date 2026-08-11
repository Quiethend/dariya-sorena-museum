"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { albums } from "@/lib/data/albums";
import { chapters } from "@/lib/data/story";
import { galleryImages } from "@/lib/data/gallery";
import { Search as SearchIcon, X } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { useEffect, useMemo, useRef, useState } from "react";

interface SearchResult {
  type: "album" | "chapter" | "gallery";
  title: string;
  subtitle: string;
  image?: string;
  action: () => void;
}

export function GlobalSearch() {
  const { t } = useLocale();
  const open = useAppStore((s) => s.searchOpen);
  const setOpen = useAppStore((s) => s.setSearchOpen);
  const query = useAppStore((s) => s.searchQuery);
  const setQuery = useAppStore((s) => s.setSearchQuery);
  const setView = useAppStore((s) => s.setView);
  const setAlbumDetail = useAppStore((s) => s.setAlbumDetail);
  const setGalleryViewerImage = useAppStore((s) => s.setGalleryViewerImage);
  const [local, setLocal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when search opens
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => {
        setLocal(""); // This is intentional: reset search when opening
        inputRef.current?.focus();
      }, 0);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const results = useMemo<SearchResult[]>(() => {
    const q = local.trim().toLowerCase();
    if (!q) return [];
    const out: SearchResult[] = [];

    albums.forEach((a) => {
      if (
        a.title.toLowerCase().includes(q) ||
        a.subtitle?.toLowerCase().includes(q) ||
        String(a.year).includes(q)
      ) {
        out.push({
          type: "album",
          title: a.title,
          subtitle: `${t("search.album")} · ${a.year}`,
          image: a.cover,
          action: () => {
            setView("albums");
            setAlbumDetail(a.id);
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          },
        });
      }
      a.tracks.forEach((track) => {
        if (track.title.toLowerCase().includes(q)) {
          out.push({
            type: "album",
            title: track.title,
            subtitle: `${t("search.track")} · ${a.title} (${a.year})`,
            image: a.cover,
            action: () => {
              setView("albums");
              setAlbumDetail(a.id);
              setOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            },
          });
        }
      });
    });

    chapters.forEach((c) => {
      if (
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q)
      ) {
        out.push({
          type: "chapter",
          title: c.title,
          subtitle: t("search.chapter"),
          image: c.image,
          action: () => {
            setView("story");
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          },
        });
      }
    });

    galleryImages.forEach((g) => {
      if (
        g.alt.toLowerCase().includes(q) ||
        g.location.toLowerCase().includes(q) ||
        g.date.toLowerCase().includes(q) ||
        g.story.toLowerCase().includes(q)
      ) {
        out.push({
          type: "gallery",
          title: g.alt,
          subtitle: `${t("search.gallery")} · ${g.location}`,
          image: g.src,
          action: () => {
            setView("gallery");
            setGalleryViewerImage(g.id);
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          },
        });
      }
    });

    return out.slice(0, 20);
  }, [local, t, setView, setAlbumDetail, setGalleryViewerImage, setOpen]);

  const setLocalQuery = (v: string) => {
    setLocal(v);
    setQuery(v);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[150] flex items-start justify-center pt-24 sm:pt-32 px-4"
        >
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl glass-strong rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-foreground/8">
              <SearchIcon className="w-4 h-4 text-muted-foreground" />
              <input
                ref={inputRef}
                id="global-search-input"
                value={local}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder={t("search.placeholder")}
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm"
              />
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground cursor-pointer p-1"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {local.trim() === "" ? (
                <div className="p-8 text-center">
                  <p className="font-mono text-[10px] uppercase tracking-luxe text-muted-foreground/60">
                    {t("search.heading")}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {t("search.hint")}
                  </p>
                </div>
              ) : results.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    {t("search.noResults")}{" "}
                    <span className="text-foreground">&ldquo;{local}&rdquo;</span>
                  </p>
                </div>
              ) : (
                <ul>
                  {results.map((r, i) => (
                    <li key={i}>
                      <button
                        onClick={r.action}
                        className="w-full flex items-center gap-4 px-5 py-3 hover:bg-foreground/5 transition-colors text-left cursor-pointer"
                      >
                        {r.image && (
                          <div className="w-12 h-12 rounded-md overflow-hidden bg-foreground/5 flex-shrink-0">
                            <img
                              src={r.image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground truncate">
                            {r.title}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {r.subtitle}
                          </p>
                        </div>
                        <span className="font-mono text-[10px] uppercase tracking-cine text-muted-foreground/60 flex-shrink-0">
                          {r.type}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
