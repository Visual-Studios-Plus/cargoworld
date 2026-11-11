import Link from "next/link";

const STEPS = [
  {
    n: "01",
    title: "Tell us the shipment",
    body: "What you are shipping, where it is going, and when it needs to move.",
    href: "/quote",
  },
  {
    n: "02",
    title: "Confirm route & service",
    body: "We confirm the lane, transit time, carrier and the service that fits the cargo.",
    href: "/network",
  },
  {
    n: "03",
    title: "Book space & documents",
    body: "Space is booked and every document — invoice, packing list, certificate of origin — is prepared.",
    href: "/track",
  },
  {
    n: "04",
    title: "Collection in Colombo",
    body: "Cargo is collected, consolidated and loaded for the sailing.",
    href: "/ship",
  },
  {
    n: "05",
    title: "Sail, clear & warehouse",
    body: "Our brokers clear customs at the US port and goods arrive at our own warehouse.",
    href: "/network",
  },
  {
    n: "06",
    title: "Final-mile delivery",
    body: "Our own trucks carry the cargo the last mile — straight to the buyer's door.",
    href: "/ship",
  },
];

/** Solid graphite band with numbered, hairline-ruled rows — the Swiss "index" block. */
export default function Timeline() {
  return (
    <section className="w-full bg-[#4b514d] text-white">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-[clamp(72px,9vw,110px)] lg:px-10">
        <div className="flex items-start justify-between gap-6">
          <p className="kicker max-w-[22ch] text-white/80">How it works</p>
          <Link
            href="/quote"
            className="kicker rounded-full border border-white/60 px-3 py-1.5 text-white transition-colors hover:border-[#fffb96] hover:bg-[#fffb96] hover:text-black"
          >
            Start a quote ↗
          </Link>
        </div>

        <h2 className="mt-[clamp(48px,7vw,96px)] text-[clamp(44px,6vw,88px)] text-white md:ml-[calc(280px+40px)]">
          Six steps, one team
        </h2>

        <div className="mt-[clamp(40px,5vw,64px)] border-t border-white/30">
          {STEPS.map((s) => (
            <Link
              key={s.n}
              href={s.href}
              className="group grid grid-cols-[48px_1fr_24px] items-start gap-4 border-b border-white/30 py-6 transition-colors hover:bg-white/5 md:grid-cols-[280px_1fr_24px] md:gap-10 md:py-7"
            >
              <span className="pl-0 text-[15px] tabular-nums text-white/80 md:pl-4">{s.n}</span>
              <div>
                <h3 className="text-[clamp(18px,1.8vw,24px)] text-white">{s.title}</h3>
                <p className="mt-2 max-w-[60ch] text-[15px] leading-[1.5] text-white/75">
                  {s.body}
                </p>
              </div>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="mt-1 h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
