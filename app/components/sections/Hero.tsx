"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

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
          { scale: 1.1, opacity: 0, force3D: true },
          {
            scale: 1,
            opacity: 1,
            duration: 1.4,
            ease: "power2.out",
            clearProps: "opacity,transform",
          },
          0
        )
          .fromTo(
            root.querySelector("[data-hero-title]"),
            { opacity: 0, y: 40, force3D: true, willChange: "transform, opacity" },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              clearProps: "opacity,transform,will-change",
            },
            0.35
          )
          .fromTo(
            root.querySelector("[data-hero-desc]"),
            { opacity: 0, y: 24, force3D: true, willChange: "transform, opacity" },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              clearProps: "opacity,transform,will-change",
            },
            0.55
          )
          .fromTo(
            root.querySelector("[data-hero-actions]"),
            { opacity: 0, y: 24, scale: 0.98, force3D: true, willChange: "transform, opacity" },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              clearProps: "opacity,transform,will-change",
            },
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
    <section
      ref={heroRef}
      data-hero-section
      className="relative w-full overflow-hidden bg-[#000000]"
    >
      <div className="relative mx-auto w-full max-w-[1728px] md:aspect-[1728/1117]">
        {/* Background artwork */}
        <div data-hero-bg className="absolute inset-0 overflow-hidden will-change-transform">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figma/img/hero.jpg"
            alt="Container port at sunset"
            className="hero-photo absolute left-1/2 top-1/2 object-cover grayscale"
            style={{
              width: "64.68%",
              height: "154.7%",
              transform: "translate(-50%, -50%) rotate(-90deg)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[#000000]/15" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[18%] bg-gradient-to-l from-[#000000]/25 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[16%] bg-gradient-to-t from-[#ffffff] via-[#ffffff]/40 to-transparent md:block" />
          {/* Dynamic transition veil connecting hero dark void into what-we-do bone canvas */}
          <div
            data-hero-fade
            className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[28%] bg-gradient-to-t from-[#ffffff] via-[#ffffff]/70 to-transparent opacity-0 will-change-[opacity] md:block"
          />
        </div>

        {/* Hero content — smaller and centered in the frame */}
        <div
          data-hero-content
          className="relative z-10 flex min-h-[640px] w-full flex-col items-center justify-center px-6 pb-20 pt-32 text-center will-change-transform md:absolute md:inset-0 md:min-h-0 md:px-10 md:pb-[13%] md:pt-[60px]"
        >
          <h1
            data-hero-title
            className="whitespace-nowrap text-[clamp(32px,7vw,112px)] text-white"
          >
            Sri Lanka to the US.
            <br />
            Door to door.
          </h1>

          <p
            data-hero-desc
            className="mt-6 max-w-[52ch] text-[clamp(13px,1.05vw,16px)] leading-[1.45] text-white/85"
          >
            Direct from Colombo to our own warehouses in Los Angeles, Houston,
            New York and West Virginia — then to your door on our own fleet.
          </p>

          <div
            data-hero-actions
            className="mt-10 flex w-full max-w-[540px] flex-col items-stretch gap-3 sm:flex-row sm:items-center"
          >
            <form
              className="flex h-[56px] w-full items-center border border-white/35 bg-[#000000]/40 pl-6 pr-1.5 transition-colors focus-within:border-white sm:flex-1"
              action="/track"
              id="track"
            >
              <input
                type="text"
                name="ref"
                aria-label="Tracking number"
                placeholder="B/L or container number"
                className="min-w-0 flex-1 bg-transparent text-[15px] text-white placeholder:text-white/65 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Track shipment"
                className="flex size-11 shrink-0 items-center justify-center bg-[#ffe500] transition-transform hover:scale-[1.05]"
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
              href="/quote"
              className="flex h-[56px] w-full shrink-0 items-center justify-center bg-[#ffe500] px-8 text-[16px] font-medium text-black transition-transform hover:scale-[1.03] sm:w-auto"
            >
              Get a quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
