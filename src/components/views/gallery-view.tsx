"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, useEffect, useCallback } from "react";
import {
  galleryImages,
  galleryCategories,
  type GalleryCategory,
  type GalleryImage,
} from "@/lib/data/gallery";
import { useAppStore } from "@/lib/store";
import { Reveal } from "@/components/site/reveal";
import { X, ChevronLeft, ChevronRight, ZoomIn, MapPin, Calendar } from "lucide-react";

export function GalleryView() {
  const [filter, setFilter] = useState<GalleryCategory>("all");
  const viewerImageId = useAppStore((s) => s.galleryViewerImage);
  const setViewerImageId = useAppStore((s) => s.setGalleryViewerImage);

  const filtered = useMemo(() => {
    if (filter === "all") return galleryImages;
    return galleryImages.filter((g) => g.category.includes(filter));
  }, [filter]);

  return (
    <div className="relative pt-24 sm:pt-28 pb-32">
      {/* Header */}
      <section className="px-5 sm:px-8 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-mono text-[10px] uppercase tracking-luxe text-[oklch(0.82_0.11_80)] mb-5"
          >
            The Gallery
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl font-light text-foreground leading-[1] mb-6"
          >
            An exhibition of memories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-2xl text-sm sm:text-base text-foreground/70 leading-relaxed"
          >
            Photographs, archive stills, and album artwork arranged like a
            museum. Every image carries a date, a place, and a story. Click to
            enter the fullscreen viewer — use arrow keys to move through the
            collection.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-5 sm:px-8 mb-10 sm:mb-14 sticky top-16 sm:top-20 z-30">
        <div className="mx-auto max-w-7xl">
          <div className="glass-strong rounded-full p-1.5 inline-flex flex-wrap gap-1 max-w-full overflow-x-auto">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`relative px-4 py-2 text-xs font-mono uppercase tracking-cine rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                  filter === cat.id
                    ? "text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {filter === cat.id && (
                  <motion.span
                    layoutId="gallery-filter"
                    className="absolute inset-0 bg-foreground rounded-full"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry grid */}
      <section className="px-5 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 [column-fill:_balance]"
          >
            {filtered.map((img, i) => (
              <GalleryCard
                key={img.id}
                img={img}
                index={i}
                onOpen={() => setViewerImageId(img.id)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Fullscreen viewer */}
      <GalleryViewer
        key={viewerImageId || "none"}
        images={filtered}
        currentId={viewerImageId}
        onClose={() => setViewerImageId(null)}
        onNavigate={(id) => setViewerImageId(id)}
      />
    </div>
  );
}

function GalleryCard({
  img,
  index,
  onOpen,
}: {
  img: GalleryImage;
  index: number;
  onOpen: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Reveal delay={(index % 6) * 0.05} className="mb-4 sm:mb-6 break-inside-avoid">
      <button
        onClick={onOpen}
        className="group relative block w-full overflow-hidden rounded-lg cursor-pointer"
      >
        <div
          className={`relative w-full ${
            img.aspect === "portrait"
              ? "aspect-[3/4]"
              : img.aspect === "square"
              ? "aspect-square"
              : "aspect-[4/3]"
          } bg-foreground/5`}
        >
          {!loaded && (
            <div className="absolute inset-0 animate-pulse bg-foreground/5" />
          )}
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
              loaded ? "img-fade loaded" : "img-fade"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-3.5 h-3.5 text-foreground" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <p className="font-mono text-[9px] uppercase tracking-cine text-[oklch(0.82_0.11_80)] mb-1">
              {img.date} · {img.location}
            </p>
            <p className="text-xs text-foreground/80 line-clamp-2">{img.story}</p>
          </div>
        </div>
      </button>
    </Reveal>
  );
}

function GalleryViewer({
  images,
  currentId,
  onClose,
  onNavigate,
}: {
  images: GalleryImage[];
  currentId: string | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const [zoomed, setZoomed] = useState(false);

  const currentIdx = images.findIndex((i) => i.id === currentId);
  const current = currentIdx >= 0 ? images[currentIdx] : null;

  const next = useCallback(() => {
    if (currentIdx < 0) return;
    const n = (currentIdx + 1) % images.length;
    onNavigate(images[n].id);
  }, [currentIdx, images, onNavigate]);

  const prev = useCallback(() => {
    if (currentIdx < 0) return;
    const p = (currentIdx - 1 + images.length) % images.length;
    onNavigate(images[p].id);
  }, [currentIdx, images, onNavigate]);

  useEffect(() => {
    if (!currentId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("no-scroll");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
    };
  }, [currentId, next, prev, onClose]);

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[120] flex flex-col"
        >
          <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl" />

          {/* Top bar */}
          <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 py-5">
            <p className="font-mono text-[10px] uppercase tracking-luxe text-muted-foreground">
              {currentIdx + 1} / {images.length}
            </p>
            <button
              onClick={onClose}
              className="p-2 glass rounded-full text-foreground hover:scale-105 transition-transform cursor-pointer"
              aria-label="Close viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main image area */}
          <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-16 min-h-0">
            {/* Prev */}
            <button
              onClick={prev}
              className="absolute left-2 sm:left-6 z-20 p-3 glass rounded-full text-foreground hover:scale-110 transition-transform cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: zoomed ? 1.4 : 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-full max-h-full flex items-center justify-center cursor-zoom-in"
                onClick={() => setZoomed((z) => !z)}
                style={{ cursor: zoomed ? "zoom-out" : "zoom-in" }}
              >
                <img
                  src={current.src}
                  alt={current.alt}
                  className="max-w-full max-h-[72vh] object-contain rounded-lg shadow-2xl"
                />
              </motion.div>
            </AnimatePresence>

            {/* Next */}
            <button
              onClick={next}
              className="absolute right-2 sm:right-6 z-20 p-3 glass rounded-full text-foreground hover:scale-110 transition-transform cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Caption / metadata */}
          <motion.div
            key={`caption-${current.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative z-10 px-5 sm:px-8 py-6 sm:py-8 max-w-3xl mx-auto w-full text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-cine text-muted-foreground">
                <Calendar className="w-3 h-3" /> {current.date}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-cine text-muted-foreground">
                <MapPin className="w-3 h-3" /> {current.location}
              </span>
            </div>
            <p className="font-display text-xl sm:text-2xl font-light text-foreground/90 italic leading-relaxed mb-4">
              {current.story}
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {current.relatedAlbum && (
                <span className="px-3 py-1 text-xs glass rounded-full text-foreground/70">
                  Album: {current.relatedAlbum}
                </span>
              )}
              {current.relatedProject && (
                <span className="px-3 py-1 text-xs glass rounded-full text-foreground/70">
                  {current.relatedProject}
                </span>
              )}
              {current.photographer && (
                <span className="font-mono text-[10px] uppercase tracking-cine text-muted-foreground/60">
                  Photo: {current.photographer}
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
