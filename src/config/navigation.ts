export type NavItem = {
  label: string;
  href: string;
  note?: string;
  external?: boolean;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export const navigation: NavGroup[] = [
  {
    title: "Orientation",
    items: [
      { label: "Home", href: "/", note: "opening scene" },
      { label: "About", href: "/about", note: "who is this" },
      { label: "Now", href: "/now", note: "this season" },
      { label: "Contact", href: "/contact", note: "open channel" },
    ],
  },
  {
    title: "Work",
    items: [
      { label: "Projects", href: "/projects", note: "from the hangar" },
      { label: "AI", href: "/ai", note: "mind like a machine" },
      { label: "Game Development", href: "/game-development", note: "unity" },
      { label: "Mobile Apps", href: "/mobile", note: "pocket software" },
      { label: "Playground", href: "/playground", note: "toys" },
    ],
  },
  {
    title: "Signals",
    items: [
      { label: "Devlogs", href: "/devlogs", note: "build notes" },
      {
        label: "Podcast",
        href: "https://open.spotify.com/show/033rE9pVG5abTgsAmifrw6?si=f631895e679641dd",
        note: "on spotify",
        external: true,
      },
      { label: "Cinema", href: "/cinema", note: "letterboxd feed" },
    ],
  },
  {
    title: "Off Duty",
    items: [
      { label: "Creative Works", href: "/creative", note: "everything else" },
      { label: "Music", href: "/music", note: "rotation" },
      { label: "Photography", href: "/photography", note: "night walks" },
      { label: "Drawings", href: "/drawings", note: "sketchbook" },
      { label: "Journal", href: "/journal", note: "loose thoughts" },
    ],
  },
];

export const allNavItems: NavItem[] = navigation.flatMap((g) => g.items);
