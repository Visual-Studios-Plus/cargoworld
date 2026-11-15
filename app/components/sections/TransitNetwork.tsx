import Link from "next/link";
import SectionHeader from "../SectionHeader";
import TransitMap from "../TransitMap";

/**
 * Home "transit map" band.
 *
 * A Swiss section opener over two columns: the map, framed and annotated like
 * a timetable card, and a description column divided into ruled facts and
 * figures. Motion markers are picked up by <SiteMotion />: the map slides in
 * from the left, the copy from the right, the headline rises line by line and
 * the facts stagger. The map draws its lanes when it scrolls into view.
 */

const FACTS = [
  {
    n: "01",
    title: "Direct to our own warehouses",
    meta: "Los Angeles · Houston · New York · West Virginia",
    href: "/network",
  },
  {
    n: "02",
    title: "Weekly sailings, fixed cut-offs",
    meta: "MSC · Maersk · ONE — space held for us",
    href: "/network",
  },
  {
    n: "03",
    title: "One team from origin to door",
    meta: "Colombo and US teams on the same shipment",
    href: "/about",
  },
];

const LEGEND = [
  { label: "Colombo hub", swatch: <span className="inline-block size-3 border border-black bg-[#ffe500]" /> },
  { label: "Sea lane", swatch: <span className="inline-block h-[3px] w-5 bg-[#1e3a8a]" /> },
  {
    label: "Transit point",
    swatch: <span className="inline-block size-3 border-2 border-[#1e3a8a] bg-white" />,
  },
];

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export default function TransitNetwork() {
  return (
    <section id="transit" className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-[clamp(72px,9vw,120px)] lg:px-10">
        <SectionHeader
          eyebrow="Transit map"
          title="One hub. Four doors. No hand-offs."
          subtitle="Every lane runs direct from Colombo to a warehouse we own — Los Angeles, Houston, New York and West Virginia. Your cargo never changes hands at the US port."
        />

        <div className="mt-12 grid grid-cols-1 gap-y-12 xl:grid-cols-12 xl:items-stretch xl:gap-x-6">
          {/* ---------------------------------------------------------------
              Map column
          --------------------------------------------------------------- */}
          <div data-slide="left" className="order-2 xl:order-1 xl:col-span-7">
            <div className="flex h-full flex-col border border-black bg-white">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-black px-4 py-3">
                <p className="kicker text-black">
                  Colombo <span className="px-1 text-black/35" aria-hidden="true">→</span> United States
                </p>
                <p className="kicker inline-flex items-center gap-2 text-black/55">
                  <span className="relative flex size-2" aria-hidden="true">
                    <span className="absolute inset-0 bg-[#ffe500] motion-safe:animate-ping" />
                    <span className="relative inline-flex size-2 bg-[#ffe500]" />
                  </span>
                  Live lanes
                </p>
              </div>

              <div className="flex flex-1 items-center px-3 py-5 sm:px-5">
                <TransitMap bare compact />
              </div>

              <ul className="grid grid-cols-1 border-t border-black/20 sm:grid-cols-3">
                {LEGEND.map((item, i) => (
                  <li
                    key={item.label}
                    className={`flex items-center gap-2.5 px-4 py-2.5 text-[10px] uppercase leading-tight tracking-[0.1em] text-black/55 ${
                      i < LEGEND.length - 1 ? "border-b border-black/15 sm:border-b-0 sm:border-r" : ""
                    }`}
                  >
                    {item.swatch}
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-3 max-w-[52ch] text-[11px] leading-[1.5] text-black/45">
              Port-to-warehouse transit estimates. Schedules and cut-offs are confirmed at booking.
            </p>
          </div>

          {/* ---------------------------------------------------------------
              Description column
          --------------------------------------------------------------- */}
          <div className="order-1 flex flex-col xl:order-2 xl:col-span-5">
            <div
              data-slide="right"
              className="flex items-center justify-between gap-4 border-t border-black pt-3"
            >
              <p className="kicker text-black">Lanes at a glance</p>
              <p className="kicker text-black/45 tabular-nums">04 lanes · weekly</p>
            </div>

            <ol data-stagger className="mt-4 border-t border-black/20">
              {FACTS.map((fact) => (
                <li key={fact.n}>
                  <Link
                    href={fact.href}
                    className="group grid grid-cols-[28px_1fr_auto] items-start gap-x-3 border-b border-black/20 py-4 transition-colors duration-300 hover:bg-[#ffe500]"
                  >
                    <span className="pt-0.5 text-[11px] tabular-nums text-black/40 transition-colors duration-300 group-hover:text-black/70">
                      {fact.n}
                    </span>
                    <span>
                      <span className="block text-[15px] font-medium leading-tight text-black">
                        {fact.title}
                      </span>
                      <span className="mt-1 block text-[12px] leading-[1.4] text-black/55 transition-colors duration-300 group-hover:text-black/70">
                        {fact.meta}
                      </span>
                    </span>
                    <Arrow />
                  </Link>
                </li>
              ))}
            </ol>

            <dl
              data-slide="up"
              data-slide-delay="0.12"
              className="mt-6 grid grid-cols-2 border-t border-black/20"
            >
              <div className="border-r border-black/20 pt-4">
                <dt className="kicker text-black/45">Fastest lane</dt>
                <dd className="mt-3 font-[family-name:var(--font-display)] text-[clamp(28px,2.6vw,38px)] font-semibold uppercase leading-none text-black">
                  26–32
                  <span className="ml-1.5 text-[0.4em] font-medium tracking-[0.04em]">days</span>
                </dd>
              </div>
              <div className="pt-4 pl-4">
                <dt className="kicker text-black/45">Sailings</dt>
                <dd className="mt-3 font-[family-name:var(--font-display)] text-[clamp(28px,2.6vw,38px)] font-semibold uppercase leading-none text-black">
                  Weekly
                </dd>
              </div>
            </dl>

            <div
              data-slide="up"
              data-slide-delay="0.18"
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between xl:mt-auto xl:pt-8"
            >
              <p className="kicker max-w-[22ch] text-black/45">
                Own warehouses in four US states
              </p>
              <Link
                href="/network"
                className="group inline-flex w-fit items-center gap-2 border border-black px-4 py-2.5 text-[11px] uppercase tracking-[0.1em] text-black transition-colors hover:border-[#ffe500] hover:bg-[#ffe500]"
              >
                Full network
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
