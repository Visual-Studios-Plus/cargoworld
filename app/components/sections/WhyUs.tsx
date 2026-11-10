import Image from "next/image";

export default function WhyUs() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1164px] px-6 pt-[clamp(48px,5.7vw,99px)] pb-[clamp(64px,15.4vw,266px)]">
        <h2 className="text-center font-cal text-[clamp(40px,3.7vw,64px)] leading-[0.78] tracking-[-0.03em] text-black">
          what we do
        </h2>
        <p className="mx-auto mt-1 max-w-[502px] text-center font-cal text-[16px] leading-[1.08] tracking-[0.03em] text-[#808080]">
          Comprehensive global logistics solutions engineered for speed,
          security, and complete peace of mind across every link of your supply
          chain
        </p>

        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3 md:grid-rows-[287px_286px]">
          {/* Large card */}
          <article className="group relative row-span-2 aspect-[2/3] overflow-hidden rounded-tl-[56px] md:aspect-auto">
            <Image
              src="/figma/img/bento-1.jpg"
              alt="GWW container truck"
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-6 p-5">
              <h3 className="w-[351px] max-w-full font-cal text-[clamp(24px,1.85vw,32px)] leading-[0.94] text-white">
                Simplified logistics engineered for complete reliability and
                peace of mind
              </h3>
              <a
                href="#quote"
                className="flex h-[67px] w-[203px] items-center justify-center rounded-tl-[20px] rounded-br-[20px] bg-[#fffb96] font-syne text-[20px] font-semibold text-black transition-transform hover:scale-[1.03]"
              >
                Explore more
              </a>
            </div>
          </article>

          {/* Trusted */}
          <article className="group relative aspect-[380/287] overflow-hidden md:aspect-auto">
            <Image
              src="/figma/img/bento-2.jpg"
              alt="Team handing over a parcel"
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            <h3 className="absolute inset-x-0 bottom-0 w-[363px] max-w-full p-[26px] font-cal text-[clamp(24px,1.85vw,32px)] leading-[0.94] text-white">
              Trusted by clients worldwide through lasting partnerships
            </h3>
          </article>

          {/* 10+ */}
          <article className="group relative aspect-[380/287] overflow-hidden md:aspect-auto">
            <Image
              src="/figma/img/bento-3.jpg"
              alt="GWW shipping container"
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 w-[362px] max-w-full p-[24px]">
              <p className="font-cal text-[48px] leading-[0.7] tracking-[-0.02em] text-white">
                10 +
              </p>
              <p className="mt-2 w-[314px] max-w-full font-cal text-[20px] leading-[1] text-[#c9c9c9]">
                Years of industry expertise and on-time delivery
              </p>
            </div>
          </article>

          {/* Wide card */}
          <article className="group relative col-span-1 aspect-[772/286] overflow-hidden rounded-br-[60px] md:col-span-2 md:aspect-auto">
            <Image
              src="/figma/img/bento-4.jpg"
              alt="GWW containers at golden hour"
              fill
              sizes="(max-width: 768px) 100vw, 772px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/26" />
            <h3 className="absolute inset-x-0 bottom-0 w-[414px] max-w-full p-5 font-cal text-[clamp(22px,1.85vw,32px)] leading-[0.94] text-white md:top-[68%] md:bottom-auto md:-translate-y-1/2">
              Powered by advanced technology, transparency, and total security
              from start to finish
            </h3>
          </article>
        </div>
      </div>
    </section>
  );
}
