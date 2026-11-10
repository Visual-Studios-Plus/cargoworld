"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type Align = "left" | "right";

type Step = {
  id: string;
  image: string;
  alt: string;
  layout: "image-left" | "image-right";
  position: { left: string; top: string; width: string };
  imageRadius: string;
  align: Align;
};

const STEPS: Step[] = [
  {
    id: "01",
    image: "/figma/img/bento-1.jpg",
    alt: "GWW container truck",
    layout: "image-left",
    position: { left: "6.48%", top: "10.99%", width: "46.53%" },
    imageRadius: "rounded-tr-[78px] rounded-bl-[78px]",
    align: "left",
  },
  {
    id: "02",
    image: "/figma/img/bento-2.jpg",
    alt: "Parcel handover",
    layout: "image-right",
    position: { left: "34.14%", top: "23.72%", width: "47.22%" },
    imageRadius: "rounded-tl-[78px] rounded-br-[78px]",
    align: "right",
  },
  {
    id: "03",
    image: "/figma/img/bento-1.jpg",
    alt: "GWW container truck",
    layout: "image-left",
    position: { left: "22.11%", top: "38.28%", width: "46.53%" },
    imageRadius: "rounded-tr-[78px] rounded-bl-[78px]",
    align: "left",
  },
  {
    id: "04",
    image: "/figma/img/bento-2.jpg",
    alt: "Parcel handover",
    layout: "image-right",
    position: { left: "40.05%", top: "53.60%", width: "47.22%" },
    imageRadius: "rounded-tl-[78px] rounded-br-[78px]",
    align: "right",
  },
  {
    id: "05",
    image: "/figma/img/bento-1.jpg",
    alt: "GWW container truck",
    layout: "image-left",
    position: { left: "27.43%", top: "68.16%", width: "46.53%" },
    imageRadius: "rounded-tr-[78px] rounded-bl-[78px]",
    align: "left",
  },
  {
    id: "06",
    image: "/figma/img/bento-2.jpg",
    alt: "Parcel handover",
    layout: "image-right",
    position: { left: "35.13%", top: "85.17%", width: "47.22%" },
    imageRadius: "rounded-tl-[78px] rounded-br-[78px]",
    align: "right",
  },
];

const COPY =
  "Share what you are shipping, where it is going, and when it needs to move. Your logistics team confirms the route, service, and space.";

function StepText({ align }: { align: Align }) {
  const right = align === "right";
  return (
    <div
      className={`flex flex-1 flex-col ${
        right ? "items-end text-right" : "items-start text-left"
      }`}
    >
      <h3 className="font-cal text-[clamp(16px,2.315vw,40px)] leading-[1] tracking-[-0.03em] text-black">
        All set for seamless
        <br />
        transportation
      </h3>
      <p className="mt-4 w-[328px] max-w-full font-cal text-[clamp(9px,0.926vw,16px)] leading-[1.25] tracking-[-0.03em] text-[#8f8f8f]">
        {COPY}
      </p>
    </div>
  );
}

function StepImage({ step, className = "" }: { step: Step; className?: string }) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden ${step.imageRadius} ${className}`}
    >
      <Image
        src={step.image}
        alt={step.alt}
        fill
        sizes="(max-width: 1024px) 40vw, 249px"
        className="object-cover"
      />
    </div>
  );
}

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    let disposed = false;
    let mm: ReturnType<typeof import("gsap").gsap.matchMedia> | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (disposed) return;

      // Respect users who prefer reduced motion: leave everything visible.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        root
          .querySelectorAll<SVGElement>("[data-dot]")
          .forEach((dot) => dot.style.removeProperty("transform"));
        return;
      }

      mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const svg = root.querySelector<SVGSVGElement>("[data-timeline-svg]");
        const line = root.querySelector<SVGPathElement>("[data-line]");
        if (!svg || !line) return;

        const length = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        const dots = Array.from(
          root.querySelectorAll<SVGElement>("[data-dot]")
        );
        gsap.set(dots, { scale: 0, transformOrigin: "50% 50%" });

        const cards = Array.from(
          root.querySelectorAll<HTMLElement>("[data-card-desktop]")
        );
        gsap.set(cards, { opacity: 0, y: 70, scale: 0.95 });

        // Map the timeline to the real geometry: a dot is revealed exactly when
        // the drawing tip (and the dot itself) reach slightly below the middle of the
        // viewport (~58% from top).
        const svgRect = svg.getBoundingClientRect();
        const sectionRect = root.getBoundingClientRect();
        const scale = svgRect.height / 2795;
        const svgTop = svgRect.top - sectionRect.top;
        const anchor = window.innerHeight * 0.58;
        const startScroll = Math.max(0, svgTop - anchor);
        const trail = window.innerHeight * 0.5;
        const total = startScroll + 2795 * scale + trail;

        // Fade and reveal the section title as the user transitions out of WhyUs
        const titleEl = root.querySelector("[data-timeline-title]");
        if (titleEl) {
          gsap.fromTo(
            titleEl,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: titleEl,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${total}`,
            scrub: 1.2,
          },
        });

        // Anchor the timeline to exactly 1.0 total duration so ScrollTrigger's
        // progress (0.0 to 1.0) maps 1:1 without compressing intermediate tweens.
        tl.set({}, {}, 1.0);

        // Draw the vector line as the section scrolls.
        tl.to(
          line,
          {
            strokeDashoffset: 0,
            ease: "none",
            duration: (2795 * scale) / total,
          },
          startScroll / total
        );

        const dotCenters: number[] = [];
        const dotStarts: number[] = [];

        // Sample the path once so each dot can be matched to the exact point
        // where the drawing tip reaches it.
        const SAMPLES = 800;
        const pathPoints: { x: number; y: number; at: number }[] = [];
        for (let i = 0; i <= SAMPLES; i++) {
          const at = (i / SAMPLES) * length;
          const pt = line.getPointAtLength(at);
          pathPoints.push({ x: pt.x, y: pt.y, at });
        }

        // A dot is the anchor point: it pops just as the tip arrives (so it is
        // fully visible when its circle reaches the middle of the frame), and
        // its card follows right after.
        const PRE_ROLL = 0.012;

        const fractionForDot = (dot: SVGElement) => {
          const box = (dot as SVGGraphicsElement).getBBox();
          const cx = box.x + box.width / 2;
          const cy = box.y + box.height / 2;
          let nearestY = 0;
          let nearestDist = Infinity;
          for (const point of pathPoints) {
            const dx = point.x - cx;
            const dy = point.y - cy;
            const dist = dx * dx + dy * dy;
            if (dist < nearestDist) {
              nearestDist = dist;
              nearestY = point.y;
            }
          }
          // Scroll position at which this dot sits in the middle of the frame.
          const dotScroll = startScroll + nearestY * scale;
          return Math.min(Math.max(dotScroll / total, 0), 1);
        };

        const cardGap = (window.innerHeight * 0.015) / total;

        // Pop each dot when the drawn line reaches its position.
        dots.forEach((dot) => {
          const center = fractionForDot(dot);
          dotCenters.push(center);
          const start = Math.max(center - PRE_ROLL, 0);
          dotStarts.push(start);
          tl.to(
            dot,
            { scale: 1, ease: "back.out(2.4)", duration: 0.02 },
            start
          );
        });

        // Reveal each card group right after its circle reaches the frame
        // centre, so the dot leads and the card follows.
        cards.forEach((card, i) => {
          const start = (dotCenters[i] ?? 0) + cardGap;
          tl.to(
            card,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.03,
              ease: "power2.out",
            },
            start
          );
        });

        return () => {
          gsap.set(dots, { clearProps: "transform" });
        };
      });

      mm.add("(max-width: 1023px)", () => {
        root
          .querySelectorAll<HTMLElement>("[data-card-mobile]")
          .forEach((card) => {
            gsap.from(card, {
              opacity: 0,
              y: 40,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            });
          });
      });
    })();

    return () => {
      disposed = true;
      mm?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-white lg:pb-[55vh]"
    >
      {/* Desktop: exact Figma composition, driven by the exported vector */}
      <div className="relative mx-auto hidden w-full max-w-[1728px] aspect-[1728/3722] lg:block">
        <h2
          data-timeline-title
          className="absolute inset-x-0 top-[2.82%] text-center font-cal text-[64px] leading-[0.78] tracking-[-0.03em] text-black will-change-transform"
        >
          All set for seamless
          <br />
          transportation
        </h2>

        <svg
          data-timeline-svg
          viewBox="0 0 684 2795"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="absolute z-0 h-auto"
          style={{ left: "33.16%", top: "14.32%", width: "39.58%" }}
        >
          <circle data-dot cx="209.776" cy="25" r="25" fill="black" />
          <circle data-dot cx="27.7764" cy="463" r="25" fill="black" />
          <path
            data-dot
            d="M612.776 1036.5C612.776 1050.31 601.583 1061.5 587.776 1061.5C573.969 1061.5 562.776 1050.31 562.776 1036.5C562.776 1022.69 573.969 1011.5 587.776 1011.5C601.583 1011.5 612.776 1022.69 612.776 1036.5Z"
            fill="black"
          />
          <circle data-dot cx="216.776" cy="1580" r="25" fill="black" />
          <circle data-dot cx="658.776" cy="2088" r="25" fill="black" />
          <circle data-dot cx="104.776" cy="2770" r="25" fill="black" />
          <path
            data-line
            d="M211.276 26C211.276 26 -56.7238 161.5 25.7762 468C108.276 774.5 588.776 664 588.776 1041C588.776 1418 217.776 1302.5 217.776 1583.5C217.776 1864.5 663.276 1753 663.276 2098C663.276 2443 106.776 2241 100.276 2780"
            strokeWidth="20"
            stroke="black"
            strokeLinecap="round"
          />
        </svg>

        {STEPS.map((step) => (
          <article
            key={step.id}
            data-card-desktop
            className="absolute z-10 flex items-start gap-[2%] will-change-transform"
            style={step.position}
          >
            {step.layout === "image-left" ? (
              <>
                <StepImage step={step} className="w-[31%] aspect-[249/316]" />
                <StepText align={step.align} />
              </>
            ) : (
              <>
                <StepText align={step.align} />
                <StepImage step={step} className="w-[30.5%] aspect-[249/316]" />
              </>
            )}
          </article>
        ))}
      </div>

      {/* Mobile / tablet: stacked steps */}
      <div className="mx-auto w-full max-w-[720px] px-6 py-16 lg:hidden">
        <h2 className="text-center font-cal text-[clamp(32px,6vw,48px)] leading-[0.9] tracking-[-0.03em] text-black">
          All set for seamless
          <br />
          transportation
        </h2>

        <div className="mt-12 flex flex-col gap-12 border-l-2 border-dashed border-black/15 pl-6">
          {STEPS.map((step, i) => (
            <article
              key={step.id}
              data-card-mobile
              className="relative flex items-start gap-5 will-change-transform"
            >
              <span className="absolute -left-[35px] top-2 size-4 rounded-full bg-black" />
              <StepImage
                step={step}
                className="w-[38%] shrink-0 aspect-[249/316]"
              />
              <div className="flex flex-1 flex-col text-left">
                <span className="font-cal text-[12px] uppercase tracking-widest text-black/40">
                  Step {i + 1}
                </span>
                <h3 className="mt-1 font-cal text-[clamp(18px,4.5vw,28px)] leading-[0.95] tracking-[-0.03em] text-black">
                  All set for seamless transportation
                </h3>
                <p className="mt-3 font-cal text-[clamp(12px,2.8vw,16px)] leading-[1.3] text-[#8f8f8f]">
                  {COPY}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
