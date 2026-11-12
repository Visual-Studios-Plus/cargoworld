import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "../components/SiteHeader";
import SectionHeader from "../components/SectionHeader";
import PageHero from "../components/PageHero";
import Footer from "../components/sections/Footer";
import CallToAction from "../components/sections/CallToAction";

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
    <main className="flex w-full flex-col bg-[#ffffff]">
      <SiteHeader />

      <PageHero
        image="/figma/img/services/service-1.webp"
        title={
          <>
            ship it door to door,
            <br />
            one accountable team
          </>
        }
        description="From a single pallet to a full project move, we run every link — direct from Colombo to our own US warehouses in Los Angeles, Houston, New York and West Virginia, then to your door on our own fleet."
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/quote"
            className="flex h-[58px] items-center justify-center bg-[#ffe500] px-7 font-cal text-[18px] text-black transition-transform hover:scale-[1.03]"
          >
            Get a quote
          </Link>
          <Link
            href="/track"
            className="flex h-[58px] items-center justify-center bg-white/10 px-7 font-cal text-[18px] text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            Track a shipment
          </Link>
        </div>
      </PageHero>

      <section className="w-full bg-[#ffffff]">
        <div data-section className="mx-auto w-full max-w-[1280px] px-6 lg:px-10 pb-[clamp(56px,7vw,112px)] pt-[clamp(48px,6vw,104px)]">
          <SectionHeader
            eyebrow="Our services"
            title="everything you need to move cargo"
            subtitle="Seven connected services, searchable and transparent, each one a tap away from a quote."
          />

          <div data-stagger className="mt-10 grid grid-cols-1 gap-[50px] sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {SERVICES.map(({ title, blurb, image, alt }) => (
              <Link
                key={title}
                href="/quote"
                aria-label={`Get a quote for ${title}`}
                className="group relative h-[340px] overflow-hidden border border-neutral-200/80 bg-[#dbe8f3] transition-all duration-300"
              >
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061421]/95 via-[#061421]/35 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                  <div>
                    <h3 className="font-cal text-xl font-medium leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-[#ffe500]">
                      {title}
                    </h3>
                    <p className="mt-1.5 max-w-[240px] font-cal text-[13.5px] leading-[1.45] text-white/75">
                      {blurb}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/70 text-white transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
      <Footer />
    </main>
  );
}
