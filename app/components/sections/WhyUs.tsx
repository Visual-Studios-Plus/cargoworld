"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const CELL = "border-b border-r border-black/20";

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function TextCell({
  title,
  body,
  tag,
  href,
}: {
  title: string;
  body: string;
  tag: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      data-bento-card
      className={`group flex min-h-[280px] flex-col justify-between bg-white p-6 transition-colors hover:bg-[#f6f6f4] lg:p-8 ${CELL}`}
    >
      <div>
        <h3 className="text-[22px] text-black">{title}</h3>
        <p className="mt-3 max-w-[30ch] text-[14px] leading-[1.5] text-black/70">{body}</p>
      </div>
      <div className="mt-6 flex items-end justify-between">
        <span className="chip">{tag}</span>
        <span className="text-black">
          <Arrow />
        </span>
      </div>
    </Link>
  );
}

function ImageCell({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div data-bento-card data-image-reveal className={`relative min-h-[280px] overflow-hidden bg-[#4b514d] ${CELL} ${className}`}>
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 320px" className="object-cover" />
    </div>
  );
}

const FIGURES = [
  { value: "2008", label: "Forwarding since" },
  { value: "4", label: "Own US warehouses" },
  { value: "Weekly", label: "Sailings from Colombo" },
  { value: "26–36", label: "Days to the US" },
];

export default function WhyUs() {
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
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      mm = gsap.matchMedia();
      mm.add("(min-width: 0px)", () => {
        gsap.fromTo(
          root.querySelectorAll("[data-bento-card]"),
          { opacity: 0, y: 24, willChange: "transform, opacity" },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: "power2.out",
            clearProps: "opacity,transform,will-change",
            scrollTrigger: { trigger: root, start: "top 80%", toggleActions: "play none none reverse" },
          }
        );
      });
    })();

    return () => {
      disposed = true;
      mm?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-[clamp(72px,9vw,110px)] lg:px-10">
        {/* Same label column + main column grid as every other section */}
        <div className="grid grid-cols-[1fr_auto] items-start gap-6 pb-8 md:grid-cols-[280px_1fr] md:gap-10">
          <p data-slide="left" className="kicker min-w-0 max-w-[22ch] text-black">We move it all, door to door</p>
          <Link
            href="/ship"
            data-slide="right"
            className="kicker shrink-0 justify-self-end whitespace-nowrap border border-black px-3 py-1.5 text-black transition-colors hover:border-[#ffe500] hover:bg-[#ffe500]"
          >
            All services ↗
          </Link>
        </div>

        {/* Ruled cell grid (shared hairlines). The first cells each absorb one 24px
            gutter, so cell edges land on the same columns as Services and the footer. */}
        <div className="grid grid-cols-1 border-l border-t border-black/20 sm:grid-cols-[calc((100%-24px)/2+24px)_calc((100%-24px)/2)] lg:grid-cols-[repeat(3,calc((100%-72px)/4+24px))_calc((100%-72px)/4)]">
          <ImageCell src="/figma/img/bento-1.jpg" alt="Cargo World Wide container truck" />
          <TextCell
            title="Our own trucks"
            body="Final-mile delivery on our own fleet — no hand-off to a stranger at the port."
            tag="Final mile"
            href="/ship"
          />

          {/* Statement cell */}
          <div
            data-bento-card
            className={`flex min-h-[280px] flex-col justify-between bg-white p-6 sm:col-span-2 lg:p-8 ${CELL}`}
          >
            <p className="kicker text-black/60">What we do</p>
            <div>
              <h2 data-headline className="max-w-[16ch] text-[clamp(36px,4.2vw,64px)] text-black">
                One team from Colombo to your buyer&apos;s door
              </h2>
              <Link
                href="/about"
                className="mt-5 inline-flex items-center gap-2 border-b border-black pb-1 text-[14px] text-black transition-opacity hover:opacity-60"
              >
                About the company <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <TextCell
            title="Our own warehouses"
            body="Los Angeles, Houston, New York and West Virginia — your cargo lands with us."
            tag="US hubs"
            href="/network"
          />
          <ImageCell src="/figma/img/bento-4.jpg" alt="Branded containers at the yard" />
          <TextCell
            title="One accountable team"
            body="Sri Lanka and US teams working the same shipment, from booking to delivery."
            tag="End to end"
            href="/about"
          />
          <ImageCell src="/figma/img/bento-2.jpg" alt="Parcel handover to a customer" />

          {/* Figures row */}
          {FIGURES.map((f) => (
            <div key={f.label} data-bento-card className={`bg-white p-6 lg:p-8 ${CELL}`}>
              <p className="kicker text-black/60">{f.label}</p>
              <p className="mt-6 font-[family-name:var(--font-display)] text-[clamp(40px,4.4vw,64px)] font-semibold uppercase leading-[0.9] text-black">
                {f.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
