import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/sections/Footer";
import CallToAction from "../components/sections/CallToAction";
import { PinIcon, ArrowUpRight } from "../components/Icons";

export const metadata: Metadata = {
  title: "Network — Colombo to the US, our own hubs | Cargo World Wide",
  description:
    "Colombo is our hub, connecting India, Europe and the Far East to our own US warehouses in Los Angeles, Houston, New York and West Virginia. See lanes, transit times and offices.",
};

const US_DESTINATIONS = [
  "Los Angeles",
  "Houston",
  "New York",
  "West Virginia",
];

const REGIONAL = ["India", "Europe", "China / Far East"];

type Office = {
  city: string;
  country: string;
  role: string;
};

const OFFICES: Office[] = [
  { city: "Colombo", country: "Sri Lanka", role: "Head office & origin hub" },
  { city: "Tuticorin", country: "India", role: "Regional gateway" },
  { city: "Chennai", country: "India", role: "Regional gateway" },
  { city: "Compton", country: "USA", role: "Los Angeles warehouse & fleet" },
  { city: "Houston", country: "USA", role: "Warehouse & fleet" },
  { city: "New York", country: "USA", role: "Warehouse & fleet" },
  { city: "West Virginia", country: "USA", role: "Warehouse & fleet" },
  { city: "Mississauga", country: "Canada", role: "Partner office" },
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
    to: "Houston",
    transit: "30–36 days",
    sailings: "Weekly",
    carriers: "MSC, Maersk, ONE",
    support: "Own Houston warehouse & trucks",
  },
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
    to: "New York",
    transit: "32–38 days",
    sailings: "Weekly",
    carriers: "MSC, Maersk, ONE",
    support: "Own New York warehouse & trucks",
  },
  {
    from: "Colombo",
    to: "West Virginia",
    transit: "34–40 days",
    sailings: "Weekly",
    carriers: "MSC, Maersk, ONE",
    support: "Own West Virginia warehouse & trucks",
  },
];

export default function NetworkPage() {
  return (
    <main className="flex w-full flex-col bg-white">
      <SiteHeader />

      <section className="bg-[#0D253F]">
        <div className="mx-auto w-full max-w-[1160px] px-6 pb-[clamp(44px,5vw,72px)] pt-[clamp(48px,6vw,88px)]">
          <p className="font-dm text-[11px] font-bold uppercase tracking-[0.18em] text-[#fffb96]">
            Our global network
          </p>
          <h1 className="mt-4 max-w-[720px] font-syne text-[clamp(32px,4.6vw,60px)] font-bold leading-[0.95] tracking-[-0.02em] text-white">
            One hub in Colombo. Our own doors in the US.
          </h1>
          <p className="mt-6 max-w-[560px] font-cal text-[clamp(15px,1.3vw,18px)] leading-[1.5] text-white/70">
            We don&apos;t hand your cargo to a stranger at the US port. It arrives
            at a warehouse we own and leaves on a truck we drive.
          </p>
        </div>
      </section>

      {/* Transit map */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1160px] px-6 pb-[clamp(48px,6vw,96px)] pt-[clamp(48px,6vw,88px)]">
          <h2 className="font-cal text-[clamp(26px,2.8vw,40px)] leading-[1.05] tracking-[-0.03em] text-[#0D253F]">
            Transit map
          </h2>

          <div className="mt-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
            {/* Regional feeders */}
            <div className="flex flex-col gap-3">
              <p className="font-dm text-[11px] font-bold uppercase tracking-[0.15em] text-[#6b7280]">
                Regional lanes
              </p>
              {REGIONAL.map((r) => (
                <div
                  key={r}
                  className="flex items-center justify-between rounded-2xl bg-[#F0F4F9] px-5 py-4"
                >
                  <span className="font-cal text-[17px] text-[#0D253F]">{r}</span>
                  <span aria-hidden="true" className="text-[#0D253F]/40">
                    →
                  </span>
                </div>
              ))}
            </div>

            {/* Colombo hub */}
            <div className="flex flex-col items-center">
              <div className="flex size-36 flex-col items-center justify-center rounded-full bg-[#0D253F] text-center shadow-xl">
                <PinIcon className="h-7 w-7 text-[#fffb96]" />
                <p className="mt-1 font-syne text-[20px] font-bold text-white">
                  Colombo
                </p>
                <p className="font-cal text-[11px] text-white/60">Origin hub</p>
              </div>
              <span
                aria-hidden="true"
                className="my-3 hidden h-10 w-px bg-[#E3E9F1] lg:block"
              />
            </div>

            {/* US destinations */}
            <div className="flex flex-col gap-3">
              <p className="font-dm text-[11px] font-bold uppercase tracking-[0.15em] text-[#6b7280]">
                US destinations · our warehouses
              </p>
              {US_DESTINATIONS.map((d) => (
                <div
                  key={d}
                  className="flex items-center justify-between rounded-2xl border border-[#fffb96] bg-[#fffdf0] px-5 py-4"
                >
                  <span aria-hidden="true" className="text-[#0D253F]/40">
                    →
                  </span>
                  <span className="font-cal text-[17px] font-bold text-[#0D253F]">
                    {d}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lane specs */}
      <section className="w-full bg-[#F0F4F9]">
        <div className="mx-auto w-full max-w-[1160px] px-6 pb-[clamp(48px,6vw,96px)] pt-[clamp(48px,6vw,88px)]">
          <h2 className="font-cal text-[clamp(26px,2.8vw,40px)] leading-[1.05] tracking-[-0.03em] text-[#0D253F]">
            Core lane specifications
          </h2>
          <p className="mt-3 max-w-[520px] font-cal text-[15px] leading-[1.5] text-[#6b7280]">
            Real transit times and sailing frequencies — all as searchable text.
          </p>

          {/* Table on desktop */}
          <div className="mt-8 hidden overflow-hidden rounded-3xl border border-[#E3E9F1] bg-white md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#0D253F] font-dm text-[12px] uppercase tracking-[0.1em] text-white/80">
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
                    <td className="px-6 py-4 font-bold text-[#0D253F]">
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
                className="rounded-3xl border border-[#E3E9F1] bg-white p-6"
              >
                <p className="font-cal text-[18px] font-bold text-[#0D253F]">
                  {lane.from} → {lane.to}
                </p>
                <dl className="mt-4 space-y-2 font-cal text-[14px] text-[#44505f]">
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#6b7280]">Transit</dt>
                    <dd className="text-right font-bold text-[#0D253F]">
                      {lane.transit}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#6b7280]">Sailings</dt>
                    <dd className="text-right">{lane.sailings}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#6b7280]">Carriers</dt>
                    <dd className="text-right">{lane.carriers}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#6b7280]">Support</dt>
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
        <div className="mx-auto w-full max-w-[1160px] px-6 pb-[clamp(56px,7vw,104px)] pt-[clamp(48px,6vw,88px)]">
          <h2 className="font-cal text-[clamp(26px,2.8vw,40px)] leading-[1.05] tracking-[-0.03em] text-[#0D253F]">
            Offices &amp; warehouses
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {OFFICES.map((o) => (
              <div
                key={o.city}
                className="group rounded-3xl bg-[#F0F4F9] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <PinIcon className="h-6 w-6 text-[#0D253F]" />
                <p className="mt-4 font-cal text-[20px] font-bold text-[#0D253F]">
                  {o.city}
                </p>
                <p className="font-dm text-[12px] font-bold uppercase tracking-[0.12em] text-[#6b7280]">
                  {o.country}
                </p>
                <p className="mt-2 font-cal text-[14px] leading-[1.45] text-[#5b6675]">
                  {o.role}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-tl-[20px] rounded-br-[20px] bg-[#fffb96] px-6 py-3.5 font-cal text-[16px] text-black transition-transform hover:scale-[1.03]"
            >
              Quote a lane
              <ArrowUpRight className="h-[18px] w-[18px]" />
            </Link>
          </div>
        </div>
      </section>

      <CallToAction />
      <Footer />
    </main>
  );
}
