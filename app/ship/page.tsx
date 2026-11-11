import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/sections/Footer";
import CallToAction from "../components/sections/CallToAction";
import {
  OceanIcon,
  AirIcon,
  CustomsIcon,
  TruckIcon,
  WarehouseIcon,
  FourPlIcon,
  ProjectIcon,
  ArrowUpRight,
} from "../components/Icons";

export const metadata: Metadata = {
  title: "Ship — Freight & logistics services | Cargo World Wide",
  description:
    "Ocean freight, air cargo, customs brokerage, trucking, warehousing, 4PL and project cargo — one team moving your shipment door to door from Colombo to the US.",
};

type Service = {
  title: string;
  blurb: string;
  Icon: typeof OceanIcon;
};

const SERVICES: Service[] = [
  {
    title: "Ocean Freight",
    blurb:
      "FCL & LCL consolidations from Colombo with weekly sailings via MSC, Maersk and ONE to our US ports.",
    Icon: OceanIcon,
  },
  {
    title: "Air Cargo",
    blurb:
      "Time-critical and perishable air freight with priority uplift when the deadline cannot move.",
    Icon: AirIcon,
  },
  {
    title: "Customs Brokerage",
    blurb:
      "In-house brokers clear your cargo at the US port and keep every HS code and document compliant.",
    Icon: CustomsIcon,
  },
  {
    title: "Transportation / Trucking",
    blurb:
      "Final-mile delivery on our own trucks from our warehouses straight to the buyer's door.",
    Icon: TruckIcon,
  },
  {
    title: "Warehousing",
    blurb:
      "Secure, scalable storage and fulfilment at our own US warehouses in LA, Houston, NY and West Virginia.",
    Icon: WarehouseIcon,
  },
  {
    title: "4PL Services",
    blurb:
      "End-to-end supply chain management — we orchestrate origin to final delivery as your single point of contact.",
    Icon: FourPlIcon,
  },
  {
    title: "Project Cargo",
    blurb:
      "Oversized, heavy-lift and out-of-gauge consignments planned and moved with specialist handling.",
    Icon: ProjectIcon,
  },
];

export default function ShipPage() {
  return (
    <main className="flex w-full flex-col bg-white">
      <SiteHeader />

      <section className="bg-[#0D253F]">
        <div className="mx-auto w-full max-w-[1160px] px-6 pb-[clamp(56px,7vw,104px)] pt-[clamp(48px,6vw,88px)]">
          <p className="font-dm text-[11px] font-bold uppercase tracking-[0.18em] text-[#fffb96]">
            Ship with Cargo World Wide
          </p>
          <h1 className="mt-4 max-w-[760px] font-syne text-[clamp(34px,5vw,64px)] font-bold leading-[0.95] tracking-[-0.02em] text-white">
            Comprehensive freight &amp; logistics, one accountable team.
          </h1>
          <p className="mt-6 max-w-[560px] font-cal text-[clamp(15px,1.3vw,18px)] leading-[1.5] text-white/70">
            From a single pallet to a full project move, we run every link of the
            chain — direct from Colombo to our own US warehouses in Los Angeles,
            Houston, New York and West Virginia, then to your door on our own
            fleet.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/quote"
              className="rounded-tl-[20px] rounded-br-[20px] bg-[#fffb96] px-6 py-3.5 font-cal text-[16px] text-black transition-transform hover:scale-[1.03]"
            >
              Get a quote
            </Link>
            <Link
              href="/track"
              className="rounded-tl-[20px] rounded-br-[20px] border border-white/25 px-6 py-3.5 font-cal text-[16px] text-white transition-colors hover:bg-white/10"
            >
              Track a shipment
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1160px] px-6 pb-[clamp(56px,7vw,112px)] pt-[clamp(48px,6vw,96px)]">
          <div className="max-w-[520px]">
            <h2 className="font-cal text-[clamp(28px,3vw,44px)] leading-[1.05] tracking-[-0.03em] text-[#0D253F]">
              Everything you need to move cargo
            </h2>
            <p className="mt-3 font-cal text-[15px] leading-[1.5] text-[#6b7280]">
              Seven connected services, searchable and transparent, each linking
              straight to a quote.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ title, blurb, Icon }) => (
              <Link
                key={title}
                href="/quote"
                aria-label={`Get a quote for ${title}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-[#F0F4F9] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="flex size-16 items-center justify-center rounded-2xl bg-white text-[#0D253F] shadow-sm transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-9 w-9" />
                </span>

                <h3 className="mt-6 font-cal text-[22px] font-bold leading-tight tracking-tight text-[#0D253F]">
                  {title}
                </h3>
                <p className="mt-2.5 font-cal text-[14.5px] leading-[1.5] text-[#5b6675]">
                  {blurb}
                </p>

                <span
                  aria-hidden="true"
                  className="mt-6 flex size-11 items-center justify-center rounded-full border border-[#0D253F]/15 text-[#0D253F] transition-all duration-300 group-hover:border-[#fffb96] group-hover:bg-[#fffb96]"
                >
                  <ArrowUpRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
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
