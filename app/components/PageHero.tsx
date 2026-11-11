import Image from "next/image";

type Props = {
  image: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
};

export default function PageHero({
  image,
  title,
  description,
  children,
}: Props) {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-neutral-950 px-6 pt-[clamp(120px,14vw,180px)] pb-[clamp(56px,7vw,104px)] text-center">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-neutral-950/75 via-neutral-950/70 to-neutral-950/92" />
      {/* Fade into the white canvas below, echoing the home hero transition */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[22%] bg-gradient-to-t from-white via-white/50 to-transparent" />

      <div className="relative z-10 flex w-full max-w-[820px] flex-col items-center">
        <h1 className="font-syne text-[clamp(38px,5.4vw,80px)] font-bold leading-[0.9] tracking-[-0.02em] text-white">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-[620px] font-dm text-[clamp(12px,0.95vw,15px)] font-bold leading-[1.5] text-[#fff8cf]">
            {description}
          </p>
        )}
        {children && (
          <div className="mt-[clamp(26px,3vw,44px)] flex w-full flex-col items-center">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
