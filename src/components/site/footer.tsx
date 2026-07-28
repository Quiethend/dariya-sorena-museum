"use client";

import { useAppStore, type ViewId } from "@/lib/store";
import { site } from "@/lib/data/story";
import { albums } from "@/lib/data/albums";

export function Footer() {
  const setView = useAppStore((s) => s.setView);
  const setAlbumDetail = useAppStore((s) => s.setAlbumDetail);

  const go = (v: ViewId) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-auto relative border-t border-foreground/8 bg-[oklch(0.05_0.004_270)]">
      <div className="divider-gold absolute top-0 left-0 right-0" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <button
              onClick={() => go("home")}
              className="font-display text-3xl sm:text-4xl font-light tracking-cine text-foreground cursor-pointer"
            >
              DARIYA
              <span className="text-gold-gradient mx-2">&</span>
              SORENA
            </button>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {site.tagline}. An interactive digital museum celebrating the
              story, music, and legacy of one of the earliest Persian hip-hop
              duos.
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-luxe text-muted-foreground/70">
              Est. {site.formedYear} · {site.origin}
            </p>
          </div>

          {/* Explore */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-[10px] uppercase tracking-luxe text-muted-foreground/70 mb-5">
              Explore
            </h3>
            <ul className="space-y-3">
              {[
                { id: "story" as ViewId, label: "Story" },
                { id: "gallery" as ViewId, label: "Gallery" },
                { id: "albums" as ViewId, label: "Albums" },
                { id: "timeline" as ViewId, label: "Timeline" },
                { id: "videos" as ViewId, label: "Videos" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => go(item.id)}
                    className="text-sm text-foreground/70 hover:text-[oklch(0.82_0.11_80)] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Discography */}
          <div className="md:col-span-2">
            <h3 className="font-mono text-[10px] uppercase tracking-luxe text-muted-foreground/70 mb-5">
              Albums
            </h3>
            <ul className="space-y-3">
              {albums.map((album) => (
                <li key={album.id}>
                  <button
                    onClick={() => {
                      setView("albums");
                      setAlbumDetail(album.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-sm text-foreground/70 hover:text-[oklch(0.82_0.11_80)] transition-colors cursor-pointer text-left"
                  >
                    {album.title}
                    <span className="ml-2 font-mono text-[10px] text-muted-foreground/60">
                      {album.year}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-2">
            <h3 className="font-mono text-[10px] uppercase tracking-luxe text-muted-foreground/70 mb-5">
              Listen
            </h3>
            <ul className="space-y-3">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-sm text-foreground/70 hover:text-[oklch(0.82_0.11_80)] transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-foreground/8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] uppercase tracking-cine text-muted-foreground/60 text-center sm:text-left">
            A tribute archive · Dedicated to Persian hip-hop
          </p>
          <p className="font-mono text-[10px] uppercase tracking-cine text-muted-foreground/60">
            © {new Date().getFullYear()} The Dariya & Sorena Archive
          </p>
        </div>
      </div>
    </footer>
  );
}
