import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/sections/Footer";
import { SwissHero, Block, Columns, InkPanel, Cells, Band, CtaSplit } from "../components/Swiss";

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
  { title: "2008", meta: "Forwarding since" },
  { title: "4", meta: "US warehouses" },
  { title: "8", meta: "Offices & hubs" },
  { title: "Own", meta: "US delivery fleet" },
];

export default function AboutPage() {
  return (
    <main className="flex w-full flex-col bg-white">
      <SiteHeader />

      <SwissHero
        image="/figma/img/bento-4.jpg"
        alt="Cargo World Wide containers at golden hour"
        eyebrow="About us"
        title="Moving the world, one shipment at a time"
        description="International freight forwarders since 2008, with our own warehouses and trucks on US soil — so a shipment that leaves Colombo stays with one team until it reaches your buyer."
      />

      <Block
        eyebrow="Who we are"
        title="A forwarder that owns the last mile"
        lead="Most forwarders wave goodbye to your cargo at the port of discharge. We don't."
      >
        <Columns>
          <p>
            The container arrives at a warehouse we operate, our brokers clear it, and our drivers take it the
            rest of the way.
          </p>
          <p>
            That control is why clients in apparel, tea and spices, FMCG and project cargo trust us with complex,
            time-sensitive moves — and why we can quote honest transit times and stand behind them.
          </p>
        </Columns>
      </Block>

      <Band>
        <Cells items={STATS} columns={4} />
      </Band>

      <InkPanel
        image="/figma/img/services/about.webp"
        alt="Container ship and cargo plane at a busy port"
        eyebrow="How we work"
        title="Two teams, one promise"
      >
        <p>Dedicated people at both ends of the lane, accountable for the whole journey.</p>
      </InkPanel>

      <Block title="Accountable at both ends" tone="light">
        <ol className="grid grid-cols-1 gap-10">
          {PILLARS.map((p, i) => (
            <li key={p.title} className="grid grid-cols-[40px_1fr] gap-4">
              <span className="pt-1 text-[13px] tabular-nums text-black/40">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-[clamp(20px,1.8vw,26px)] text-black">{p.title}</h3>
                <p className="mt-2 max-w-[44ch] text-[15px] leading-[1.6] text-black/65">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-14 text-[13px] text-black/55">
          Cargo World Wide is proudly part of the Cargo Worldwide group.
        </p>
      </Block>

      <CtaSplit title="Work with us" image="/figma/img/bento-3.jpg" alt="GWW-branded container lifted by a crane" />
      <Footer />
    </main>
  );
}
