"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const NAV_LINKS = [
  { label: "Ship", href: "/ship" },
  { label: "Track", href: "/track" },
  { label: "Network", href: "/network" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-white/10 bg-[#0a1f33]/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-[1160px] items-center justify-between px-6">
        <Link href="/" aria-label="Cargo World Wide — home" className="shrink-0">
          <Image
            src="/figma/img/logo.png"
            alt="Cargo World Wide"
            width={97}
            height={40}
            priority
            className="h-[40px] w-[97px] object-contain"
          />
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[30px] lg:flex">
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`font-cal text-[16px] leading-none transition-opacity hover:opacity-70 ${
                  active ? "text-[#fffb96]" : "text-white"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/quote"
            className="hidden rounded-tl-[20px] rounded-br-[20px] bg-[#fffb96] px-5 py-2.5 font-cal text-[16px] leading-none text-black transition-transform hover:scale-[1.03] sm:inline-block"
          >
            Get a quote
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
              className="h-6 w-6"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-[#0a1f33] px-6 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block rounded-lg px-3 py-2.5 font-cal text-[17px] text-white transition-colors hover:bg-white/10"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                href="/quote"
                className="block rounded-tl-[16px] rounded-br-[16px] bg-[#fffb96] px-4 py-3 text-center font-cal text-[16px] text-black"
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
