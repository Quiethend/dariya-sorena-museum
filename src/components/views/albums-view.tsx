"use client";

import { motion, AnimatePresence } from "framer-motion";
import { albums } from "@/lib/data/albums";
import { useAppStore } from "@/lib/store";
import { Reveal } from "@/components/site/reveal";
import { useState, useEffect } from "react";
import {
  Play,
  ExternalLink,
  ChevronDown,
  Clock,
  Music2,
  Users,
} from "lucide-react";

export function AlbumsView() {
  const albumDetailId = useAppStore((s) => s.albumDetail);
  const setAlbumDetailId = useAppStore((s) => s.setAlbumDetail);
  const setShowMusicPlayer = useAppStore((s) => s.setShowMusicPlayer);
  const setCurrentTrackTitle = useAppStore((s) => s.setCurrentTrackTitle);
  const setCurrentAlbumCover = useAppStore((s) => s.setCurrentAlbumCover);
  const setIsMusicPlaying = useAppStore((s) => s.setIsMusicPlaying);

  const activeAlbum = albums.find((a) => a.id === albumDetailId);

  const playTrack = (album: (typeof albums)[number], track: { title: string }) => {
    setCurrentTrackTitle(track.title);
    setCurrentAlbumCover(album.cover);
    setShowMusicPlayer(true);
    setIsMusicPlaying(true);
  };

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
            The Discography
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl font-light text-foreground leading-[1] mb-6"
          >
            Albums
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-2xl text-sm sm:text-base text-foreground/70 leading-relaxed"
          >
            Four studio albums spanning two decades. Each album is a chapter in
            its own right — click to explore the story, tracklist, credits, and
            artwork in detail.
          </motion.p>
        </div>
      </section>

      {/* Albums list */}
      <section className="px-5 sm:px-8">
        <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
          {albums.map((album, i) => (
            <Reveal key={album.id} delay={i * 0.08}>
              <AlbumCard
                album={album}
                isActive={activeAlbum?.id === album.id}
                onOpen={() => setAlbumDetailId(album.id)}
                onClose={() => setAlbumDetailId(null)}
                onPlay={(track) => playTrack(album, track)}
              />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

function AlbumCard({
  album,
  isActive,
  onOpen,
  onClose,
  onPlay,
}: {
  album: (typeof albums)[number];
  isActive: boolean;
  onOpen: () => void;
  onClose: () => void;
  onPlay: (track: { title: string }) => void;
}) {
  const totalDuration = album.tracks.reduce((sum, t) => {
    const [m, s] = t.duration.split(":").map(Number);
    return sum + m * 60 + s;
  }, 0);
  const fmtTotal = () => {
    const m = Math.floor(totalDuration / 60);
    const s = totalDuration % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="glass rounded-2xl overflow-hidden transition-all duration-500"
      style={{
        borderColor: isActive
          ? "oklch(0.82 0.11 80 / 30%)"
          : "oklch(1 0 0 / 8%)",
        borderWidth: 1,
      }}
    >
      {/* Compact view (always visible) */}
      <button
        onClick={() => (isActive ? onClose() : onOpen())}
        className="w-full flex items-center gap-5 sm:gap-8 p-4 sm:p-6 text-left cursor-pointer"
      >
        {/* Cover */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-foreground/5">
          {!loaded && <div className="absolute inset-0 animate-pulse bg-foreground/5" />}
          <img
            src={album.cover}
            alt={album.title}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={`w-full h-full object-cover transition-opacity ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-cine text-[oklch(0.82_0.11_80)] mb-1">
            {album.year}
          </p>
          <h3 className="font-display text-2xl sm:text-3xl font-light text-foreground">
            {album.title}
          </h3>
          {album.subtitle && (
            <p className="font-display text-sm text-muted-foreground italic">
              {album.subtitle}
            </p>
          )}
          <div className="mt-2 flex items-center gap-4 font-mono text-[10px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Music2 className="w-3 h-3" /> {album.tracks.length} tracks
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" /> {fmtTotal()}
            </span>
          </div>
        </div>

        {/* Expand icon */}
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${
            isActive ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expanded detail */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-6 sm:pb-8 border-t border-foreground/8 pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                {/* Large cover + vinyl */}
                <div className="flex justify-center">
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72">
                    {/* vinyl */}
                    <div className="absolute inset-0 vinyl rounded-full translate-x-1/4 scale-90 opacity-50" />
                    {/* cover */}
                    <div className="relative w-full h-full rounded-lg overflow-hidden glow-gold">
                      <img
                        src={album.cover}
                        alt={album.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Story + Tracklist + Credits */}
                <div>
                  {/* Story */}
                  <p className="font-mono text-[10px] uppercase tracking-luxe text-[oklch(0.82_0.11_80)] mb-4">
                    The Story
                  </p>
                  <div className="space-y-4 mb-8">
                    {album.story.map((p, i) => (
                      <p
                        key={i}
                        className="text-sm text-foreground/75 leading-relaxed"
                      >
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Tracklist */}
                  <p className="font-mono text-[10px] uppercase tracking-luxe text-[oklch(0.82_0.11_80)] mb-4">
                    Tracklist
                  </p>
                  <div className="space-y-1">
                    {album.tracks.map((track) => (
                      <button
                        key={track.number}
                        onClick={() => onPlay({ title: track.title })}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-foreground/5 transition-colors text-left group cursor-pointer"
                      >
                        <span className="w-6 font-mono text-[10px] text-muted-foreground tabular-nums text-right flex-shrink-0">
                          {track.number.toString().padStart(2, "0")}
                        </span>
                        <span className="flex-1 text-sm text-foreground/90 group-hover:text-foreground transition-colors truncate">
                          {track.title}
                          {track.featuring && (
                            <span className="text-muted-foreground ml-2">
                              ft. {track.featuring}
                            </span>
                          )}
                        </span>
                        <Play className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        <span className="w-10 font-mono text-[10px] text-muted-foreground tabular-nums text-right flex-shrink-0">
                          {track.duration}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Credits */}
                  <p className="font-mono text-[10px] uppercase tracking-luxe text-[oklch(0.82_0.11_80)] mt-8 mb-4">
                    Credits
                  </p>
                  <ul className="space-y-1.5">
                    {album.credits.map((credit, i) => (
                      <li
                        key={i}
                        className="text-xs text-muted-foreground inline-flex items-center gap-1.5"
                      >
                        <Users className="w-3 h-3 flex-shrink-0" />
                        {credit}
                      </li>
                    ))}
                  </ul>

                  {/* Streaming links */}
                  {album.streaming && album.streaming.length > 0 && (
                    <>
                      <p className="font-mono text-[10px] uppercase tracking-luxe text-[oklch(0.82_0.11_80)] mt-8 mb-4">
                        Listen On
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {album.streaming.map((s) => (
                          <a
                            key={s.label}
                            href={s.href}
                            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-mono uppercase tracking-cine text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {s.label}
                          </a>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
