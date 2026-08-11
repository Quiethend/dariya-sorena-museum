export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  type: "milestone" | "album" | "concert" | "film" | "return" | "future";
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "t-1",
    year: "2003",
    title: "Formation",
    subtitle: "Two voices, one frequency",
    description:
      "Dariya and Sorena meet in Tehran and begin recording together in borrowed studios and home setups. The first tracks are raw, unpolished, and unmistakably alive. Persian hip-hop finds its earliest practitioners.",
    type: "milestone",
    image: "/images/chapter-beginning.png",
  },
  {
    id: "t-2",
    year: "2005",
    title: "First Breath",
    subtitle: "The debut album",
    description:
      "The debut album circulates on burned CDs and underground forums before reaching the diaspora. The production is sparse, the writing is sharp, and the sound of a new genre finding its feet is unmistakable.",
    type: "album",
    image: "/images/album-1.png",
  },
  {
    id: "t-3",
    year: "2006",
    title: "Fight Club",
    subtitle: "A collective forms",
    description:
      "Dariya & Sorena become the anchor of the Fight Club collective — a loose network of Tehran's underground rappers. Cyphers, collaborations, and heated arguments define the era.",
    type: "milestone",
    image: "/images/chapter-fight-club.png",
  },
  {
    id: "t-4",
    year: "2008",
    title: "Sokhan-haye Azad",
    subtitle: "The sophomore breakthrough",
    description:
      "The second album arrives during the Fight Club years. Harder beats, tighter verses, and a growing diaspora audience. The underground finds its first international listeners.",
    type: "album",
    image: "/images/album-2.png",
  },
  {
    id: "t-5",
    year: "2009",
    title: "Royal Band",
    subtitle: "Live ensemble assembled",
    description:
      "A live band is formed to translate the recorded sound into stage performance. Drums, keys, and brass wrap around beats fans have memorized through headphones. The transition begins.",
    type: "milestone",
    image: "/images/chapter-royal-band.png",
  },
  {
    id: "t-6",
    year: "2011",
    title: "Faryad",
    subtitle: "The broadcast album",
    description:
      "The third album captures the energy of the Royal Band tour. Wider stereo fields, real instrumentation, and the sound of two artists directing their audience rather than searching for it.",
    type: "album",
    image: "/images/album-3.png",
  },
  {
    id: "t-7",
    year: "2010–2018",
    title: "Live Performances",
    subtitle: "Festival stages and sold-out shows",
    description:
      "Years of performances across cities that had never hosted a Persian hip-hop show. Festival crowds and intimate rooms alike. Each show was different; each fan left with a different recording.",
    type: "concert",
    image: "/images/chapter-live.png",
  },
  {
    id: "t-8",
    year: "2013–2019",
    title: "Film & Television",
    subtitle: "Music moves into frames",
    description:
      "Cinema discovers the duo's catalogue. A series of film and TV scoring projects reshape the studio sound, making it wider, more patient, and more cinematic.",
    type: "film",
    image: "/images/chapter-film-tv.png",
  },
  {
    id: "t-9",
    year: "2019",
    title: "Akharin Seda",
    subtitle: "The last sound",
    description:
      "The fourth album arrives after years of quiet. Sparse, patient, and haunting — a work by artists with nothing left to prove. The silence that follows is interpreted as retirement, hiatus, or simply the next phase.",
    type: "album",
    image: "/images/album-4.png",
  },
  {
    id: "t-10",
    year: "2022",
    title: "The Return",
    subtitle: "A whisper, not a shout",
    description:
      "New material begins to surface — singles, EPs, fragments. The sound is slower, more spacious. The return feels less like a comeback and more like a conversation resumed.",
    type: "return",
    image: "/images/chapter-new-chapter.png",
  },
  {
    id: "t-11",
    year: "Forward",
    title: "Future Vision",
    subtitle: "The journey continues",
    description:
      "Plans for a long-form documentary, a remastered reissue program, and collaborations with a new generation. The story is not finished. The language keeps speaking.",
    type: "future",
    image: "/images/chapter-future.png",
  },
];
