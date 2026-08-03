# Dariya & Sorena — Official Archive

An immersive, cinematic tribute website celebrating **Dariya & Sorena** — two brothers and pioneers of Persian hip-hop. Formed in Tehran in 2003, the duo helped define what Persian rap could sound like: poetry and the street, melody inside a hard boom-bap skeleton.

This project is an interactive archive of their story, music, and legacy — built as a single-page application with a dark, film-like aesthetic (fog, film grain, custom cursor, vinyl record animations) and a persistent floating music player.

> _"We weren't trying to be the first. We were trying to be honest — and honesty, back then, sounded like something new."_

---

## ✨ Features

- **6 interactive views**, navigated through a cinematic single-page experience:
  - **Home** — parallax hero with Ken Burns effect, chapter previews, featured album with spinning vinyl, stats
  - **Story** — 9 chapters spanning 2003 → present, with parallax imagery, pull quotes, and a sticky side index
  - **Gallery** — masonry grid with category filters and a fullscreen viewer (keyboard navigation, zoom, metadata)
  - **Albums** — 4 records with expandable covers, tracklists, credits, and streaming links
  - **Timeline** — alternating layout of milestones, color-coded by event type
  - **Videos** — categorized video cards with thumbnails and durations
- **Persistent music player** — mini + fullscreen modes, vinyl animation, waveform, equalizer bars, lyrics sync, and progress seeking
- **Global search** across albums, tracks, chapters, videos, and gallery
- **Atmosphere & motion** — film grain overlay, vignette, drifting fog, floating dust particles, reading-progress bar, animated reveals
- **Comprehensive SEO** — Schema.org JSON-LD (`MusicGroup`, `FAQPage`, `WebSite`), Open Graph, Twitter Cards, `robots.txt`

---

## 🎤 About the duo

| | |
| --- | --- |
| **Dariya** | Vocalist · Lyricist — "the voice: sharp, poetic, and unflinching" |
| **Sorena** | Vocalist · Producer — "the architect who shaped the duo's sound" |

- **Formed:** 2003
- **Origin:** Tehran, Iran
- **Genre:** Persian Hip-Hop / Rap

Their story moves through the **Fight Club** collective era, the **Royal Band** live years, film & television scoring work, a long silence, and a quieter return. Four albums anchor the discography: _First Breath_ (2005), _Sokhan-haye Azad_ (2008), _Faryad_ (2011), and _Akharin Seda_ (2019).

---

## 🛠️ Tech stack

- **[Next.js 16](https://nextjs.org/)** (App Router) + **React 19**
- **TypeScript 5**
- **[Tailwind CSS 4](https://tailwindcss.com/)** with `tw-animate-css`
- **[shadcn/ui](https://ui.shadcn.com/)** (Radix UI primitives)
- **[Prisma 6](https://www.prisma.io/)** for data persistence (SQLite)
- **[Zustand](https://github.com/pmndrs/zustand)** for state management
- **[Framer Motion](https://www.framer.com/motion/)** for animation
- **[TanStack Query](https://tanstack.com/query)** & **TanStack Table**
- **[Bun](https://bun.sh/)** as the runtime / package manager

---

## 🚀 Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (or [Bun](https://bun.sh/))
- A `.env` file with your database URL (a default local SQLite path is included)

### Install & run

```bash
# install dependencies
bun install
#   (or: npm install)

# set up the database
bun run db:push
bun run db:generate

# start the dev server
bun run dev
#   (or: npm run dev)
```

Then open **http://localhost:3000**.

### Available scripts

| Script | Description |
| --- | --- |
| `dev` | Start the Next.js dev server on port 3000 |
| `build` | Production build (standalone output) |
| `start` | Run the production server |
| `lint` | Run ESLint |
| `db:push` | Apply the Prisma schema to the database |
| `db:generate` | Generate the Prisma client |
| `db:migrate` | Create & apply a migration |
| `db:reset` | Reset the database |

---

## 📁 Project structure

```
src/
├── app/                    # Next.js App Router (layout, page, API routes)
│   ├── layout.tsx          # Root layout + metadata + JSON-LD schema
│   └── page.tsx            # Main entry
├── components/
│   ├── site/               # Music player, navigation, atmosphere, cursor…
│   ├── ui/                 # shadcn/ui primitives
│   └── views/              # Home, Story, Gallery, Albums, Timeline, Videos
├── hooks/                  # use-mobile, use-toast
└── lib/
    ├── data/               # Content layer: story, albums, gallery, timeline, videos, faq
    ├── db.ts               # Prisma client
    ├── store.ts            # Zustand store
    └── utils.ts            # Helpers (cn, etc.)
prisma/
└── schema.prisma           # Database schema
public/
└── images/                 # Generated atmospheric artwork
```

---

## 📝 License

This project is a personal tribute. All music, lyrics, and likenesses belong to **Dariya & Sorena**. Source code is provided as-is.
