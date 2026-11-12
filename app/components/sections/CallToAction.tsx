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
        className="object-cover object-center grayscale brightness-90"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-6 px-6 py-[clamp(72px,9vw,110px)] md:grid-cols-[280px_1fr] md:gap-10 lg:px-10">
        <p data-slide="left" className="kicker pt-6 text-white/80">
          Ready when you are
        </p>

        <div className="pt-6">
          <h2 data-headline className="max-w-[18ch] text-[clamp(34px,4.4vw,72px)] font-medium leading-[1] tracking-[-0.02em] text-white">
            Tell us what you&apos;re shipping. We&apos;ll take it from there.
          </h2>

          <div className="mt-10 flex w-full max-w-[620px] flex-col gap-3 sm:flex-row sm:items-center">
            <form
              action="/track"
              data-micro
              data-micro-delay="0.35"
              className="flex h-[56px] w-full items-center border border-white/40 pl-5 pr-1.5 transition-colors focus-within:border-white sm:flex-1"
            >
              <label htmlFor="cta-tracking" className="sr-only">
                Tracking number
              </label>
              <input
                id="cta-tracking"
                type="text"
                name="ref"
                placeholder="B/L or container number"
                className="min-w-0 flex-1 bg-transparent text-[15px] text-white placeholder:text-white/60 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Track shipment"
                className="flex size-11 shrink-0 items-center justify-center bg-[#ffe500] transition-transform hover:scale-[1.05]"
              >
                <Image
                  src="/figma/svg/search.svg"
                  alt=""
                  width={30}
                  height={30}
                  className="size-[47%]"
                />
              </button>
            </form>

            <Link
              href="/quote"
              data-micro
              data-micro-delay="0.45"
              className="flex h-[56px] shrink-0 items-center justify-center bg-[#ffe500] px-8 text-[16px] font-medium text-black transition-transform hover:scale-[1.03]"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
