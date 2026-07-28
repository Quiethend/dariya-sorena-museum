"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  X,
  ChevronUp,
  ChevronDown,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TRACKS = [
  { title: "Shab (Night)", album: "First Breath", cover: "/images/album-1.png", duration: 243 },
  { title: "Sokhan-e Azad", album: "Sokhan-haye Azad", cover: "/images/album-2.png", duration: 224 },
  { title: "Faryad", album: "Faryad", cover: "/images/album-3.png", duration: 285 },
  { title: "Akharin Seda", album: "Akharin Seda", cover: "/images/album-4.png", duration: 322 },
];

// Sample lyrics lines for the lyric-sync feature (illustrative)
const LYRICS: Record<string, { time: number; text: string }[]> = {
  "Shab (Night)": [
    { time: 0, text: "The night opens slowly, the way a city forgets to sleep" },
    { time: 18, text: "I walk the streets with no name, no map, no memory" },
    { time: 40, text: "Every window holds a story the morning will erase" },
    { time: 64, text: "I leave my verses on the walls like quiet evidence" },
    { time: 90, text: "The night is generous — it keeps what daylight can't" },
    { time: 120, text: "And I am just a voice passing through" },
    { time: 150, text: "A voice passing through the sleeping city" },
    { time: 190, text: "The night opens slowly, and I open with it" },
  ],
};

export function MusicPlayer() {
  const showMusicPlayer = useAppStore((s) => s.showMusicPlayer);
  const setShowMusicPlayer = useAppStore((s) => s.setShowMusicPlayer);
  const currentTrackTitle = useAppStore((s) => s.currentTrackTitle);
  const setCurrentTrackTitle = useAppStore((s) => s.setCurrentTrackTitle);
  const currentAlbumCover = useAppStore((s) => s.currentAlbumCover);
  const setCurrentAlbumCover = useAppStore((s) => s.setCurrentAlbumCover);
  const isMusicPlaying = useAppStore((s) => s.isMusicPlaying);
  const setIsMusicPlaying = useAppStore((s) => s.setIsMusicPlaying);

  const [expanded, setExpanded] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const [progress, setProgress] = useState(0); // seconds
  const [muted, setMuted] = useState(false);
  const [vol, setVol] = useState(80);
  const rafRef = useRef<number>(0);
  const lastTickRef = useRef<number>(0);

  const current = TRACKS[trackIdx];

  // Keep store in sync with local track
  useEffect(() => {
    setCurrentTrackTitle(current.title);
    setCurrentAlbumCover(current.cover);
  }, [trackIdx, current.title, current.cover, setCurrentTrackTitle, setCurrentAlbumCover]);

  // When showMusicPlayer turns on, start playing
  useEffect(() => {
    if (showMusicPlayer && !isMusicPlaying) {
      setIsMusicPlaying(true);
      lastTickRef.current = performance.now();
    }
  }, [showMusicPlayer, isMusicPlaying, setIsMusicPlaying]);

  // Progress ticker
  useEffect(() => {
    if (!isMusicPlaying) return;
    lastTickRef.current = performance.now();
    const tick = (now: number) => {
      const dt = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;
      setProgress((p) => {
        const np = p + dt;
        if (np >= current.duration) {
          // next track
          setTrackIdx((i) => (i + 1) % TRACKS.length);
          return 0;
        }
        return np;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isMusicPlaying, current.duration]);

  const togglePlay = () => {
    if (!showMusicPlayer) {
      setShowMusicPlayer(true);
      return;
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const nextTrack = () => {
    setTrackIdx((i) => (i + 1) % TRACKS.length);
    setProgress(0);
  };
  const prevTrack = () => {
    setTrackIdx((i) => (i - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  const seek = (val: number) => setProgress(val);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const cover = currentAlbumCover || current.cover;
  const title = currentTrackTitle || current.title;
  const lyricTrack = LYRICS[current.title] || LYRICS["Shab (Night)"];
  const activeLyric = [...lyricTrack].reverse().find((l) => progress >= l.time);

  return (
    <AnimatePresence>
      {showMusicPlayer && (
        <>
          {/* Mini player */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 left-0 right-0 z-[90] px-3 sm:px-5 pb-3 sm:pb-5"
          >
            <div className="mx-auto max-w-5xl glass-strong rounded-2xl overflow-hidden shadow-2xl">
              {/* progress line (top, thin) */}
              <div className="relative h-1 bg-foreground/8 cursor-pointer group">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[oklch(0.82_0.11_80)] to-[oklch(0.62_0.10_65)]"
                  style={{ width: `${(progress / current.duration) * 100}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={current.duration}
                  value={progress}
                  onChange={(e) => seek(Number(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                  aria-label="Seek"
                />
              </div>

              <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-5 py-3">
                {/* Album art + spinning vinyl */}
                <button
                  onClick={() => setExpanded(true)}
                  className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer group"
                  aria-label="Expand player"
                >
                  <img
                    src={cover}
                    alt={title}
                    className={`w-full h-full object-cover transition-transform ${
                      isMusicPlaying ? "scale-105" : "scale-100"
                    }`}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <ChevronUp className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>

                {/* Track info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-foreground truncate font-medium">
                      {title}
                    </p>
                    {isMusicPlaying && (
                      <div className="flex items-end gap-0.5 h-3 flex-shrink-0">
                        {[0, 1, 2, 3].map((i) => (
                          <span
                            key={i}
                            className="eq-bar"
                            style={{ animationDelay: `${i * 0.15}s` }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate font-mono">
                    {current.album}
                  </p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  <button
                    onClick={prevTrack}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer hidden sm:block"
                    aria-label="Previous"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>
                  <button
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                    aria-label={isMusicPlaying ? "Pause" : "Play"}
                  >
                    {isMusicPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5" />
                    )}
                  </button>
                  <button
                    onClick={nextTrack}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer hidden sm:block"
                    aria-label="Next"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>

                {/* time + close (desktop) */}
                <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
                  <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                    {fmt(progress)} / {fmt(current.duration)}
                  </span>
                  <button
                    onClick={() => {
                      setShowMusicPlayer(false);
                      setIsMusicPlaying(false);
                    }}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    aria-label="Close player"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Fullscreen / expanded player */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="fixed inset-0 z-[140] flex flex-col"
              >
                {/* backdrop */}
                <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl" />
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `url(${cover})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(60px) saturate(140%)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

                {/* close */}
                <button
                  onClick={() => setExpanded(false)}
                  className="absolute top-5 right-5 z-10 p-2 glass rounded-full text-foreground hover:scale-105 transition-transform cursor-pointer"
                  aria-label="Collapse player"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>

                <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
                  {/* Vinyl + cover */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-64 h-64 sm:w-80 sm:h-80 mb-10"
                  >
                    {/* vinyl */}
                    <div
                      className={`absolute inset-0 vinyl rounded-full ${
                        isMusicPlaying ? "vinyl-spin" : ""
                      }`}
                      style={{ animationPlayState: isMusicPlaying ? "running" : "paused" }}
                    />
                    {/* cover in center */}
                    <div className="absolute inset-0 m-auto w-1/2 h-1/2 rounded-full overflow-hidden ring-1 ring-foreground/20">
                      <img
                        src={cover}
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>

                  {/* Track info */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-center max-w-2xl"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-luxe text-[oklch(0.82_0.11_80)] mb-3">
                      Now Playing
                    </p>
                    <h2 className="font-display text-4xl sm:text-5xl font-light text-foreground">
                      {title}
                    </h2>
                    <p className="mt-3 text-sm text-muted-foreground font-mono">
                      {current.album} · {fmt(current.duration)}
                    </p>
                  </motion.div>

                  {/* Waveform */}
                  <div className="mt-8 w-full max-w-2xl flex items-end justify-center gap-[3px] h-16">
                    {Array.from({ length: 64 }).map((_, i) => {
                      const active = i / 64 < progress / current.duration;
                      const h = 20 + Math.abs(Math.sin(i * 0.7)) * 80;
                      return (
                        <div
                          key={i}
                          className={`flex-1 rounded-full transition-colors duration-300 ${
                            active
                              ? "bg-gradient-to-t from-[oklch(0.82_0.11_80)] to-[oklch(0.62_0.10_65)]"
                              : "bg-foreground/15"
                          }`}
                          style={{ height: `${h}%` }}
                        />
                      );
                    })}
                  </div>

                  {/* seek bar */}
                  <div className="mt-6 w-full max-w-2xl">
                    <div className="relative h-1 bg-foreground/10 rounded-full">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[oklch(0.82_0.11_80)] to-[oklch(0.62_0.10_65)] rounded-full"
                        style={{ width: `${(progress / current.duration) * 100}%` }}
                      />
                      <input
                        type="range"
                        min={0}
                        max={current.duration}
                        value={progress}
                        onChange={(e) => seek(Number(e.target.value))}
                        className="absolute inset-0 w-full opacity-0 cursor-pointer"
                        aria-label="Seek"
                      />
                    </div>
                    <div className="flex justify-between mt-2 font-mono text-[10px] text-muted-foreground">
                      <span>{fmt(progress)}</span>
                      <span>-{fmt(current.duration - progress)}</span>
                    </div>
                  </div>

                  {/* controls */}
                  <div className="mt-8 flex items-center gap-6">
                    <button
                      onClick={prevTrack}
                      className="p-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      aria-label="Previous"
                    >
                      <SkipBack className="w-6 h-6" />
                    </button>
                    <button
                      onClick={togglePlay}
                      className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                      aria-label={isMusicPlaying ? "Pause" : "Play"}
                    >
                      {isMusicPlaying ? (
                        <Pause className="w-7 h-7" />
                      ) : (
                        <Play className="w-7 h-7 ml-1" />
                      )}
                    </button>
                    <button
                      onClick={nextTrack}
                      className="p-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      aria-label="Next"
                    >
                      <SkipForward className="w-6 h-6" />
                    </button>
                  </div>

                  {/* volume */}
                  <div className="mt-8 flex items-center gap-3 w-full max-w-xs">
                    <button
                      onClick={() => setMuted((m) => !m)}
                      className="text-muted-foreground hover:text-foreground cursor-pointer"
                      aria-label="Mute"
                    >
                      {muted || vol === 0 ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={muted ? 0 : vol}
                      onChange={(e) => {
                        setVol(Number(e.target.value));
                        setMuted(false);
                      }}
                      className="flex-1 accent-[oklch(0.82_0.11_80)]"
                      aria-label="Volume"
                    />
                  </div>

                  {/* Lyrics */}
                  <div className="mt-10 w-full max-w-2xl text-center">
                    <p className="font-mono text-[10px] uppercase tracking-luxe text-muted-foreground/60 mb-4">
                      Lyrics
                    </p>
                    <div className="min-h-[6rem]">
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={activeLyric?.text || "intro"}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.5 }}
                          className="font-display text-xl sm:text-2xl font-light text-foreground/90 italic"
                        >
                          {activeLyric?.text || "♪"}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
