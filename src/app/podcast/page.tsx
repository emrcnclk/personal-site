import { redirect } from "next/navigation";
import { site } from "@/config/site";

/** Podcast lives on Spotify — this route is a clean hop. */
export default function PodcastPage() {
  redirect(site.socials.podcast);
}
