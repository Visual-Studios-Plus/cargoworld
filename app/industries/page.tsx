import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "../components/SiteHeader";
import SectionHeader from "../components/SectionHeader";
import PageHero from "../components/PageHero";
import Footer from "../components/sections/Footer";
import CallToAction from "../components/sections/CallToAction";

export const metadata: Metadata = {
  title: "Industries — Sectors we move | Cargo World Wide",
  description:
    "Apparel & textiles with GOH, temperature-controlled tea & spices, FMCG & industrial goods, and special project cargo — handling tuned to each sector.",
};

type Sector = {
  title: string;
  tag: string;
  blurb: string;
  image: string;
  alt: string;
};

const SECTORS: Sector[] = [
  {
    title: "Apparel & Textiles",
    tag: "GOH capable",
    blurb:
      "Garments-on-hanger handling that keeps finished apparel crease-free from Colombo factory to US retail floor.",
    image: "/figma/img/services/service-4.webp",
    alt: "Warehouse storage of palletised goods",
  },
  {
    title: "Tea & Spices",
    tag: "Temperature controlled",
    blurb:
      "Reefer and climate-aware handling that protects aroma, moisture and quality on Sri Lanka's signature exports.",
    image: "/figma/img/services/service-6.webp",
    alt: "Operations team monitoring shipments",
  },
  {
    title: "FMCG & Industrial Goods",
    tag: "High volume",
    blurb:
      "Fast, repeatable consolidations and distribution for fast-moving consumer and industrial supply chains.",
    image: "/figma/img/services/service-2.webp",
    alt: "Cargo plane above shipping containers",
  },
  {
    title: "Special Project Cargo",
    tag: "Heavy & out-of-gauge",
    blurb:
      "Engineered moves for oversized, heavy-lift and out-of-gauge consignments with specialist equipment and planning.",
    image: "/figma/img/services/service-7.webp",
    alt: "Oversized cargo loaded onto a freighter",
  },
];

export default function IndustriesPage() {
  return (
    <main className="flex w-full flex-col bg-white">
      <SiteHeader />

      <PageHero
        image="/figma/img/services/service-7.webp"
        title={
          <>
            handling tuned
            <br />
            to what you ship
          </>
        }
        description="Cargo isn't generic, so our handling isn't either. Each sector gets the equipment, care and paperwork it actually needs."
      />

      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1160px] px-6 pb-[clamp(56px,7vw,112px)] pt-[clamp(48px,6vw,104px)]">
          <SectionHeader
            eyebrow="Industries we serve"
            title="sectors we move every day"
            subtitle="From garments on hangers to heavy-lift project cargo, we shape the service around the commodity."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {SECTORS.map(({ title, tag, blurb, image, alt }) => (
              <Link
                key={title}
                href="/quote"
                aria-label={`Request a quote for ${title}`}
                className="group relative flex h-[380px] flex-col justify-end overflow-hidden rounded-tl-[40px] rounded-br-[40px] border border-neutral-200/80 bg-[#dbe8f3] transition-all duration-300 hover:shadow-xl"
              >
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061421]/95 via-[#061421]/40 to-transparent" />

                <span className="absolute left-6 top-6 rounded-full bg-[#fffb96] px-3.5 py-1.5 font-dm text-[11px] font-bold uppercase tracking-[0.1em] text-[#0a1f33]">
                  {tag}
                </span>

                <div className="relative z-10 p-7">
                  <h3 className="font-cal text-[26px] font-bold leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-accent">
                    {title}
                  </h3>
                  <p className="mt-2.5 max-w-[360px] font-cal text-[14.5px] leading-[1.5] text-white/80">
                    {blurb}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 font-cal text-[14.5px] font-bold text-accent">
                    Request a quote
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
