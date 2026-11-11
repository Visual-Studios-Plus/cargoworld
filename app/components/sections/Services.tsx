"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import {
  AirCargoArt,
  CustomsArt,
  DigitalTrackingArt,
  GlobalLogisticsArt,
  LandTransportArt,
  OceanFreightArt,
  SpecialCargoArt,
  WarehousingArt,
} from "./service-illustrations";

const FEATURED_INDEX = 0;

type Service = {
  title: string;
  description: string;
  Art: ComponentType<SVGProps<SVGSVGElement>>;
};

const SERVICES: Service[] = [
  {
    title: "Ocean Freight",
    description:
      "FCL and LCL sailings from Colombo to every major US port, with consolidated weekly departures.",
    Art: OceanFreightArt,
  },
  {
    title: "Air Cargo",
    description:
      "Priority airfreight uplift, express clearance, and careful door-to-door handling for urgent freight.",
    Art: AirCargoArt,
  },
  {
    title: "Land Transport",
    description:
      "First-mile pickups and last-mile deliveries across the US, powered by our own fleet.",
    Art: LandTransportArt,
  },
  {
    title: "Warehousing",
    description:
      "Secure US storage, cross-docking, and fulfilment with real-time inventory visibility.",
    Art: WarehousingArt,
  },
  {
    title: "Customs Clearance",
    description:
      "Licensed brokerage, accurate classification, and compliant documentation from origin to destination.",
    Art: CustomsArt,
  },
  {
    title: "Global Logistics",
    description:
      "Multi-country routing and consolidated supply chain control through one dedicated partner.",
    Art: GlobalLogisticsArt,
  },
  {
    title: "Digital Tracking",
    description:
      "Live shipment visibility with proactive milestone alerts, from booking through delivery.",
    Art: DigitalTrackingArt,
  },
  {
    title: "Special Cargo",
    description:
      "Temperature-controlled, oversized, and high-value freight handled with specialist care.",
    Art: SpecialCargoArt,
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(FEATURED_INDEX);

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

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      mm = gsap.matchMedia();

      mm.add("(min-width: 0px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          root.querySelector("[data-services-header]"),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" }
        ).fromTo(
          root.querySelectorAll("[data-service-card]"),
          { opacity: 0, y: 45, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.07,
            ease: "power2.out",
          },
          "-=0.45"
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
      ref={sectionRef}
      id="services"
      className="w-full overflow-hidden bg-white"
    >
      <div className="mx-auto w-full max-w-[1240px] px-6 pb-[clamp(64px,8vw,132px)] pt-[clamp(56px,7vw,120px)]">
        <div data-services-header className="will-change-transform">
          <p className="text-center font-dm text-[11px] font-bold uppercase tracking-[0.18em] text-[#8f8f8f]">
            Our services
          </p>
          <h2 className="mt-3 text-center font-cal text-[clamp(36px,3.2vw,54px)] leading-[1.05] tracking-[-0.03em] text-black">
            services offer
          </h2>
          <p className="mx-auto mt-4 max-w-[480px] text-center font-cal text-[15px] leading-[1.45] tracking-[0.015em] text-[#808080]">
            End-to-end freight and supply chain services, connected by one team
            and one promise: your cargo arrives exactly as planned.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:mt-12 md:gap-3 lg:grid-cols-4">
          {SERVICES.map(({ title, description, Art }, index) => {
            const isActive = activeIndex === index;
            const number = String(index + 1).padStart(2, "0");

            return (
              <article
                key={title}
                data-service-card
                data-active={isActive}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(FEATURED_INDEX)}
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex(FEATURED_INDEX)}
                className={`services-card group relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 ${
                  isActive
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-xl"
                    : "border-neutral-200 bg-white text-neutral-900 shadow-sm hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white hover:shadow-xl"
                }`}
              >
                <div className="relative mb-4 flex h-36 w-full items-center justify-center overflow-hidden">
                  <span
                    aria-hidden="true"
                    className={`absolute right-0 top-0 z-10 font-dm text-[11px] font-bold tracking-[0.16em] transition-colors duration-300 ${
                      isActive
                        ? "text-white/35"
                        : "text-black/25 group-hover:text-white/40"
                    }`}
                  >
                    {number}
                  </span>
                  <Art className="service-art h-full w-full object-contain" />
                </div>

                <h3 className="mb-2 font-cal text-xl font-bold leading-tight tracking-tight">
                  {title}
                </h3>

                <p
                  className={`mb-6 font-dm text-[13px] font-bold leading-relaxed transition-colors duration-300 ${
                    isActive
                      ? "text-neutral-100"
                      : "text-neutral-600 group-hover:text-neutral-100"
                  }`}
                >
                  {description}
                </p>

                <a
                  href="#quote"
                  aria-label={`Learn more about ${title}`}
                  className={`mt-auto inline-flex w-fit items-center text-sm font-semibold transition-colors duration-300 after:absolute after:inset-0 after:content-[''] ${
                    isActive
                      ? "text-accent"
                      : "text-brand-gold group-hover:text-white"
                  }`}
                >
                  <span>Learn more</span>
                  <span
                    aria-hidden="true"
                    className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
