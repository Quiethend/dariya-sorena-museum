// Centralized content for the Dariya & Sorena archive.
// This is a tribute archive honoring one of the earliest Persian hip-hop duos.

export const site = {
  name: "Dariya & Sorena",
  shortName: "D&S",
  tagline: "Pioneers of Persian Hip-Hop",
  url: "https://dariyasorena.archives",
  description:
    "The definitive interactive digital museum dedicated to Dariya & Sorena — one of the earliest Persian hip-hop duos. Explore their story, albums, gallery, timeline, and legacy.",
  formedYear: 2003,
  origin: "Tehran, Iran",
  genre: "Persian Hip-Hop / Rap",
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
    { label: "Spotify", href: "#" },
    { label: "Apple Music", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "SoundCloud", href: "#" },
    { label: "Instagram", href: "#" },
  ],
};

export type ChapterId =
  | "beginning"
  | "early-years"
  | "building-sound"
  | "fight-club"
  | "royal-band"
  | "live"
  | "film-tv"
  | "new-chapter"
  | "future";

export interface Chapter {
  id: ChapterId;
  index: string;
  title: string;
  subtitle: string;
  year: string;
  image: string;
  paragraphs: string[];
  pullQuote?: string;
  collaborators?: string[];
}

export const chapters: Chapter[] = [
  {
    id: "beginning",
    index: "I",
    title: "The Beginning",
    subtitle: "Where two voices found each other",
    year: "2003",
    image: "/images/chapter-beginning.png",
    paragraphs: [
      "In the early 2000s, Tehran's nights belonged to the curious — teenagers dialing up foreign radio, trading burned CDs in back rooms, learning that rhythm could carry a language the newspapers refused to print. It was in this quiet rebellion that Dariya and Sorena first crossed paths.",
      "They did not meet in a studio. They met in the margins — a friend's apartment, a borrowed microphone, a beat passed around on a flash drive. What they shared was not a plan but a feeling: that Persian could move to a boom-bap rhythm without losing its soul, and that honesty had been waiting a long time for a beat.",
      "From the first recording, something was unmistakable. Dariya's voice — direct, warm, a little ragged at the edges — sat against Sorena's measured, melodic delivery like two halves of a single sentence. They were not imitating anyone. They were discovering what Persian hip-hop could sound like when it stopped asking permission.",
    ],
    pullQuote:
      "We weren't trying to be the first. We were trying to be honest — and honesty, back then, sounded like something new.",
  },
  {
    id: "early-years",
    index: "II",
    title: "Early Years",
    subtitle: "Bedroom studios and burned CDs",
    year: "2003 — 2005",
    image: "/images/chapter-early-years.png",
    paragraphs: [
      "The early years were built from almost nothing — a second-hand microphone wrapped in a sock, a cracked copy of production software, and the patience to record the same verse forty times until the room stopped listening. Tracks were finished at 4 a.m. and uploaded to forums where strangers argued about whether rap could even exist in Persian.",
      "There was no industry to speak of. No labels, no radio, no infrastructure. Distribution meant handing a CD to a friend, who handed it to another, until a song had crossed three cities without ever appearing on a shelf. The music travelled the way rumors did — quietly, and faster than anyone expected.",
      "Those first recordings were raw, but they carried a tone that would become the duo's signature: a refusal to choose between poetry and the street. Dariya wrote like a journalist of the nightlife; Sorena produced like a curator of memory. Together they made songs that felt like field reports from a city that didn't appear on any map.",
    ],
    pullQuote:
      "Every track was a letter to a city that hadn't asked for one. We just kept mailing them.",
  },
  {
    id: "building-sound",
    index: "III",
    title: "Building Their Sound",
    subtitle: "Persian melody inside a hard skeleton",
    year: "2005 — 2007",
    image: "/images/chapter-building-sound.png",
    paragraphs: [
      "By the mid-2000s, the duo had found its spine: Sorena's production, which buried Persian melodic motifs inside hard, minimal drum programming. A santour phrase might loop beneath an 808; a ghazal's cadence might dictate a verse's flow. The result was something neither East nor West — a dialect of hip-hop that belonged only to them.",
      "They worked fast and discarded freely. An album's worth of material might yield six keeper tracks. The rest was archived, traded, or quietly leaked — a habit that gave their discography an aura of rumor. Fans collected alternate versions the way other fans collected posters.",
      "This period defined the architecture of everything that followed: the contrast between the two voices, the discipline of the arrangements, and the conviction that a beat should leave room for the words to breathe. It was less a style than a set of principles — and it held, even as the rooms they played grew larger.",
    ],
    pullQuote:
      "A beat is a room. If you fill every corner, no one can walk through it.",
  },
  {
    id: "fight-club",
    index: "IV",
    title: "The Fight Club Era",
    subtitle: "A collective, a movement, a reputation",
    year: "2006 — 2009",
    image: "/images/chapter-fight-club.png",
    paragraphs: [
      "The Fight Club era was less a band than a gathering point — a loose collective of Tehran's underground rappers who recorded together, argued together, and occasionally performed in rooms that existed for a single night before disappearing. Within it, Dariya & Sorena became the anchor: the duo whose consistency held the rest in orbit.",
      "Fight Club was where the scene rehearsed its disagreements. Cyphers ran for hours. Verses were tested against each other like blades. Out of that friction came a wave of collaborations — verses traded, beats shared, crews formed and dissolved within a season. Other artists moved through the collective naturally, contributing to tracks that still circulate on lost hard drives.",
      "For Dariya & Sorena, the era was a forge. It sharpened their writing, taught them to write for a room as much as for a recording, and gave them the reputation that would carry them out of the underground and onto bigger stages — even as they kept one foot firmly inside it.",
    ],
    pullQuote:
      "Fight Club wasn't a crew. It was a frequency. If you could tune in, you were already in.",
    collaborators: ["The Fight Club collective"],
  },
  {
    id: "royal-band",
    index: "V",
    title: "The Royal Band Era",
    subtitle: "From basements to festival stages",
    year: "2009 — 2012",
    image: "/images/chapter-royal-band.png",
    paragraphs: [
      "Royal Band marked the moment the duo stepped into the light. A live ensemble built around their recorded sound, the band translated bedroom productions into something that could fill a hall — live drums, keys, and brass wrapped around the beats that fans had memorized through headphones.",
      "The transition was not seamless. Hip-hop had grown up in Tehran's cramped rooms; festivals demanded discipline, setlists, and a kind of showmanship the underground had never required. But the duo treated the stage the way they treated a verse: as a problem of structure. They learned to pace a crowd the way they paced an album — slow build, sharp drop, long exhale.",
      "Royal Band toured cities that had never hosted a Persian hip-hop show of that scale. For many in the audience, it was the first time hearing the music as a communal event rather than a private one. The recordings from this period capture a sound in transition — still raw, but reaching outward.",
    ],
    pullQuote:
      "A stage doesn't change the song. It changes who's listening when you sing it.",
    collaborators: ["The Royal Band live ensemble"],
  },
  {
    id: "live",
    index: "VI",
    title: "Live Performances",
    subtitle: "The room as instrument",
    year: "2010 — 2018",
    image: "/images/chapter-live.png",
    paragraphs: [
      "If the recordings were letters, the live shows were conversations. Dariya & Sorena developed a reputation for performances that could pivot on a single verse — extending a track, rewriting its middle, answering a crowd's mood in real time. No two nights were the same, and fans traded recordings of shows the way other fans traded albums.",
      "The shows grew in scale without losing their intimacy. A festival crowd of thousands could feel, in the right moment, as close as a basement. The duo's instinct for pacing — when to push, when to let a beat breathe, when to drop the music entirely and let a verse stand alone — turned concerts into narratives rather than setlists.",
      "Behind the performances was a discipline few audiences saw: the soundchecks, the rewrites, the nights spent dissecting a single transition. The ease was earned. And it was the live shows, more than any recording, that turned casual listeners into the kind of fans who would follow the duo across cities.",
    ],
    pullQuote:
      "We don't play the songs. We play the room. The songs are just the excuse.",
  },
  {
    id: "film-tv",
    index: "VII",
    title: "Film & Television",
    subtitle: "Music that learned to sit inside a frame",
    year: "2013 — 2019",
    image: "/images/chapter-film-tv.png",
    paragraphs: [
      "Cinema found the duo before the duo found cinema. A director chasing a particular late-night Tehran mood licensed an older track for a key scene; the fit was so natural that it opened a second career. Over the following years, Dariya & Sorena contributed music to a quiet run of films and series — scoring, supervising, and occasionally appearing in cameo.",
      "Scoring demanded a different muscle. A verse written for an album has to earn its own space; a piece written for a film has to disappear into someone else's. The duo learned to write music that could hold a scene without dominating it — to build tension without resolution, to fade rather than finish.",
      "The film work also reshaped their studio recordings. After years of writing for screens, their albums grew more cinematic — wider dynamics, more patience, longer arcs. The two disciplines fed each other, and the archive from this period is richer for it.",
    ],
    pullQuote:
      "A good score is the silence you almost don't notice.",
  },
  {
    id: "new-chapter",
    index: "VIII",
    title: "A New Chapter",
    subtitle: "Return, reflection, and a slower tempo",
    year: "2020 — Present",
    image: "/images/chapter-new-chapter.png",
    paragraphs: [
      "After a long silence — the kind that follows two decades of constant motion — Dariya & Sorena returned not with a statement but with a whisper. New material arrived in fragments: a single here, an EP there, each one feeling less like a comeback and more like a conversation resumed after a long walk.",
      "The new work is slower, more spacious, more willing to sit inside a single feeling. The production has thinned out; the verses have grown longer. There is less to prove and more to say. For listeners who grew up with the duo, the shift feels like meeting an old friend who has finally stopped running.",
      "The return has also meant a return to the stage — smaller rooms, chosen carefully, treated as events rather than tours. And it has meant a return to the archive: the unreleased tracks, the lost sessions, the alternate versions that were never meant to surface. The next chapter, it turns out, may include the one they never finished telling.",
    ],
    pullQuote:
      "We didn't stop. We just learned to listen for a while before we spoke again.",
  },
  {
    id: "future",
    index: "IX",
    title: "Future Vision",
    subtitle: "The archive is not finished",
    year: "Forward",
    image: "/images/chapter-future.png",
    paragraphs: [
      "The future of Dariya & Sorena is, fittingly, an archive — not a closed one, but a living one. Plans include a long-form documentary built from two decades of unreleased footage, a remastered reissue program, and a series of collaborations with a younger generation of artists who grew up on the duo's records.",
      "There is also the question of the songs that were never finished — the half-written verses, the abandoned sessions, the ideas that outlived their moment. Some of these will see release. Others will remain what they have always been: the private memory of two people who made something together that neither could have made alone.",
      "What will not change is the principle the duo started with: that Persian hip-hop is not a genre to be defended but a language to be spoken. The archive exists so that the language keeps speaking — to old listeners, to new ones, and to whoever comes next.",
    ],
    pullQuote:
      "The story isn't ours to finish. We just kept the recording running.",
  },
];
