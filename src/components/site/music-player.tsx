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
  Volume1,
  VolumeX,
  Shuffle,
  Repeat,
} from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { useLocale } from "@/lib/i18n";

// Real Spotify preview URLs — fetched from artist embed
const TRACKS: Track[] = [
  {
    id: "87878b4d379b735a667b",
    title: "Edame Midam",
    album: "Dariya & Sorena",
    cover: "/images/edame-midam-cover.jpg",
    preview: "https://p.scdn.co/mp3-preview/4e0272122bbc00d82513156628839799036aaf13",
  },
  {
    id: "4c605b6da6a9a33751e0",
    title: "Afkare Man",
    album: "2025 · Dariya & Sorena",
    cover: "/images/edame-midam-cover.jpg",
    preview: "https://p.scdn.co/mp3-preview/e497e8b1ffe78e3166465e12d91c9aa81c5b806f",
  },
];

type RepeatMode = "off" | "all" | "one";

function VolumeIcon({ vol, muted }: { vol: number; muted: boolean }) {
  if (muted || vol === 0) return <VolumeX className="w-4 h-4" />;
  if (vol < 40) return <Volume1 className="w-4 h-4" />;
  return <Volume2 className="w-4 h-4" />;
}

export function MusicPlayer() {
  const { t } = useLocale();
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
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [vol, setVol] = useState(80);
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("off");
  const [showVolSlider, setShowVolSlider] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const rafRef = useRef<number>(0);
  const handleEndedRef = useRef<() => void>(() => {});
  const volSliderRef = useRef<HTMLDivElement>(null);
  // Keep a ref to isMusicPlaying so track-loading effect can read it
  // without subscribing to it in the dependency array
  const isPlayingRef = useRef(isMusicPlaying);
  // Track previous showMusicPlayer to detect open/close transitions
  const prevShowRef = useRef(showMusicPlayer);

  // Sync isPlayingRef outside render (React 19 compliance)
  useEffect(() => {
    isPlayingRef.current = isMusicPlaying;
  }, [isMusicPlaying]);

  const current = TRACKS[trackIdx];

  // Stable ended handler
  const getNextIndex = useCallback(
    (currentIdx: number) => {
      if (repeatMode === "one") return currentIdx;
      if (shuffle) {
        let next = currentIdx;
        while (next === currentIdx && TRACKS.length > 1) {
          next = Math.floor(Math.random() * TRACKS.length);
        }
        return next;
      }
      return (currentIdx + 1) % TRACKS.length;
    },
    [repeatMode, shuffle]
  );

  useEffect(() => {
    handleEndedRef.current = () => {
      const nextIdx = getNextIndex(trackIdx);
      if (repeatMode === "off" && nextIdx === 0 && !shuffle && trackIdx === TRACKS.length - 1) {
        setIsMusicPlaying(false);
        setProgress(0);
        return;
      }
      setTrackIdx(nextIdx);
      setProgress(0);
    };
  }, [getNextIndex, trackIdx, repeatMode, shuffle, setIsMusicPlaying]);

  // Sync store with local track
  useEffect(() => {
    setCurrentTrackTitle(current.title);
    setCurrentAlbumCover(current.cover);
  }, [trackIdx, current.title, current.cover, setCurrentTrackTitle, setCurrentAlbumCover]);

  // Load audio source ONLY when track changes.
  // Do NOT depend on isMusicPlaying — that caused pause to reload audio.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = TRACKS[trackIdx].preview;
    audio.load();
    // Use the ref to check if we should resume playing after track change
    if (isPlayingRef.current) {
      audio.play().catch(() => {});
    }
  }, [trackIdx]);

  // Play/pause sync — only acts when zustand state is out of sync with audio element
  // (e.g. after player close/reopen). handlePlayPause controls audio imperatively now.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMusicPlaying && audio.paused) {
      audio.play().catch(() => {});
    } else if (!isMusicPlaying && !audio.paused) {
      audio.pause();
    }
  }, [isMusicPlaying]);

  // Volume sync
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : vol / 100;
  }, [vol, muted]);

  // Progress ticker
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isMusicPlaying) return;
    const tick = () => {
      setProgress(audio.currentTime);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isMusicPlaying, trackIdx]);

  // Auto-play ONLY when player transitions from closed → open.
  useEffect(() => {
    if (showMusicPlayer && !prevShowRef.current) {
      // Player just opened — start playing
      const audio = audioRef.current;
      if (audio && audio.src) {
        audio.play().catch(() => {});
        setIsMusicPlaying(true);
      }
    }
    prevShowRef.current = showMusicPlayer;
  }, [showMusicPlayer, setIsMusicPlaying]);

  // Close volume slider when clicking outside
  useEffect(() => {
    if (!showVolSlider) return;
    const handler = (e: MouseEvent) => {
      if (volSliderRef.current && !volSliderRef.current.contains(e.target as Node)) {
        setShowVolSlider(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showVolSlider]);

  const handlePlayPause = useCallback(() => {
    if (!showMusicPlayer) {
      setShowMusicPlayer(true);
      return;
    }
    // Imperative: control audio directly to avoid race conditions with effects
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
      setIsMusicPlaying(true);
    } else {
      audio.pause();
      setIsMusicPlaying(false);
    }
  }, [showMusicPlayer, setShowMusicPlayer, setIsMusicPlaying]);

  const nextTrack = useCallback(() => {
    const nextIdx = getNextIndex(trackIdx);
    setTrackIdx(nextIdx);
    setProgress(0);
  }, [trackIdx, getNextIndex]);

  const prevTrack = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setProgress(0);
      return;
    }
    const prevIdx = (trackIdx - 1 + TRACKS.length) % TRACKS.length;
    setTrackIdx(prevIdx);
    setProgress(0);
  }, [trackIdx]);

  const seek = (val: number) => {
    const audio = audioRef.current;
    if (audio) audio.currentTime = val;
    setProgress(val);
  };

  const toggleMute = () => {
    if (muted) {
      setMuted(false);
      if (vol === 0) setVol(80);
    } else {
      setMuted(true);
    }
  };

  const fmt = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const cycleRepeat = () => {
    setRepeatMode((m) => (m === "off" ? "all" : m === "all" ? "one" : "off"));
  };

  const cover = currentAlbumCover || current.cover;
  const title = currentTrackTitle || current.title;

  return (
    <>
      <audio
        ref={audioRef}
        preload="auto"
        onEnded={() => handleEndedRef.current()}
        onLoadedMetadata={(e) => setDuration((e.target as HTMLAudioElement).duration)}
        onTimeUpdate={(e) => setProgress((e.target as HTMLAudioElement).currentTime)}
      />

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
                {/* Progress line (top, thin) */}
                <div className="relative h-1 bg-foreground/8 cursor-pointer group">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[oklch(0.52_0.24_12)] to-[oklch(0.35_0.18_6)]"
                    style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }}
                  />
                  <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    value={progress}
                    onChange={(e) => seek(Number(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer"
                    aria-label="Seek"
                  />
                </div>

                <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-5 py-3">
                  {/* Album art */}
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
                      onClick={handlePlayPause}
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

                  {/* Mute + Time + Close */}
                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    {/* Mute button — always visible */}
                    <button
                      onClick={toggleMute}
                      className={`p-2 transition-colors cursor-pointer ${
                        muted || vol === 0
                          ? "text-[oklch(0.52_0.24_12)]"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      aria-label={muted || vol === 0 ? "Unmute" : "Mute"}
                    >
                      <VolumeIcon vol={vol} muted={muted} />
                    </button>

                    {/* Volume slider + time — desktop only */}
                    <div ref={volSliderRef} className="hidden lg:flex items-center">
                      <AnimatePresence>
                        {showVolSlider && (
                          <motion.div
                            initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                            animate={{ opacity: 1, width: "auto", marginLeft: 0 }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                            onMouseLeave={() => setShowVolSlider(false)}
                            onMouseEnter={() => setShowVolSlider(true)}
                            className="overflow-hidden flex items-center"
                          >
                            <input
                              type="range"
                              min={0}
                              max={100}
                              value={muted ? 0 : vol}
                              onChange={(e) => {
                                setVol(Number(e.target.value));
                                setMuted(false);
                              }}
                              className="w-20 accent-[oklch(0.52_0.24_12)] cursor-pointer"
                              aria-label="Volume"
                            />
                            <span className="font-mono text-[10px] text-muted-foreground/60 ml-2 w-7 text-right tabular-nums">
                              {muted ? 0 : vol}%
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Time — desktop only */}
                    <span className="hidden lg:inline font-mono text-[10px] text-muted-foreground tabular-nums">
                      {fmt(progress)} / {fmt(duration)}
                    </span>

                    {/* Close button — always visible */}
                    <button
                      onClick={() => {
                        const audio = audioRef.current;
                        if (audio) audio.pause();
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
                  key={`expanded-${trackIdx}-${cover}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="fixed inset-0 z-[140] flex flex-col"
                >
                  {/* Backdrop */}
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

                  {/* Close button — absolute, z-[200], stopPropagation */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpanded(false);
                    }}
                    className="absolute top-5 right-5 z-[200] p-2 glass rounded-full text-foreground hover:scale-105 transition-transform cursor-pointer"
                    aria-label="Collapse player"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </button>

                  <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
                    {/* Cover art */}
                    <motion.div
                      key={cover}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-2xl mb-10"
                    >
                      <img
                        src={cover}
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Track info */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="text-center max-w-2xl"
                    >
                      <p className="font-mono text-[10px] uppercase tracking-luxe text-[oklch(0.52_0.24_12)] mb-3">
                        {t("player.nowPlaying")}
                      </p>
                      <h2 className="font-display text-4xl sm:text-5xl font-light text-foreground">
                        {title}
                      </h2>
                      <p className="mt-3 text-sm text-muted-foreground font-mono">
                        {current.album}
                      </p>
                    </motion.div>

                    {/* Seek bar */}
                    <div className="mt-8 w-full max-w-md">
                      <div className="relative h-1 bg-foreground/10 rounded-full">
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[oklch(0.52_0.24_12)] to-[oklch(0.35_0.18_6)] rounded-full"
                          style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }}
                        />
                        <input
                          type="range"
                          min={0}
                          max={duration || 0}
                          value={progress}
                          onChange={(e) => seek(Number(e.target.value))}
                          className="absolute inset-0 w-full opacity-0 cursor-pointer"
                          aria-label="Seek"
                        />
                      </div>
                      <div className="flex justify-between mt-2 font-mono text-[10px] text-muted-foreground">
                        <span>{fmt(progress)}</span>
                        <span>{fmt(duration)}</span>
                      </div>
                    </div>

                    {/* Controls: Shuffle, Prev, Play, Next, Repeat */}
                    <div className="mt-8 flex items-center gap-5">
                      <button
                        onClick={() => setShuffle(!shuffle)}
                        className={`p-2 transition-colors cursor-pointer ${
                          shuffle
                            ? "text-[oklch(0.52_0.24_12)]"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        aria-label="Shuffle"
                      >
                        <Shuffle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={prevTrack}
                        className="p-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        aria-label="Previous"
                      >
                        <SkipBack className="w-6 h-6" />
                      </button>
                      <button
                        onClick={handlePlayPause}
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
                      <button
                        onClick={cycleRepeat}
                        className={`p-2 transition-colors cursor-pointer relative ${
                          repeatMode !== "off"
                            ? "text-[oklch(0.52_0.24_12)]"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        aria-label="Repeat"
                      >
                        <Repeat className="w-5 h-5" />
                        {repeatMode === "one" && (
                          <span className="absolute -top-0.5 -right-0.5 text-[8px] font-bold text-[oklch(0.52_0.24_12)]">
                            1
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Volume */}
                    <div className="mt-10 flex items-center gap-4 w-full max-w-sm">
                      <button
                        onClick={toggleMute}
                        className={`p-2 rounded-full transition-all duration-200 cursor-pointer ${
                          muted || vol === 0
                            ? "text-[oklch(0.52_0.24_12)] glass"
                            : "text-muted-foreground hover:text-foreground hover:glass"
                        }`}
                        aria-label={muted || vol === 0 ? "Unmute" : "Mute"}
                      >
                        <VolumeIcon vol={vol} muted={muted} />
                      </button>
                      <div className="relative flex-1 h-1.5 bg-foreground/10 rounded-full group cursor-pointer">
                        {/* Volume fill */}
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[oklch(0.52_0.24_12)] to-[oklch(0.40_0.18_6)] rounded-full transition-all duration-100"
                          style={{ width: `${muted ? 0 : vol}%` }}
                        />
                        {/* Thumb indicator */}
                        <div
                          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[oklch(0.52_0.24_12)] shadow-[0_0_6px_oklch(0.52_0.24_12/60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          style={{ left: `calc(${muted ? 0 : vol}% - 6px)` }}
                        />
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={muted ? 0 : vol}
                          onChange={(e) => {
                            setVol(Number(e.target.value));
                            setMuted(false);
                          }}
                          className="absolute inset-0 w-full opacity-0 cursor-pointer"
                          aria-label="Volume"
                        />
                      </div>
                      <span className="font-mono text-[11px] text-muted-foreground/70 tabular-nums w-8 text-right">
                        {muted ? 0 : vol}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
