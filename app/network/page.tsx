import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SectionHeader from "../components/SectionHeader";
import PageHero from "../components/PageHero";
import TransitMap from "../components/TransitMap";
import Footer from "../components/sections/Footer";
import CallToAction from "../components/sections/CallToAction";
import { PinIcon } from "../components/Icons";

export const metadata: Metadata = {
  title: "Network — Colombo to the US, our own hubs | Cargo World Wide",
  description:
    "Colombo is our hub, connecting India, Europe and the Far East to our own US warehouses in Los Angeles, Houston, New York and West Virginia. See lanes, transit times and offices.",
};

type Office = { city: string; country: string; role: string };

const OFFICES: Office[] = [
  { city: "Colombo", country: "Sri Lanka", role: "Head office & origin hub" },
  { city: "Tuticorin", country: "India", role: "India origin gateway" },
  { city: "Chennai", country: "India", role: "India origin gateway" },
  { city: "Compton", country: "California, USA", role: "Los Angeles warehouse & fleet" },
  { city: "Houston", country: "Texas, USA", role: "Warehouse & fleet" },
  { city: "Mississauga", country: "Ontario, Canada", role: "Distribution office" },
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

export default function NetworkPage() {
  return (
    <main className="flex w-full flex-col bg-white">
      <SiteHeader />

      <PageHero
        image="/figma/img/bento-4.jpg"
        title={
          <>
            one hub in colombo,
            <br />
            our own doors in the US
          </>
        }
        description="We don't hand your cargo to a stranger at the US port. It arrives at a warehouse we own and leaves on a truck we drive."
      />

      {/* Transit map */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1280px] px-6 pb-[clamp(48px,6vw,96px)] pt-[clamp(48px,6vw,104px)]">
          <SectionHeader
            eyebrow="Our global network"
            title="the transit map"
            subtitle="Colombo sits at the centre — feeding regional lanes in and dispatching to our own US warehouses."
          />

          <TransitMap />

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span className="inline-flex items-center gap-2 font-dm text-[12px] font-bold uppercase tracking-[0.1em] text-[#5b6675]">
              <span className="inline-block h-4 w-4 rounded-[4px] border-2 border-[#0a1f33] bg-[#fffb96]" />
              Colombo origin hub
            </span>
            <span className="inline-flex items-center gap-2 font-dm text-[12px] font-bold uppercase tracking-[0.1em] text-[#5b6675]">
              <span className="inline-block h-3 w-6 rounded-full bg-[#0a1f33]" />
              Sea lane
            </span>
            <span className="inline-flex items-center gap-2 font-dm text-[12px] font-bold uppercase tracking-[0.1em] text-[#5b6675]">
              <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-[#0a1f33] bg-white" />
              Port / transit point
            </span>
          </div>
        </div>
      </section>

      {/* Lane specs */}
      <section className="w-full bg-[#F0F4F9]">
        <div className="mx-auto w-full max-w-[1280px] px-6 pb-[clamp(48px,6vw,96px)] pt-[clamp(48px,6vw,104px)]">
          <SectionHeader
            eyebrow="Core lanes"
            title="lane specifications"
            subtitle="Real transit times and sailing frequencies — all as searchable text, never buried in an image."
          />

          {/* Table on desktop */}
          <div className="mt-10 hidden overflow-hidden rounded-tl-[32px] rounded-br-[32px] border border-[#E3E9F1] bg-white md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#0a1f33] font-dm text-[12px] uppercase tracking-[0.1em] text-white/80">
                  <th className="px-6 py-4 font-bold">Lane</th>
                  <th className="px-6 py-4 font-bold">Transit</th>
                  <th className="px-6 py-4 font-bold">Sailings</th>
                  <th className="px-6 py-4 font-bold">Carriers</th>
                  <th className="px-6 py-4 font-bold">Our support</th>
                </tr>
              </thead>
              <tbody className="font-cal text-[15px] text-[#44505f]">
                {LANES.map((lane) => (
                  <tr
                    key={lane.to}
                    className="border-t border-[#E3E9F1] transition-colors hover:bg-[#F0F4F9]"
                  >
                    <td className="px-6 py-4 font-bold text-[#0a1f33]">
                      {lane.from} → {lane.to}
                    </td>
                    <td className="px-6 py-4">{lane.transit}</td>
                    <td className="px-6 py-4">{lane.sailings}</td>
                    <td className="px-6 py-4">{lane.carriers}</td>
                    <td className="px-6 py-4">{lane.support}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards on mobile */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
            {LANES.map((lane) => (
              <div
                key={lane.to}
                className="rounded-tl-[24px] rounded-br-[24px] border border-[#E3E9F1] bg-white p-6"
              >
                <p className="font-cal text-[18px] font-bold text-[#0a1f33]">
                  {lane.from} → {lane.to}
                </p>
                <dl className="mt-4 space-y-2 font-cal text-[14px] text-[#44505f]">
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#808080]">Transit</dt>
                    <dd className="text-right font-bold text-[#0a1f33]">
                      {lane.transit}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#808080]">Sailings</dt>
                    <dd className="text-right">{lane.sailings}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#808080]">Carriers</dt>
                    <dd className="text-right">{lane.carriers}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#808080]">Support</dt>
                    <dd className="text-right">{lane.support}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1280px] px-6 pb-[clamp(56px,7vw,112px)] pt-[clamp(48px,6vw,104px)]">
          <SectionHeader
            eyebrow="On the ground"
            title="offices & warehouses"
            subtitle="Local knowledge at origin, our own people and trucks at destination."
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {OFFICES.map((o) => (
              <div
                key={o.city}
                className="group rounded-tl-[24px] rounded-br-[24px] bg-[#F0F4F9] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-white text-[#0a1f33] shadow-sm transition-colors duration-300 group-hover:bg-[#fffb96]">
                  <PinIcon className="h-5 w-5" />
                </span>
                <p className="mt-4 font-cal text-[20px] font-bold text-[#0a1f33]">
                  {o.city}
                </p>
                <p className="font-dm text-[12px] font-bold uppercase tracking-[0.12em] text-[#808080]">
                  {o.country}
                </p>
                <p className="mt-2 font-cal text-[14px] leading-[1.45] text-[#5b6675]">
                  {o.role}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-tl-[20px] rounded-br-[20px] bg-[#fffb96] px-7 py-3.5 font-cal text-[16px] text-black transition-transform hover:scale-[1.03]"
            >
              Quote a lane
            </Link>
          </div>
        </div>
      </section>

      <CallToAction />
      <Footer />
    </main>
  );
}
