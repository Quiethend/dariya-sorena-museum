"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { timelineEvents } from "@/lib/data/timeline";
import { Reveal } from "@/components/site/reveal";
import { MapPin, ChevronDown } from "lucide-react";

export function TimelineView() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = (id: string) =>
    setExpanded((prev) => (prev === id ? null : id));

  // Auto-expand first event on mount
  useEffect(() => {
    const t = setTimeout(() => setExpanded("t-1"), 800);
    return () => clearTimeout(t);
  }, []);

  const typeColors: Record<string, string> = {
    milestone: "oklch(0.82 0.11 80)",
    album: "oklch(0.75 0.15 75)",
    concert: "oklch(0.65 0.12 30)",
    film: "oklch(0.55 0.12 270)",
    return: "oklch(0.70 0.10 150)",
    future: "oklch(0.82 0.08 55)",
  };

  return (
    <div ref={containerRef} className="relative pt-24 sm:pt-28 pb-32">
      {/* Header */}
      <section className="px-5 sm:px-8 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-mono text-[10px] uppercase tracking-luxe text-[oklch(0.82_0.11_80)] mb-5"
          >
            The Timeline
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl font-light text-foreground leading-[1] mb-6"
          >
            Milestones
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-sm sm:text-base text-foreground/70 leading-relaxed max-w-2xl mx-auto"
          >
            An elegant chronicle of the moments that shaped a career — from the
            first recording to the future of the archive.
          </motion.p>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-5 sm:px-8">
        <div className="mx-auto max-w-4xl relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-foreground/15 to-transparent" />

          <div className="space-y-12 sm:space-y-16">
            {timelineEvents.map((event, idx) => {
              const isLeft = idx % 2 === 0;
              const isActive = expanded === event.id;
              const color = typeColors[event.type] || "oklch(0.82 0.11 80)";

              return (
                <Reveal key={event.id} delay={idx * 0.04} y={30}>
                  <div
                    className={`relative flex flex-col sm:flex-row items-start gap-6 sm:gap-0 ${
                      isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                  >
                    {/* Dot on line */}
                    <div
                      className={`absolute left-6 sm:left-1/2 -translate-x-1/2 top-2 w-3 h-3 rounded-full border-2 z-10 transition-colors duration-500`}
                      style={{
                        borderColor: color,
                        backgroundColor: isActive ? color : "transparent",
                      }}
                    />

                    {/* Content card */}
                    <div
                      className={`ml-14 sm:ml-0 sm:w-[calc(50%-2rem)] ${
                        isLeft ? "sm:pr-0 sm:text-right" : "sm:pl-0 sm:text-left"
                      }`}
                    >
                      <button
                        onClick={() => toggle(event.id)}
                        className="group w-full text-left sm:text-inherit cursor-pointer"
                      >
                        <div
                          className="glass rounded-xl overflow-hidden transition-all duration-500"
                          style={{
                            borderColor: isActive
                              ? `oklch(${color})`
                              : "oklch(1 0 0 / 8%)",
                            borderWidth: 1,
                          }}
                        >
                          {/* Year badge + image */}
                          {event.image && (
                            <div className="relative aspect-[2/1] overflow-hidden">
                              <img
                                src={event.image}
                                alt={event.title}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <span
                                  className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-cine"
                                  style={{
                                    background: `${color} / 25%`,
                                    color,
                                  }}
                                >
                                  {event.type}
                                </span>
                              </div>
                            </div>
                          )}

                          <div className="p-5">
                            <p className="font-mono text-[10px] uppercase tracking-luxe text-muted-foreground mb-2">
                              {event.year}
                            </p>
                            <h3 className="font-display text-2xl sm:text-3xl font-light text-foreground mb-2">
                              {event.title}
                            </h3>
                            <p className="text-sm text-muted-foreground italic">
                              {event.subtitle}
                            </p>

                            {/* Expanded content */}
                            <motion.div
                              initial={false}
                              animate={{
                                height: isActive ? "auto" : 0,
                                opacity: isActive ? 1 : 0,
                              }}
                              transition={{
                                duration: 0.5,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 mt-4 border-t border-foreground/8">
                                <p className="text-sm text-foreground/75 leading-relaxed">
                                  {event.description}
                                </p>
                                {event.image && (
                                  <div className="mt-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-cine text-muted-foreground/60">
                                    <MapPin className="w-3 h-3" />
                                    Archive image
                                  </div>
                                )}
                              </div>
                            </motion.div>

                            <div className="mt-4 flex justify-center sm:justify-start sm:text-inherit">
                              <ChevronDown
                                className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
                                  isActive ? "rotate-180" : ""
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>

                    {/* Empty space for other side */}
                    <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
