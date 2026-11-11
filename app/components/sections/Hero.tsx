"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const NAV_LINKS = ["ship", "Track", "Network", "Industries", "about"];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = heroRef.current;
    if (!root) return;

    let disposed = false;
    let mm: ReturnType<typeof import("gsap").gsap.matchMedia> | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (disposed) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      mm = gsap.matchMedia();

      mm.add("(min-width: 0px)", () => {
        // Entrance animation: crisp, architectural vault entrance
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          root.querySelector("[data-hero-bg]"),
          { scale: 1.1, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.4, ease: "power2.out" },
          0
        )
          .fromTo(
            root.querySelector("[data-hero-nav]"),
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.9 },
            0.2
          )
          .fromTo(
            root.querySelector("[data-hero-title]"),
            { opacity: 0, y: 40, letterSpacing: "-0.05em" },
            { opacity: 1, y: 0, letterSpacing: "-0.02em", duration: 1.1 },
            0.35
          )
          .fromTo(
            root.querySelector("[data-hero-desc]"),
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.9 },
            0.55
          )
          .fromTo(
            root.querySelector("[data-hero-actions]"),
            { opacity: 0, y: 24, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8 },
            0.7
          );

        // Transition between Hero and "What We Do":
        // Subtly parallax the hero background and content upwards while fading into the white canvas
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        scrollTl
          .to(root.querySelector("[data-hero-bg]"), { yPercent: 18, ease: "none" }, 0)
          .to(
            root.querySelector("[data-hero-content]"),
            { y: -60, opacity: 0.35, ease: "power1.in" },
            0
          )
          .to(
            root.querySelector("[data-hero-fade]"),
            { opacity: 1, ease: "power2.in" },
            0
          );
      });
    })();

    return () => {
      disposed = true;
      mm?.revert();
    };
  }, []);

  return (
    <section ref={heroRef} className="relative w-full overflow-hidden bg-black">
      <div className="relative mx-auto w-full max-w-[1728px] md:aspect-[1728/1117]">
        {/* Background artwork */}
        <div data-hero-bg className="absolute inset-0 overflow-hidden will-change-transform">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figma/img/hero.jpg"
            alt="Container port at sunset"
            className="absolute left-1/2 top-1/2 object-cover"
            style={{
              width: "64.68%",
              height: "154.7%",
              transform: "translate(-50%, -50%) rotate(-90deg)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-black/15" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[18%] bg-gradient-to-l from-black/25 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[16%] bg-gradient-to-t from-white via-white/40 to-transparent" />
          {/* Dynamic transition veil connecting hero dark void into what-we-do bone canvas */}
          <div
            data-hero-fade
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-white via-white/70 to-transparent opacity-0 will-change-[opacity]"
          />
        </div>

        {/* Nav */}
        <header
          data-hero-nav
          className="absolute inset-x-0 top-0 z-20 flex h-[45px] items-center justify-between px-[3.53%]"
          style={{ top: "1.52%" }}
        >
          <Image
            src="/figma/img/logo.png"
            alt="Cargo World Wide"
            width={97}
            height={40}
            priority
            className="h-[40px] w-[97px] object-contain"
          />

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[30px] lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="font-cal text-[16px] leading-none text-white transition-opacity hover:opacity-70"
              >
                {link}
              </a>
            ))}
          </nav>

          <a
            href="#quote"
            className="rounded-tl-[20px] rounded-br-[20px] bg-[#fffb96] px-5 py-2.5 font-cal text-[16px] leading-none text-black transition-transform hover:scale-[1.03]"
          >
            Get a quote
          </a>
        </header>

        {/* Hero content — smaller and centered in the frame */}
        <div
          data-hero-content
          className="relative z-10 flex min-h-[620px] w-full flex-col items-center justify-center px-6 pb-16 pt-28 text-center will-change-transform md:absolute md:inset-0 md:min-h-0 md:-translate-y-[6.5%] md:p-0"
        >
          <h1
            data-hero-title
            className="font-syne text-[clamp(40px,6.6vw,112px)] font-bold leading-[0.8] tracking-[-0.02em] text-white"
          >
            Sri lanka to US,
            <br />
            door to door
          </h1>

          <p
            data-hero-desc
            className="mt-5 max-w-[640px] font-dm text-[clamp(11px,0.81vw,14px)] font-bold leading-[1.45] text-[#fff8cf]"
          >
            Seamless door-to-door delivery: shipping directly from Colombo to our
            US warehouses in Los Angeles, Houston, New York, and West Virginia,
            and straight to your door with our own fleet.
          </p>

          <div
            data-hero-actions
            className="mt-[clamp(28px,3.4vw,58px)] flex w-full max-w-[478px] items-center gap-2"
          >
            <form
              className="flex h-[clamp(52px,4.05vw,70px)] flex-1 items-center rounded-tl-[20px] rounded-br-[20px] bg-white/10 pl-6 pr-2 backdrop-blur-md"
              action="#"
              id="track"
            >
              <input
                type="text"
                aria-label="Tracking number"
                placeholder="Enter the tracking number"
                className="min-w-0 flex-1 bg-transparent font-dm text-[clamp(11px,0.75vw,13px)] font-bold text-white placeholder:text-white/90 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className="flex size-[clamp(42px,3.35vw,58px)] shrink-0 items-center justify-center rounded-tl-[10px] rounded-br-[10px] bg-[#fffb96] transition-transform hover:scale-[1.05]"
              >
                <Image
                  src="/figma/svg/search.svg"
                  alt=""
                  width={30}
                  height={30}
                  className="size-[47%]"
                />
              </button>
            </form>

            <a
              href="#quote"
              className="flex h-[clamp(52px,4.05vw,70px)] shrink-0 items-center justify-center rounded-tl-[20px] rounded-br-[20px] bg-[#fffb96] px-[clamp(18px,1.7vw,30px)] font-cal text-[clamp(15px,1.25vw,21px)] text-black transition-transform hover:scale-[1.03]"
            >
              Get a quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
