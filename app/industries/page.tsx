import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/sections/Footer";
import { SwissHero, Block, InkPanel, CtaSplit } from "../components/Swiss";

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

      <SwissHero
        image="/figma/img/services/service-7.webp"
        alt="Oversized cargo loaded onto a freighter"
        eyebrow="Industries"
        title="Handling tuned to what you ship"
        description="Cargo isn't generic, so our handling isn't either. Each sector gets the equipment, care and paperwork it actually needs."
      />

      <Block
        eyebrow="Industries we serve"
        title="Sectors we move every day"
        lead="From garments on hangers to heavy-lift project cargo, we shape the service around the commodity."
      />

      {SECTORS.map((s, i) => (
        <InkPanel
          key={s.title}
          image={s.image}
          alt={s.alt}
          eyebrow={`${String(i + 1).padStart(2, "0")} · ${s.tag}`}
          title={s.title}
          reverse={i % 2 === 1}
        >
          <p>{s.blurb}</p>
          <Link
            href="/quote"
            className="mt-8 inline-flex h-[52px] items-center bg-[#ffe500] px-7 text-[15px] font-medium text-black transition-colors hover:bg-white"
          >
            Request a quote
          </Link>
        </InkPanel>
      ))}

      <CtaSplit image="/figma/img/bento-2.jpg" alt="Parcel handover to a customer" />
      <Footer />
    </main>
  );
}
