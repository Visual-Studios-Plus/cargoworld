"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const NAV_LINKS = [
  { label: "Ship", href: "/quote" },
  { label: "Network", href: "/network" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isHome) return;
    const hero = document.querySelector("[data-hero-section]");
    if (!hero) return;
    // The hero is sticky, so track the section that slides over it instead.
    const cover = document.querySelector("[data-hero-next]");

    const update = () => {
      const covered = cover ? cover.getBoundingClientRect().top <= 60 : hero.getBoundingClientRect().bottom <= 60;
      // While the intro plays on white, the nav needs its solid (dark-on-white) look.
      const next = covered || !hero.classList.contains("is-open");
      setScrolledPastHero((prev) => (prev === next ? prev : next));
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    const raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const mo = new MutationObserver(onScroll);
    mo.observe(hero, { attributes: true, attributeFilter: ["class"] });

    return () => {
      mo.disconnect();
      cancelAnimationFrame(raf);
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  const onHero = isHome && !scrolledPastHero;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[1000] border-b transition-colors duration-300 ${
        onHero ? "border-transparent bg-transparent" : "border-[#d8d8d8] bg-white"
      }`}
    >
      <div className="mx-auto flex h-[60px] w-full max-w-[1280px] items-center justify-between gap-4 px-6 lg:px-10">
        {/* Logo plate — inverts to black on the white bar, stays white over the hero */}
        <Link href="/" aria-label="Cargo World Wide — home" className="shrink-0">
          <span className="relative flex items-center">
            <Image
              src="/figma/img/logo.png"
              alt="Cargo World Wide"
              width={97}
              height={40}
              priority
              className={`h-[26px] w-auto object-contain transition-opacity duration-300 ${onHero ? "" : "opacity-0"}`}
            />
            {/* Brand-blue version: the logo used as a mask over a blue fill */}
            <span
              aria-hidden="true"
              className={`absolute inset-0 bg-[#1e3a8a] transition-opacity duration-300 ${onHero ? "opacity-0" : ""}`}
              style={{
                WebkitMaskImage: "url(/figma/img/logo.png)",
                maskImage: "url(/figma/img/logo.png)",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "left center",
                maskPosition: "left center",
              }}
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
                className={`px-1.5 py-1 text-[11px] font-medium uppercase tracking-[0.1em] transition-colors ${
                  active
                    ? onHero
                      ? "text-white underline decoration-white decoration-1 underline-offset-[6px]"
                      : "text-[#1e3a8a] underline decoration-[#1e3a8a] decoration-1 underline-offset-[6px] hover:bg-[#ffe500]"
                    : onHero
                      ? "text-white hover:text-white/70"
                      : "text-[#1e3a8a] hover:bg-[#ffe500]"
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
            className={`hidden border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.1em] transition-colors sm:inline-block ${
              onHero
                ? "border-white text-white hover:bg-white/10"
                : "border-[#1e3a8a] bg-white text-[#1e3a8a] hover:border-[#ffe500] hover:bg-[#ffe500]"
            }`}
          >
            Track
          </Link>
          <Link
            href="/quote"
            className="hidden bg-[#ffe500] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.1em] text-black transition-transform hover:scale-[1.03] sm:inline-block"
          >
            Get a quote
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`flex size-9 items-center justify-center border transition-colors lg:hidden ${
              onHero
                ? "border-white text-white hover:bg-white/10"
                : "border-[#1e3a8a] text-[#1e3a8a] hover:border-[#ffe500] hover:bg-[#ffe500]"
            }`}
          >
            {/* Three bars that morph into an X */}
            <span aria-hidden="true" className="relative block h-[14px] w-[18px]">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="absolute left-0 h-[1.8px] w-full rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(.65,0,.35,1)]"
                  style={{
                    top: open ? "6px" : `${i * 6}px`,
                    transform: open ? (i === 0 ? "rotate(45deg)" : i === 2 ? "rotate(-45deg)" : "scaleX(0)") : "none",
                    opacity: open && i === 1 ? 0 : 1,
                    transitionDelay: open ? (i === 1 ? "0ms" : "80ms") : "0ms",
                  }}
                />
              ))}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu: unfolds downward, links slide in one after another */}
      <nav
        aria-hidden={!open}
        inert={!open}
        className={`grid transition-[grid-template-rows,background-color] duration-500 ease-[cubic-bezier(.32,.72,0,1)] lg:hidden ${
          open ? "grid-rows-[1fr] border-t border-[#d8d8d8] bg-white" : "grid-rows-[0fr] bg-transparent"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col divide-y divide-[#d8d8d8] px-6 py-4">
            {[{ label: "Track", href: "/track" }, ...NAV_LINKS].map(({ label, href }, i, all) => (
              <li
                key={href}
                className="transition-all duration-500 ease-[cubic-bezier(.32,.72,0,1)]"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(-12px)",
                  transitionDelay: open ? `${120 + i * 50}ms` : `${(all.length - i) * 25}ms`,
                }}
              >
                <Link
                  href={href}
                  className="block py-3 text-[13px] font-medium uppercase tracking-[0.1em] text-black"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li
              className="pt-4 transition-all duration-500 ease-[cubic-bezier(.32,.72,0,1)]"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(-12px)",
                transitionDelay: open ? `${120 + (NAV_LINKS.length + 1) * 50}ms` : "0ms",
              }}
            >
              <Link
                href="/quote"
                className="block bg-[#ffe500] px-4 py-3 text-center text-[12px] font-medium uppercase tracking-[0.1em] text-black"
              >
                Get a quote
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
