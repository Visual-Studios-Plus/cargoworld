"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "../SectionHeader";

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
    title: "Air Freight",
    image: "/figma/img/services/service-2.webp",
    alt: "Cargo plane flying above stacked shipping containers",
  },
  {
    title: "Transportation",
    image: "/figma/img/services/service-3.webp",
    alt: "Fleet of freight trucks lined up on the road",
  },
  {
    title: "Warehousing & Distribution",
    image: "/figma/img/services/service-4.webp",
    alt: "Palletised goods stored along warehouse aisles",
  },
  {
    title: "Customs Brokerage",
    image: "/figma/img/services/service-5.webp",
    alt: "Logistics specialists reviewing documents at a container",
  },
  {
    title: "4PL Services",
    image: "/figma/img/services/about.webp",
    alt: "Container ship and cargo plane at a busy port",
  },
  {
    title: "Project Cargo",
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
    const step = (card?.getBoundingClientRect().width ?? track.clientWidth) + 24;

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
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      mm = gsap.matchMedia();

      mm.add("(min-width: 0px)", () => {
        gsap.fromTo(
          root.querySelectorAll("[data-service-card]"),
          { autoAlpha: 0, y: 45, scale: 0.97, willChange: "transform, opacity" },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "opacity,visibility,transform,will-change",
            scrollTrigger: { trigger: root, start: "top 80%", once: true },
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
    <section ref={sectionRef} id="services" className="w-full overflow-hidden bg-[#ffffff]">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-[clamp(72px,9vw,110px)] lg:px-10">
        <div data-services-header className="will-change-transform">
          <SectionHeader
            eyebrow="Services"
            index="07"
            title="Every link in the chain, under one roof."
            subtitle="Ocean and air freight, customs, warehousing and trucking — booked, moved and delivered by one team."
          />
        </div>

        <div className="relative mt-10">
          <button
            type="button"
            onClick={() => scrollTrack(-1)}
            disabled={!canPrev}
            aria-label="Previous services"
            className="absolute -left-3 top-[38%] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-neutral-200 bg-[#ffffff] text-neutral-900 transition-all duration-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-35 md:-left-5 md:h-11 md:w-11"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-[18px] w-[18px]">
              <path d="M19 12H5M11 5l-7 7 7 7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scrollTrack(1)}
            disabled={!canNext}
            aria-label="Next services"
            className="absolute -right-3 top-[38%] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-neutral-200 bg-[#ffffff] text-neutral-900 transition-all duration-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-35 md:-right-5 md:h-11 md:w-11"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-[18px] w-[18px]">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>

          <div
            ref={trackRef}
            aria-label="Services carousel"
            aria-roledescription="carousel"
            className="services-track flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2"
          >
            {SERVICES.map(({ title, image, alt }) => (
              <Link
                key={title}
                data-service-card
                href="/quote"
                aria-label={`Get a quote for ${title}`}
                className="group block w-full shrink-0 snap-start sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-72px)/4)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#4b514d]">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                <div className="mt-5 flex items-center justify-between gap-4 border-t border-black pt-4">
                  <h3 className="text-[20px] font-medium leading-[1.2] text-black">
                    {title}
                  </h3>

                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-black text-black transition-colors duration-300 group-hover:bg-[#ffe500] group-hover:border-[#ffe500]"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
