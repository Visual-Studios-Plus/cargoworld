import Image from "next/image";
import Link from "next/link";

/** Closing band — photographed panorama, one statement, one yellow action. */
export default function CallToAction() {
  return (
    <section className="relative w-full overflow-hidden">
      <Image
        src="/figma/img/bento-4.jpg"
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
        className="object-cover object-center grayscale"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-y-6 px-6 py-[clamp(72px,9vw,110px)] md:grid-cols-12 md:gap-x-6 lg:px-10">
        <p data-slide="left" className="kicker pt-6 text-white/80 md:col-span-6 lg:col-span-3">
          Ready when you are
        </p>

        <div className="pt-6 md:col-span-6 lg:col-span-9">
          <h2 data-headline className="max-w-[18ch] text-[clamp(34px,4.4vw,72px)] font-medium leading-[1] tracking-[-0.02em] text-white">
            Tell us what you&apos;re shipping. We&apos;ll take it from there.
          </h2>

          <div className="mt-10 flex items-center">
            <Link
              href="/quote"
              data-micro
              data-micro-delay="0.35"
              className="flex h-[56px] shrink-0 items-center justify-center bg-[#ffe500] px-10 text-[16px] font-medium text-black transition-transform hover:scale-[1.03]"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
