"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide motion layer.
 *
 * Scans the rendered page for opt-in motion attributes and wires them to GSAP
 * ScrollTrigger. Markup stays in the server components; motion is additive and
 * fully disabled when the visitor prefers reduced motion.
 *
 *   data-section           orchestrate a section's blocks in one staggered timeline
 *   data-headline          split a heading into masked lines and slide them up
 *   data-slide="left"      slide an element in from a direction (left|right|up|down)
 *   data-slide-delay=".2"  optional delay for a slide, in seconds
 *   data-reveal            fade + rise a single element on enter
 *   data-stagger           fade + rise the direct children of a container
 *   data-micro             small part: label, chip, form, meta — fades and drifts
 *   data-rule              draw a horizontal rule in from the left
 *   data-image-reveal      wipe + settle-scale a media wrapper
 *   data-parallax="8"      subtle scrub parallax (percentage of height)
 *   data-hero-media        gentle settle-scale on first paint
 */
export default function SiteMotion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    let disposed = false;
    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined;
    const splits: Array<{ revert: () => void }> = [];

    // Hold split headings back until the webfont is measured so the visitor
    // never sees the fallback type snap into place before the reveal.
    const pendingHeadlines = Array.from(
      document.querySelectorAll<HTMLElement>("[data-headline]")
    );
    pendingHeadlines.forEach((el) => {
      el.style.visibility = "hidden";
    });

    const revealPendingHeadlines = () => {
      pendingHeadlines.forEach((el) => {
        el.style.visibility = "";
      });
    };

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { SplitText } = await import("gsap/SplitText");
      gsap.registerPlugin(ScrollTrigger, SplitText);
      gsap.config({ force3D: true, nullTargetWarn: false });
      ScrollTrigger.config({ ignoreMobileResize: true });

      // Split headings only once the webfont is in place, otherwise the line
      // breaks would be measured against the fallback face.
      if (document.fonts?.ready) {
        try {
          await document.fonts.ready;
        } catch {
          /* fonts API can reject in some browsers — carry on */
        }
      }

      if (disposed) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      ctx = gsap.context(() => {
        if (reduced) {
          revealPendingHeadlines();
          return;
        }

        /* ------------------------------------------------------------------
           Section transitions: orchestrate the plain blocks of a section so
           they arrive one after another as the section scrolls into view.
           Blocks that carry their own motion markers are left to the handlers
           below so the two never fight over the same transform.
        ------------------------------------------------------------------ */
        gsap.utils.toArray<HTMLElement>("[data-section]").forEach((wrap) => {
          if (wrap.closest("[data-animated]")) return;

          const units: HTMLElement[] = [];

          Array.from(wrap.children).forEach((child) => {
            const el = child as HTMLElement;
            const hasOwn =
              el.hasAttribute("data-headline") ||
              el.hasAttribute("data-slide") ||
              el.hasAttribute("data-reveal") ||
              el.hasAttribute("data-stagger") ||
              el.hasAttribute("data-micro") ||
              el.querySelector(
                "[data-headline],[data-slide],[data-reveal],[data-stagger],[data-micro]"
              ) !== null;

            if (hasOwn) return;

            if (el.hasAttribute("data-stagger")) {
              Array.from(el.children).forEach((inner) => units.push(inner as HTMLElement));
            } else {
              units.push(el);
            }
          });

          if (!units.length) return;

          units.forEach((el) => el.setAttribute("data-animated", ""));

          gsap.fromTo(
            units,
            { autoAlpha: 0, y: 42 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.12,
              ease: "power3.out",
              clearProps: "opacity,visibility,transform",
              scrollTrigger: { trigger: wrap, start: "top 82%", once: true },
            }
          );
        });

        /* ------------------------------------------------------------------
           Headlines: split into lines, mask each one, and slide the lines up
           as the heading enters. autoSplit keeps the breaks correct on resize.
        ------------------------------------------------------------------ */
        gsap.utils.toArray<HTMLElement>("[data-headline]").forEach((el) => {
          if (el.closest("[data-animated]")) return;
          el.setAttribute("data-animated", "");

          const split = SplitText.create(el, {
            type: "lines",
            linesClass: "motion-line",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 120,
                duration: 1,
                stagger: 0.085,
                ease: "power4.out",
                force3D: true,
                willChange: "transform",
                clearProps: "transform,will-change",
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }),
          });

          splits.push(split);
          el.style.visibility = "";
        });

        /* ------------------------------------------------------------------
           Directional slide-ins for copy blocks, captions and panels.
        ------------------------------------------------------------------ */
        gsap.utils.toArray<HTMLElement>("[data-slide]").forEach((el) => {
          if (el.closest("[data-animated]")) return;
          el.setAttribute("data-animated", "");

          const dir = (el.dataset.slide || "up").toLowerCase();
          const distance = 56;
          const from: gsap.TweenVars = {
            autoAlpha: 0,
            force3D: true,
            willChange: "transform, opacity",
          };

          if (dir === "left") from.x = -distance;
          else if (dir === "right") from.x = distance;
          else if (dir === "down") from.y = -distance;
          else from.y = distance;

          gsap.fromTo(el, from, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: 0.95,
            delay: Number(el.dataset.slideDelay) || 0,
            ease: "power3.out",
            clearProps: "opacity,visibility,transform,will-change",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        /* Single-element reveals */
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          if (el.closest("[data-animated]")) return;
          el.setAttribute("data-animated", "");

          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 26 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              clearProps: "opacity,visibility,transform",
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            }
          );
        });

        /* Staggered children of a container */
        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
          if (group.closest("[data-animated]")) return;
          group.setAttribute("data-animated", "");

          const items = Array.from(group.children) as HTMLElement[];
          if (!items.length) return;

          gsap.fromTo(
            items,
            { autoAlpha: 0, y: 34 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.085,
              ease: "power3.out",
              clearProps: "opacity,visibility,transform",
              scrollTrigger: { trigger: group, start: "top 86%", once: true },
            }
          );
        });

        /* Small parts — labels, chips, meta rows, forms */
        gsap.utils.toArray<HTMLElement>("[data-micro]").forEach((el) => {
          if (el.closest("[data-animated]")) return;
          el.setAttribute("data-animated", "");

          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 14 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              delay: Number(el.dataset.microDelay) || 0.08,
              ease: "power2.out",
              clearProps: "opacity,visibility,transform",
              scrollTrigger: { trigger: el, start: "top 94%", once: true },
            }
          );
        });

        /* Horizontal rules draw in from the left */
        gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((el) => {
          if (el.closest("[data-animated]")) return;
          el.setAttribute("data-animated", "");

          gsap.fromTo(
            el,
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: "left center",
              duration: 1.1,
              ease: "power3.inOut",
              clearProps: "transform",
              scrollTrigger: { trigger: el, start: "top 94%", once: true },
            }
          );
        });

        /* Media wipe + settle */
        gsap.utils.toArray<HTMLElement>("[data-image-reveal]").forEach((wrap) => {
          const media = wrap.querySelector("img") ?? wrap;

          const tl = gsap.timeline({
            scrollTrigger: { trigger: wrap, start: "top 88%", once: true },
          });

          tl.fromTo(
            wrap,
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 1.05,
              ease: "power4.out",
              willChange: "clip-path",
              clearProps: "clipPath,will-change",
            }
          ).fromTo(
            media,
            { scale: 1.14, force3D: true },
            {
              scale: 1,
              duration: 1.4,
              ease: "power3.out",
              clearProps: "transform",
            },
            0
          );
        });

        /* Scrub parallax */
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = Number(el.dataset.parallax) || 8;

          gsap.fromTo(
            el,
            { yPercent: -amount, force3D: true },
            {
              yPercent: amount,
              ease: "none",
              willChange: "transform",
              scrollTrigger: {
                trigger: el.parentElement ?? el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });

        /* Hero media settle on initial paint */
        gsap.utils.toArray<HTMLElement>("[data-hero-media]").forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 1.08, force3D: true, willChange: "transform" },
            {
              scale: 1,
              duration: 1.6,
              ease: "power3.out",
              clearProps: "transform,will-change",
            }
          );
        });
      });

      ScrollTrigger.refresh();
      if (document.readyState !== "complete") {
        window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
      }
    })();

    return () => {
      disposed = true;
      revealPendingHeadlines();
      splits.forEach((split) => split.revert());
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
