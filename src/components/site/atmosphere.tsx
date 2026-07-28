"use client";

import { useMemo } from "react";

export function Atmosphere() {
  const dust = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        left: `${(i * 13.7) % 100}%`,
        bottom: `-20px`,
        size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
        duration: `${14 + (i % 6) * 4}s`,
        delay: `${(i % 10) * 1.4}s`,
        opacity: 0.3 + ((i % 5) * 0.12),
      })),
    []
  );

  return (
    <>
      {/* film grain overlay */}
      <div className="film-grain" aria-hidden="true" />
      {/* vignette */}
      <div className="vignette" aria-hidden="true" />
      {/* global floating dust */}
      <div className="dust" aria-hidden="true">
        {dust.map((d, i) => (
          <span
            key={i}
            style={{
              left: d.left,
              bottom: d.bottom,
              width: d.size,
              height: d.size,
              animationDuration: d.duration,
              animationDelay: d.delay,
              opacity: d.opacity,
            }}
          />
        ))}
      </div>
    </>
  );
}
