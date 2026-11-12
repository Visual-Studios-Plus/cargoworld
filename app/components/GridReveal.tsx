"use client";

import { useEffect } from "react";

/**
 * Grid-column reveal for home sections marked `data-grid-reveal`.
 *
 * As a section scrolls in:
 *   1. its label / intro (`data-reveal-meta`) fade up,
 *   2. its heading (`data-reveal-head`) rises in masked lines,
 *   3. its cards (`data-reveal-cell`) are uncovered column by column,
 *      left to right along the grid, each one wiping down from its top edge.
 *
 * Columns are worked out from the cards' actual positions, so it follows the
 * grid at every breakpoint (3-up, 2-up, 1-up). Initial states are set from
 * JS only, so if scripts fail everything simply stays visible.
 */
export default function GridReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined;
    const splits: Array<{ revert: () => void }> = [];
    const observers: IntersectionObserver[] = [];

    (async () => {
      const { gsap } = await import("gsap");
      const { SplitText } = await import("gsap/SplitText");
      gsap.registerPlugin(SplitText);

      if (document.fonts?.ready) {
        try {
          await document.fonts.ready;
        } catch {
          /* carry on */
        }
      }
      if (disposed) return;

      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-grid-reveal]").forEach((section) => {
          const head = section.querySelector<HTMLElement>("[data-reveal-head]");
          const metas = section.querySelectorAll<HTMLElement>("[data-reveal-meta]");
          const cells = Array.from(section.querySelectorAll<HTMLElement>("[data-reveal-cell]"));

          // Group cards into grid columns / rows by where they actually sit.
          const vw = window.innerWidth;
          const lefts = [...new Set(cells.map((c) => Math.round(c.getBoundingClientRect().left)))].sort((a, b) => a - b);
          const tops = [...new Set(cells.map((c) => Math.round(c.getBoundingClientRect().top)))].sort((a, b) => a - b);
          const delayFor = (c: HTMLElement) => {
            const r = c.getBoundingClientRect();
            if (r.left >= vw) return 0.5; // off-screen carousel cards: no long wait
            const col = lefts.indexOf(Math.round(r.left));
            const row = tops.indexOf(Math.round(r.top));
            return Math.min(col, 3) * 0.14 + row * 0.1;
          };

          // Played by an IntersectionObserver rather than ScrollTrigger: it
          // reacts to what is actually on screen, so late-loading images and
          // the loader changing the page height can't leave it stale.
          const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
          const io = new IntersectionObserver(
            (entries) => {
              if (entries.some((e) => e.isIntersecting)) {
                io.disconnect();
                tl.play();
              }
            },
            { rootMargin: "0px 0px -22% 0px" }
          );
          io.observe(section);
          observers.push(io);

          if (metas.length) {
            gsap.set(metas, { autoAlpha: 0, y: 16 });
            tl.to(metas, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, clearProps: "all" }, 0);
          }

          if (head) {
            const split = SplitText.create(head, { type: "lines", mask: "lines" });
            splits.push(split);
            gsap.set(split.lines, { yPercent: 105 });
            tl.to(split.lines, { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.09 }, 0.05);
          }

          if (cells.length) {
            gsap.set(cells, { clipPath: "inset(0% 0% 100% 0%)" });
            cells.forEach((c) => {
              tl.to(
                c,
                { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power3.inOut", clearProps: "clipPath" },
                0.35 + delayFor(c)
              );
            });
          }
        });
      });

    })();

    return () => {
      disposed = true;
      observers.forEach((o) => o.disconnect());
      splits.forEach((s) => s.revert());
      ctx?.revert();
    };
  }, []);

  return null;
}
