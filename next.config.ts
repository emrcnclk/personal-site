import type { NextConfig } from "next";
import { site } from "./src/config/site";

const nextConfig: NextConfig = {
  // Dev uses .next, production builds use .next-build — they can never
  // corrupt each other's manifests when run at the same time.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  async redirects() {
    return [
      {
        source: "/podcast",
        destination: site.socials.podcast,
        permanent: false,
      },
      {
        source: "/articles",
        destination: "/devlogs",
        permanent: true,
      },
      {
        source: "/articles/:slug",
        destination: "/devlogs",
        permanent: true,
      },
      {
        source: "/research",
        destination: "/cinema",
        permanent: true,
      },
      {
        source: "/lab",
        destination: "/cinema",
        permanent: true,
      },
      {
        source: "/bookmarks",
        destination: "/cinema",
        permanent: true,
      },
      {
        source: "/books",
        destination: "/cinema",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
