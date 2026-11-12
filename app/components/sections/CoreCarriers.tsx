import SectionHeader from "../SectionHeader";
/* eslint-disable @next/next/no-img-element */

const OCEAN = Array.from({ length: 12 }, (_, i) => ({
  src: `/figma/img/carriers/ocean/${i + 1}.webp`,
  alt: `Ocean carrier ${i + 1}`,
}));

const AIR = Array.from({ length: 12 }, (_, i) => ({
  src: `/figma/img/carriers/air/${i + 1}.avif`,
  alt: `Air carrier ${i + 1}`,
}));

function Track({
  items,
  className,
}: {
  items: { src: string; alt: string }[];
  className: string;
}) {
  // duplicated once for a seamless -50% loop
  const row = [...items, ...items];
  return (
    <div className={`marq-track flex w-max items-center gap-[56px] ${className}`}>
      {row.map((logo, i) => (
        <img
          key={`${logo.src}-${i}`}
          src={logo.src}
          alt={logo.alt}
          loading="lazy"
          className="h-[58px] w-auto shrink-0 select-none object-contain"
          draggable={false}
        />
      ))}
    </div>
  );
}

export default function CoreCarriers() {
  return (
    <section data-section className="w-full overflow-hidden bg-[#ffffff] py-[clamp(72px,9vw,110px)]">
      <style>{`
        @keyframes marq-left{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .marq-track{animation:marq-left linear infinite;will-change:transform}
        .marq-row:hover .marq-track{animation-play-state:paused}
        .marq-r1{animation-duration:25s}
        .marq-r2{animation-duration:30s}
        .marq-mask{
          -webkit-mask-image:linear-gradient(to right,transparent,#000 7%,#000 93%,transparent);
          mask-image:linear-gradient(to right,transparent,#000 7%,#000 93%,transparent);
        }
        @media (prefers-reduced-motion: reduce){.marq-track{animation:none}}
      `}</style>

      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10">
        <SectionHeader
          eyebrow="Core carriers"
          title="Space on the world's top ocean and air lines."
          subtitle="Long-standing allocations mean your cargo always has a sailing."
        />
      </div>

      <div className="marq-mask mt-12 flex flex-col gap-10" data-reveal>
        <div className="marq-row">
          <Track items={OCEAN} className="marq-r1" />
        </div>
        <div className="marq-row">
          <Track items={AIR} className="marq-r2" />
        </div>
      </div>
    </section>
  );
}
