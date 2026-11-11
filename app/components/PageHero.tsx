import Image from "next/image";

type Props = {
  image: string;
  title: React.ReactNode;
  description?: string;
  eyebrow?: string;
  children?: React.ReactNode;
};

/**
 * Sub-page hero — Custo gallery split: anodized-graphite band, left-aligned
 * display type, and the photograph contained in an 8px card on the right.
 */
export default function PageHero({
  image,
  title,
  description,
  eyebrow,
  children,
}: Props) {
  return (
    <section className="w-full bg-[#4b514d] pt-[60px]">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-end gap-10 px-6 py-[clamp(56px,8vw,110px)] lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-10">
        <div className="flex flex-col items-start">
          {eyebrow && (
            <p className="mb-6 text-[15px] leading-[1.43] text-[#d8d8d8]">
              {eyebrow}
            </p>
          )}
          <h1 className="text-[clamp(40px,5.2vw,72px)] font-medium leading-[1] tracking-[-0.02em] text-white">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-[52ch] text-[clamp(16px,1.3vw,19px)] leading-[1.42] text-[#d8d8d8]">
              {description}
            </p>
          )}
          {children && (
            <div className="mt-10 flex w-full flex-col items-start [&>div]:justify-start">
              {children}
            </div>
          )}
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#ffffff]">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 560px"
            aria-hidden="true"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
