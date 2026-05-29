import Image from "next/image";
import { Container } from "@/components/ui/container";

const logos = [
  { src: "/images/clients/agilepulselogo.png", alt: "AgilePulse" },
  { src: "/images/clients/syspos-logo.webp", alt: "SysPOS" },
  { src: "/images/clients/cellular-logo.png", alt: "Cellular" },
  { src: "/images/clients/tasleem-taxi-logo.png", alt: "Tasleem Taxi" },
  { src: "/images/clients/ttravel-logo.png", alt: "TTravel" },
  { src: "/images/clients/top-health-ai.png", alt: "TopHealth AI" },
  { src: "/images/clients/capri.avif", alt: "Capri" },
];

export function LogoRow() {
  return (
    <section className="border-y border-border bg-bg py-10 md:py-12">
      <Container>
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint">
          Trusted by teams shipping real products
        </p>
        <div className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-7">
          {logos.map((logo) => (
            <div key={logo.alt} className="flex items-center justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={36}
                className="logo-bar-image h-7 w-auto object-contain opacity-55 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
