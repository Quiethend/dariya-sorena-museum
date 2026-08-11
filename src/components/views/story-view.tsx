"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { chapters } from "@/lib/data/story";
import { useLocale } from "@/lib/i18n";
import { Reveal } from "@/components/site/reveal";
import { ArrowDown } from "lucide-react";

export function StoryView() {
  const { t } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  // Track which chapter is in view for the side index
  useEffect(() => {
    const els = chapters
      .map((c) => document.getElementById(`chapter-${c.id}`))
      .filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = chapters.findIndex(
              (c) => `chapter-${c.id}` === entry.target.id
            );
            if (idx !== -1) setActiveChapter(idx);
          }
        });
      },
      { threshold: 0.4 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollToChapter = (idx: number) => {
    const el = document.getElementById(`chapter-${chapters[idx].id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={containerRef} className="relative pt-24 sm:pt-28">
      {/* ===== Story intro ===== */}
      <section className="relative px-5 sm:px-8 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-mono text-[10px] uppercase tracking-luxe text-[oklch(0.52_0.24_12)] mb-6"
          >
            {t("story.label")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl font-light text-foreground leading-[1] mb-8"
          >
            {t("story.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-sm sm:text-base text-foreground/70 leading-relaxed max-w-2xl mx-auto"
          >
            {t("story.subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-12 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== Chapter index (sticky side) ===== */}
      <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-40">
        <ul className="space-y-3">
          {chapters.map((c, i) => (
            <li key={c.id}>
              <button
                onClick={() => scrollToChapter(i)}
                className="group flex items-center gap-3 cursor-pointer"
                aria-label={`Go to chapter ${c.title}`}
              >
                <span
                  className={`font-mono text-[10px] transition-colors ${
                    activeChapter === i
                      ? "text-[oklch(0.52_0.24_12)]"
                      : "text-muted-foreground/50 group-hover:text-foreground"
                  }`}
                >
                  {c.index}
                </span>
                <span
                  className={`h-px transition-all duration-500 ${
                    activeChapter === i
                      ? "w-10 bg-[oklch(0.52_0.24_12)]"
                      : "w-5 bg-foreground/20"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ===== Chapters ===== */}
      <div className="relative">
        {chapters.map((chapter, idx) => (
          <ChapterSection key={chapter.id} chapter={chapter} index={idx} />
        ))}
      </div>

      {/* ===== Closing ===== */}
      <section className="relative py-32 px-5 sm:px-8 overflow-hidden">
        <div className="fog-layer opacity-40" />
        <div className="mx-auto max-w-3xl text-center relative z-10">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-luxe text-[oklch(0.52_0.24_12)] mb-6">
              {t("story.end")}
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function ChapterSection({
  chapter,
  index,
}: {
  chapter: (typeof chapters)[number];
  index: number;
}) {
  const { t } = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15]);
  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      id={`chapter-${chapter.id}`}
      className="relative min-h-screen flex items-center py-20 sm:py-32 px-5 sm:px-8"
    >
      <div
        className={`mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center ${
          isEven ? "" : "lg:[direction:rtl]"
        }`}
      >
        {/* Image */}
        <div className={`relative ${isEven ? "" : "lg:[direction:ltr]"}`}>
          <Reveal y={60}>
            <div className="relative aspect-[4/5] sm:aspect-[5/6] overflow-hidden rounded-lg">
              <motion.div
                style={{ y: imgY, scale: imgScale }}
                className="absolute inset-0"
              >
                <img
                  src={chapter.image}
                  alt={chapter.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="absolute top-5 left-5 font-display text-6xl sm:text-7xl font-light text-foreground/30">
                {chapter.index}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Text */}
        <div className={isEven ? "" : "lg:[direction:ltr]"}>
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-luxe text-[oklch(0.52_0.24_12)] mb-4">
              {t("story.chapterLabel", { index: chapter.index })}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-3">
              {chapter.title}
            </h2>
          </Reveal>
          {chapter.subtitle && (
            <Reveal delay={0.1}>
              <p className="font-display text-lg sm:text-xl text-muted-foreground italic mb-8">
                {chapter.subtitle}
              </p>
            </Reveal>
          )}
          <div className="space-y-5">
            {chapter.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.15 + i * 0.08}>
                <p className="text-sm sm:text-base text-foreground/75 leading-[1.8]">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          {chapter.pullQuote && (
            <Reveal delay={0.4}>
              <div className="mt-10 pl-5 border-l-2 border-[oklch(0.52_0.24_12)]">
                <p className="font-display text-xl sm:text-2xl font-light italic text-foreground/90 leading-relaxed">
                  &ldquo;{chapter.pullQuote}&rdquo;
                </p>
              </div>
            </Reveal>
          )}

          {chapter.collaborators && chapter.collaborators.length > 0 && (
            <Reveal delay={0.45}>
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-cine text-muted-foreground">
                  {t("story.featuring")}
                </span>
                {chapter.collaborators.map((c) => (
                  <span
                    key={c}
                    className="px-3 py-1 text-xs glass rounded-full text-foreground/70"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
