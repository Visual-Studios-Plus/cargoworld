import Image from "next/image";

export default function CallToAction() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-neutral-950 px-6 py-24 text-center">
      <Image
        src="/figma/img/services/service-1.webp"
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-30 grayscale"
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/80 to-neutral-950/90" />

      <p className="z-10 mb-4 font-dm text-xs font-semibold uppercase tracking-widest text-neutral-400">
        Ready when you are
      </p>

      <h2 className="z-10 mx-auto mb-10 max-w-4xl font-cal text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
        Let Us Deliver Your Package To Its Destination
      </h2>

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-4 sm:flex-row">
        <form
          action="/track"
          className="flex h-[64px] w-full items-center rounded-tl-[20px] rounded-br-[20px] bg-white/10 pl-6 pr-2 backdrop-blur-md sm:w-[420px]"
        >
          <label htmlFor="cta-tracking" className="sr-only">
            Tracking number
          </label>
          <input
            id="cta-tracking"
            type="text"
            name="tracking_number"
            placeholder="Enter the tracking number"
            className="min-w-0 flex-1 bg-transparent font-dm text-[13px] font-bold text-white placeholder:text-white/90 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Search tracking number"
            className="flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-tl-[10px] rounded-br-[10px] bg-[#fffb96] transition-transform hover:scale-[1.05]"
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

        <a
          href="/quote"
          className="flex h-[64px] w-full shrink-0 cursor-pointer items-center justify-center rounded-tl-[20px] rounded-br-[20px] bg-[#fffb96] px-7 font-cal text-lg leading-none text-black transition-transform hover:scale-[1.03] sm:w-auto"
        >
          Get a quote
        </a>
      </div>
    </section>
  );
}
