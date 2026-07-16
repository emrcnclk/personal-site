/**
 * Creative registries: photography sets and drawings.
 * Music rotation & playlists live in data/atmosphere.ts.
 */

export type PhotoSet = {
  slug: string;
  title: string;
  year: number;
  description: string;
  frames: number;
  /** Placeholder tone until real photos are added. */
  tone: "amber" | "cyan" | "neutral";
};

export const photoSets: PhotoSet[] = [
  {
    slug: "wet-asphalt",
    title: "Wet Asphalt",
    year: 2026,
    description: "Istanbul after rain. Reflections doing the city's advertising for free.",
    frames: 14,
    tone: "cyan",
  },
  {
    slug: "closing-time",
    title: "Closing Time",
    year: 2025,
    description: "Shopkeepers pulling shutters, the last warm lights of the night.",
    frames: 9,
    tone: "amber",
  },
  {
    slug: "terminal-hours",
    title: "Terminal Hours",
    year: 2025,
    description: "Airports and stations between 1am and 5am. Everyone in transit, no one in a hurry.",
    frames: 11,
    tone: "neutral",
  },
];

export type Drawing = {
  id: string;
  title: string;
  medium: string;
  year: number;
  note: string;
};

export const drawings: Drawing[] = [
  {
    id: "dr-12",
    title: "Corner store, 11:47pm",
    medium: "Ink on paper",
    year: 2026,
    note: "Drawn from the window seat. The cat moved; the cat stayed in the drawing.",
  },
  {
    id: "dr-11",
    title: "Ship interior study",
    medium: "Pencil, digital cleanup",
    year: 2025,
    note: "Concept work for a game that may never exist. The drawing counts anyway.",
  },
  {
    id: "dr-10",
    title: "Hands playing bass",
    medium: "Charcoal",
    year: 2025,
    note: "Hands are hard. Drew forty of them this year. This is number thirty-eight.",
  },
];
