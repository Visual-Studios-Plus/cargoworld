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
  const [pastHero, setPastHero] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // On the home hero the header is transparent with white branding; once the
  // hero scrolls past it turns into the glass header. Sub-pages always glass.
  useEffect(() => {
    if (pathname !== "/") return;

    const update = () => {
      const hero = document.querySelector<HTMLElement>("[data-hero-section]");
      setPastHero(
        hero ? hero.getBoundingClientRect().bottom <= 72 : window.scrollY > 60
      );
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  const showGlass = pathname !== "/" || pastHero;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[1000] border-b transition-[background-color,border-color] duration-300 ${
        showGlass ? "border-black/[0.08]" : "border-transparent"
      }`}
      style={{
        background: showGlass ? "rgba(255, 255, 255, 0.85)" : "transparent",
        backdropFilter: showGlass ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: showGlass
          ? "blur(20px) saturate(180%)"
          : "none",
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
            className={`h-[38px] w-[92px] object-contain transition-[filter] duration-300 ${
              showGlass
                ? "[filter:brightness(0)]"
                : "[filter:brightness(0)_invert(1)]"
            }`}
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
                className={`group relative font-cal text-[16px] leading-none transition-colors duration-300 ${
                  showGlass ? "text-black" : "text-white"
                }`}
                style={{ letterSpacing: "-0.01em" }}
              >
                <span className="transition-opacity duration-200 group-hover:opacity-60">
                  {label}
                </span>
                <span
                  className={`absolute -bottom-2 left-0 h-[2px] rounded-full transition-all duration-[350ms] ${
                    showGlass ? "bg-black" : "bg-white"
                  }`}
                  style={{
                    width: active ? "100%" : "0%",
                    transitionTimingFunction: SPRING,
                  }}
                />
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-2 left-0 h-[2px] w-0 rounded-full transition-all duration-[350ms] group-hover:w-full ${
                    showGlass ? "bg-black/40" : "bg-white/50"
                  }`}
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
            className={`hidden items-center rounded-tl-[20px] rounded-br-[20px] px-6 py-3 font-cal text-[17px] leading-none will-change-transform hover:scale-[1.04] sm:inline-flex ${
              showGlass ? "bg-black text-white" : "bg-[#fffb96] text-black"
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
            className={`flex size-10 items-center justify-center rounded-[8px] transition-colors lg:hidden ${
              showGlass
                ? "text-black hover:bg-black/5"
                : "text-white hover:bg-white/10"
            }`}
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
          className={`border-t px-6 py-4 lg:hidden ${
            showGlass ? "border-black/[0.08]" : "border-white/15"
          }`}
          style={{
            background: showGlass ? "rgba(255, 255, 255, 0.92)" : "rgba(0, 0, 0, 0.72)",
            backdropFilter: showGlass ? "blur(20px) saturate(180%)" : "none",
            WebkitBackdropFilter: showGlass ? "blur(20px) saturate(180%)" : "none",
          }}
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block rounded-[8px] px-3 py-2.5 font-cal text-[17px] transition-colors ${
                      showGlass
                        ? `hover:bg-black/5 ${active ? "text-black underline decoration-2 underline-offset-4" : "text-black/80"}`
                        : `hover:bg-white/10 ${active ? "text-white underline decoration-2 underline-offset-4" : "text-white/80"}`
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
                className={`block rounded-tl-[20px] rounded-br-[20px] px-4 py-3 text-center font-cal text-[16px] ${
                  showGlass
                    ? "bg-black text-white"
                    : "bg-[#fffb96] text-black"
                }`}
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
