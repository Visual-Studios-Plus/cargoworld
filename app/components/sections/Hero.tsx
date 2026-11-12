"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Hero — "type first, then the window opens".
 *
 * Two identical copy layers are stacked: an ink-on-white one, and a
 * white-on-photo one that lives inside the clipped frame. As the frame's
 * clip-path grows from a small window to full bleed, the headline inverts
 * exactly along the window's edge.
 *
 * Intro:  headline rises on white → a window opens behind it → the window
 *         expands to full bleed → description, tracking field and quote
 *         button arrive and stay.
 * Scroll: the hero is sticky; the rest of the page slides over it while the
 *         photo dims and pushes in.
 */

function Copy({ ghost = false }: { ghost?: boolean }) {
  return (
    <div
      {...(ghost ? { "data-hero-ghost": "", "aria-hidden": true, inert: true } : { "data-hero-copy": "" })}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center md:px-10"
    >
      <h1
        data-hero-title
        className={`whitespace-nowrap text-[clamp(32px,7vw,112px)] ${ghost ? "text-[#1e3a8a]" : "text-white"}`}
      >
        Sri Lanka to the US.
        <br />
        Door to door.
      </h1>

      <p
        data-hero-desc
        className={`mt-6 max-w-[52ch] text-[clamp(13px,1.05vw,16px)] leading-[1.45] text-white/85 ${ghost ? "invisible" : ""}`}
      >
        Direct from Colombo to our own warehouses in Los Angeles, Houston, New York and West
        Virginia — then to your door on our own fleet.
      </p>

      <div
        data-hero-actions
        className={`mt-10 flex w-full max-w-[540px] flex-col items-stretch gap-3 sm:flex-row sm:items-center ${ghost ? "invisible" : ""}`}
      >
        <form
          className="flex h-[56px] w-full items-center border border-white/35 bg-[#000000]/50 pl-6 pr-1.5 transition-colors focus-within:border-white sm:flex-1"
          action="/track"
          id={ghost ? undefined : "track"}
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
    const failSafe = window.setTimeout(ready, 4000);

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
          return;
        }

        ctx = gsap.context(() => {
          const q = gsap.utils.selector(root);
          const frame = q("[data-hero-frame]");
          const photo = q("[data-hero-photo]");

          // Split both copies identically so their lines move as one.
          const [ghostSplit, realSplit] = (q("[data-hero-title]") as HTMLElement[]).map((el) =>
            SplitText.create(el, { type: "lines", mask: "lines" })
          );
          const lineCount = Math.min(ghostSplit.lines.length, realSplit.lines.length);
          const allLines = [...ghostSplit.lines, ...realSplit.lines];

          // Tween plain numbers and write the clip-path ourselves: browsers
          // collapse inset() shorthands, which breaks string interpolation.
          const win = { v: 50, h: 34 };
          const applyWindow = () =>
            gsap.set(frame, { clipPath: `inset(${win.v}% ${win.h}%)` });
          applyWindow();
          gsap.set(photo, { scale: 1.6 });
          gsap.set(allLines, { yPercent: 110 });
          gsap.set(q("[data-hero-copy] [data-hero-desc]"), { autoAlpha: 0, y: 24 });
          gsap.set(q("[data-hero-copy] [data-hero-actions] > *"), { autoAlpha: 0, y: 48 });
          ready();

          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

          // 1 — type arrives on white
          for (let i = 0; i < lineCount; i++) {
            tl.to(
              [ghostSplit.lines[i], realSplit.lines[i]],
              { yPercent: 0, duration: 1.2 },
              0.15 + i * 0.12
            );
          }

          // 2 — a window opens behind the type
          tl.to(win, { v: 30, duration: 0.9, ease: "power4.inOut", onUpdate: applyWindow }, 0.75)
            .to(photo, { scale: 1.25, duration: 1.4, ease: "power2.out" }, 0.75)
            // 3 — the window takes the whole stage
            .to(win, { v: 0, h: 0, duration: 1.3, ease: "expo.inOut", onUpdate: applyWindow }, 1.85)
            .to(photo, { scale: 1, duration: 2, ease: "expo.out" }, 1.95)
            // 4 — supporting copy and actions
            .to(q("[data-hero-copy] [data-hero-desc]"), { autoAlpha: 1, y: 0, duration: 1 }, 2.7)
            .to(
              q("[data-hero-copy] [data-hero-actions] > *"),
              { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.1, clearProps: "transform" },
              2.8
            );

          // 5 — the hero keeps living after the intro
          // slow drift of the photo, forever
          gsap.to(q("[data-hero-drift]"), {
            scale: 1.08,
            xPercent: -1.5,
            duration: 14,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 3.2,
          });

          // light sweep across the photo
          gsap.fromTo(
            q("[data-hero-sweep]"),
            { xPercent: -120, opacity: 1 },
            { xPercent: 580, duration: 3.2, ease: "power1.inOut", repeat: -1, repeatDelay: 3.5, delay: 3.4 }
          );

          // pointer parallax: photo and copy move against each other
          if (window.matchMedia("(pointer: fine)").matches) {
            const opts = { duration: 1.2, ease: "power3.out" };
            const parX = gsap.quickTo(q("[data-hero-par]"), "x", opts);
            const parY = gsap.quickTo(q("[data-hero-par]"), "y", opts);
            const copyX = gsap.quickTo(q("[data-hero-copy]"), "x", opts);
            const copyY = gsap.quickTo(q("[data-hero-copy]"), "y", opts);
            const onMove = (e: PointerEvent) => {
              const r = root.getBoundingClientRect();
              const nx = (e.clientX - r.left) / r.width - 0.5;
              const ny = (e.clientY - r.top) / r.height - 0.5;
              parX(nx * -28);
              parY(ny * -18);
              copyX(nx * 10);
              copyY(ny * 6);
            };
            root.addEventListener("pointermove", onMove);
            cleanups.push(() => root.removeEventListener("pointermove", onMove));
          }

          // Scroll — the next section slides over the sticky hero.
          const next = document.querySelector("[data-hero-next]");
          if (next) {
            gsap
              .timeline({
                defaults: { ease: "none", immediateRender: false },
                scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
              })
              .fromTo(q("[data-hero-dim]"), { opacity: 0 }, { opacity: 0.65 }, 0)
              .fromTo(q("[data-hero-push]"), { scale: 1 }, { scale: 1.12 }, 0)
              .fromTo(q("[data-hero-copy]"), { yPercent: 0 }, { yPercent: -7 }, 0);
          }
        }, root);
      } catch {
        ready();
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
      className="hero-swiss sticky top-0 z-0 w-full overflow-hidden bg-white"
    >
      <div className="relative mx-auto h-[100svh] min-h-[640px] w-full max-w-[1728px] md:h-auto md:max-h-[100svh] md:aspect-[1728/1117]">
        {/* Ink-on-white copy, visible only outside the window */}
        <Copy ghost />

        {/* The window / container */}
        <div data-hero-frame className="absolute inset-0 overflow-hidden bg-[#000000]">
          <div data-hero-push className="absolute inset-0 will-change-transform">
            {/* pointer parallax (slightly overscanned so edges never show) */}
            <div data-hero-par className="absolute inset-0 scale-[1.06] will-change-transform">
              {/* slow ambient drift */}
              <div data-hero-drift className="absolute inset-0 will-change-transform">
                <div data-hero-photo className="absolute inset-0 will-change-transform">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/figma/img/hero.jpg"
                    alt="Container port at sunset"
                    className="hero-photo absolute left-1/2 top-1/2 object-cover grayscale"
                    style={{ width: "64.68%", height: "154.7%", transform: "translate(-50%, -50%) rotate(-90deg)" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[#000000]/40" />
          {/* light sweep that crosses the photo every few seconds */}
          <div
            data-hero-sweep
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-[22%] bg-gradient-to-r from-transparent via-white/[0.09] to-transparent opacity-0"
          />
          <div data-hero-dim className="pointer-events-none absolute inset-0 bg-[#000000] opacity-0" />

          <Copy />
        </div>
      </div>
    </section>
  );
}
