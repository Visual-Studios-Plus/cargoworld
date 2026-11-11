import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/sections/Footer";
import CallToAction from "../components/sections/CallToAction";

export const metadata: Metadata = {
  title: "About — Freight forwarding since 2008 | Cargo World Wide",
  description:
    "International freight forwarders since 2008, with dedicated teams in Sri Lanka and the US delivering reliable door-to-door execution from Colombo to your buyer.",
};

const PILLARS = [
  {
    title: "Sri Lanka team",
    body: "Origin specialists in Colombo booking space, consolidating cargo and preparing every document before your shipment sails.",
  },
  {
    title: "US team",
    body: "Our own people at warehouses in Los Angeles, Houston, New York and West Virginia receiving, clearing and dispatching on our trucks.",
  },
  {
    title: "Door-to-door execution",
    body: "One accountable chain from the factory gate in Colombo to the buyer's door in the US — no hand-offs to strangers.",
  },
];

const STATS = [
  { value: "2008", label: "Forwarding since" },
  { value: "4", label: "US warehouses" },
  { value: "8", label: "Offices & hubs" },
  { value: "Own", label: "US delivery fleet" },
];

export default function AboutPage() {
  return (
    <main className="flex w-full flex-col bg-white">
      <SiteHeader />

      <section className="bg-[#0D253F]">
        <div className="mx-auto w-full max-w-[1160px] px-6 pb-[clamp(44px,5vw,72px)] pt-[clamp(48px,6vw,88px)]">
          <p className="font-dm text-[11px] font-bold uppercase tracking-[0.18em] text-[#fffb96]">
            Who we are
          </p>
          <h1 className="mt-4 max-w-[760px] font-syne text-[clamp(32px,4.6vw,60px)] font-bold leading-[0.95] tracking-[-0.02em] text-white">
            Moving the world, one shipment at a time — since 2008.
          </h1>
          <p className="mt-6 max-w-[620px] font-cal text-[clamp(15px,1.3vw,18px)] leading-[1.5] text-white/70">
            Cargo World Wide has been forwarding international freight since 2008.
            Over more than a decade we built something unusual for a Sri Lankan
            forwarder: our own warehouses and trucks on US soil, so a shipment
            that leaves Colombo stays with one team until it reaches your buyer.
          </p>
        </div>
      </section>

      {/* Story + image */}
      <section className="w-full bg-white">
        <div className="mx-auto grid w-full max-w-[1160px] grid-cols-1 items-center gap-10 px-6 pb-[clamp(48px,6vw,88px)] pt-[clamp(48px,6vw,88px)] lg:grid-cols-2">
          <div>
            <h2 className="font-cal text-[clamp(26px,2.8vw,40px)] leading-[1.1] tracking-[-0.03em] text-[#0D253F]">
              A forwarder that owns the last mile
            </h2>
            <div className="mt-5 space-y-4 font-cal text-[15.5px] leading-[1.6] text-[#44505f]">
              <p>
                Most forwarders wave goodbye to your cargo at the port of
                discharge. We don&apos;t. The container arrives at a warehouse we
                operate, our brokers clear it, and our drivers take it the rest of
                the way.
              </p>
              <p>
                That control is why clients in apparel, tea and spices, FMCG and
                project cargo trust us with complex, time-sensitive moves — and
                why we can quote honest transit times and stand behind them.
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="/figma/img/bento-4.jpg"
              alt="Cargo World Wide containers at golden hour"
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full bg-[#F0F4F9]">
        <div className="mx-auto w-full max-w-[1160px] px-6 py-[clamp(40px,5vw,72px)]">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-syne text-[clamp(34px,4vw,54px)] font-bold leading-none text-[#0D253F]">
                  {s.value}
                </p>
                <p className="mt-2 font-cal text-[14px] text-[#6b7280]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1160px] px-6 pb-[clamp(56px,7vw,104px)] pt-[clamp(48px,6vw,88px)]">
          <h2 className="font-cal text-[clamp(26px,2.8vw,40px)] leading-[1.05] tracking-[-0.03em] text-[#0D253F]">
            Two teams, one promise
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                className="rounded-3xl bg-[#F0F4F9] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-[#0D253F] font-cal text-[16px] text-[#fffb96]">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-cal text-[21px] font-bold text-[#0D253F]">
                  {p.title}
                </h3>
                <p className="mt-2.5 font-cal text-[14.5px] leading-[1.55] text-[#5b6675]">
                  {p.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/quote"
              className="inline-block rounded-tl-[20px] rounded-br-[20px] bg-[#fffb96] px-6 py-3.5 font-cal text-[16px] text-black transition-transform hover:scale-[1.03]"
            >
              Work with us
            </Link>
          </div>

          {/* Group endorsement */}
          <p className="mt-16 border-t border-[#E3E9F1] pt-8 text-center font-dm text-[13px] uppercase tracking-[0.15em] text-[#9aa6b5]">
            Cargo World Wide is proudly part of the Cargo Worldwide group.
          </p>
        </div>
      </section>

      <CallToAction />
      <Footer />
    </main>
  );
}
