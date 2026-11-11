"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Service = {
  title: string;
  image: string;
  alt: string;
};

const SERVICES: Service[] = [
  {
    title: "Ocean Freight",
    image: "/figma/img/services/service-1.webp",
    alt: "Aerial view of a container ship at sea",
  },
  {
    title: "Air Cargo",
    image: "/figma/img/services/service-2.webp",
    alt: "Cargo plane flying above stacked shipping containers",
  },
  {
    title: "Land Transport",
    image: "/figma/img/services/service-3.webp",
    alt: "Fleet of freight trucks lined up on the road",
  },
  {
    title: "Warehousing",
    image: "/figma/img/services/service-4.webp",
    alt: "Palletised goods stored along warehouse aisles",
  },
  {
    title: "Customs Clearance",
    image: "/figma/img/services/service-5.webp",
    alt: "Logistics specialists reviewing documents at a container",
  },
  {
    title: "Global Logistics",
    image: "/figma/img/services/about.webp",
    alt: "Container ship and cargo plane at a busy port",
  },
  {
    title: "Digital Tracking",
    image: "/figma/img/services/service-6.webp",
    alt: "Operations team monitoring shipments on screens",
  },
  {
    title: "Special Cargo",
    image: "/figma/img/services/service-7.webp",
    alt: "Oversized cargo being loaded onto a freighter aircraft",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateControls = () => {
      setCanPrev(track.scrollLeft > 4);
      setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
    };

    updateControls();
    track.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", updateControls);

    return () => {
      track.removeEventListener("scroll", updateControls);
      window.removeEventListener("resize", updateControls);
    };
  }, []);

  const scrollTrack = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector<HTMLElement>("[data-service-card]");
    const step = (card?.getBoundingClientRect().width ?? track.clientWidth) + 50;

    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

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
      <div className="mx-auto w-full max-w-[1160px] px-6 pb-[clamp(56px,7vw,112px)] pt-[clamp(48px,6vw,104px)]">
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

        <div className="relative mt-8 md:mt-10">
          <button
            type="button"
            onClick={() => scrollTrack(-1)}
            disabled={!canPrev}
            aria-label="Previous services"
            className="absolute -left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 shadow-lg transition-all duration-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-35 md:-left-5 md:h-11 md:w-11"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-[18px] w-[18px]"
            >
              <path d="M19 12H5M11 5l-7 7 7 7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scrollTrack(1)}
            disabled={!canNext}
            aria-label="Next services"
            className="absolute -right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 shadow-lg transition-all duration-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-35 md:-right-5 md:h-11 md:w-11"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-[18px] w-[18px]"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>

          <div
            ref={trackRef}
            aria-label="Services carousel"
            aria-roledescription="carousel"
            className="services-track flex snap-x snap-mandatory gap-[50px] overflow-x-auto pb-2"
          >
            {SERVICES.map(({ title, image, alt }) => (
              <a
                key={title}
                data-service-card
                href="/quote"
                aria-label={`Learn more about ${title}`}
                className="group relative h-[320px] w-full shrink-0 snap-start overflow-hidden rounded-2xl border border-neutral-200/80 bg-[#dbe8f3] transition-all duration-300 hover:shadow-xl sm:w-[calc((100%-50px)/2)] lg:w-[calc((100%-150px)/4)]"
              >
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061421]/95 via-[#061421]/30 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-5">
                  <h3 className="font-cal text-xl font-bold leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-accent">
                    {title}
                  </h3>

                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/70 text-white transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-brand-blue"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
