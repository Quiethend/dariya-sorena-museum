"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/site/reveal";
import { useLocale } from "@/lib/i18n";
import { ExternalLink } from "lucide-react";

const SPOTIFY_ARTIST_URL = "https://open.spotify.com/artist/5FTRHkve9KJ91ZMpDz4Zaf?si=yG-_iGz8TYibzQ2aqs4AEw";
const SPOTIFY_EMBED_URL = "https://open.spotify.com/embed/artist/5FTRHkve9KJ91ZMpDz4Zaf?utm_source=generator&theme=0";

export function AlbumsView() {
  const { t } = useLocale();
  return (
    <div className="relative pt-24 sm:pt-28 pb-32">
      {/* Header */}
      <section className="px-5 sm:px-8 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-mono text-[10px] uppercase tracking-luxe text-[oklch(0.52_0.24_12)] mb-5"
          >
            {t("albums.label")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            className="font-display text-5xl sm:text-7xl font-light text-foreground leading-[1] mb-6"
          >
            {t("albums.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-2xl text-sm sm:text-base text-foreground/70 leading-relaxed"
          >
            {t("albums.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Spotify Embed */}
      <section className="px-5 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="glass rounded-2xl overflow-hidden p-3 sm:p-4">
              <iframe
                src={SPOTIFY_EMBED_URL}
                width="100%"
                height="480"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style={{ borderRadius: "12px" }}
                title="Dariya & Sorena on Spotify"
              />
            </div>
          </Reveal>

          {/* Open in Spotify button */}
          <Reveal delay={0.2}>
            <div className="mt-8 flex justify-center">
              <a
                href={SPOTIFY_ARTIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-[#1DB954] text-white rounded-full text-xs font-mono uppercase tracking-cine hover:bg-[#1ed760] transition-colors duration-500"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {t("albums.openOnSpotify")}
              </a>
            </div>
          </Reveal>

          {/* Other platforms */}
          <Reveal delay={0.3}>
            <div className="mt-16 pt-12 border-t border-foreground/8">
              <p className="font-mono text-[10px] uppercase tracking-luxe text-muted-foreground/70 mb-6 text-center">
                {t("albums.alsoAvailableOn")}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { label: "Apple Music", href: "https://music.apple.com/se/artist/dariya-sorena/1753718144" },
                  { label: "YouTube", href: "https://www.youtube.com/@DariyaSorena" },
                  { label: "SoundCloud", href: "https://soundcloud.com/dariyasorena" },
                  { label: "IMDb", href: "https://www.imdb.com/name/nm12922179/" },
                ].map((platform) => (
                  <a
                    key={platform.label}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full text-xs font-mono uppercase tracking-cine text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {platform.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
