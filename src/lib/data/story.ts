// Centralized content for the Dariya & Sorena website.
// This is a tribute honoring one of the earliest Persian hip-hop duos.

export const site = {
  name: "Dariya & Sorena",
  shortName: "D&S",
  tagline: "Pioneers of Persian Hip-Hop & Rap",
  url: "https://dariyasorena.com",
  description:
    "The official website of Dariya & Sorena — one of the earliest Persian hip-hop duos. Explore their biography, albums, gallery, timeline, and legacy.",
  formedYear: 2003,
  origin: "Tehran, Iran",
  genre: "Persian Hip-Hop & Rap",
  members: [
    {
      name: "Dariya",
      role: "Vocalist · Lyricist",
      bio: "The voice — sharp, poetic, and unflinching. Dariya's verses carried the social weight of a generation finding its language.",
    },
    {
      name: "Sorena",
      role: "Vocalist · Producer",
      bio: "The architect — Sorena shaped the duo's sound, weaving Persian melody into the hard skeleton of underground hip-hop.",
    },
  ],
  social: [
    { label: "Spotify", href: "https://open.spotify.com/artist/5FTRHkve9KJ91ZMpDz4Zaf?si=yG-_iGz8TYibzQ2aqs4AEw" },
    { label: "Apple Music", href: "https://music.apple.com/se/artist/dariya-sorena/1753718144" },
    { label: "YouTube", href: "https://www.youtube.com/@DariyaSorena" },
    { label: "SoundCloud", href: "https://soundcloud.com/dariyasorena" },
    { label: "IMDb", href: "https://www.imdb.com/name/nm12922179/" },
    { label: "Instagram — Dariya", href: "https://www.instagram.com/d4riya/" },
    { label: "Instagram — Sorena", href: "https://www.instagram.com/sor3n4/" },
  ],
};

export type ChapterId =
  | "beginning"
  | "fight-club"
  | "saamet"
  | "royal-band"
  | "live-performances"
  | "film-tv"
  | "return-duo"
  | "future";

export interface Chapter {
  id: ChapterId;
  index: string;
  title: string;
  subtitle: string;
  image: string;
  image2?: string;
  paragraphs: string[];
  pullQuote?: string;
  collaborators?: string[];
}

export const chapters: Chapter[] = [
  {
    id: "beginning",
    index: "I",
    title: "The Beginning",
    subtitle: "",
    image: "/images/chapter-beginning.png",
    paragraphs: [
      "Dariya and Sorena began recording Persian-language rap music independently in 1999, writing, composing, arranging, and producing their own material while adapting Hip-hop to the Persian language. Later that year, they released Ghodrat Dast-e Maast (The Power Is in Our Hands) (Persian: قدرت دست ماست), one of the earliest Persian rap albums.",
      "In 2001, Sorena performed an improvised freestyle rap in the streets of Tehran. The performance was not released as an official track and was recorded informally. During the same period, the brothers began collaborating with Reza Pishro, laying the foundation for several future projects.",
    ],
  },
  {
    id: "fight-club",
    index: "II",
    title: "Fight Club",
    subtitle: "A collective, a movement, a reputation",
    image: "/images/chapter-fight-club.png",
    paragraphs: [
      "In the early 2000s, Dariya and Sorena co-founded Fight Club, a Persian hip hop group that included Reza Pishro, then performing under the stage name 3Pac (Tripack). Between 2003 and 2004, the group released the collaborative album Fight Club 4 Life. Other members of the group included Sina Nergal, Saman Fincher, and Ali King (also known as Ali Owj).",
      "During the same period, Fight Club and Zedbazi exchanged a series of diss tracks, one of the earliest documented rivalries in Persian hip hop. Reza Pishro's participation in these recordings preceded the beginning of his solo career.",
    ],
  },
  {
    id: "saamet",
    index: "III",
    title: "Saamet",
    subtitle: "First-generation artists united",
    image: "/images/chapter-saamet.png",
    paragraphs: [
      "Following the activities of Fight Club, Dariya and Sorena became members of Saamet, a collective formed with Hichkas and Reza Pishro. The collective brought together several first-generation Persian hip hop artists and collaborated on multiple recording projects.",
      "The collaboration, however, was short-lived, and although the relationship between the members remained positive, Dariya & Sorena soon departed from the collective and continued their work independently.",
    ],
  },
  {
    id: "royal-band",
    index: "IV",
    title: "Royal Band",
    subtitle: "From underground to the stage",
    image: "/images/chapter-royal-band.png",
    paragraphs: [
      "In 2007, Dariya and Sorena co-founded Royal Band with Hossein Vival. The group combined hip hop with contemporary Persian popular music and expanded the brothers' live performance activities. Royal Band released the album We Are the World in 2008.",
    ],
  },
  {
    id: "live-performances",
    index: "V",
    title: "Live Performances",
    subtitle: "From underground to the stage",
    image: "/images/chapter-live.png",
    paragraphs: [
      "Between 2006 and 2008, Dariya and Sorena organized several live performances in Tehran. Their first public concert was held in 2006 at Eshragh Cultural Center. In 2007, they performed two open-air concerts in the Jajroud area near Tehran. In December 2008, they performed a Yalda Night concert with Royal Band, attended by approximately 2,000 people.",
    ],
  },
  {
    id: "film-tv",
    index: "VI",
    title: "Film and Television",
    subtitle: "Music crossing into screen",
    image: "/images/chapter-film-tv.png",
    paragraphs: [
      "Sorena Montaser later performed a song for the television series Shahrzad, with music composed by Dariya. The accompanying music video received the Best Music Video award at the San Francisco International Festival and, according to published accounts, became one of the first Persian rap-related works to be nominated for — and to win — an award at an international festival.",
    ],
  },
  {
    id: "return-duo",
    index: "VII",
    title: "Return as Duo",
    subtitle: "The comeback",
    image: "/images/chapter-new-chapter.png",
    paragraphs: [
      "Following a period of reduced public activity, Dariya & Sorena officially returned as a duo in 2022 with the release of the extended play (EP) Fasl-e Jadid (New Chapter), marking their official comeback to the Persian hip hop scene. Their hiatus began in 2012 after the deaths of their father and grandmother within a short period of time. In the years that followed, the duo shifted their focus toward supporting their family, particularly their mother, while concentrating primarily on behind-the-scenes work, music production, and other professional endeavors. During this period, they maintained limited public activity, releasing only the singles Shahrzad and Ashoub.",
      "Following their return, Dariya & Sorena continued releasing new material together and announced their decision to permanently work as a group rather than pursue separate solo careers. Their renewed direction has been supported by a structured, long-term approach and collaboration with an experienced professional team aimed at expanding their artistic and production capabilities. The duo has confirmed that a multi-part full-length studio album is currently in pre-production. They have also announced plans to perform live outside Iran and have expressed their intention to establish an independent record label in the future.",
    ],
  },
  {
    id: "future",
    index: "VIII",
    title: "Future Vision",
    subtitle: "The story continues",
    image: "/images/chapter-future.png",
    paragraphs: [
      "The future of Dariya & Sorena is open — not closed, but still being written. Plans include a long-form documentary built from two decades of unreleased footage, a remastered reissue program, and a series of collaborations with a younger generation of artists who grew up on the duo's records.",
      "There is also the question of the songs that were never finished — the half-written verses, the abandoned sessions, the ideas that outlived their moment. Some of these will see release. Others will remain what they have always been: the private memory of two people who made something together that neither could have made alone.",
      "What will not change is the principle the duo started with: that Persian hip-hop is not a genre to be defended but a language to be spoken. Their music exists so that the language keeps speaking — to old listeners, to new ones, and to whoever comes next.",
    ],
  },
];
