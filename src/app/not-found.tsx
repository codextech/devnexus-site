import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center">
      <Container>
        <div className="text-center">
          <p className="text-6xl font-bold text-brand-blue font-[family-name:var(--font-geist-mono)]">
            404
          </p>
          <h1 className="mt-4 text-2xl md:text-4xl font-semibold text-white">
            Page Not Found
          </h1>
          <p className="mt-3 text-dark-400">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-8">
            <Button href="/">Back to Home</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
