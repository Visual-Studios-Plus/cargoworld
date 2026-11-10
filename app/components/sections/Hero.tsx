import Image from "next/image";

const NAV_LINKS = ["ship", "Track", "Network", "Industries", "about"];

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="relative mx-auto w-full max-w-[1728px] md:aspect-[1728/1117]">
        {/* Background artwork */}
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figma/img/hero.jpg"
            alt="Container port at sunset"
            className="absolute left-1/2 top-1/2 object-cover"
            style={{
              width: "64.68%",
              height: "154.7%",
              transform: "translate(-50%, -50%) rotate(-90deg)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-black/15" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[18%] bg-gradient-to-l from-black/25 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[16%] bg-gradient-to-t from-white via-white/40 to-transparent" />
        </div>

        {/* Nav */}
        <header
          className="absolute inset-x-0 top-0 z-20 flex h-[45px] items-center justify-between px-[3.53%]"
          style={{ top: "1.52%" }}
        >
          <Image
            src="/figma/img/logo.png"
            alt="Cargo World Wide"
            width={97}
            height={40}
            priority
            className="h-[40px] w-[97px] object-contain"
          />

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[30px] lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="font-cal text-[16px] leading-none text-white transition-opacity hover:opacity-70"
              >
                {link}
              </a>
            ))}
          </nav>

          <a
            href="#quote"
            className="rounded-tl-[20px] rounded-br-[20px] bg-[#fffb96] px-5 py-2.5 font-cal text-[16px] leading-none text-black transition-transform hover:scale-[1.03]"
          >
            Get a quote
          </a>
        </header>

        {/* Hero content — smaller and centered in the frame */}
        <div className="relative z-10 flex min-h-[620px] w-full flex-col items-center justify-center px-6 pb-16 pt-28 text-center md:absolute md:inset-0 md:min-h-0 md:-translate-y-[6.5%] md:p-0">
          <h1 className="font-syne text-[clamp(40px,6.6vw,112px)] font-bold leading-[0.8] tracking-[-0.02em] text-white">
            Sri lanka to US,
            <br />
            door to door
          </h1>

          <p className="mt-5 max-w-[640px] font-dm text-[clamp(11px,0.81vw,14px)] font-bold leading-[1.45] text-[#fff8cf]">
            Seamless door-to-door delivery: shipping directly from Colombo to our
            US warehouses in Los Angeles, Houston, New York, and West Virginia,
            and straight to your door with our own fleet.
          </p>

          <div className="mt-[clamp(28px,3.4vw,58px)] flex w-full max-w-[478px] items-center gap-2">
            <form
              className="flex h-[clamp(52px,4.05vw,70px)] flex-1 items-center rounded-tl-[20px] rounded-br-[20px] bg-white/10 pl-6 pr-2 backdrop-blur-md"
              action="#"
            >
              <input
                type="text"
                aria-label="Tracking number"
                placeholder="Enter the tracking number"
                className="min-w-0 flex-1 bg-transparent font-dm text-[clamp(11px,0.75vw,13px)] font-bold text-white placeholder:text-white/90 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className="flex size-[clamp(42px,3.35vw,58px)] shrink-0 items-center justify-center rounded-tl-[10px] rounded-br-[10px] bg-[#fffb96] transition-transform hover:scale-[1.05]"
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
              href="#quote"
              className="flex h-[clamp(52px,4.05vw,70px)] shrink-0 items-center justify-center rounded-tl-[20px] rounded-br-[20px] bg-[#fffb96] px-[clamp(18px,1.7vw,30px)] font-cal text-[clamp(15px,1.25vw,21px)] text-black transition-transform hover:scale-[1.03]"
            >
              Get a quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
