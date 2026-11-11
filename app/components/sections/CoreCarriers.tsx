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
    <section className="w-full overflow-hidden bg-white py-[clamp(48px,6vw,88px)]">
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
        <p className="font-dm text-[11px] font-bold uppercase tracking-[0.18em] text-[#8f8f8f]">
          Trusted lanes
        </p>
        <h2
          className="mt-3 font-cal text-[clamp(32px,3vw,48px)] text-black"
          style={{ letterSpacing: "-0.02em", lineHeight: 1.05 }}
        >
          Core Carriers
        </h2>
        <p className="mt-3 max-w-[520px] font-cal text-[15px] text-[#808080]" style={{ lineHeight: 1.5 }}>
          We book space across the world&apos;s leading ocean and air carriers,
          so your cargo always has a sailing.
        </p>
      </div>

      <div className="marq-mask mt-12 flex flex-col gap-10">
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
