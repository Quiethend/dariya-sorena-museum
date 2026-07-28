export type VideoCategory = "all" | "music-videos" | "live" | "interviews" | "studio" | "documentaries";

export interface Video {
  id: string;
  title: string;
  subtitle?: string;
  category: VideoCategory[];
  year: string;
  duration: string;
  description: string;
  thumbnail: string;
}

export const videoCategories: { id: VideoCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "music-videos", label: "Music Videos" },
  { id: "live", label: "Live" },
  { id: "interviews", label: "Interviews" },
  { id: "studio", label: "Studio" },
  { id: "documentaries", label: "Documentaries" },
];

export const videos: Video[] = [
  {
    id: "v-1",
    title: "Shab (Night)",
    subtitle: "Music Video — First Breath",
    category: ["music-videos"],
    year: "2005",
    duration: "4:12",
    description: "The first official music video. Shot on the streets of Tehran at night, it captured the city's sleeping energy and turned it into a visual companion to the album's opening track.",
    thumbnail: "/images/chapter-beginning.png",
  },
  {
    id: "v-2",
    title: "Sokhan-e Azad",
    subtitle: "Music Video — Sokhan-haye Azad",
    category: ["music-videos"],
    year: "2008",
    duration: "4:28",
    description: "A striking visual for the title track of the sophomore album. Filmed in abandoned industrial spaces around Tehran, the video matched the song's defiant energy with stark cinematography.",
    thumbnail: "/images/chapter-fight-club.png",
  },
  {
    id: "v-3",
    title: "Faryad",
    subtitle: "Music Video — Faryad",
    category: ["music-videos"],
    year: "2011",
    duration: "4:45",
    description: "The most ambitious video in the catalogue. Concert footage mixed with cinematic sequences created a short film that expanded the album's themes of voice and resistance.",
    thumbnail: "/images/chapter-royal-band.png",
  },
  {
    id: "v-4",
    title: "Royal Band — Live in Istanbul",
    subtitle: "Full Concert Film",
    category: ["live"],
    year: "2012",
    duration: "52:00",
    description: "The full concert film from the Istanbul leg of the Royal Band tour. A rare document of the duo's live sound at its peak, captured across multiple cameras.",
    thumbnail: "/images/gallery-concert-1.png",
  },
  {
    id: "v-5",
    title: "Royal Band — Live in London",
    subtitle: "Concert Highlights",
    category: ["live"],
    year: "2014",
    duration: "18:30",
    description: "Highlights from the London show, where the diaspora crowd sang verses back at the stage. A defining moment in the live performance archive.",
    thumbnail: "/images/chapter-live.png",
  },
  {
    id: "v-6",
    title: "In Conversation: Dariya",
    subtitle: "Interview",
    category: ["interviews"],
    year: "2013",
    duration: "22:15",
    description: "An extended conversation about the origins of the duo's sound, the early Tehran scene, and the experience of creating art under constraints. One of the most candid interviews in the archive.",
    thumbnail: "/images/gallery-portrait-1.png",
  },
  {
    id: "v-7",
    title: "In Conversation: Sorena",
    subtitle: "Interview",
    category: ["interviews"],
    year: "2014",
    duration: "19:40",
    description: "Sorena discusses production philosophy, the influence of Persian classical music on his arrangements, and the transition from underground recording to professional studios.",
    thumbnail: "/images/gallery-portrait-2.png",
  },
  {
    id: "v-8",
    title: "Making Faryad",
    subtitle: "Studio Documentary",
    category: ["studio", "documentaries"],
    year: "2011",
    duration: "28:00",
    description: "Behind the scenes of the Faryad recording sessions. Footage of the duo working in the studio with the Royal Band ensemble, capturing the moments between takes.",
    thumbnail: "/images/chapter-building-sound.png",
  },
  {
    id: "v-9",
    title: "The Early Days: A Documentary",
    subtitle: "Full-Length Documentary",
    category: ["documentaries"],
    year: "2018",
    duration: "1:12:00",
    description: "A retrospective documentary tracing the duo's career from the first recordings to the present. Features interviews, archival footage, and a soundtrack assembled from unreleased material.",
    thumbnail: "/images/chapter-new-chapter.png",
  },
  {
    id: "v-10",
    title: "Akharin Seda — Studio Session",
    subtitle: "Behind the Scenes",
    category: ["studio"],
    year: "2019",
    duration: "14:20",
    description: "Intimate footage from the final recording sessions of Akharin Seda. A quiet, reflective look at the process behind the duo's most patient album.",
    thumbnail: "/images/gallery-studio-1.png",
  },
];
