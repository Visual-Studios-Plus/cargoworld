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

// Apple-style spring (overshoot) easing — response ~0.35s
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Yellow CTA while over the home hero; black once scrolled or on any sub-page.
  const heroCta = pathname === "/" && !scrolled;

  return (
    <header
      className="fixed inset-x-0 top-0 z-[1000] border-b border-black/[0.08]"
      style={{
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
      }}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-[1280px] items-center justify-between px-6 lg:px-10">
        {/* Columns 1–2: black brand logo */}
        <Link href="/" aria-label="Cargo World Wide — home" className="shrink-0">
          <Image
            src="/figma/img/logo.png"
            alt="Cargo World Wide"
            width={97}
            height={40}
            priority
            className="h-[38px] w-[92px] object-contain [filter:brightness(0)]"
          />
        </Link>

        {/* Columns 4–7: navigation links */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[34px] lg:flex">
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="group relative font-cal text-[16px] leading-none text-black"
                style={{ letterSpacing: "-0.01em" }}
              >
                <span className="transition-opacity duration-200 group-hover:opacity-60">
                  {label}
                </span>
                <span
                  className="absolute -bottom-2 left-0 h-[2px] rounded-full bg-black transition-all duration-[350ms]"
                  style={{
                    width: active ? "100%" : "0%",
                    transitionTimingFunction: SPRING,
                  }}
                />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 h-[2px] w-0 rounded-full bg-black/40 transition-all duration-[350ms] group-hover:w-full"
                  style={{ transitionTimingFunction: SPRING }}
                />
              </Link>
            );
          })}
        </nav>

        {/* Column 8: primary action */}
        <div className="flex items-center gap-3">
          <Link
            href="/quote"
            className={`hidden px-5 py-2.5 font-cal text-[15px] leading-none will-change-transform hover:scale-[1.04] sm:inline-block ${
              heroCta
                ? "rounded-tl-[16px] rounded-br-[16px] bg-[#fffb96] text-black"
                : "rounded-[8px] bg-black text-white"
            }`}
            style={{ transition: `transform 350ms ${SPRING}, background-color 300ms ease, color 300ms ease` }}
          >
            Get a quote
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-[8px] text-black transition-colors hover:bg-black/5 lg:hidden"
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
        <nav
          className="border-t border-black/[0.08] px-6 py-4 lg:hidden"
          style={{
            background: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
          }}
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block rounded-[8px] px-3 py-2.5 font-cal text-[17px] transition-colors hover:bg-black/5 ${
                      active ? "text-black underline decoration-2 underline-offset-4" : "text-black/80"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-2">
              <Link
                href="/quote"
                className="block rounded-[8px] bg-black px-4 py-3 text-center font-cal text-[16px] text-white"
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
