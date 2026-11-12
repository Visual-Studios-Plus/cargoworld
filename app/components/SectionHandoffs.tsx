"use client";

import { useEffect } from "react";

/**
 * Home section handoffs — Swiss/brutalist grid shutter.
 *
 * When a section reaches the viewport, six solid ink columns laid on the
 * page grid cover it, then snap upward one after another (left → right)
 * with a hard ease, uncovering the section. Plays once per section; the
 * columns are removed afterwards. No curves, scaling or scrubbing.
 * Lives in its own component so it binds to the live DOM after hydration.
 */

const COLS = 6;

export default function SectionHandoffs() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined;
    const shutters: HTMLElement[] = [];
    const observers: IntersectionObserver[] = [];

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (disposed) return;

      ctx = gsap.context(() => {
        const stack = gsap.utils.toArray<HTMLElement>(
          "[data-hero-next] > section, [data-hero-next] > footer"
        );

        stack.forEach((el, i) => {
          if (i === 0) return; // the first section is handled by the hero transition

          // Skip sections already above the fold on load.
          if (el.getBoundingClientRect().top < window.innerHeight * 0.8) return;

          if (getComputedStyle(el).position === "static") el.style.position = "relative";

          const shutter = document.createElement("div");
          shutter.setAttribute("aria-hidden", "true");
          shutter.style.cssText =
            "position:absolute;inset:0;z-index:50;display:grid;pointer-events:none;" +
            `grid-template-columns:repeat(${COLS},1fr);`;
          for (let c = 0; c < COLS; c++) {
            const col = document.createElement("div");
            col.style.cssText =
              "background:#000;transform-origin:50% 0%;" +
              (c < COLS - 1 ? "box-shadow:1px 0 0 #1a1a1a;" : "");
            shutter.appendChild(col);
          }
          el.appendChild(shutter);
          shutters.push(shutter);

          // Second fail-safe independent of GSAP's ticker: once the section is
          // on screen, the shutter is gone within 2.5s no matter what.
          const io = new IntersectionObserver((entries) => {
            if (entries.some((e) => e.isIntersecting)) {
              io.disconnect();
              window.setTimeout(() => shutter.remove(), 2500);
            }
          });
          io.observe(el);
          observers.push(io);

          gsap.to(shutter.children, {
            scaleY: 0,
            duration: 0.75,
            ease: "power4.inOut",
            stagger: 0.06,
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              once: true,
              // fail-safe: never leave a section covered if frames stall
              onEnter: () => window.setTimeout(() => shutter.remove(), 2500),
            },
            onComplete: () => shutter.remove(),
          });
        });
      });

      ScrollTrigger.refresh();
    })();

    return () => {
      disposed = true;
      ctx?.revert();
      shutters.forEach((s) => s.remove());
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return null;
}
