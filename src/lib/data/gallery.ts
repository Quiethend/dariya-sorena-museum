export type GalleryCategory =
  | "all"
  | "studio"
  | "concerts"
  | "behind-the-scenes"
  | "portraits"
  | "archive"
  | "albums";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory[];
  date: string;
  location: string;
  story: string;
  relatedProject?: string;
  relatedAlbum?: string;
  photographer?: string;
  aspect?: "portrait" | "landscape" | "square";
}

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "studio", label: "Studio" },
  { id: "concerts", label: "Concerts" },
  { id: "behind-the-scenes", label: "Behind the Scenes" },
  { id: "portraits", label: "Portraits" },
  { id: "archive", label: "Archive" },
  { id: "albums", label: "Albums" },
];

export const galleryImages: GalleryImage[] = [
  {
    id: "g-1",
    src: "/images/gallery-portrait-1.png",
    alt: "Silhouette portrait in profile against fog",
    category: ["portraits"],
    date: "2018",
    location: "Tehran, Iran",
    story: "A quiet moment before the show. The silence backstage always felt louder than the music.",
    relatedProject: "Akharin Seda",
    relatedAlbum: "Akharin Seda",
    aspect: "portrait",
  },
  {
    id: "g-2",
    src: "/images/gallery-portrait-2.png",
    alt: "Hooded figure from behind in fog",
    category: ["portraits", "behind-the-scenes"],
    date: "2015",
    location: "Tehran, Iran",
    story: "The walk to the stage. Every night, the same corridor, the same anticipation.",
    relatedProject: "Film Scoring Sessions",
    aspect: "portrait",
  },
  {
    id: "g-3",
    src: "/images/gallery-concert-1.png",
    alt: "Wide shot from the side of the stage during a concert",
    category: ["concerts"],
    date: "2012",
    location: "Royal Band Tour — Istanbul",
    story: "The first night the music filled a room that large. The sound finally had the space it deserved.",
    relatedProject: "Royal Band Tour",
    relatedAlbum: "Faryad",
    aspect: "landscape",
  },
  {
    id: "g-4",
    src: "/images/gallery-studio-1.png",
    alt: "Behind the scenes in a recording studio",
    category: ["studio", "behind-the-scenes"],
    date: "2010",
    location: "Studio 7, Tehran",
    story: "The desk where half the discography was shaped. The headphone jack is still broken.",
    relatedProject: "Faryad Recording Sessions",
    relatedAlbum: "Faryad",
    aspect: "landscape",
  },
  {
    id: "g-5",
    src: "/images/gallery-archive-1.png",
    alt: "Vintage archive with cassette tapes and photographs",
    category: ["archive"],
    date: "2003 — 2008",
    location: "Personal Archive",
    story: "The physical archive: cassettes, notes, setlists, and photographs from the earliest days. The pre-digital residue of a career that began before the cloud.",
    aspect: "landscape",
  },
  {
    id: "g-6",
    src: "/images/chapter-beginning.png",
    alt: "Cinematic Tehran nightscape",
    category: ["archive", "behind-the-scenes"],
    date: "2004",
    location: "Tehran, Iran",
    story: "The city that shaped the sound. Every track carries its streets somewhere in the frequencies.",
    relatedProject: "First Breath",
    relatedAlbum: "First Breath",
    aspect: "landscape",
  },
  {
    id: "g-7",
    src: "/images/chapter-fight-club.png",
    alt: "Underground hip-hop venue atmosphere",
    category: ["concerts", "archive"],
    date: "2007",
    location: "Underground venue, Tehran",
    story: "Fight Club nights were where the scene lived. The walls could barely contain the sound.",
    relatedProject: "Fight Club Collective",
    relatedAlbum: "Sokhan-haye Azad",
    aspect: "landscape",
  },
  {
    id: "g-8",
    src: "/images/chapter-royal-band.png",
    alt: "Grand concert stage with dramatic lighting",
    category: ["concerts"],
    date: "2011",
    location: "Royal Band Tour — Dubai",
    story: "The moment the underground met the stage. Fog, gold light, and the sound of two decades finding its fullness.",
    relatedProject: "Royal Band Tour",
    relatedAlbum: "Faryad",
    aspect: "landscape",
  },
  {
    id: "g-9",
    src: "/images/chapter-film-tv.png",
    alt: "Cinematic film set at night",
    category: ["behind-the-scenes"],
    date: "2016",
    location: "Film set, Tehran",
    story: "The film scoring sessions brought a new discipline — writing for the silence between notes.",
    relatedProject: "Film & Television",
    aspect: "landscape",
  },
  {
    id: "g-10",
    src: "/images/chapter-building-sound.png",
    alt: "Studio mixing desk with glowing analog meters",
    category: ["studio", "archive"],
    date: "2006",
    location: "Home studio, Tehran",
    story: "The production desk where the signature sound was built. One fader, one verse, one night at a time.",
    relatedAlbum: "Sokhan-haye Azad",
    aspect: "landscape",
  },
  {
    id: "g-11",
    src: "/images/album-1.png",
    alt: "First Breath album artwork",
    category: ["albums", "archive"],
    date: "2005",
    location: "Tehran, Iran",
    story: "The cover that started everything. Two silhouettes in fog — anonymous, defiant, and already on their way.",
    relatedProject: "First Breath",
    relatedAlbum: "First Breath",
    aspect: "square",
  },
  {
    id: "g-12",
    src: "/images/album-2.png",
    alt: "Sokhan-haye Azad album artwork",
    category: ["albums"],
    date: "2008",
    location: "Tehran, Iran",
    story: "The vinyl record submerged in smoke — a cover that felt like the album sounded: hard to hold, impossible to ignore.",
    relatedProject: "Sokhan-haye Azad",
    relatedAlbum: "Sokhan-haye Azad",
    aspect: "square",
  },
  {
    id: "g-13",
    src: "/images/album-3.png",
    alt: "Faryad album artwork",
    category: ["albums"],
    date: "2011",
    location: "Tehran, Iran",
    story: "The microphone in red glow. A cover that announced itself before the first track even played.",
    relatedProject: "Faryad",
    relatedAlbum: "Faryad",
    aspect: "square",
  },
  {
    id: "g-14",
    src: "/images/album-4.png",
    alt: "Akharin Seda album artwork",
    category: ["albums"],
    date: "2019",
    location: "Tehran & abroad",
    story: "Golden waves in darkness. The last album cover felt less like an ending and more like an echo.",
    relatedProject: "Akharin Seda",
    relatedAlbum: "Akharin Seda",
    aspect: "square",
  },
  {
    id: "g-15",
    src: "/images/chapter-live.png",
    alt: "Concert crowd from the stage",
    category: ["concerts"],
    date: "2014",
    location: "Royal Band Tour — London",
    story: "The crowd that sang the verses back. The moment the music stopped being one-directional.",
    relatedProject: "Royal Band Tour",
    aspect: "landscape",
  },
  {
    id: "g-16",
    src: "/images/chapter-new-chapter.png",
    alt: "Modern minimalist studio at dawn",
    category: ["studio", "behind-the-scenes"],
    date: "2022",
    location: "Studio, Tehran",
    story: "The return to recording. A different room, a different light, but the same conversation.",
    relatedProject: "New Chapter",
    aspect: "landscape",
  },
];
