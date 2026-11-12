import Link from "next/link";

const STEPS = [
  {
    n: "01",
    stage: "Quote",
    title: "Tell us the shipment",
    body: "What you are shipping, where it is going, and when it needs to move.",
    href: "/quote",
  },
  {
    n: "02",
    stage: "Route",
    title: "Confirm route & service",
    body: "We confirm the lane, transit time, carrier and the service that fits the cargo.",
    href: "/network",
  },
  {
    n: "03",
    stage: "Booking",
    title: "Book space & documents",
    body: "Space is booked and every document — invoice, packing list, certificate of origin — is prepared.",
    href: "/track",
  },
  {
    n: "04",
    stage: "Colombo",
    title: "Collection in Colombo",
    body: "Cargo is collected, consolidated and loaded for the sailing.",
    href: "/ship",
  },
  {
    n: "05",
    stage: "US port",
    title: "Sail, clear & warehouse",
    body: "Our brokers clear customs at the US port and goods arrive at our own warehouse.",
    href: "/network",
  },
  {
    n: "06",
    stage: "Delivery",
    title: "Final-mile delivery",
    body: "Our own trucks carry the cargo the last mile — straight to the buyer's door.",
    href: "/ship",
  },
];

/** Swiss process index — a ruled modular grid from first message to final mile. */
export default function Timeline() {
  return (
    <section className="w-full bg-white text-black">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-[clamp(72px,9vw,120px)] lg:px-10">
        {/* Meta rule */}
        <div className="flex items-baseline justify-between gap-6 border-b border-black pb-4 text-[11px] uppercase tracking-[0.16em]">
          <span className="text-black">How it works</span>
          <span className="hidden text-black/50 sm:block">
            Colombo, LK &nbsp;→&nbsp; United States
          </span>
          <span className="tabular-nums text-black/50">06 steps</span>
        </div>

        {/* Title block */}
        <div className="mt-[clamp(32px,4vw,56px)] grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
          <h2 className="text-[clamp(40px,5.6vw,88px)] leading-[0.92] tracking-[-0.02em] text-black md:col-span-8">
            Six steps,
            <br />
            one team
          </h2>

          <div className="flex flex-col justify-end gap-6 md:col-span-4">
            <p className="max-w-[34ch] text-[15px] leading-[1.5] text-black/60">
              From the first message to the buyer&apos;s door — one team owns every
              handover between Colombo and the United States.
            </p>
            <Link
              href="/quote"
              className="kicker inline-flex w-fit items-center gap-2 border border-black px-4 py-2.5 text-black transition-colors hover:border-[#fffb96] hover:bg-[#fffb96]"
            >
              Start a quote <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        {/* Step grid */}
        <ol className="mt-[clamp(48px,6vw,88px)] grid grid-cols-1 border-l border-t border-black sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="border-b border-r border-black">
              <Link
                href={s.href}
                className="group flex h-full min-h-[280px] flex-col justify-between bg-white p-6 transition-colors duration-300 hover:bg-black lg:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-[family-name:var(--font-display)] text-[clamp(48px,4.6vw,72px)] font-semibold leading-[0.8] tracking-[-0.03em] tabular-nums text-black transition-colors duration-300 group-hover:text-[#fffb96]">
                    {s.n}
                  </span>
                  <span className="pt-1 text-[10px] uppercase tracking-[0.18em] text-black/40 transition-colors duration-300 group-hover:text-white/50">
                    {s.stage}
                  </span>
                </div>

                <div className="mt-12">
                  <h3 className="text-[clamp(18px,1.7vw,22px)] text-black transition-colors duration-300 group-hover:text-white">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-[36ch] text-[14px] leading-[1.5] text-black/60 transition-colors duration-300 group-hover:text-white/70">
                    {s.body}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-black/15 pt-4 transition-colors duration-300 group-hover:border-white/25">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-black/40 transition-colors duration-300 group-hover:text-white/50">
                    Step {s.n} / 06
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-5 w-5 text-black transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#fffb96]"
                  >
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
