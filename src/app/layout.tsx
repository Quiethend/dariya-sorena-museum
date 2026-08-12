import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Space_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { albums } from "@/lib/data/albums";
import { faqs, faqSchema } from "@/lib/data/faq";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const SITE_URL = "https://dariyasorena.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dariya & Sorena — Official Website | Persian Hip-Hop Pioneers",
    template: "%s · Dariya & Sorena",
  },
  description:
    "The official website of Dariya & Sorena — one of the earliest Persian hip-hop duos. Explore their biography, albums, gallery, timeline, videos, and legacy across an immersive cinematic experience.",
  keywords: [
    "Dariya & Sorena",
    "Dariya and Sorena",
    "Persian hip-hop",
    "Persian rap",
    "Iranian hip-hop",
    "Fight Club",
    "Royal Band",
    "Persian music duo",
    " underground hip-hop",
    "Persian rap pioneers",
  ],
  authors: [{ name: "Dariya & Sorena" }],
  creator: "Dariya & Sorena",
  publisher: "Dariya & Sorena",
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "718x695", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Dariya & Sorena — Official Website",
    description:
      "The official website of Dariya & Sorena, pioneers of Persian hip-hop. Explore their story, music, and legacy.",
    url: SITE_URL,
    siteName: "Dariya & Sorena",
    images: [
      {
        url: "/images/og-cover.png",
        width: 1344,
        height: 768,
        alt: "Dariya & Sorena — Official Website",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dariya & Sorena — Official Website",
    description:
      "The official website of Persian hip-hop pioneers Dariya & Sorena. Explore their story, music, and legacy.",
    images: ["/images/og-cover.png"],
    creator: "@dariyasorena",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

        {/* Schema.org: MusicGroup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicGroup",
              name: "Dariya & Sorena",
              url: SITE_URL,
              logo: `${SITE_URL}/dariya-sorena-logo.png`,
              description:
                "One of the earliest Persian hip-hop duos, formed in Tehran in 2003.",
              genre: "Persian Hip-Hop",
              origin: { "@type": "Place", name: "Tehran, Iran" },
              foundingDate: "2003",
              member: [
                {
                  "@type": "Person",
                  name: "Dariya",
                  jobTitle: "Vocalist, Lyricist",
                },
                {
                  "@type": "Person",
                  name: "Sorena",
                  jobTitle: "Vocalist, Producer",
                },
              ],
              album: albums.map((a) => ({
                "@type": "MusicAlbum",
                name: a.title,
                url: `${SITE_URL}/albums#${a.id}`,
                image: `${SITE_URL}${a.cover}`,
                datePublished: String(a.year),
                numTracks: a.tracks.length,
                trackList: a.tracks
                  .map(
                    (t) =>
                      `${t.title}${t.featuring ? ` (ft. ${t.featuring})` : ""} — ${t.duration}`
                  )
                  .join("\n"),
              })),
              sameAs: [
                "https://spotify.com",
                "https://music.apple.com",
                "https://youtube.com",
              ],
            }),
          }}
        />

        {/* Schema.org: FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqSchema,
            }),
          }}
        />

        {/* Schema.org: WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Dariya & Sorena",
              url: SITE_URL,
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${SITE_URL}/?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${cormorant.variable} ${spaceMono.variable} antialiased bg-background text-foreground font-sans overflow-x-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
