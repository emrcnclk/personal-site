/**
 * Playground registry. Small, disposable, honest.
 * Toys and one-night builds live here.
 */

export type Experiment = {
  id: string;
  title: string;
  year: number;
  note: string;
  status: "live" | "dormant" | "dissected";
  tags: string[];
  link?: string;
};

export const playgroundToys: Experiment[] = [
  {
    id: "toy-007",
    title: "ASCII Rain",
    year: 2026,
    note: "The terminal window as a rainy Tokyo alley. 60fps in pure text.",
    status: "live",
    tags: ["terminal", "generative"],
  },
  {
    id: "toy-006",
    title: "One-Button Bebop",
    year: 2025,
    note: "A rhythm toy where a single key plays a ride cymbal that always lands in the pocket.",
    status: "live",
    tags: ["web-audio", "toy"],
  },
  {
    id: "toy-005",
    title: "Noir Palette Machine",
    year: 2025,
    note: "Generates five-color film palettes from a single mood word. This site's palette came out of it.",
    status: "dormant",
    tags: ["color", "generative"],
  },
];
