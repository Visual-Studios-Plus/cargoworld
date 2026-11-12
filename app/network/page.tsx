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
    <main className="flex w-full flex-col bg-[#ffffff]">
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
      <section className="w-full bg-[#ffffff]">
        <div data-section className="mx-auto w-full max-w-[1280px] px-6 lg:px-10 pb-[clamp(48px,6vw,96px)] pt-[clamp(48px,6vw,104px)]">
          <SectionHeader
            eyebrow="Our global network"
            title="the transit map"
            subtitle="Colombo sits at the centre — feeding regional lanes in and dispatching to our own US warehouses."
          />

          <TransitMap />

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2" data-reveal>
            <span className="inline-flex items-center gap-2 font-dm text-[12px] font-medium uppercase tracking-[0.1em] text-[#8e9194]">
              <span className="inline-block h-4 w-4 rounded-[4px] border-2 border-[#1e3a8a] bg-black" />
              Colombo origin hub
            </span>
            <span className="inline-flex items-center gap-2 font-dm text-[12px] font-medium uppercase tracking-[0.1em] text-[#8e9194]">
              <span className="inline-block h-3 w-6 rounded-full bg-[#1e3a8a]" />
              Sea lane
            </span>
            <span className="inline-flex items-center gap-2 font-dm text-[12px] font-medium uppercase tracking-[0.1em] text-[#8e9194]">
              <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-[#1e3a8a] bg-[#ffffff]" />
              Port / transit point
            </span>
          </div>
        </div>
      </section>

      {/* Lane specs */}
      <section className="w-full bg-[#ffffff]">
        <div data-section className="mx-auto w-full max-w-[1280px] px-6 lg:px-10 pb-[clamp(48px,6vw,96px)] pt-[clamp(48px,6vw,104px)]">
          <SectionHeader
            eyebrow="Core lanes"
            title="lane specifications"
            subtitle="Real transit times and sailing frequencies — all as searchable text, never buried in an image."
          />

          {/* Table on desktop */}
          <div data-reveal className="mt-10 hidden overflow-hidden border border-[#d8d8d8] bg-[#ffffff] md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#1e3a8a] font-dm text-[12px] uppercase tracking-[0.1em] text-white/80">
                  <th className="px-6 py-4 font-medium">Lane</th>
                  <th className="px-6 py-4 font-medium">Transit</th>
                  <th className="px-6 py-4 font-medium">Sailings</th>
                  <th className="px-6 py-4 font-medium">Carriers</th>
                  <th className="px-6 py-4 font-medium">Our support</th>
                </tr>
              </thead>
              <tbody className="font-cal text-[15px] text-[#4b514d]">
                {LANES.map((lane) => (
                  <tr
                    key={lane.to}
                    className="border-t border-[#d8d8d8] transition-colors hover:bg-[#f1f1f1]"
                  >
                    <td className="px-6 py-4 font-medium text-[#1e3a8a]">
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
          <div data-stagger className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
            {LANES.map((lane) => (
              <div
                key={lane.to}
                className="border border-[#d8d8d8] bg-[#ffffff] p-6"
              >
                <p className="font-cal text-[18px] font-medium text-[#1e3a8a]">
                  {lane.from} → {lane.to}
                </p>
                <dl className="mt-4 space-y-2 font-cal text-[14px] text-[#4b514d]">
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#8e9194]">Transit</dt>
                    <dd className="text-right font-medium text-[#1e3a8a]">
                      {lane.transit}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#8e9194]">Sailings</dt>
                    <dd className="text-right">{lane.sailings}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#8e9194]">Carriers</dt>
                    <dd className="text-right">{lane.carriers}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#8e9194]">Support</dt>
                    <dd className="text-right">{lane.support}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="w-full bg-[#ffffff]">
        <div data-section className="mx-auto w-full max-w-[1280px] px-6 lg:px-10 pb-[clamp(56px,7vw,112px)] pt-[clamp(48px,6vw,104px)]">
          <SectionHeader
            eyebrow="On the ground"
            title="offices & warehouses"
            subtitle="Local knowledge at origin, our own people and trucks at destination."
          />
          <div data-stagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {OFFICES.map((o) => (
              <div
                key={o.city}
                className="group bg-[#f1f1f1] p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-[#ffffff] text-[#1e3a8a] shadow-sm transition-colors duration-300 group-hover:bg-black">
                  <PinIcon className="h-5 w-5" />
                </span>
                <p className="mt-4 font-cal text-[20px] font-medium text-[#1e3a8a]">
                  {o.city}
                </p>
                <p className="font-dm text-[12px] font-medium uppercase tracking-[0.12em] text-[#8e9194]">
                  {o.country}
                </p>
                <p className="mt-2 font-cal text-[14px] leading-[1.45] text-[#8e9194]">
                  {o.role}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center bg-[#ffe500] px-7 py-3.5 font-cal text-[16px] text-black transition-transform hover:scale-[1.03]"
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
