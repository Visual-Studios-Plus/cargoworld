import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/sections/Footer";
import CallToAction from "../components/sections/CallToAction";
import {
  ApparelIcon,
  TeaIcon,
  FmcgIcon,
  ProjectIcon,
  ArrowUpRight,
} from "../components/Icons";

export const metadata: Metadata = {
  title: "Industries — Sectors we move | Cargo World Wide",
  description:
    "Apparel & textiles with GOH, temperature-controlled tea & spices, FMCG & industrial goods, and special project cargo — handling tuned to each sector.",
};

type Sector = {
  title: string;
  tag: string;
  blurb: string;
  Icon: typeof ApparelIcon;
};

const SECTORS: Sector[] = [
  {
    title: "Apparel & Textiles",
    tag: "GOH capable",
    blurb:
      "Garments-on-hanger (GOH) handling that keeps finished apparel crease-free from Colombo factory to US retail floor.",
    Icon: ApparelIcon,
  },
  {
    title: "Tea & Spices",
    tag: "Temperature controlled",
    blurb:
      "Reefer and climate-aware handling that protects aroma, moisture and quality on Sri Lanka's signature exports.",
    Icon: TeaIcon,
  },
  {
    title: "FMCG & Industrial Goods",
    tag: "High volume",
    blurb:
      "Fast, repeatable consolidations and distribution for fast-moving consumer and industrial supply chains.",
    Icon: FmcgIcon,
  },
  {
    title: "Special Project Cargo",
    tag: "Heavy & out-of-gauge",
    blurb:
      "Engineered moves for oversized, heavy-lift and out-of-gauge consignments with specialist equipment and planning.",
    Icon: ProjectIcon,
  },
];

export default function IndustriesPage() {
  return (
    <main className="flex w-full flex-col bg-white">
      <SiteHeader />

      <section className="bg-[#0D253F]">
        <div className="mx-auto w-full max-w-[1160px] px-6 pb-[clamp(44px,5vw,72px)] pt-[clamp(48px,6vw,88px)]">
          <p className="font-dm text-[11px] font-bold uppercase tracking-[0.18em] text-[#fffb96]">
            Industries we serve
          </p>
          <h1 className="mt-4 max-w-[720px] font-syne text-[clamp(32px,4.6vw,60px)] font-bold leading-[0.95] tracking-[-0.02em] text-white">
            Handling tuned to what you ship.
          </h1>
          <p className="mt-6 max-w-[560px] font-cal text-[clamp(15px,1.3vw,18px)] leading-[1.5] text-white/70">
            Cargo isn&apos;t generic, so our handling isn&apos;t either. Each
            sector gets the equipment, care and paperwork it actually needs.
          </p>
        </div>
      </section>

      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1160px] px-6 pb-[clamp(56px,7vw,112px)] pt-[clamp(48px,6vw,96px)]">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {SECTORS.map(({ title, tag, blurb, Icon }) => (
              <div
                key={title}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-[#F0F4F9] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-16 items-center justify-center rounded-2xl bg-white text-[#0D253F] shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-9 w-9" />
                  </span>
                  <span className="rounded-full bg-[#0D253F] px-3.5 py-1.5 font-dm text-[11px] font-bold uppercase tracking-[0.1em] text-[#fffb96]">
                    {tag}
                  </span>
                </div>

                <h2 className="mt-6 font-cal text-[26px] font-bold leading-tight tracking-tight text-[#0D253F]">
                  {title}
                </h2>
                <p className="mt-3 font-cal text-[15px] leading-[1.55] text-[#5b6675]">
                  {blurb}
                </p>

                <Link
                  href="/quote"
                  className="mt-6 inline-flex items-center gap-2 font-cal text-[15px] font-bold text-[#0D253F] transition-colors hover:text-[#b8a000]"
                >
                  <span className="underline decoration-[#fffb96] decoration-2 underline-offset-4">
                    Request a quote
                  </span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
      <Footer />
    </main>
  );
}
