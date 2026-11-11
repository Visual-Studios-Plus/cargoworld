"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const NAV_LINKS = [
  { label: "Ship", href: "/ship" },
  { label: "Network", href: "/network" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-[1000] border-b border-[#d8d8d8] bg-white">
      <div className="mx-auto flex h-[60px] w-full max-w-[1440px] items-center justify-between gap-4 px-6 lg:px-10">
        {/* Logo plate — the only inverted surface in the header */}
        <Link href="/" aria-label="Cargo World Wide — home" className="shrink-0">
          <span className="flex items-center rounded-2xl bg-black px-3 py-2">
            <Image
              src="/figma/img/logo.png"
              alt="Cargo World Wide"
              width={97}
              height={40}
              priority
              className="h-[26px] w-auto object-contain"
            />
          </span>
        </Link>

        {/* Center nav links — uppercase, machine-stamped tracking */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex">
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`text-[11px] font-medium uppercase tracking-[0.1em] transition-colors ${
                  active
                    ? "text-black underline decoration-black decoration-1 underline-offset-[6px]"
                    : "text-[#8e9194] hover:text-black"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right utilities: mandatory TRACK + GET A QUOTE */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/track"
            className="hidden rounded-full border border-black bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.1em] text-black transition-colors hover:bg-[#f1f1f1] sm:inline-block"
          >
            Track
          </Link>
          <Link
            href="/quote"
            className="hidden rounded-full bg-[#fffb96] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.1em] text-black transition-transform hover:scale-[1.03] sm:inline-block"
          >
            Get a quote
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-9 items-center justify-center rounded-full border border-black text-black transition-colors hover:bg-[#f1f1f1] lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
              className="h-5 w-5"
            >
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[#d8d8d8] bg-white px-6 py-4 lg:hidden">
          <ul className="flex flex-col divide-y divide-[#d8d8d8]">
            {[{ label: "Track", href: "/track" }, ...NAV_LINKS].map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block py-3 text-[13px] font-medium uppercase tracking-[0.1em] text-black"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Link
                href="/quote"
                className="block rounded-full bg-[#fffb96] px-4 py-3 text-center text-[12px] font-medium uppercase tracking-[0.1em] text-black"
              >
                Get a quote
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
