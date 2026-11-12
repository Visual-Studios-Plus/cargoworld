import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import TransitMap from "../components/TransitMap";
import Footer from "../components/sections/Footer";
import { SwissHero, Block, Cells, Band, CtaSplit } from "../components/Swiss";

export const metadata: Metadata = {
  title: "Network — Colombo to the US, our own hubs | Cargo World Wide",
  description:
    "Colombo is our hub, connecting India, Europe and the Far East to our own US warehouses in Los Angeles, Houston, New York and West Virginia. See lanes, transit times and offices.",
};

const OFFICES = [
  { title: "Colombo", meta: "Sri Lanka", body: "Head office & origin hub" },
  { title: "Tuticorin", meta: "India", body: "India origin gateway" },
  { title: "Chennai", meta: "India", body: "India origin gateway" },
  { title: "Compton", meta: "California, USA", body: "Los Angeles warehouse & fleet" },
  { title: "Houston", meta: "Texas, USA", body: "Warehouse & fleet" },
  { title: "Mississauga", meta: "Ontario, Canada", body: "Distribution office" },
];

type Lane = {
  from: string;
  to: string;
  transit: string;
  sailings: string;
  carriers: string;
  support: string;
};

const LANES: Lane[] = [
  {
    from: "Colombo",
    to: "Los Angeles",
    transit: "26–32 days",
    sailings: "Weekly",
    carriers: "MSC, Maersk, ONE",
    support: "Own Compton (LA) warehouse & trucks",
  },
  {
    from: "Colombo",
    to: "Houston",
    transit: "30–36 days",
    sailings: "Weekly",
    carriers: "MSC, Maersk, ONE",
    support: "Own Houston warehouse & trucks",
  },
  {
    from: "Colombo",
    to: "Mississauga",
    transit: "38–45 days",
    sailings: "Weekly",
    carriers: "MSC, Maersk, ONE",
    support: "Own Ontario distribution office",
  },
  {
    from: "Tuticorin / Chennai",
    to: "Colombo",
    transit: "3–6 days",
    sailings: "Multiple weekly",
    carriers: "Feeder services",
    support: "India origin gateways & consolidation",
  },
];

const COLS: [keyof Lane | "lane", string][] = [
  ["lane", "Lane"],
  ["transit", "Transit"],
  ["sailings", "Sailings"],
  ["carriers", "Carriers"],
  ["support", "Our support"],
];

export default function NetworkPage() {
  return (
    <main className="flex w-full flex-col bg-white">
      <SiteHeader />

      <SwissHero
        image="/figma/img/bento-4.jpg"
        alt="Containers stacked at the Colombo port"
        eyebrow="Network"
        title="One hub in Colombo, our own doors in the US"
        description="We don't hand your cargo to a stranger at the US port. It arrives at a warehouse we own and leaves on a truck we drive."
      />

      <Block
        eyebrow="Our global network"
        title="The transit map"
        lead="Every lane runs direct from Colombo to one of our own US warehouses — no hand-offs on the way."
      />
      <Band>
        <div>
          <TransitMap />
          <ul className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-[13px] text-black/65">
            <li className="inline-flex items-center gap-2.5">
              <span className="inline-block size-3.5 bg-[#1e3a8a]" />
              Colombo origin hub
            </li>
            <li className="inline-flex items-center gap-2.5">
              <span className="inline-block h-[3px] w-6 bg-[#1e3a8a]" />
              Sea lane
            </li>
            <li className="inline-flex items-center gap-2.5">
              <span className="inline-block size-3.5 border-2 border-[#1e3a8a] bg-white" />
              Port / transit point
            </li>
          </ul>
        </div>
      </Band>

      <Block
        eyebrow="Core lanes"
        title="Lane specifications"
        lead="Real transit times and sailing frequencies — searchable text, never buried in an image."
        tone="grey"
      />
      <Band tone="grey">
        <div>
          {/* Table on desktop: rows separated by tone, not rules */}
          <table className="hidden w-full text-left md:table">
            <thead>
              <tr className="kicker text-black/70">
                {COLS.map(([k, label], i) => (
                  <th key={k} className={`pb-5 pr-6 font-medium ${i === 0 ? "pl-4" : ""}`}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[15px] text-black/75">
              {LANES.map((lane, i) => (
                <tr key={lane.to + lane.from} className={i % 2 === 0 ? "bg-white" : ""}>
                  <td className="px-4 py-5 font-medium text-black">
                    {lane.from} → {lane.to}
                  </td>
                  <td className="py-5 pr-6 font-medium text-black tabular-nums">{lane.transit}</td>
                  <td className="py-5 pr-6">{lane.sailings}</td>
                  <td className="py-5 pr-6">{lane.carriers}</td>
                  <td className="py-5 pr-6">{lane.support}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Stacked rows on mobile */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {LANES.map((lane) => (
              <div key={lane.to + lane.from} className="bg-white p-6">
                <p className="text-[18px] font-medium text-black">
                  {lane.from} → {lane.to}
                </p>
                <dl className="mt-4 grid grid-cols-[96px_1fr] gap-x-4 gap-y-2 text-[14px] text-black/75">
                  <dt className="text-black/50">Transit</dt>
                  <dd className="font-medium text-black">{lane.transit}</dd>
                  <dt className="text-black/50">Sailings</dt>
                  <dd>{lane.sailings}</dd>
                  <dt className="text-black/50">Carriers</dt>
                  <dd>{lane.carriers}</dd>
                  <dt className="text-black/50">Support</dt>
                  <dd>{lane.support}</dd>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </Band>

      <Block
        eyebrow="On the ground"
        title="Offices & warehouses"
        lead="Local knowledge at origin, our own people and trucks at destination."
      />
      <Band>
        <Cells items={OFFICES} columns={3} />
      </Band>

      <CtaSplit title="Quote a lane" label="Quote a lane" image="/figma/img/services/service-3.webp" alt="Fleet of freight trucks on the road" />
      <Footer />
    </main>
  );
}
