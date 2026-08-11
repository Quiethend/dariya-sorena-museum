"use client";

import { useAppStore, type ViewId } from "@/lib/store";
import { useLocale } from "@/lib/i18n";

export function Footer() {
  const setView = useAppStore((s) => s.setView);
  const { t } = useLocale();

  const go = (v: ViewId) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { label: "Spotify", href: "https://open.spotify.com/artist/5FTRHkve9KJ91ZMpDz4Zaf?si=yG-_iGz8TYibzQ2aqs4AEw" },
    { label: "Apple Music", href: "https://music.apple.com/se/artist/dariya-sorena/1753718144" },
    { label: "YouTube", href: "https://www.youtube.com/@DariyaSorena" },
    { label: "SoundCloud", href: "https://soundcloud.com/dariyasorena" },
    { label: "IMDb", href: "https://www.imdb.com/name/nm12922179/" },
    { label: "Dariya", href: "https://www.instagram.com/d4riya/", sub: "Instagram" },
    { label: "Sorena", href: "https://www.instagram.com/sor3n4/", sub: "Instagram" },
  ];

  return (
    <footer className="mt-auto relative border-t border-foreground/8 bg-[oklch(0.05_0.004_270)]">
      <div className="divider-crimson absolute top-0 left-0 right-0" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <button
              onClick={() => go("home")}
              className="font-display text-xl sm:text-2xl font-light tracking-cine text-foreground cursor-pointer"
            >
              DARIYA
              <span className="text-crimson-gradient mx-1">&</span>
              SORENA
            </button>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Explore + Social Media — side by side, close */}
          <div className="md:col-span-7 flex flex-col gap-10 sm:gap-12">
            <div className="grid grid-cols-2 gap-6 sm:gap-10">
              {/* Explore */}
              <div>
                <h3 className="font-mono text-[10px] uppercase tracking-luxe text-muted-foreground/70 mb-4">
                  {t("footer.explore")}
                </h3>
                <ul className="space-y-2.5">
                  {[
                    { id: "story" as ViewId, label: t("nav.story") },
                    { id: "gallery" as ViewId, label: t("nav.gallery") },
                    { id: "albums" as ViewId, label: t("footer.listenOnSpotify") },
                  ].map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => go(item.id)}
                        className="text-sm text-foreground/70 hover:text-[oklch(0.52_0.24_12)] transition-colors cursor-pointer"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-mono text-[10px] uppercase tracking-luxe text-muted-foreground/70 mb-4">
                  {t("footer.connect")}
                </h3>
                <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label + s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group text-sm text-foreground/70 hover:text-[oklch(0.52_0.24_12)] transition-colors"
                    >
                      {s.label}
                      {s.sub && (
                        <span className="ml-1 text-[10px] text-muted-foreground/50 font-mono uppercase tracking-cine">
                          {s.sub}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-foreground/8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="font-mono text-[9px] uppercase tracking-cine text-muted-foreground/40">
            {t("footer.copyright", { year: String(new Date().getFullYear()) })}
          </p>
        </div>
      </div>
    </footer>
  );
}
