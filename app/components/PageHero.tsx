import Image from "next/image";

type Props = {
  image: string;
  title: React.ReactNode;
  description?: string;
  eyebrow?: string;
  children?: React.ReactNode;
};

/**
 * Sub-page hero — full-bleed grayscale photograph with a dim overlay,
 * left-aligned display type on top.
 */
export default function PageHero({
  image,
  title,
  description,
  eyebrow,
  children,
}: Props) {
  return (
    <section className="relative w-full overflow-hidden pt-[60px]">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden="true"
        data-hero-media
        className="object-cover object-center grayscale"
      />
      <div className="absolute inset-0 bg-[#000000]/45" />

      <div data-section className="relative z-10 mx-auto grid min-h-[clamp(360px,40vw,520px)] w-full max-w-[1280px] grid-cols-1 items-end gap-10 px-6 py-[clamp(56px,8vw,110px)] lg:px-10">
        <div className="flex flex-col items-start">
          {eyebrow && (
            <p data-micro className="mb-6 text-[15px] leading-[1.43] text-white/80">
              {eyebrow}
            </p>
          )}
          <h1 data-headline className="text-[clamp(40px,5.2vw,72px)] font-medium leading-[1] tracking-[-0.02em] text-white">
            {title}
          </h1>
          {description && (
            <p
              data-slide="up"
              data-slide-delay="0.22"
              className="mt-6 max-w-[52ch] text-[clamp(16px,1.3vw,19px)] leading-[1.42] text-white/80"
            >
              {description}
            </p>
          )}
          {children && (
            <div
              data-slide="up"
              data-slide-delay="0.34"
              className="mt-10 flex w-full flex-col items-start [&>div]:justify-start"
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
