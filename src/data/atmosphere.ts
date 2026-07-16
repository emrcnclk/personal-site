/**
 * Named atmospheric media from /public/atmosphere.
 * first.gif opens the site; others bind to specific rooms.
 */
export const atmosphere = {
  /** Opening scene — first thing behind the hero. */
  first: "/atmosphere/first.gif",
  /** Music / listening page. */
  listening: "/atmosphere/listening.jpg",
  /** Cinema / Letterboxd page. */
  watching: "/atmosphere/watching.jpg",
  /** Projects hangar (GitHub). */
  github: "/atmosphere/background1.png",
  /** About dossier. */
  me: "/atmosphere/me.jpg",
} as const;

export type SpotifyPlaylist = {
  name: string;
  description: string;
  url: string;
  tracks?: number;
};

/** Curated public playlists — always shown, even without Spotify API keys. */
export const curatedPlaylists: SpotifyPlaylist[] = [
  {
    name: "Ai slop yaparken",
    description: "Kod yazarken, prompt atarken, gece vardiyasında açık kalan liste.",
    url: "https://open.spotify.com/playlist/3UiIOYZuRf7tmiGYNOOkeL?si=e45d268e3cef40c1",
    tracks: 7,
  },
  {
    name: "#24 falan",
    description: "Büyüyoruz — her seneyle yenilenen uzun oyun listesi.",
    url: "https://open.spotify.com/playlist/2cTygbMqrOFTYidY0xBkRe?si=45ccc8de001d493f",
    tracks: 141,
  },
];

export type Track = {
  artist: string;
  title: string;
  year: number;
  note: string;
  mood: string;
};

/** Most-streamed Radiohead & Jeff Buckley cuts — the heavy rotation. */
export const rotation: Track[] = [
  {
    artist: "Radiohead",
    title: "Creep",
    year: 1992,
    note: "The one that never leaves the room. Still the most-streamed for a reason.",
    mood: "late night",
  },
  {
    artist: "Radiohead",
    title: "No Surprises",
    year: 1997,
    note: "Soft landing after a hard day. Glockenspiel as a coping mechanism.",
    mood: "rain",
  },
  {
    artist: "Radiohead",
    title: "Karma Police",
    year: 1997,
    note: "Arrest this man — he talks in maths. Still true.",
    mood: "focus",
  },
  {
    artist: "Radiohead",
    title: "High and Dry",
    year: 1995,
    note: "Open-road Radiohead. Clean guitar, long horizon.",
    mood: "drive",
  },
  {
    artist: "Jeff Buckley",
    title: "Hallelujah",
    year: 1994,
    note: "The cover that became the song for a generation. Still the most-streamed Buckley.",
    mood: "quiet",
  },
  {
    artist: "Jeff Buckley",
    title: "Lover, You Should've Come Over",
    year: 1994,
    note: "Grace deep cut that outgrew the album. Voice as weather.",
    mood: "blue hour",
  },
  {
    artist: "Jeff Buckley",
    title: "Grace",
    year: 1994,
    note: "Title track, full voltage. The room gets taller when this starts.",
    mood: "voltage",
  },
  {
    artist: "Jeff Buckley",
    title: "Last Goodbye",
    year: 1994,
    note: "Kiss me, please kiss me. Then go — the cleanest breakup anthem.",
    mood: "exit",
  },
];
