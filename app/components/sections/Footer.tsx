import Image from "next/image";
import Link from "next/link";

const COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "Ocean Freight", href: "/ship" },
      { label: "Air Freight", href: "/ship" },
      { label: "Customs Brokerage", href: "/ship" },
      { label: "Warehousing", href: "/ship" },
      { label: "Transportation", href: "/ship" },
      { label: "4PL & Project Cargo", href: "/ship" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Network", href: "/network" },
      { label: "Industries", href: "/industries" },
      { label: "Careers", href: "https://www.cargoworldwideincsl.com/careers/" },
    ],
  },
  {
    title: "Customers",
    links: [
      { label: "Get a quote", href: "/quote" },
      { label: "Track a shipment", href: "/track" },
      { label: "Contact", href: "https://www.cargoworldwideincsl.com/contact-us/" },
    ],
  },
];

/** Paper-white footer with a hairline rule — Custo's quiet close. */
export default function Footer() {
  return (
    <footer className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1280px] px-6 pt-[clamp(56px,7vw,96px)] lg:px-10">
        {/* 12-column grid: address + three link columns, each a quarter on desktop */}
        <div data-stagger className="grid grid-cols-1 gap-y-12 md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-12 lg:col-span-3">
            <span className="inline-flex">
              <Image
                src="/figma/img/logo.png"
                alt="Cargo World Wide"
                width={97}
                height={40}
                className="h-[28px] w-auto object-contain invert"
              />
            </span>
            <address className="mt-8 space-y-1 text-[15px] not-italic leading-[1.43] text-black">
              <p>Level 17, &quot;Parkland&quot;</p>
              <p>33 Park Street, Colombo 2, Sri Lanka</p>
            </address>
            <div className="mt-4 space-y-1 text-[15px] leading-[1.43]">
              <a href="tel:+94112307748" className="block text-black hover:underline">
                +94 112 307 748
              </a>
              <a
                href="mailto:info.sl@cargoworldwideinc.com"
                className="block break-all text-black hover:underline"
              >
                info.sl@cargoworldwideinc.com
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="md:col-span-4 lg:col-span-3">
              <p className="kicker text-black/55">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[15px] leading-[1.43] text-black transition-opacity hover:opacity-60"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-14 grid grid-cols-1 gap-y-2 py-6 text-[14px] text-black/60 md:grid-cols-12 md:gap-x-6">
          <p className="md:col-span-12 lg:col-span-3">© 2026 Cargo Worldwide Sri Lanka. All rights reserved.</p>
          <p className="md:col-span-12 lg:col-span-9">Colombo · Los Angeles · Houston · Mississauga · Chennai · Tuticorin</p>
        </div>
      </div>
    </footer>
  );
}
