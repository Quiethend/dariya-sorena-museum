"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useAppStore, type ViewId } from "@/lib/store";
import { useLocale } from "@/lib/i18n";
// Featured release data (Edame Midam)
const FEATURED = {
  title: "Edame Midam",
  subtitle: "Dariya & Sorena",
  year: "2023",
  cover: "/images/edame-midam-cover.jpg",
  description: "Edame Midam is made in winter and it's about more cheering song that telling you the more you try forward you will close to get your achievement",
  spotifyUrl: "https://open.spotify.com/artist/5FTRHkve9KJ91ZMpDz4Zaf?si=yG-_iGz8TYibzQ2aqs4AEw",
};
import { chapters } from "@/lib/data/story";
import { Reveal } from "@/components/site/reveal";
import { ArrowDown, Play, ArrowRight } from "lucide-react";

export function HomeView() {
  const { t } = useLocale();
  const setView = useAppStore((s) => s.setView);
  const setShowMusicPlayer = useAppStore((s) => s.setShowMusicPlayer);


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
            src="/images/hero-main.png"
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
            className="font-mono text-[10px] sm:text-xs uppercase tracking-luxe text-[oklch(0.52_0.24_12)] mb-6 sm:mb-8"
          >
            {t("home.hero.tagline")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.02em" }}
            transition={{ delay: 0.7, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-foreground leading-[0.95] text-center"
          >
            DARIYA
            <span className="block sm:inline text-crimson-gradient sm:mx-4 my-1 sm:my-0">
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
            {t("home.hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1.2 }}
            className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => go("story")}
              className="group px-8 py-3.5 bg-foreground text-background rounded-full text-xs font-mono uppercase tracking-cine hover:bg-[oklch(0.52_0.24_12)] transition-colors duration-500 flex items-center gap-2 cursor-pointer"
            >
              {t("home.hero.story")}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => {
                setShowMusicPlayer(true);
              }}
              className="group px-8 py-3.5 glass rounded-full text-xs font-mono uppercase tracking-cine text-foreground hover:bg-foreground/10 transition-colors duration-500 flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-3 h-3" />
              {t("home.hero.listen")}
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
            {t("home.hero.scroll")}
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
            <p className="font-mono text-[10px] uppercase tracking-luxe text-[oklch(0.52_0.24_12)] mb-8">
              {t("home.intro.label")}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-display text-2xl sm:text-4xl md:text-5xl font-light text-foreground/90 leading-[1.3]">
              {(() => {
                const text = t("home.intro.text");
                const parts = text.split("{highlight}");
                return parts[0] ? (
                  <>
                    {parts[0]}
                    {parts[1] !== undefined && (
                      <span className="text-crimson-gradient italic">{t("home.intro.highlight")}</span>
                    )}
                    {parts[1] || ""}
                  </>
                ) : null;
              })()}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 divider-crimson w-24 mx-auto" />
          </Reveal>
        </div>
      </section>

      {/* ===== CHAPTERS PREVIEW ===== */}
      <section className="relative py-20 sm:py-28 px-5 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-luxe text-[oklch(0.52_0.24_12)] mb-3">
                  {t("home.chapters.label")}
                </p>
                <h2 className="font-display text-4xl sm:text-5xl font-light text-foreground">
                  {t("home.chapters.title")}
                </h2>
              </div>
              <button
                onClick={() => go("story")}
                className="self-start sm:self-auto group text-sm font-mono uppercase tracking-cine text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 cursor-pointer"
              >
                {t("home.chapters.readStory")}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {chapters.map((c, i) => (
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
                    <div className="absolute top-4 left-4 font-display text-3xl text-[oklch(0.52_0.24_12)] font-light">
                      {c.index}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
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
                  <div className="relative aspect-square rounded-lg overflow-hidden glow-crimson">
                    <img
                      src={FEATURED.cover}
                      alt={FEATURED.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-luxe text-[oklch(0.52_0.24_12)] mb-4">
                  {t("home.featured.label")}
                </p>
                <h2 className="font-display text-5xl sm:text-6xl font-light text-foreground mb-2">
                  {FEATURED.title}
                </h2>
                <p className="font-display text-xl text-muted-foreground italic mb-8">
                  {FEATURED.subtitle}
                </p>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-10 max-w-lg">
                  {t("home.featured.description")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={FEATURED.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-8 py-3.5 bg-foreground text-background rounded-full text-xs font-mono uppercase tracking-cine hover:bg-[oklch(0.52_0.24_12)] transition-colors duration-500 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {t("home.featured.listenOnSpotify")}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <button
                    onClick={() => setShowMusicPlayer(true)}
                    className="group px-8 py-3.5 glass rounded-full text-xs font-mono uppercase tracking-cine text-foreground hover:bg-foreground/10 transition-colors duration-500 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-3 h-3" />
                    {t("home.featured.play")}
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== STATS / LEGACY ===== */}
      {/* Sentinel for scroll-to-top button */}
      <div id="scroll-top-sentinel" />
      <section className="relative py-24 sm:py-32 px-5 sm:px-8 border-t border-foreground/8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-luxe text-[oklch(0.52_0.24_12)] mb-4 text-center">
              {t("home.legacy.label")}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-foreground text-center mb-16">
              {t("home.legacy.title")}
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            {[
              { value: "20+", label: t("home.legacy.years") },
              { value: "4", label: t("home.legacy.albums") },
              { value: "5", label: t("home.legacy.chapters") },
              { value: "∞", label: t("home.legacy.songs") },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="text-center">
                  <p className="font-display text-5xl sm:text-6xl font-light text-crimson-gradient mb-3">
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
              {t("home.cards.title")}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                view: "story" as ViewId,
                title: t("nav.story"),
                desc: t("home.cards.story"),
                img: "/images/story-card.png",
              },
              {
                view: "gallery" as ViewId,
                title: t("nav.gallery"),
                desc: t("home.cards.gallery"),
                img: "/images/gallery-card.png",
              },
              {
                view: "albums" as ViewId,
                title: t("nav.spotify"),
                desc: t("home.cards.spotify"),
                img: "/images/spotify-card.png",
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
                    <span className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-cine text-[oklch(0.52_0.24_12)] opacity-0 group-hover:opacity-100 transition-opacity">
                      {t("home.cards.enter")} <ArrowRight className="w-3 h-3" />
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
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/quote-bg.png')" }}
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="fog-layer opacity-50" />
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <Reveal>
            <p className="font-display text-3xl sm:text-5xl font-light text-foreground/90 italic leading-[1.4]">
              {t("home.quote")}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-luxe text-muted-foreground">
              {t("home.quote.attr")}
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
