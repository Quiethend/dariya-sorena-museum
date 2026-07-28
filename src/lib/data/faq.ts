export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "Who are Dariya & Sorena?",
    answer:
      "Dariya & Sorena are one of the earliest Persian hip-hop duos, formed in Tehran in 2003. Dariya is the vocalist and lyricist; Sorena is the vocalist, producer, and sonic architect. Together they pioneered a sound that blended Persian melody with underground hip-hop production.",
  },
  {
    question: "When did Dariya & Sorena form?",
    answer:
      "The duo formed in 2003 in Tehran, Iran, during a period when Persian hip-hop was still in its infancy — before labels, radio support, or any formal infrastructure existed for the genre.",
  },
  {
    question: "What albums have Dariya & Sorena released?",
    answer:
      "The duo's catalogue includes four studio albums: First Breath (2005), Sokhan-haye Azad (2008), Faryad (2011), and Akharin Seda (2019). Each album represents a distinct era in the duo's artistic evolution.",
  },
  {
    question: "What was the Fight Club collective?",
    answer:
      "Fight Club was a loose collective of Tehran's underground hip-hop artists in the mid-to-late 2000s. Dariya & Sorena were central figures within it. The collective was known for cyphers, collaborations, and a spirit of fierce creative competition.",
  },
  {
    question: "What was the Royal Band?",
    answer:
      "Royal Band was a live ensemble assembled around Dariya & Sorena to translate their recorded sound into a stage performance. It featured live drums, keys, and brass, and toured internationally from 2009 onwards.",
  },
  {
    question: "Have Dariya & Sorena worked on film or television projects?",
    answer:
      "Yes. From approximately 2013 to 2019, the duo contributed music to films and television series — scoring, supervising soundtracks, and occasionally appearing in cameo roles. This film work deeply influenced their studio recordings.",
  },
  {
    question: "Is the duo still active?",
    answer:
      "After a period of quiet following the release of Akharin Seda in 2019, Dariya & Sorena returned with new material beginning in 2022. The current phase of their career includes smaller, carefully chosen live performances and plans for future releases.",
  },
  {
    question: "Where can I listen to Dariya & Sorena's music?",
    answer:
      "Their music is available on major streaming platforms including Spotify, Apple Music, YouTube, and SoundCloud. Links to each platform are available throughout this website.",
  },
  {
    question: "What genre is Dariya & Sorena's music?",
    answer:
      "Their music falls within Persian hip-hop and rap, with a distinctive sound that incorporates Persian melodic motifs, classical influences, and minimalist underground production. The style evolved significantly across four albums and two decades.",
  },
  {
    question: "What is the purpose of this website?",
    answer:
      "This website serves as the definitive interactive digital museum and archive for Dariya & Sorena. It houses their story, discography, gallery, timeline, video library, and other archival materials — celebrating their legacy and contribution to Persian hip-hop.",
  },
];

export const faqSchema = faqs.map((faq) => ({
  "@type": "Question",
  name: faq.question,
  acceptedAnswer: {
    "@type": "Answer",
    text: faq.answer,
  },
}));
