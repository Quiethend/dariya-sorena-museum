export interface Track {
  number: number;
  title: string;
  duration: string;
  featuring?: string;
}

export interface Album {
  id: string;
  title: string;
  subtitle?: string;
  year: number;
  cover: string;
  color: string;
  story: string[];
  tracks: Track[];
  credits: string[];
  streaming?: { label: string; href: string }[];
  relatedChapter?: string;
}

export const albums: Album[] = [
  {
    id: "first-breath",
    title: "First Breath",
    subtitle: "The origin point",
    year: 2005,
    cover: "/images/album-1.png",
    color: "#2a1f1a",
    story: [
      "First Breath arrived at a moment when Persian hip-hop was still defining its boundaries. Recorded across a handful of borrowed studios between 2003 and 2005, the album caught the sound of two artists still discovering what was possible — and what was forbidden.",
      "The production was sparse, built around vinyl samples, cracked snares, and a sense of space that came as much from necessity as from design. Each track felt like a demo that had been polished just enough to survive. That rawness became its signature.",
      "A handful of tracks circulated on forums and burned CDs before any official release could exist. By the time the album reached a wider audience, many of its verses had already been memorized — a paradox that would define the duo's relationship with their audience for years to come.",
    ],
    tracks: [
      { number: 1, title: "Prologue", duration: "1:12" },
      { number: 2, title: "Shab (Night)", duration: "4:03" },
      { number: 3, title: "Rahe Man (My Way)", duration: "3:47" },
      { number: 4, title: "Bargard (Return)", duration: "3:58", featuring: "Fight Club" },
      { number: 5, title: "Aseman-e Shab (Night Sky)", duration: "4:21" },
      { number: 6, title: "Del (Heart)", duration: "3:33" },
      { number: 7, title: "Didar (Meeting)", duration: "4:15" },
      { number: 8, title: "Payan (End)", duration: "5:02" },
    ],
    credits: [
      "Dariya — Lyrics, Vocals",
      "Sorena — Production, Vocals, Mixing",
      "Fight Club — Guest verse on Bargard",
      "All tracks recorded in Tehran, 2003–2005",
    ],
    streaming: [
      { label: "Spotify", href: "#" },
      { label: "Apple Music", href: "#" },
      { label: "YouTube", href: "#" },
    ],
    relatedChapter: "beginning",
  },
  {
    id: "sokhan-haye-azad",
    title: "Sokhan-haye Azad",
    subtitle: "Free Words",
    year: 2008,
    cover: "/images/album-2.png",
    color: "#1a2020",
    story: [
      "Sokhan-haye Azad arrived during the Fight Club years, and it carries the mark of that collective energy — the urgency, the competition, the sense that every track was an argument being won in real time. The beats were harder, the verses tighter, and the recording quality a step closer to what the duo had always heard in their heads.",
      "The album's title — literally 'Free Words' — was a statement of intent: that language could be liberated from its context, carried across borders by rhythm and melody until it belonged to anyone willing to listen. Several tracks dealt directly with the experience of creating art under constraints.",
      "This was the album that first gave Dariya & Sorena a presence outside the forums. Copies turned up in record shops in diaspora cities — London, Los Angeles, Toronto — and the diaspora press began to take notice. The underground had found its audience.",
    ],
    tracks: [
      { number: 1, title: "Intro", duration: "0:58" },
      { number: 2, title: "Sokhan-e Azad", duration: "3:44" },
      { number: 3, title: "Dehati (Village)", duration: "4:09" },
      { number: 4, title: "Shahre No (New City)", duration: "3:52" },
      { number: 5, title: "Divar (Wall)", duration: "4:33" },
      { number: 6, title: "Mosafer (Traveller)", duration: "3:28" },
      { number: 7, title: "Rooz-haye Bad (Bad Days)", duration: "4:01" },
      { number: 8, title: "Bazi (Game)", duration: "3:47", featuring: "Fight Club" },
      { number: 9, title: "Farda (Tomorrow)", duration: "3:56" },
      { number: 10, title: "Outro", duration: "2:14" },
    ],
    credits: [
      "Dariya — Lyrics, Vocals",
      "Sorena — Production, Vocals, Mixing",
      "Fight Club — Guest verses",
      "Recorded in Tehran, 2006–2008",
    ],
    streaming: [
      { label: "Spotify", href: "#" },
      { label: "Apple Music", href: "#" },
      { label: "SoundCloud", href: "#" },
    ],
    relatedChapter: "fight-club",
  },
  {
    id: "faryad",
    title: "Faryad",
    subtitle: "The Scream",
    year: 2011,
    cover: "/images/album-3.png",
    color: "#201414",
    story: [
      "Faryad was the sound of the Royal Band tour pressed onto vinyl — louder, more confident, more willing to fill a room. If the earlier albums were field reports, this one was a broadcast: an announcement that the duo's sound had grown from a whisper into something the whole room could hear.",
      "The production reflected the shift to live performance. Wider stereo fields, real instrumentation layered over the programmed beats, choruses that could survive a festival PA. The tracklist was sequenced like a concert, with quiet interludes between the louder numbers.",
      "Critically, Faryad was the album that consolidated what the duo had been building toward. The writing was sharper, the hooks more deliberate, and the overall effect was of artists who had stopped searching for their sound and started directing it.",
    ],
    tracks: [
      { number: 1, title: "Fasl-e Avval (Act One)", duration: "1:33" },
      { number: 2, title: "Faryad", duration: "3:58" },
      { number: 3, title: "Sarbaz (Soldier)", duration: "4:12" },
      { number: 4, title: "Rooz-e Bidar (Day of Awakening)", duration: "4:44" },
      { number: 5, title: "Hava (Air)", duration: "3:31" },
      { number: 6, title: "Khaterat (Memories)", duration: "4:07" },
      { number: 7, title: "Nefrin (Curse)", duration: "3:49" },
      { number: 8, title: "Royaha (Visions)", duration: "4:28" },
      { number: 9, title: "Akharin Nam (Last Name)", duration: "3:55" },
      { number: 10, title: "Tamam (Finished)", duration: "5:11" },
    ],
    credits: [
      "Dariya — Lyrics, Vocals",
      "Sorena — Production, Vocals, Mixing, Arrangement",
      "Royal Band — Live instrumentation",
      "Recorded in Tehran, 2009–2011",
    ],
    streaming: [
      { label: "Spotify", href: "#" },
      { label: "Apple Music", href: "#" },
      { label: "YouTube", href: "#" },
    ],
    relatedChapter: "royal-band",
  },
  {
    id: "akharin-seda",
    title: "Akharin Seda",
    subtitle: "The Last Sound",
    year: 2019,
    cover: "/images/album-4.png",
    color: "#181820",
    story: [
      "Akharin Seda arrived after a long silence — and it sounded like one. The album was quieter than anything the duo had released before: sparser production, longer silences, verses that unfolded like letters rather than declarations. It was, in every sense, the work of two people who had nothing left to prove.",
      "The title — 'The Last Sound' — was less a farewell than an acknowledgment that some music only arrives when the noise stops. Tracks stretched past the five-minute mark, building tension through restraint rather than force. The beats were softer, the samples more personal, and the overall mood was of late-night conversations where the important things go unsaid.",
      "The album was followed by a period of quiet that fans interpreted as retirement, hiatus, or simply the next phase of a career that had always refused to announce its intentions in advance. The archive, as always, would have the final word.",
    ],
    tracks: [
      { number: 1, title: "Aram (Quiet)", duration: "1:47" },
      { number: 2, title: "Akharin Seda", duration: "5:22" },
      { number: 3, title: "Yadgar (Memory)", duration: "4:55" },
      { number: 4, title: "Khab (Dream)", duration: "5:13" },
      { number: 5, title: "Ruzegar (Time)", duration: "4:38" },
      { number: 6, title: "Did-e Akhar (Last Look)", duration: "6:01" },
      { number: 7, title: "Miraath (Legacy)", duration: "4:47" },
      { number: 8, title: "Saboor (Patience)", duration: "5:34" },
    ],
    credits: [
      "Dariya — Lyrics, Vocals",
      "Sorena — Production, Vocals, Mixing",
      "Film scoring sessions contributed atmospheric elements",
      "Recorded in Tehran and abroad, 2013–2019",
    ],
    streaming: [
      { label: "Spotify", href: "#" },
      { label: "Apple Music", href: "#" },
      { label: "YouTube", href: "#" },
    ],
    relatedChapter: "new-chapter",
  },
];
