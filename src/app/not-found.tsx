import { Container } from "@/components/ui/container";
import { Kicker } from "@/components/ui/kicker";
import { NoirLink } from "@/components/ui/noir-link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh items-center">
      <Container>
        <Kicker signal>Error 404 — lost signal</Kicker>
        <h1 className="display mt-6 max-w-2xl text-5xl md:text-7xl">
          This frame was left on the cutting room floor.
        </h1>
        <p className="mt-6 max-w-md leading-relaxed text-muted">
          The page you&apos;re looking for doesn&apos;t exist, moved, or never made the
          final cut. The rest of the universe is still here.
        </p>
        <div className="mt-10">
          <NoirLink href="/">Back to the opening scene</NoirLink>
        </div>
      </Container>
    </div>
  );
}
