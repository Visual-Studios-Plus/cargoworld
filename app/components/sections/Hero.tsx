"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const FRONT_URL = "/figma/img/container-front.png";
const BACK_URL = "/figma/img/container-back.png";

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

      {/* Scroll-out moves this wrapper; the intro animates the children inside.
          Keeping them on separate elements stops the two fighting. */}
      <div data-hero-lower className="flex w-full flex-col items-center">
      <p
        data-hero-desc
        className="mt-6 max-w-[52ch] text-[clamp(15px,1.9vw,18px)] leading-[1.5] text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.85),0_0_2px_rgba(0,0,0,0.6)]"
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
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

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
          // animate the row as one unit — the quote button has its own CSS transform
          // transition (hover scale) that would fight a tween on the button itself
          const actions = q("[data-hero-actions]");

          const split = SplitText.create(q("[data-hero-title]")[0], {
            type: "lines",
            mask: "lines",
          });

          // The photo opens like a letterbox: a thin band of it widens to full
          // height. Only the mask changes — the image itself never moves.
          gsap.set(photo, { autoAlpha: 0, y: 40 });
          gsap.set(split.lines, { yPercent: 105 });
          gsap.set(desc, { autoAlpha: 0, y: 24 });
          gsap.set(actions, { autoAlpha: 0, y: 40 });
          ready();

          // Built paused: it plays once the logo loader has lifted away.
          const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
          const playIntro = () => {
            if (!tl.isActive() && tl.progress() === 0) tl.play();
          };
          if (window.__preloaderDone || !document.querySelector("[data-preloader]")) {
            playIntro();
          } else {
            window.addEventListener("preloader:done", playIntro, { once: true });
            cleanups.push(() => window.removeEventListener("preloader:done", playIntro));
            const safety = window.setTimeout(playIntro, 5000); // never wait forever
            cleanups.push(() => window.clearTimeout(safety));
          }

          // 1 — a thin horizon of the photo appears…
          tl.to(photo, { autoAlpha: 1, y: 0, duration: 1.3, ease: "power3.out" }, 0.1)
            .add(open, 0.6)
            // 3 — the headline is set line by line as the frame settles
            .to(split.lines, { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.13 }, 0.7)
            // 4 — supporting copy and actions
            .to(desc, { autoAlpha: 1, y: 0, duration: 0.9 }, 1.2)
            .to(actions, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", clearProps: "transform" }, 1.3);
          // Scrolling before the intro ends lands it instantly.
          const onEarlyScroll = () => {
            if (window.scrollY > 40 && tl.progress() < 1) tl.progress(1);
          };
          window.addEventListener("scroll", onEarlyScroll, { passive: true });
          cleanups.push(() => window.removeEventListener("scroll", onEarlyScroll));
          // Page restored mid-scroll (refresh / back): no scroll event fires, so land it now.
          onEarlyScroll();

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
              .fromTo(q("[data-hero-dim]"), { opacity: 0 }, { opacity: 0.7 }, 0)              .fromTo(
                split.lines,
                { yPercent: 0, autoAlpha: 1 },
                { yPercent: -80, autoAlpha: 0, stagger: 0.08, duration: 0.5 },
                0
              )
              .fromTo(q("[data-hero-lower]"), { y: 0, autoAlpha: 1 }, { y: -60, autoAlpha: 0, duration: 0.5 }, 0.12);

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

  /* ------------------------------------------------------------------
     Brush reveal: a torn paint trail follows the pointer. Inside the trail
     the front (blue) container is erased and the back (yellow) one shows.
  ------------------------------------------------------------------ */
  useEffect(() => {
    const hero = heroRef.current;
    const figure = figureRef.current;
    const front = frontRef.current;
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!hero || !figure || !front || !canvas || !cursor) return;

    const ctx = canvas.getContext("2d");
    const mask = document.createElement("canvas");
    const buf = document.createElement("canvas");
    const mctx = mask.getContext("2d");
    const bctx = buf.getContext("2d");
    if (!ctx || !mctx || !bctx) return;

    let disposed = false;
    let removeTicker: (() => void) | undefined;
    const offs: Array<() => void> = [];

    // live touch detection
    const touchMQ = window.matchMedia("(hover: none), (pointer: coarse)");
    let coarse = touchMQ.matches;
    const syncTouch = () => {
      coarse = touchMQ.matches;
    };
    syncTouch();
    touchMQ.addEventListener("change", syncTouch);
    offs.push(() => touchMQ.removeEventListener("change", syncTouch));

    const back = new window.Image();
    back.crossOrigin = "anonymous";
    let backReady = false;
    back.onload = () => {
      backReady = true;
    };
    back.src = BACK_URL;

    let W = 0;
    let H = 0;
    let dpr = 1;
    const resize = () => {
      const r = figure.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      for (const c of [canvas, mask, buf]) {
        c.width = Math.round(W * dpr);
        c.height = Math.round(H * dpr);
      }
    };

    let frontReady = false;
    const onFront = () => {
      frontReady = true;
      figure.style.aspectRatio = `${front.naturalWidth} / ${front.naturalHeight}`;
      canvas.classList.add("ready");
      resize();
    };
    if (front.complete && front.naturalWidth) onFront();
    else {
      front.addEventListener("load", onFront);
      offs.push(() => front.removeEventListener("load", onFront));
    }
    resize();
    window.addEventListener("resize", resize);
    offs.push(() => window.removeEventListener("resize", resize));

    // stamps
    type Lobe = { dx: number; dy: number; r: number };
    type Stamp = { x: number; y: number; t: number; lobes: Lobe[] };
    const LIFE = 1100;
    let stamps: Stamp[] = [];
    let last: { x: number; y: number } | null = null;
    let lastMove = -1e9;

    const addStamp = (x: number, y: number, now: number) => {
      const base = Math.max(W, 260) * (coarse ? 0.15 : 0.12);
      const n = 3 + Math.floor(Math.random() * 3);
      const lobes: Lobe[] = [];
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const d = Math.random() * base * 0.45;
        lobes.push({ dx: Math.cos(a) * d, dy: Math.sin(a) * d, r: base * (0.45 + Math.random() * 0.55) });
      }
      stamps.push({ x, y, t: now, lobes });
    };

    const pointerTo = (clientX: number, clientY: number, now: number) => {
      const r = figure.getBoundingClientRect();
      const x = clientX - r.left;
      const y = clientY - r.top;
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const step = Math.max(W, 260) * 0.04;
        const count = Math.min(40, Math.floor(Math.hypot(dx, dy) / step));
        for (let i = 1; i <= count; i++) {
          addStamp(last.x + (dx * i) / (count + 1), last.y + (dy * i) / (count + 1), now);
        }
      }
      addStamp(x, y, now);
      last = { x, y };
      lastMove = now;
    };

    let setX: (v: number) => void = (v) => {
      cursor.style.left = `${v}px`;
    };
    let setY: (v: number) => void = (v) => {
      cursor.style.top = `${v}px`;
    };

    const onMove = (e: PointerEvent) => {
      pointerTo(e.clientX, e.clientY, performance.now());
      setX(e.clientX);
      setY(e.clientY);
      cursor.classList.add("on");
    };
    const onLeave = () => {
      last = null;
      cursor.classList.remove("on");
    };
    const onDown = (e: PointerEvent) => pointerTo(e.clientX, e.clientY, performance.now());
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    hero.addEventListener("pointerdown", onDown);
    offs.push(() => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      hero.removeEventListener("pointerdown", onDown);
    });

    // auto-wander on touch devices when idle
    let autoT = 0;
    let autoLast: { x: number; y: number } | null = null;
    const autoWander = (now: number) => {
      if (now - lastMove < 2500) return;
      autoT += 0.016;
      const x = W * (0.5 + Math.sin(autoT * 1.3) * 0.28);
      const y = H * (0.5 + Math.sin(autoT * 0.9 + 1) * 0.22);
      if (!autoLast || Math.hypot(x - autoLast.x, y - autoLast.y) > W * 0.02) {
        addStamp(x, y, now);
        autoLast = { x, y };
      }
    };

    // contain-fit, centred horizontally, anchored to the bottom
    const drawContain = (c: CanvasRenderingContext2D, img: HTMLImageElement) => {
      const k = Math.min(W / img.naturalWidth, H / img.naturalHeight);
      const w = img.naturalWidth * k;
      const h = img.naturalHeight * k;
      c.drawImage(img, (W - w) / 2, H - h, w, h);
    };

    const render = () => {
      const now = performance.now();
      if (coarse) autoWander(now);
      stamps = stamps.filter((st) => now - st.t < LIFE);

      mctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mctx.clearRect(0, 0, W, H);
      mctx.fillStyle = "#000";
      for (const st of stamps) {
        const k = 1 - (now - st.t) / LIFE;
        const scale = k < 0.75 ? k / 0.75 : 1;
        for (const l of st.lobes) {
          mctx.beginPath();
          mctx.arc(st.x + l.dx * scale, st.y + l.dy * scale, l.r * Math.pow(scale, 0.8), 0, Math.PI * 2);
          mctx.fill();
        }
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, W, H);
      if (frontReady) drawContain(ctx, front);

      if (stamps.length) {
        // a. erase the front container inside the trail
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.globalCompositeOperation = "destination-out";
        ctx.drawImage(mask, 0, 0);
        ctx.globalCompositeOperation = "source-over";
        // b. paint the back container, clipped to the trail
        if (backReady) {
          bctx.setTransform(1, 0, 0, 1, 0, 0);
          bctx.globalCompositeOperation = "source-over";
          bctx.clearRect(0, 0, buf.width, buf.height);
          bctx.drawImage(mask, 0, 0);
          bctx.globalCompositeOperation = "source-in";
          bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          drawContain(bctx, back);
          ctx.drawImage(buf, 0, 0);
        }
      }
    };

    (async () => {
      const { gsap } = await import("gsap");
      if (disposed) return;
      setX = gsap.quickSetter(cursor, "x", "px") as (v: number) => void;
      setY = gsap.quickSetter(cursor, "y", "px") as (v: number) => void;
      gsap.ticker.add(render);
      removeTicker = () => gsap.ticker.remove(render);
    })();

    return () => {
      disposed = true;
      removeTicker?.();
      offs.forEach((fn) => fn());
    };
  }, []);

  return (
    <>
    <section
      ref={heroRef}
      data-hero-section
      aria-label="Hover to reveal the container interior"
      className="hero-swiss brush-hero sticky top-0 z-0 w-full overflow-hidden bg-[#0b1938]"
    >
      <div data-hero-stage className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <div data-hero-frame className="brush-frame absolute inset-0 overflow-hidden">
          {/* container: the canvas paints both the front and the revealed back */}
          <div data-hero-photo className="absolute inset-0">
            <div ref={figureRef} className="brush-figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img ref={frontRef} alt="Exterior view of shipping container" src={FRONT_URL} />
              <canvas ref={canvasRef} aria-hidden="true" />
            </div>
          </div>
          <div data-hero-dim className="pointer-events-none absolute inset-0 z-[3] bg-[#0b1938] opacity-0" />

          <Copy />
        </div>
      </div>
    </section>
    <div ref={cursorRef} className="brush-cursor" />

    <link rel="preload" as="image" href={FRONT_URL} />
    <link rel="preload" as="image" href={BACK_URL} />
    <style>{`
      .brush-hero { --ghost:#1d3975; --accent:#ffd100; --muted:#9eb3dc; --gutter:clamp(16px,2.4vw,32px); touch-action:pan-y; cursor:none; }
      .brush-hero a, .brush-hero button { cursor:pointer; }
      .brush-hero input { cursor:text; }
      .brush-frame { background: radial-gradient(60% 55% at 50% 45%, #1d3c7a 0%, rgba(29,60,122,0) 70%), linear-gradient(180deg, #0b1938 0%, #122859 100%); }
      .brush-figure { position:absolute; left:50%; bottom:0; z-index:2; width:min(86vw,118svh); aspect-ratio:666/374; transform:translateX(-50%); pointer-events:none; }
      .brush-figure img, .brush-figure canvas { position:absolute; inset:0; width:100%; height:100%; object-fit:contain; object-position:center bottom; display:block; }
      .brush-figure img { opacity:0; }
      .brush-figure canvas { opacity:0; transition:opacity .8s ease; }
      .brush-figure canvas.ready { opacity:1; }
      .brush-hero [data-hero-copy] { z-index:4; pointer-events:none; }
      .brush-hero [data-hero-copy] form, .brush-hero [data-hero-copy] a { pointer-events:auto; }
      .brush-cursor { position:fixed; left:0; top:0; z-index:30; pointer-events:none; width:14px; height:14px; margin:-7px 0 0 -7px; border-radius:50%; background:#ffd100; opacity:0; transition:opacity .25s, width .2s, height .2s; }
      .brush-cursor.on { opacity:1; }
      @media (max-width:720px) {
        .brush-hero { cursor:auto; }
        .brush-figure { width:118vw; bottom:7svh; }
      }
      @media (hover:none) { .brush-cursor { display:none; } }
    `}</style>
    </>
  );

}
