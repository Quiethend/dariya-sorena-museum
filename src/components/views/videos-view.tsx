"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { videos, videoCategories, type VideoCategory } from "@/lib/data/videos";
import { Reveal } from "@/components/site/reveal";
import { Play, Clock, Film } from "lucide-react";

export function VideosView() {
  const [filter, setFilter] = useState<VideoCategory>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return videos;
    return videos.filter((v) => v.category.includes(filter));
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
            The Video Library
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl font-light text-foreground leading-[1] mb-6"
          >
            Videos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-2xl text-sm sm:text-base text-foreground/70 leading-relaxed"
          >
            Music videos, live performances, interviews, studio sessions, and
            documentaries — the visual archive of a career.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-5 sm:px-8 mb-10 sm:mb-14 sticky top-16 sm:top-20 z-30">
        <div className="mx-auto max-w-7xl">
          <div className="glass-strong rounded-full p-1.5 inline-flex flex-wrap gap-1 max-w-full overflow-x-auto">
            {videoCategories.map((cat) => (
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
                    layoutId="video-filter"
                    className="absolute inset-0 bg-foreground rounded-full"
                    transition={{
                      duration: 0.3,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video grid */}
      <section className="px-5 sm:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((video, i) => (
            <Reveal key={video.id} delay={(i % 6) * 0.05}>
              <VideoCard video={video} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

function VideoCard({ video }: { video: (typeof videos)[number] }) {
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group glass rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:glow-gold"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-foreground/5" />
        )}
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            hovered ? "scale-110" : "scale-100"
          } ${loaded ? "opacity-100" : "opacity-0"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

        {/* Play overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-foreground/80 backdrop-blur flex items-center justify-center">
            <Play className="w-5 h-5 text-background ml-0.5" />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md glass text-[10px] font-mono text-foreground">
          {video.duration}
        </div>

        {/* Category tag */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {video.category.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-cine glass text-foreground/70"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="font-mono text-[10px] uppercase tracking-cine text-[oklch(0.82_0.11_80)] mb-2">
          {video.year}
        </p>
        <h3 className="font-display text-xl font-light text-foreground mb-1 truncate">
          {video.title}
        </h3>
        {video.subtitle && (
          <p className="text-xs text-muted-foreground mb-3 truncate">
            {video.subtitle}
          </p>
        )}
        <p className="text-xs text-foreground/60 leading-relaxed line-clamp-2">
          {video.description}
        </p>
        <div className="mt-4 flex items-center gap-3">
          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
            <Clock className="w-3 h-3" /> {video.duration}
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
            <Film className="w-3 h-3" /> {video.category[0]}
          </span>
        </div>
      </div>
    </div>
  );
}
