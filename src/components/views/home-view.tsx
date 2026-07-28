"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useAppStore, type ViewId } from "@/lib/store";
import { site } from "@/lib/data/story";
import { albums } from "@/lib/data/albums";
import { chapters } from "@/lib/data/story";
import { Reveal } from "@/components/site/reveal";
import { ArrowDown, Play, ArrowRight } from "lucide-react";

export function HomeView() {
  const setView = useAppStore((s) => s.setView);
  const setShowMusicPlayer = useAppStore((s) => s.setShowMusicPlayer);
  const setAlbumDetail = useAppStore((s) => s.setAlbumDetail);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  const go = (v: ViewId) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* ===== HERO ===== */}
      <section
        ref={heroRef}
        className="relative h-[100svh] min-h-[640px] w-full overflow-hidden flex items-center justify-center"
      >
        {/* Background image with parallax */}
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0"
        >
          <img
            src="/images/hero-fog.png"
            alt="Cinematic fog in an underground hall"
            className="w-full h-full object-cover ken-burns"
            fetchPriority="high"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />

        {/* Fog layer */}
        <div className="fog-layer" />

        {/* Hero content */}
        <motion.div
          style={{ y: textY, opacity: heroOpacity }}
          className="relative z-10 px-6 text-center max-w-5xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="font-mono text-[10px] sm:text-xs uppercase tracking-luxe text-[oklch(0.82_0.11_80)] mb-6 sm:mb-8"
          >
            {site.tagline} · Est. {site.formedYear}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.02em" }}
            transition={{ delay: 0.7, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-foreground leading-[0.95]"
          >
            DARIYA
            <span className="block sm:inline text-gold-gradient sm:mx-4 my-1 sm:my-0">
              &
            </span>
            SORENA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 1.2 }}
            className="mt-8 sm:mt-10 max-w-xl mx-auto text-sm sm:text-base text-foreground/70 leading-relaxed"
          >
            An interactive digital museum dedicated to one of the earliest
            Persian hip-hop duos. Their story, their sound, their legacy —
            preserved in light and fog.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1.2 }}
            className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => go("story")}
              className="group px-8 py-3.5 bg-foreground text-background rounded-full text-xs font-mono uppercase tracking-cine hover:bg-[oklch(0.82_0.11_80)] transition-colors duration-500 flex items-center gap-2 cursor-pointer"
            >
              Enter the Archive
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => {
                setShowMusicPlayer(true);
                go("albums");
              }}
              className="group px-8 py-3.5 glass rounded-full text-xs font-mono uppercase tracking-cine text-foreground hover:bg-foreground/10 transition-colors duration-500 flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-3 h-3" />
              Listen
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-luxe text-muted-foreground">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-3.5 h-3.5 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== INTRO STRIP ===== */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-luxe text-[oklch(0.82_0.11_80)] mb-8">
              The Archive
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-display text-2xl sm:text-4xl md:text-5xl font-light text-foreground/90 leading-[1.3]">
              Two voices that met in the margins of a city that wasn&apos;t
              listening — and gave Persian hip-hop{" "}
              <span className="text-gold-gradient italic">its first language</span>.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 divider-gold w-24 mx-auto" />
          </Reveal>
        </div>
      </section>

      {/* ===== CHAPTERS PREVIEW ===== */}
      <section className="relative py-20 sm:py-28 px-5 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-luxe text-[oklch(0.82_0.11_80)] mb-3">
                  The Story
                </p>
                <h2 className="font-display text-4xl sm:text-5xl font-light text-foreground">
                  Nine chapters of a career
                </h2>
              </div>
              <button
                onClick={() => go("story")}
                className="self-start sm:self-auto group text-sm font-mono uppercase tracking-cine text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 cursor-pointer"
              >
                Read the story
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {chapters.slice(0, 3).map((c, i) => (
              <Reveal key={c.id} delay={i * 0.1}>
                <button
                  onClick={() => go("story")}
                  className="group block w-full text-left cursor-pointer"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg mb-5">
                    <img
                      src={c.image}
                      alt={c.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    <div className="absolute top-4 left-4 font-display text-3xl text-[oklch(0.82_0.11_80)] font-light">
                      {c.index}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="font-mono text-[10px] uppercase tracking-cine text-muted-foreground mb-1">
                        {c.year}
                      </p>
                      <h3 className="font-display text-2xl font-light text-foreground">
                        {c.title}
                      </h3>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED ALBUM ===== */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-8 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <div className="relative">
                <div className="relative aspect-square max-w-md mx-auto">
                  {/* vinyl behind */}
                  <div className="absolute inset-0 vinyl rounded-full translate-x-1/4 scale-90 opacity-60 vinyl-spin" />
                  {/* cover */}
                  <div className="relative aspect-square rounded-lg overflow-hidden glow-gold">
                    <img
                      src={albums[3].cover}
                      alt={albums[3].title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-luxe text-[oklch(0.82_0.11_80)] mb-4">
                  Latest Release · {albums[3].year}
                </p>
                <h2 className="font-display text-5xl sm:text-6xl font-light text-foreground mb-2">
                  {albums[3].title}
                </h2>
                <p className="font-display text-xl text-muted-foreground italic mb-8">
                  {albums[3].subtitle}
                </p>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-10 max-w-lg">
                  {albums[3].story[0]}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      go("albums");
                      setAlbumDetail(albums[3].id);
                    }}
                    className="group px-8 py-3.5 bg-foreground text-background rounded-full text-xs font-mono uppercase tracking-cine hover:bg-[oklch(0.82_0.11_80)] transition-colors duration-500 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Open the album
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => setShowMusicPlayer(true)}
                    className="group px-8 py-3.5 glass rounded-full text-xs font-mono uppercase tracking-cine text-foreground hover:bg-foreground/10 transition-colors duration-500 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-3 h-3" />
                    Play
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== STATS / LEGACY ===== */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-8 border-t border-foreground/8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-luxe text-[oklch(0.82_0.11_80)] mb-4 text-center">
              The Legacy
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-foreground text-center mb-16">
              Two decades in the archive
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            {[
              { value: "20+", label: "Years of music" },
              { value: "4", label: "Studio albums" },
              { value: "9", label: "Story chapters" },
              { value: "∞", label: "Songs remembered" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="text-center">
                  <p className="font-display text-5xl sm:text-6xl font-light text-gold-gradient mb-3">
                    {stat.value}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-cine text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NAVIGATION CARDS ===== */}
      <section className="relative py-24 sm:py-32 px-5 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-foreground text-center mb-16">
              Explore the museum
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                view: "story" as ViewId,
                title: "Story",
                desc: "An interactive documentary across nine chapters.",
                img: chapters[3].image,
              },
              {
                view: "gallery" as ViewId,
                title: "Gallery",
                desc: "An art exhibition of photographs and memories.",
                img: "/images/gallery-portrait-1.png",
              },
              {
                view: "albums" as ViewId,
                title: "Albums",
                desc: "A premium discography with dedicated pages.",
                img: albums[2].cover,
              },
              {
                view: "timeline" as ViewId,
                title: "Timeline",
                desc: "The milestones that defined a career.",
                img: "/images/chapter-royal-band.png",
              },
              {
                view: "videos" as ViewId,
                title: "Videos",
                desc: "Music videos, live shows, and documentaries.",
                img: "/images/gallery-concert-1.png",
              },
              {
                view: "home" as ViewId,
                title: "Listen",
                desc: "The persistent player, always within reach.",
                img: albums[0].cover,
                action: () => setShowMusicPlayer(true),
              },
            ].map((card, i) => (
              <Reveal key={card.title} delay={i * 0.06}>
                <button
                  onClick={() => {
                    if (card.action) card.action();
                    else go(card.view);
                  }}
                  className="group relative w-full aspect-[4/3] rounded-lg overflow-hidden cursor-pointer block"
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-background/0 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                    <h3 className="font-display text-3xl font-light text-foreground mb-2">
                      {card.title}
                    </h3>
                    <p className="text-xs text-muted-foreground max-w-xs">
                      {card.desc}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-cine text-[oklch(0.82_0.11_80)] opacity-0 group-hover:opacity-100 transition-opacity">
                      Enter <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLOSING QUOTE ===== */}
      <section className="relative py-32 sm:py-48 px-5 sm:px-8 overflow-hidden">
        <div className="fog-layer opacity-50" />
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <Reveal>
            <p className="font-display text-3xl sm:text-5xl font-light text-foreground/90 italic leading-[1.4]">
              “We weren&apos;t trying to be the first. We were trying to be
              honest — and honesty, back then, sounded like something new.”
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-luxe text-muted-foreground">
              — Dariya & Sorena
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
