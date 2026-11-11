import Link from "next/link";

/** Closing band — anodized graphite, one statement, one yellow action. */
export default function CallToAction() {
  return (
    <section className="w-full bg-[#4b514d]">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-6 px-6 py-[clamp(72px,9vw,110px)] md:grid-cols-[280px_1fr] md:gap-10 lg:px-10">
        <p className="kicker border-t border-white/40 pt-6 text-[#d8d8d8]">
          Ready when you are
        </p>

        <div className="border-t border-white/40 pt-6">
          <h2 className="max-w-[18ch] text-[clamp(34px,4.4vw,72px)] font-medium leading-[1] tracking-[-0.02em] text-white">
            Tell us what you&apos;re shipping. We&apos;ll take it from there.
          </h2>

          <div className="mt-10 flex w-full max-w-[620px] flex-col gap-3 sm:flex-row sm:items-center">
            <form
              action="/track"
              className="flex h-[56px] w-full items-center rounded-lg border border-white/40 pl-5 pr-1.5 transition-colors focus-within:border-white sm:flex-1"
            >
              <label htmlFor="cta-tracking" className="sr-only">
                Tracking number
              </label>
              <input
                id="cta-tracking"
                type="text"
                name="ref"
                placeholder="B/L or container number"
                className="min-w-0 flex-1 bg-transparent text-[15px] text-white placeholder:text-white/55 focus:outline-none"
              />
              <button
                type="submit"
                className="h-11 shrink-0 rounded-md border border-white/40 px-4 text-[14px] text-white transition-colors hover:bg-white hover:text-black"
              >
                Track
              </button>
            </form>

            <Link
              href="/quote"
              className="flex h-[56px] shrink-0 items-center justify-center rounded-full bg-[#fffb96] px-8 text-[16px] font-medium text-black transition-transform hover:scale-[1.03]"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
