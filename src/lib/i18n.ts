import { useAppStore, type Locale } from "@/lib/store";

const dict: Record<Locale, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.story": "Story",
    "nav.gallery": "Gallery",
    "nav.spotify": "Spotify",
    "nav.albums": "Spotify",
    // Footer
    "footer.explore": "Explore",
    "footer.connect": "Social Media",
    "footer.listenOnSpotify": "Listen on Spotify",
    "footer.copyright": "\u00A9 {year} Dariya & Sorena / Web Design by Quiethend",
    "footer.tagline": "Pioneers of Persian Hip-Hop & Rap. The official website celebrating the story, music, and legacy of one of the earliest Persian hip-hop duos.",
    // Home — Hero
    "home.hero.tagline": "Pioneers of Persian Hip-Hop & Rap",
    "home.hero.subtitle": "The official website of Dariya & Sorena \u2014 two of the earliest Persian hip-hop artists. Their story, their sound, their legacy \u2014 told through music and visuals.",
    "home.hero.story": "Story",
    "home.hero.listen": "Listen",
    "home.hero.scroll": "Scroll",
    // Home — Intro
    "home.intro.label": "The Artists",
    "home.intro.text": "Two voices that met in the margins of a city that wasn\u2019t listening \u2014 and gave Persian hip-hop {highlight}.",
    "home.intro.highlight": "its first language",
    // Home — Chapters
    "home.chapters.label": "The Story",
    "home.chapters.title": "Eight chapters of a career",
    "home.chapters.readStory": "Read the story",
    // Home — Featured
    "home.featured.label": "Featured",
    "home.featured.description": "Edame Midam is made in winter and it\u2019s about more cheering song that telling you the more you try forward you will close to get your achievement",
    "home.featured.listenOnSpotify": "Listen on Spotify",
    "home.featured.play": "Play",
    // Home — Legacy
    "home.legacy.label": "The Legacy",
    "home.legacy.title": "Two decades of music",
    "home.legacy.years": "Years of music",
    "home.legacy.albums": "Studio albums",
    "home.legacy.chapters": "Story chapters",
    "home.legacy.songs": "Songs remembered",
    // Home — Cards
    "home.cards.title": "Explore",
    "home.cards.story": "An interactive documentary across eight chapters.",
    "home.cards.gallery": "An art exhibition of photographs and memories.",
    "home.cards.spotify": "Stream the full discography on Spotify.",
    "home.cards.listen": "The persistent player, always within reach.",
    "home.cards.enter": "Enter",
    // Home — Quote
    "home.quote": "\u201CWe weren\u2019t trying to be the first. We were trying to be honest \u2014 and honesty, back then, sounded like something new.\u201D",
    "home.quote.attr": "\u2014 Dariya & Sorena",
    // Story
    "story.label": "The Story",
    "story.title": "An interactive documentary",
    "story.subtitle": "Eight chapters trace the journey of Dariya & Sorena \u2014 from a borrowed microphone in Tehran to two decades of music, memory, and legacy. Scroll to walk through their story.",
    "story.chapterLabel": "Chapter {index}",
    "story.featuring": "Featuring:",
    "story.end": "End of the story \u2014 for now",
    // Gallery
    "gallery.label": "The Gallery",
    "gallery.title": "An exhibition of memories",
    "gallery.subtitle": "Photographs, personal stills, and album artwork from two decades of music. Every image carries a date, a place, and a story. Click to enter the fullscreen viewer \u2014 use arrow keys to move through the collection.",
    "gallery.album": "Album: {name}",
    "gallery.photo": "Photo: {name}",
    // Albums
    "albums.label": "The Music",
    "albums.title": "Listen on Spotify",
    "albums.subtitle": "Stream the full discography of Dariya & Sorena directly on Spotify. From the early underground recordings to the latest releases \u2014 everything in one place.",
    "albums.openOnSpotify": "Open on Spotify",
    "albums.alsoAvailableOn": "Also available on",
    // Music Player
    "player.nowPlaying": "Now Playing",
    // Search
    "search.placeholder": "Search albums, songs, chapters, gallery\u2026",
    "search.heading": "Search the website",
    "search.hint": "Find albums, tracks, story chapters, and gallery images.",
    "search.noResults": "No results for",
    "search.album": "Album",
    "search.track": "Track",
    "search.chapter": "Story",
    "search.gallery": "Gallery",
  },
  fa: {
    // Navigation
    "nav.home": "\u062E\u0627\u0646\u0647",
    "nav.story": "\u062F\u0627\u0633\u062A\u0627\u0646",
    "nav.gallery": "\u06AF\u0627\u0644\u0631\u06CC",
    "nav.spotify": "\u0627\u0633\u067E\u0627\u062A\u06CC\u0641\u0627\u06CC",
    "nav.albums": "\u0627\u0633\u067E\u0627\u062A\u06CC\u0641\u0627\u06CC",
    // Footer
    "footer.explore": "Explore",
    "footer.connect": "\u0634\u0628\u06A9\u0647\u200C\u0647\u0627\u06CC \u0627\u062C\u062A\u0645\u0627\u0639\u06CC",
    "footer.listenOnSpotify": "\u06AF\u0648\u0634 \u062F\u0627\u062F\u0646 \u062F\u0631 \u0627\u0633\u067E\u0627\u062A\u06CC\u0641\u0627\u06CC",
    "footer.copyright": "\u00A9 {year} \u062F\u0631\u06CC\u0627 & \u0633\u0648\u0631\u0646\u0627 / \u0637\u0631\u0627\u062D\u06CC \u0648\u0628 \u062A\u0648\u0633\u0637 Quiethend",
    "footer.tagline": "\u0648\u0628\u200C\u0633\u0627\u06CC\u062A \u0631\u0633\u0645\u06CC \u062F\u0631\u06CC\u0627 \u0648 \u0633\u0648\u0631\u0646\u0627 \u2014 \u0627\u0632 \u0627\u0648\u0644\u06CC\u0646 \u0647\u0646\u0631\u0645\u0646\u062F\u0627\u0646 \u0647\u06CC\u067E-\u0647\u0627\u067E \u0648 \u0631\u067E \u0641\u0627\u0631\u0633\u06CC. \u062F\u0627\u0633\u062A\u0627\u0646\u0634\u0627\u0646\u060C \u0635\u062F\u0627\u06CC\u0634\u0627\u0646\u060C \u0645\u06CC\u0631\u0627\u062B\u0634\u0627\u0646 \u2014 \u0631\u0648\u0627\u06CC\u062A \u0634\u062F\u0647 \u0628\u0627 \u0645\u0648\u0633\u06CC\u0642\u06CC \u0648 \u062A\u0635\u0627\u0648\u06CC\u0631.",
    // Home — Hero
    "home.hero.tagline": "\u067E\u06CC\u0634\u06AF\u0627\u0645\u0627\u0646 \u0647\u06CC\u067E-\u0647\u0627\u067E \u0648 \u0631\u067E \u0641\u0627\u0631\u0633\u06CC",
    "home.hero.subtitle": "\u0648\u0628\u200C\u0633\u0627\u06CC\u062A \u0631\u0633\u0645\u06CC \u062F\u0631\u06CC\u0627 \u0648 \u0633\u0648\u0631\u0646\u0627 \u2014 \u0627\u0632 \u0627\u0648\u0644\u06CC\u0646 \u0647\u0646\u0631\u0645\u0646\u062F\u0627\u0646 \u0647\u06CC\u067E-\u0647\u0627\u067E \u0648 \u0631\u067E \u0641\u0627\u0631\u0633\u06CC. \u062F\u0627\u0633\u062A\u0627\u0646\u0634\u0627\u0646\u060C \u0635\u062F\u0627\u06CC\u0634\u0627\u0646\u060C \u0645\u06CC\u0631\u0627\u062B\u0634\u0627\u0646 \u2014 \u0631\u0648\u0627\u06CC\u062A \u0634\u062F\u0647 \u0628\u0627 \u0645\u0648\u0633\u06CC\u0642\u06CC \u0648 \u062A\u0635\u0627\u0648\u06CC\u0631.",
    "home.hero.story": "\u062F\u0627\u0633\u062A\u0627\u0646",
    "home.hero.listen": "\u06AF\u0648\u0634 \u062F\u0627\u062F\u0646",
    "home.hero.scroll": "\u0627\u0633\u06A9\u0631\u0648\u0644",
    // Home — Intro
    "home.intro.label": "\u0647\u0646\u0631\u0645\u0646\u062F\u0627\u0646",
    "home.intro.text": "\u062F\u0648 \u0635\u062F\u0627\u06CC\u06CC \u06A9\u0647 \u0645\u0633\u06CC\u0631\u0634\u0627\u0646 \u0631\u0627 \u0627\u0632 \u062F\u0644 \u062E\u06CC\u0627\u0628\u0627\u0646\u200C\u0647\u0627\u060C \u062A\u062C\u0631\u0628\u0647\u200C\u0647\u0627 \u0648 \u0631\u0648\u0627\u06CC\u062A\u200C\u0647\u0627\u06CC \u0634\u062E\u0635\u06CC \u067E\u06CC\u062F\u0627 \u06A9\u0631\u062F\u0646\u062F \u0648 \u0628\u062E\u0634\u06CC \u0627\u0632 \u0647\u0648\u06CC\u062A \u0648 \u0632\u0628\u0627\u0646 \u062E\u0648\u062F \u0631\u0627 \u0628\u0647 \u0647\u06CC\u067E\u200C\u0647\u0627\u067E \u0641\u0627\u0631\u0633\u06CC \u0622\u0648\u0631\u062F\u0646\u062F. \u0645\u0648\u0633\u06CC\u0642\u06CC \u0622\u0646\u200C\u0647\u0627 \u0628\u0627\u0632\u062A\u0627\u0628\u06CC \u0627\u0632 \u0632\u0646\u062F\u06AF\u06CC\u060C \u0627\u062D\u0633\u0627\u0633\u0627\u062A \u0648 \u0646\u06AF\u0627\u0647\u0634\u0627\u0646 \u0628\u0647 \u062C\u0627\u0645\u0639\u0647 \u0627\u0633\u062A\u061B \u0631\u0648\u0627\u06CC\u062A\u06CC \u06A9\u0647 \u0628\u0627 \u0632\u0628\u0627\u0646 \u0641\u0627\u0631\u0633\u06CC\u060C \u0627\u0632 \u062F\u0646\u06CC\u0627\u06CC\u06CC \u0645\u06CC\u200C\u06AF\u0648\u06CC\u062F \u06A9\u0647 \u062E\u0648\u062F\u0634\u0627\u0646 \u062A\u062C\u0631\u0628\u0647 \u06A9\u0631\u062F\u0647\u200C\u0627\u0646\u062F.",
    "home.intro.highlight": "\u0627\u0648\u0644\u06CC\u0646 \u0632\u0628\u0627\u0646",
    // Home — Chapters
    "home.chapters.label": "\u062F\u0627\u0633\u062A\u0627\u0646",
    "home.chapters.title": "\u0647\u0634\u062A \u0641\u0635\u0644 \u0627\u0632 \u06CC\u06A9 \u0645\u0633\u06CC\u0631 \u062D\u0631\u0641\u0647\u200C\u0627\u06CC",
    "home.chapters.readStory": "\u062E\u0648\u0627\u0646\u062F\u0646 \u062F\u0627\u0633\u062A\u0627\u0646",
    // Home — Featured
    "home.featured.label": "\u0645\u0634\u062E\u0635",
    "home.featured.description": "\u0627\u062F\u0627\u0645\u0647 \u0645\u06CC\u062F\u0645 \u062F\u0631 \u0632\u0645\u0633\u062A\u0627\u0646 \u0633\u0627\u062E\u062A\u0647 \u0634\u062F\u0647 \u0648 \u062F\u0631\u0628\u0627\u0631\u0647 \u0622\u0647\u0646\u06AF\u06CC \u0627\u0633\u062A \u06A9\u0647 \u0645\u06CC\u200C\u06AF\u0648\u06CC\u062F \u0647\u0631\u0686\u0647 \u0628\u06CC\u0634\u062A\u0631 \u062A\u0644\u0627\u0634 \u06A9\u0646\u06CC\u062F \u0628\u0647 \u0647\u062F\u0641\u062A\u0627\u0646 \u0646\u0632\u062F\u06CC\u06A9\u200C\u062A\u0631 \u0645\u06CC\u200C\u0634\u0648\u06CC\u062F",
    "home.featured.listenOnSpotify": "\u06AF\u0648\u0634 \u062F\u0627\u062F\u0646 \u062F\u0631 \u0627\u0633\u067E\u0627\u062A\u06CC\u0641\u0627\u06CC",
    "home.featured.play": "\u067E\u062E\u0634",
    // Home — Legacy
    "home.legacy.label": "\u0645\u06CC\u0631\u0627\u062B",
    "home.legacy.title": "\u062F\u0648 \u062F\u0647\u0647 \u0645\u0648\u0633\u06CC\u0642\u06CC",
    "home.legacy.years": "\u0633\u0627\u0644 \u0645\u0648\u0633\u06CC\u0642\u06CC",
    "home.legacy.albums": "\u0622\u0644\u0628\u0648\u0645 \u0627\u0633\u062A\u0648\u062F\u06CC\u0648\u06CC",
    "home.legacy.chapters": "\u0641\u0635\u0644 \u062F\u0627\u0633\u062A\u0627\u0646",
    "home.legacy.songs": "\u0622\u0647\u0646\u06AF \u0628\u0647 \u06CC\u0627\u062F \u0645\u0627\u0646\u062F\u0647",
    // Home — Cards
    "home.cards.title": "Explore",
    "home.cards.story": "\u06CC\u06A9 \u0641\u06CC\u0644\u0645 \u0645\u0633\u062A\u0646\u062F \u062A\u0639\u0627\u0645\u0644\u06CC \u062F\u0631 \u0647\u0634\u062A \u0641\u0635\u0644.",
    "home.cards.gallery": "\u0646\u0645\u0627\u06CC\u0634\u06AF\u0627\u0647\u06CC \u0627\u0632 \u0639\u06A9\u0627\u0633 \u0648 \u062E\u0627\u0637\u0631\u0627\u062A.",
    "home.cards.spotify": "\u06AF\u0648\u0634 \u062F\u0627\u062F\u0646 \u0622\u062B\u0631 \u062C\u0645\u0639\u06CC \u062F\u0631 \u0627\u0633\u067E\u0627\u062A\u06CC\u0641\u0627\u06CC.",
    "home.cards.listen": "\u067E\u062E\u0634\u200C\u06A9\u0646\u0646\u062F\u0647 \u062F\u0627\u0626\u0645\u06CC\u060C \u0647\u0645\u06CC\u0634\u0647 \u062F\u0631 \u062F\u0633\u062A\u0631\u0633.",
    "home.cards.enter": "\u0648\u0631\u0648\u062F",
    // Home — Quote
    "home.quote": "\u00AB\u0645\u0627 \u0646\u062E\u0648\u0627\u0633\u062A\u06CC\u0645 \u0627\u0648\u0644 \u0628\u0627\u0634\u06CC\u0645. \u0645\u0627 \u0645\u06CC\u200C\u062E\u0648\u0627\u0633\u062A\u06CC\u0645 \u0635\u0627\u062F\u0642 \u0628\u0627\u0634\u06CC\u0645 \u2014 \u0648 \u0635\u062F\u0627\u0642\u062A\u060C \u0622\u0646 \u0632\u0645\u0627\u0646\u060C \u0686\u06CC\u0632 \u062C\u062F\u06CC\u062F\u06CC \u0628\u0647 \u0646\u0638\u0631 \u0645\u06CC\u200C\u0631\u0633\u06CC\u062F.\u00BB",
    "home.quote.attr": "\u2014 \u062F\u0631\u06CC\u0627 & \u0633\u0648\u0631\u0646\u0627",
    // Story
    "story.label": "\u062F\u0627\u0633\u062A\u0627\u0646",
    "story.title": "\u06CC\u06A9 \u0641\u06CC\u0644\u0645 \u0645\u0633\u062A\u0646\u062F \u062A\u0639\u0627\u0645\u0644\u06CC",
    "story.subtitle": "\u0647\u0634\u062A \u0641\u0635\u0644 \u0645\u0633\u06CC\u0631 \u062F\u0631\u06CC\u0627 \u0648 \u0633\u0648\u0631\u0646\u0627 \u0631\u0627 \u0631\u0648\u0627\u06CC\u062A \u0645\u06CC\u200C\u06A9\u0646\u062F \u2014 \u0627\u0632 \u06CC\u06A9 \u0645\u06CC\u06A9\u0631\u0648\u0641\u0648\u0646 \u0642\u0631\u0636\u06CC \u062F\u0631 \u062A\u0647\u0631\u0627\u0646 \u062A\u0627 \u062F\u0648 \u062F\u0647\u0647 \u0645\u0648\u0633\u06CC\u0642\u06CC\u060C \u062E\u0627\u0637\u0631\u0627\u062A \u0648 \u0645\u06CC\u0631\u0627\u062B. \u0627\u0633\u06A9\u0631\u0648\u0644 \u06A9\u0646\u06CC\u062F.",
    "story.chapterLabel": "\u0641\u0635\u0644 {index}",
    "story.featuring": "\u0647\u0645\u200C\u06A9\u0627\u0631\u06CC \u0628\u0627:",
    "story.end": "\u067E\u0627\u06CC\u0627\u0646 \u062F\u0627\u0633\u062A\u0627\u0646 \u2014 \u0628\u0631\u0627\u06CC \u0627\u0645\u0631\u0648\u0632",
    // Gallery
    "gallery.label": "\u06AF\u0627\u0644\u0631\u06CC",
    "gallery.title": "\u0646\u0645\u0627\u06CC\u0634\u06AF\u0627\u0647\u06CC \u0627\u0632 \u062E\u0627\u0637\u0631\u0627\u062A",
    "gallery.subtitle": "\u0639\u06A9\u0627\u0633\u200C\u0647\u0627\u06CC \u0634\u062E\u0635\u06CC\u060C \u06A9\u0627\u0648\u0631 \u0622\u0644\u0628\u0648\u0645\u200C\u0647\u0627 \u0648 \u062A\u0635\u0627\u0648\u06CC\u0631 \u0647\u0646\u0631\u06CC \u0627\u0632 \u062F\u0648 \u062F\u0647\u0647 \u0645\u0648\u0633\u06CC\u0642\u06CC. \u0647\u0631 \u062A\u0635\u0648\u06CC\u0631 \u06CC\u06A9 \u062A\u0627\u0631\u06CC\u062E\u060C \u06CC\u06A9 \u0645\u06A9\u0627\u0646 \u0648 \u06CC\u06A9 \u062F\u0627\u0633\u062A\u0627\u0646 \u062F\u0627\u0631\u062F.",
    "gallery.album": "\u0622\u0644\u0628\u0648\u0645: {name}",
    "gallery.photo": "\u0639\u06A9\u0627\u0633: {name}",
    // Albums
    "albums.label": "\u0645\u0648\u0633\u06CC\u0642\u06CC",
    "albums.title": "\u06AF\u0648\u0634 \u062F\u0627\u062F\u0646 \u062F\u0631 \u0627\u0633\u067E\u0627\u062A\u06CC\u0641\u0627\u06CC",
    "albums.subtitle": "\u06AF\u0648\u0634 \u062F\u0627\u062F\u0646 \u0622\u062B\u0631 \u062C\u0645\u0639\u06CC \u062F\u0631\u06CC\u0627 \u0648 \u0633\u0648\u0631\u0646\u0627 \u0645\u0633\u062A\u0642\u06CC\u0645\u0627\u064B \u062F\u0631 \u0627\u0633\u067E\u0627\u062A\u06CC\u0641\u0627\u06CC.",
    "albums.openOnSpotify": "\u0628\u0627\u0632 \u06A9\u0631\u062F\u0646 \u062F\u0631 \u0627\u0633\u067E\u0627\u062A\u06CC\u0641\u0627\u06CC",
    "albums.alsoAvailableOn": "\u0647\u0645\u0686\u0646\u06CC\u0646 \u0645\u0648\u062C\u0648\u062F \u062F\u0631",
    // Music Player
    "player.nowPlaying": "\u062F\u0631 \u062D\u0627\u0644 \u067E\u062E\u0634",
    // Search
    "search.placeholder": "\u062C\u0633\u062A\u062C\u0648\u06CC \u0622\u0644\u0628\u0648\u0645\u060C \u0622\u0647\u0646\u06AF\u060C \u0641\u0635\u0644\u060C \u06AF\u0627\u0644\u0631\u06CC\u2026",
    "search.heading": "\u062C\u0633\u062A\u062C\u0648 \u062F\u0631 \u0648\u0628\u200C\u0633\u0627\u06CC\u062A",
    "search.hint": "\u06CC\u0627\u0641\u062A\u0646 \u0622\u0644\u0628\u0648\u0645\u200C\u0647\u0627\u060C \u0622\u0647\u0646\u06AF\u200C\u0647\u0627\u060C \u0641\u0635\u0644\u200C\u0647\u0627\u06CC \u062F\u0627\u0633\u062A\u0627\u0646 \u0648 \u062A\u0635\u0627\u0648\u06CC\u0631 \u06AF\u0627\u0644\u0631\u06CC.",
    "search.noResults": "\u0646\u062A\u06CC\u062C\u0647\u200C\u0627\u06CC \u0628\u0631\u0627\u06CC",
    "search.album": "\u0622\u0644\u0628\u0648\u0645",
    "search.track": "\u0622\u0647\u0646\u06AF",
    "search.chapter": "\u062F\u0627\u0633\u062A\u0627\u0646",
    "search.gallery": "\u06AF\u0627\u0644\u0631\u06CC",
  },
};

export function useLocale() {
  const locale = useAppStore((s) => s.locale);
  const setLocale = useAppStore((s) => s.setLocale);

  const translate = (key: string, vars?: Record<string, string>) => {
    let text = dict[locale]?.[key] ?? dict.en[key] ?? key;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    return text;
  };

  return { locale, setLocale, isRTL: locale === "fa", t: translate };
}
