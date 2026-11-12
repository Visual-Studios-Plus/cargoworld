"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Hero — "the port assembles".
 *
 * Intro:  the full-bleed port photo fades up (no movement), then the headline
 *         flips up word by word, followed by description, tracking and quote.
 * Idle:   the photo holds still; the quote button is magnetic.
 * Scroll: the hero is sticky; its copy staggers away line by line while the
 *         next section rises over it as a rounded panel that squares off, led
 *         by a corrugated blue band.
 */

function Copy() {
  return (
    <div
      data-hero-copy
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center md:px-10"
    >
      <h1 data-hero-title className="whitespace-nowrap text-[clamp(32px,7vw,112px)] text-white">
        Sri Lanka to the US.
        <br />
        Door to door.
      </h1>

      <p
        data-hero-desc
        className="mt-6 max-w-[52ch] text-[clamp(13px,1.05vw,16px)] leading-[1.45] text-white/85"
      >
        Direct from Colombo to our own warehouses in Los Angeles, Houston, New York and West
        Virginia — then to your door on our own fleet.
      </p>

      <div
        data-hero-actions
        className="mt-10 flex w-full max-w-[540px] flex-col items-stretch gap-3 sm:flex-row sm:items-center"
      >
        <form
          className="flex h-[56px] w-full items-center border border-white/35 bg-[#000000]/50 pl-6 pr-1.5 transition-colors focus-within:border-white sm:flex-1"
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
            <Image src="/figma/svg/search.svg" alt="" width={30} height={30} className="size-[47%]" />
          </button>
        </form>

        <a
          data-magnetic
          href="/quote"
          className="flex h-[56px] w-full shrink-0 items-center justify-center bg-[#ffe500] px-8 text-[16px] font-medium text-[#000000] transition-transform hover:scale-[1.03] sm:w-auto"
        >
          Get a quote
        </a>
      </div>
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = heroRef.current;
    if (!root) return;

    let disposed = false;
    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined;
    const cleanups: Array<() => void> = [];
    const ready = () => root.classList.add("is-ready");
    const open = () => root.classList.add("is-open");
    const failSafe = window.setTimeout(() => {
      ready();
      open();
    }, 4000);

    (async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        const { SplitText } = await import("gsap/SplitText");
        gsap.registerPlugin(ScrollTrigger, SplitText);

        if (document.fonts?.ready) {
          try {
            await document.fonts.ready;
          } catch {
            /* ignore */
          }
        }
        if (disposed) return;
        window.clearTimeout(failSafe);

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          ready();
          open();
          return;
        }

        ctx = gsap.context(() => {
          const q = gsap.utils.selector(root);
          const photo = q("[data-hero-photo]");
          const desc = q("[data-hero-desc]");
          const actions = q("[data-hero-actions] > *");

          const split = SplitText.create(q("[data-hero-title]")[0], {
            type: "lines,words",
            mask: "lines",
          });

          gsap.set(photo, { autoAlpha: 0 });
          gsap.set(split.words, {
            yPercent: 100,
            rotationX: -90,
            transformOrigin: "50% 100% -40px",
            transformPerspective: 800,
          });
          gsap.set(desc, { autoAlpha: 0, y: 24 });
          gsap.set(actions, { autoAlpha: 0, y: 40 });
          ready();

          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

          // 1 — the photo fades up in place
          tl.to(photo, { autoAlpha: 1, duration: 1.2, ease: "power2.out" }, 0.1)
            .add(open, 1.2)
            // 2 — only after the image settles does the headline flip up
            .to(split.words, { yPercent: 0, rotationX: 0, duration: 1.2, stagger: 0.07 }, 1.7)
            .to(desc, { autoAlpha: 1, y: 0, duration: 1 }, 2.3)
            .to(actions, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, clearProps: "transform" }, 2.45);
          // Scrolling before the intro ends lands it instantly.
          const onEarlyScroll = () => {
            if (window.scrollY > 40 && tl.progress() < 1) tl.progress(1);
          };
          window.addEventListener("scroll", onEarlyScroll, { passive: true });
          cleanups.push(() => window.removeEventListener("scroll", onEarlyScroll));

          // Idle — the photo stays still; only the quote button responds.
          if (window.matchMedia("(pointer: fine)").matches) {
            // magnetic CTA
            (q("[data-magnetic]") as HTMLElement[]).forEach((el) => {
              const mx = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
              const my = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
              const move = (e: PointerEvent) => {
                const r = el.getBoundingClientRect();
                mx((e.clientX - r.left - r.width / 2) * 0.35);
                my((e.clientY - r.top - r.height / 2) * 0.35);
              };
              const leave = () => {
                mx(0);
                my(0);
              };
              el.addEventListener("pointermove", move);
              el.addEventListener("pointerleave", leave);
              cleanups.push(() => {
                el.removeEventListener("pointermove", move);
                el.removeEventListener("pointerleave", leave);
              });
            });
          }

          // Scroll — hero staggers out, the next section rises over it.
          const next = document.querySelector<HTMLElement>("[data-hero-next]");
          if (next) {
            gsap
              .timeline({
                defaults: { ease: "none", immediateRender: false },
                scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: 0.6 },
              })
              .fromTo(q("[data-hero-dim]"), { opacity: 0 }, { opacity: 0.7 }, 0)
              .fromTo(
                split.lines,
                { yPercent: 0, autoAlpha: 1 },
                { yPercent: -80, autoAlpha: 0, stagger: 0.08, duration: 0.5 },
                0
              )
              .fromTo(desc, { y: 0, autoAlpha: 1 }, { y: -60, autoAlpha: 0, duration: 0.45 }, 0.12)
              .fromTo(q("[data-hero-actions]"), { y: 0, autoAlpha: 1 }, { y: -60, autoAlpha: 0, duration: 0.45 }, 0.2);

            gsap.fromTo(
              next,
              { clipPath: "inset(0% 5% 0% 5% round 40px 40px 0 0)" },
              {
                clipPath: "inset(0% 0% 0% 0% round 0px 0px 0 0)",
                ease: "none",
                scrollTrigger: { trigger: next, start: "top bottom", end: "top 15%", scrub: 0.6 },
              }
            );

            const band = next.querySelector("[data-hero-band]");
            const ribs = next.querySelectorAll("[data-hero-band] > span");
            if (band) {
              gsap
                .timeline({ scrollTrigger: { trigger: next, start: "top 90%", end: "top 20%", scrub: 0.6 } })
                .fromTo(band, { scaleX: 0.15 }, { scaleX: 1, ease: "power2.out" }, 0)
                .fromTo(
                  ribs,
                  { scaleY: 0 },
                  { scaleY: 1, stagger: { each: 0.02, from: "center" }, ease: "power2.out" },
                  0
                );
            }
          }
        }, root);
      } catch {
        ready();
        open();
      }
    })();

    return () => {
      disposed = true;
      window.clearTimeout(failSafe);
      cleanups.forEach((fn) => fn());
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      data-hero-section
      className="hero-swiss sticky top-0 z-0 w-full overflow-hidden bg-[#000000]"
    >
      <div data-hero-stage className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        {/* Full-bleed port photo */}
        <div data-hero-frame className="absolute inset-0 overflow-hidden bg-[#000000]">
          <div data-hero-photo className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/img/hero-landscape.jpg"
              alt="Container port at sunset"
              className="hero-photo absolute inset-0 h-full w-full object-cover grayscale"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[#000000]/40" />
          <div data-hero-dim className="pointer-events-none absolute inset-0 bg-[#000000] opacity-0" />

          <Copy />
        </div>
      </div>
    </section>
  );
}
