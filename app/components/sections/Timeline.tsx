import Image from "next/image";

type Align = "left" | "right";

type Step = {
  id: string;
  image: string;
  alt: string;
  layout: "image-left" | "image-right";
  position: { left: string; top: string; width: string };
  imageRadius: string;
  align: Align;
};

const STEPS: Step[] = [
  {
    id: "01",
    image: "/figma/img/bento-1.jpg",
    alt: "GWW container truck",
    layout: "image-left",
    position: { left: "6.48%", top: "10.99%", width: "46.53%" },
    imageRadius: "rounded-tr-[78px] rounded-bl-[78px]",
    align: "left",
  },
  {
    id: "02",
    image: "/figma/img/bento-2.jpg",
    alt: "Parcel handover",
    layout: "image-right",
    position: { left: "34.14%", top: "23.72%", width: "47.22%" },
    imageRadius: "rounded-tl-[78px] rounded-br-[78px]",
    align: "right",
  },
  {
    id: "03",
    image: "/figma/img/bento-1.jpg",
    alt: "GWW container truck",
    layout: "image-left",
    position: { left: "22.11%", top: "38.28%", width: "46.53%" },
    imageRadius: "rounded-tr-[78px] rounded-bl-[78px]",
    align: "left",
  },
  {
    id: "04",
    image: "/figma/img/bento-2.jpg",
    alt: "Parcel handover",
    layout: "image-right",
    position: { left: "40.05%", top: "53.60%", width: "47.22%" },
    imageRadius: "rounded-tl-[78px] rounded-br-[78px]",
    align: "right",
  },
  {
    id: "05",
    image: "/figma/img/bento-1.jpg",
    alt: "GWW container truck",
    layout: "image-left",
    position: { left: "27.43%", top: "68.16%", width: "46.53%" },
    imageRadius: "rounded-tr-[78px] rounded-bl-[78px]",
    align: "left",
  },
  {
    id: "06",
    image: "/figma/img/bento-2.jpg",
    alt: "Parcel handover",
    layout: "image-right",
    position: { left: "35.13%", top: "85.17%", width: "47.22%" },
    imageRadius: "rounded-tl-[78px] rounded-br-[78px]",
    align: "right",
  },
];

const COPY =
  "Share what you are shipping, where it is going, and when it needs to move. Your logistics team confirms the route, service, and space.";

function StepText({ align }: { align: Align }) {
  const right = align === "right";
  return (
    <div
      className={`flex flex-1 flex-col ${
        right ? "items-end text-right" : "items-start text-left"
      }`}
    >
      <h3 className="font-cal text-[clamp(16px,2.315vw,40px)] leading-[1] tracking-[-0.03em] text-black">
        All set for seamless
        <br />
        transportation
      </h3>
      <p className="mt-4 w-[328px] max-w-full font-cal text-[clamp(9px,0.926vw,16px)] leading-[1.25] tracking-[-0.03em] text-[#8f8f8f]">
        {COPY}
      </p>
    </div>
  );
}

function StepImage({ step, className = "" }: { step: Step; className?: string }) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden ${step.imageRadius} ${className}`}
    >
      <Image
        src={step.image}
        alt={step.alt}
        fill
        sizes="(max-width: 1024px) 40vw, 249px"
        className="object-cover"
      />
    </div>
  );
}

export default function Timeline() {
  return (
    <section className="w-full bg-white">
      {/* Desktop: exact Figma composition, driven by the exported vector */}
      <div className="relative mx-auto hidden w-full max-w-[1728px] aspect-[1728/3722] lg:block">
        <h2 className="absolute inset-x-0 top-[2.82%] text-center font-cal text-[64px] leading-[0.78] tracking-[-0.03em] text-black">
          All set for seamless
          <br />
          transportation
        </h2>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma/svg/timeline.svg"
          alt=""
          aria-hidden="true"
          className="absolute z-0 h-auto"
          style={{ left: "33.16%", top: "14.32%", width: "39.58%" }}
        />

        {STEPS.map((step) => (
          <article
            key={step.id}
            className="absolute z-10 flex items-start gap-[2%]"
            style={step.position}
          >
            {step.layout === "image-left" ? (
              <>
                <StepImage step={step} className="w-[31%] aspect-[249/316]" />
                <StepText align={step.align} />
              </>
            ) : (
              <>
                <StepText align={step.align} />
                <StepImage step={step} className="w-[30.5%] aspect-[249/316]" />
              </>
            )}
          </article>
        ))}
      </div>

      {/* Mobile / tablet: stacked steps */}
      <div className="mx-auto w-full max-w-[720px] px-6 py-16 lg:hidden">
        <h2 className="text-center font-cal text-[clamp(32px,6vw,48px)] leading-[0.9] tracking-[-0.03em] text-black">
          All set for seamless
          <br />
          transportation
        </h2>

        <div className="mt-12 flex flex-col gap-12 border-l-2 border-dashed border-black/15 pl-6">
          {STEPS.map((step, i) => (
            <article key={step.id} className="relative flex items-start gap-5">
              <span className="absolute -left-[35px] top-2 size-4 rounded-full bg-black" />
              <StepImage
                step={step}
                className="w-[38%] shrink-0 aspect-[249/316]"
              />
              <div className="flex flex-1 flex-col text-left">
                <span className="font-cal text-[12px] uppercase tracking-widest text-black/40">
                  Step {i + 1}
                </span>
                <h3 className="mt-1 font-cal text-[clamp(18px,4.5vw,28px)] leading-[0.95] tracking-[-0.03em] text-black">
                  All set for seamless transportation
                </h3>
                <p className="mt-3 font-cal text-[clamp(12px,2.8vw,16px)] leading-[1.3] text-[#8f8f8f]">
                  {COPY}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
