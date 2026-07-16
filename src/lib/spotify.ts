import { site } from "@/config/site";
import { curatedPlaylists, type SpotifyPlaylist } from "@/data/atmosphere";

type SpotifyTokenResponse = {
  access_token: string;
};

type SpotifyPlaylistResponse = {
  items?: Array<{
    name?: string;
    description?: string;
    external_urls?: { spotify?: string };
    tracks?: { total?: number };
  }>;
};

async function getAccessToken() {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!id || !secret) return null;

  const token = Buffer.from(`${id}:${secret}`).toString("base64");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    next: { revalidate: 60 * 60 },
  });

  if (!res.ok) return null;
  const data = (await res.json()) as SpotifyTokenResponse;
  return data.access_token;
}

/**
 * Always returns the curated playlists first.
 * If Spotify API keys exist, appends additional public playlists
 * that aren't already in the curated set.
 */
export async function getSpotifyPlaylists(): Promise<SpotifyPlaylist[]> {
  const curated = curatedPlaylists;
  const curatedUrls = new Set(curated.map((p) => p.url.split("?")[0]));

  try {
    const token = await getAccessToken();
    if (!token) return curated;

    const res = await fetch(
      `https://api.spotify.com/v1/users/${site.spotifyUser}/playlists?limit=12`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 60 * 60 },
      },
    );

    if (!res.ok) return curated;
    const data = (await res.json()) as SpotifyPlaylistResponse;
    const extras =
      data.items
        ?.map((p) => ({
          name: p.name ?? "Untitled playlist",
          description: p.description?.replace(/<[^>]*>/g, "") || "No description.",
          url: p.external_urls?.spotify ?? site.socials.spotify,
          tracks: p.tracks?.total,
        }))
        .filter((p) => p.url && !curatedUrls.has(p.url.split("?")[0])) ?? [];

    return [...curated, ...extras];
  } catch {
    return curated;
  }
}
