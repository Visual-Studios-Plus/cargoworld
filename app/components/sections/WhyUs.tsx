"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

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

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      mm = gsap.matchMedia();

      mm.add("(min-width: 0px)", () => {
        // Animation only fires once the entire previous section (Hero) is completely
        // scrolled off the screen and Why Us occupies the viewport.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            toggleActions: "play none none reverse",
          },
        });

        // 1. Reveal header (title + description)
        tl.fromTo(
          root.querySelector("[data-whyus-header]"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
          }
        );

        // 2. Reveal bento cards sequentially right after
        const cards = root.querySelectorAll("[data-bento-card]");
        tl.fromTo(
          cards,
          { opacity: 0, y: 45, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.4"
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
      <div className="mx-auto w-full max-w-[920px] px-6 pt-[clamp(48px,5.7vw,99px)] pb-[clamp(56px,8vw,120px)]">
        <div data-whyus-header className="will-change-transform">
          <h2 className="text-center font-cal text-[clamp(36px,3.2vw,54px)] leading-[1.05] tracking-[-0.03em] text-black">
            what we do
          </h2>
          <p className="mx-auto mt-4 max-w-[480px] text-center font-cal text-[15px] leading-[1.45] tracking-[0.015em] text-[#808080]">
            Comprehensive global logistics solutions engineered for speed,
            security, and complete peace of mind across every link of your supply
            chain
          </p>
        </div>

        <div
          data-bento-grid
          className="mt-8 grid grid-cols-1 gap-2.5 md:grid-cols-3 md:grid-rows-[225px_225px]"
        >
          {/* Large card */}
          <article
            data-bento-card
            className="group relative row-span-2 aspect-[2/3] overflow-hidden rounded-tl-[48px] will-change-transform md:aspect-auto"
          >
            <Image
              src="/figma/img/bento-1.jpg"
              alt="GWW container truck"
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-4 p-4">
              <h3 className="w-[300px] max-w-full font-cal text-[clamp(19px,1.45vw,24px)] leading-[1.05] text-white">
                Simplified logistics engineered for complete reliability and
                peace of mind
              </h3>
              <a
                href="/quote"
                className="flex h-[52px] w-[165px] items-center justify-center rounded-tl-[16px] rounded-br-[16px] bg-[#fffb96] font-syne text-[16px] font-semibold text-black transition-transform hover:scale-[1.03]"
              >
                Explore more
              </a>
            </div>
          </article>

          {/* Trusted */}
          <article
            data-bento-card
            className="group relative aspect-[380/287] overflow-hidden will-change-transform md:aspect-auto"
          >
            <Image
              src="/figma/img/bento-2.jpg"
              alt="Team handing over a parcel"
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            <h3 className="absolute inset-x-0 bottom-0 w-[300px] max-w-full p-4 font-cal text-[clamp(19px,1.45vw,24px)] leading-[1.05] text-white">
              Trusted by clients worldwide through lasting partnerships
            </h3>
          </article>

          {/* 10+ */}
          <article
            data-bento-card
            className="group relative aspect-[380/287] overflow-hidden will-change-transform md:aspect-auto"
          >
            <Image
              src="/figma/img/bento-3.jpg"
              alt="GWW shipping container"
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 w-[290px] max-w-full p-4">
              <p className="font-cal text-[38px] leading-[0.8] tracking-[-0.02em] text-white">
                10 +
              </p>
              <p className="mt-1.5 w-[260px] max-w-full font-cal text-[16px] leading-[1.1] text-[#c9c9c9]">
                Years of industry expertise and on-time delivery
              </p>
            </div>
          </article>

          {/* Wide card */}
          <article
            data-bento-card
            className="group relative col-span-1 aspect-[772/286] overflow-hidden rounded-br-[48px] will-change-transform md:col-span-2 md:aspect-auto"
          >
            <Image
              src="/figma/img/bento-4.jpg"
              alt="GWW containers at golden hour"
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/26" />
            <h3 className="absolute inset-x-0 bottom-0 w-[360px] max-w-full p-4 font-cal text-[clamp(19px,1.45vw,24px)] leading-[1.05] text-white md:top-[68%] md:bottom-auto md:-translate-y-1/2">
              Powered by advanced technology, transparency, and total security
              from start to finish
            </h3>
          </article>
        </div>
      </div>
    </section>
  );
}
