import { NextResponse } from "next/server";

const ARTIST_ID = "5FTRHkve9KJ91ZMpDz4Zaf";

interface SpotifyTrack {
  id: string;
  title: string;
  album: string;
  cover: string;
  preview: string;
}

const CACHE_TTL = 1000 * 60 * 30; // 30 minutes
let cachedTracks: SpotifyTrack[] | null = null;
let cachedAt = 0;

async function fetchTracksFromSpotify(): Promise<SpotifyTrack[]> {
  const res = await fetch(
    `https://open.spotify.com/embed/artist/${ARTIST_ID}?theme=0`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html",
      },
      next: { revalidate: 1800 },
    }
  );

  if (!res.ok) {
    throw new Error(`Spotify fetch failed: ${res.status}`);
  }

  const html = await res.text();

  // Extract NEXT_DATA JSON
  const match = html.match(
    /<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/
  );
  if (!match) {
    throw new Error("No __NEXT_DATA__ found in embed");
  }

  const data = JSON.parse(match[1]);
  const entity =
    data?.props?.pageProps?.state?.data?.entity;

  if (!entity || !Array.isArray(entity.trackList)) {
    throw new Error("No trackList found in Spotify data");
  }

  // Artist image from visualIdentity
  const artistCover =
    entity.visualIdentity?.image?.extractedColor?.url ||
    "/images/edame-midam-cover.jpg";

  const tracks: SpotifyTrack[] = [];

  for (const item of entity.trackList) {
    const previewUrl = item.audioPreview?.url;
    if (!previewUrl) continue;

    tracks.push({
      id: item.uid || item.uri || "",
      title: item.title || "Unknown",
      album: item.subtitle || "Dariya & Sorena",
      cover: artistCover,
      preview: previewUrl,
    });
  }

  return tracks;
}

export async function GET() {
  const now = Date.now();

  // Return cached if still fresh
  if (cachedTracks && cachedAt && now - cachedAt < CACHE_TTL) {
    return NextResponse.json({ tracks: cachedTracks, cached: true });
  }

  try {
    const tracks = await fetchTracksFromSpotify();

    if (tracks.length === 0) {
      return NextResponse.json(
        { error: "No tracks with preview URLs found", tracks: [] },
        { status: 200 }
      );
    }

    cachedTracks = tracks;
    cachedAt = now;

    return NextResponse.json({ tracks, cached: false });
  } catch (error) {
    console.error("Spotify tracks fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Spotify tracks", tracks: [] },
      { status: 500 }
    );
  }
}
