import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/sections/Footer";
import { SwissHero, Block, Band, CtaSplit } from "../components/Swiss";

export const metadata: Metadata = {
  title: "Ship — Freight & logistics services | Cargo World Wide",
  description:
    "Ocean freight, air cargo, customs brokerage, trucking, warehousing, 4PL and project cargo — one team moving your shipment door to door from Colombo to the US.",
};

type Service = {
  title: string;
  blurb: string;
  image: string;
  alt: string;
};

const SERVICES: Service[] = [
  {
    title: "Ocean Freight",
    blurb: "FCL & LCL from Colombo, weekly sailings via MSC, Maersk and ONE.",
    image: "/figma/img/services/service-1.webp",
    alt: "Aerial view of a container ship at sea",
  },
  {
    title: "Air Cargo",
    blurb: "Time-critical uplift when the deadline simply cannot move.",
    image: "/figma/img/services/service-2.webp",
    alt: "Cargo plane above stacked shipping containers",
  },
  {
    title: "Customs Brokerage",
    blurb: "In-house brokers clear your cargo and keep every document compliant.",
    image: "/figma/img/services/service-5.webp",
    alt: "Specialists reviewing documents at a container",
  },
  {
    title: "Transportation / Trucking",
    blurb: "Final-mile on our own trucks, warehouse to buyer's door.",
    image: "/figma/img/services/service-3.webp",
    alt: "Fleet of freight trucks on the road",
  },
  {
    title: "Warehousing",
    blurb: "Secure, scalable storage at our own US warehouses.",
    image: "/figma/img/services/service-4.webp",
    alt: "Palletised goods stored along warehouse aisles",
  },
  {
    title: "4PL Services",
    blurb: "We orchestrate origin to final delivery as your single contact.",
    image: "/figma/img/services/about.webp",
    alt: "Container ship and cargo plane at a busy port",
  },
  {
    title: "Project Cargo",
    blurb: "Oversized, heavy-lift and out-of-gauge moves, specially handled.",
    image: "/figma/img/services/service-7.webp",
    alt: "Oversized cargo loaded onto a freighter aircraft",
  },
];

export default function ShipPage() {
  return (
    <main className="flex w-full flex-col bg-white">
      <SiteHeader />

      <SwissHero
        image="/figma/img/services/service-1.webp"
        alt="Aerial view of a container ship at sea"
        eyebrow="Ship with us"
        title="Ship it door to door, one accountable team"
        description="From a single pallet to a full project move, we run every link — direct from Colombo to our own US warehouses, then to your door on our own fleet."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/quote"
            className="flex h-[56px] items-center justify-center bg-[#ffe500] px-8 text-[16px] font-medium text-black transition-colors hover:bg-white"
          >
            Get a quote
          </Link>
          <Link
            href="/track"
            className="flex h-[56px] items-center justify-center border border-white/50 px-8 text-[16px] text-white transition-colors hover:border-white hover:bg-white hover:text-black"
          >
            Track a shipment
          </Link>
        </div>
      </SwissHero>

      <Block
        eyebrow="Our services"
        title="Everything you need to move cargo"
        lead="Seven connected services, each one a tap away from a quote."
      />

      <Band>
        <ul className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ title, blurb, image, alt }, i) => (
            <li key={title}>
              <Link href="/quote" aria-label={`Get a quote for ${title}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f5f7]">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                  />
                </div>
                <div className="mt-5 grid grid-cols-[40px_1fr] gap-4">
                  <span className="pt-1 text-[13px] tabular-nums text-black/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[clamp(20px,1.8vw,26px)] text-black underline-offset-4 group-hover:underline">
                      {title}
                    </h3>
                    <p className="mt-2 max-w-[34ch] text-[15px] leading-[1.6] text-black/65">{blurb}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Band>

      <CtaSplit image="/figma/img/bento-4.jpg" alt="Branded containers at the yard" />
      <Footer />
    </main>
  );
}
