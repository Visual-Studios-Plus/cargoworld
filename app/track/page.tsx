"use client";

import { useEffect, useRef, useState } from "react";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/sections/Footer";
import { SwissHero, CtaSplit, GRID, COL } from "../components/Swiss";
import {
  CheckIcon,
  DocIcon,
  WhatsAppIcon,
  OceanIcon,
  TruckIcon,
  WarehouseIcon,
  CustomsIcon,
  PinIcon,
} from "../components/Icons";

const WHATSAPP = "94112307748";

type Stage = {
  label: string;
  caption: string;
  docs: string[];
  Icon: typeof OceanIcon;
};

const STAGES: Stage[] = [
  {
    label: "Colombo",
    caption: "Loaded and sailed",
    docs: ["Commercial Invoice", "Packing List", "Certificate of Origin"],
    Icon: PinIcon,
  },
  {
    label: "At sea",
    caption: "On the vessel",
    docs: ["Bill of Lading", "Booking Confirmation"],
    Icon: OceanIcon,
  },
  {
    label: "Transshipment",
    caption: "Changes ship if the route needs it",
    docs: ["Transshipment Manifest"],
    Icon: OceanIcon,
  },
  {
    label: "US port",
    caption: "Arrives and clears customs",
    docs: ["Customs Entry", "ISF Filing", "Arrival Notice"],
    Icon: CustomsIcon,
  },
  {
    label: "Warehouse",
    caption: "Unloaded and prepared for delivery",
    docs: ["Delivery Order", "Warehouse Receipt"],
    Icon: WarehouseIcon,
  },
  {
    label: "Buyer's door",
    caption: "Delivered by truck",
    docs: ["Proof of Delivery"],
    Icon: TruckIcon,
  },
];

export default function TrackPage() {
  const [reference, setReference] = useState("");
  const [tracked, setTracked] = useState<string | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTracking = (ref: string) => {
    const value = ref.trim() || "OWWU 162037";
    setTracked(value.toUpperCase());
    setActiveStage(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveStage((s) => {
        if (s >= STAGES.length - 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return s;
        }
        return s + 1;
      });
    }, 700);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const current = tracked ? STAGES[activeStage] : null;

  const waText = tracked
    ? `Hi Cargo World Wide, please update me on shipment ${tracked}.`
    : "Hi Cargo World Wide, I'd like to track my shipment.";

  return (
    <main className="flex w-full flex-col bg-white">
      <SiteHeader />

      <SwissHero
        image="/figma/img/bento-1.jpg"
        alt="Containers being moved at the port"
        eyebrow="Track"
        title="Know exactly where your cargo is"
        description="Enter a B/L or container number and follow your shipment through all six stages, from Colombo to the buyer's door."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            startTracking(reference);
          }}
          className="flex w-full max-w-[560px] flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="ref" className="sr-only">
            B/L or container number
          </label>
          <input
            id="ref"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="B/L or container no."
            className="h-[56px] min-w-0 flex-1 border border-white/40 bg-transparent px-5 text-[15px] text-white placeholder:text-white/60 focus:border-white focus:outline-none"
          />
          <button
            type="submit"
            className="h-[56px] shrink-0 bg-[#ffe500] px-8 text-[16px] font-medium text-black transition-colors hover:bg-white"
          >
            Track
          </button>
        </form>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-[14px]">
          <button
            type="button"
            onClick={() => {
              setReference("OWWU 162037");
              startTracking("OWWU 162037");
            }}
            className="text-white underline underline-offset-4 transition-colors hover:text-[#ffe500]"
          >
            Try sample: OWWU 162037
          </button>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white underline underline-offset-4 transition-colors hover:text-[#ffe500]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Track on WhatsApp
          </a>
        </div>
      </SwissHero>

      {/* Journey: heading + live status left, stages right */}
      <section className="w-full bg-white">
        <div className={`${GRID} w-full py-[clamp(64px,9vw,128px)]`}>
          <div className={COL.left}>
            <p className="kicker mb-5 font-semibold text-black">Your shipment journey</p>
            <h2 className="max-w-[16ch] text-[clamp(32px,3.6vw,56px)] text-black">The six-stage journey</h2>
            <p className="mt-6 max-w-[40ch] text-[16px] leading-[1.55] text-black/65">
              Every shipment moves through the same clear path. Enter a reference above to watch it light up stage
              by stage.
            </p>

            {tracked && (
              <dl className="mt-10 grid max-w-[420px] grid-cols-2 bg-[#1e3a8a] text-white">
                <div className="p-5">
                  <dt className="kicker text-white/80">Reference</dt>
                  <dd className="mt-2 text-[18px] font-medium">{tracked}</dd>
                </div>
                <div className="p-5">
                  <dt className="kicker text-white/80">
                    Stage {activeStage + 1} / {STAGES.length}
                  </dt>
                  <dd className="mt-2 text-[18px] font-medium text-[#ffe500]">{current?.label}</dd>
                </div>
              </dl>
            )}
          </div>

          <ol className={`mt-12 md:mt-0 ${COL.right}`}>
            {STAGES.map((stage, i) => {
              const done = tracked ? i < activeStage : false;
              const activeNow = tracked ? i === activeStage : false;
              const lit = done || activeNow;
              return (
                <li key={stage.label} className="grid grid-cols-[44px_1fr] gap-5 pb-8 last:pb-0">
                  <span
                    className={`flex size-11 items-center justify-center text-[14px] font-medium tabular-nums transition-colors duration-500 ${
                      activeNow
                        ? "bg-[#ffe500] text-black"
                        : done
                          ? "bg-[#1e3a8a] text-white"
                          : "bg-[#f4f5f7] text-black/45"
                    }`}
                  >
                    {done ? <CheckIcon className="h-5 w-5" /> : String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-1.5">
                    <h3
                      className={`text-[clamp(18px,1.6vw,22px)] transition-colors duration-500 ${
                        lit || !tracked ? "text-black" : "text-black/40"
                      }`}
                    >
                      {stage.label}
                    </h3>
                    <p className="mt-1 text-[14px] leading-[1.5] text-black/65">{stage.caption}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Documentation checklist */}
      <section className="w-full bg-[#f4f5f7]">
        <div className={`${GRID} w-full pt-[clamp(64px,9vw,128px)]`}>
          <div className={COL.left}>
            <p className="kicker mb-5 font-semibold text-black">Documentation</p>
            <h2 className="max-w-[16ch] text-[clamp(32px,3.6vw,56px)] text-black">Paperwork at every stage</h2>
          </div>
          <p className={`mt-8 max-w-[40ch] text-[clamp(18px,1.6vw,24px)] leading-[1.4] text-black md:mt-0 ${COL.right}`}>
            The right documents keep cargo moving. Here is what each stage needs.
          </p>
        </div>
        <div className={GRID}>
        <ol className={`grid grid-cols-1 gap-x-10 gap-y-14 py-[clamp(56px,7vw,96px)] sm:grid-cols-2 lg:grid-cols-3 ${COL.content}`}>
          {STAGES.map((stage, i) => {
            const activeNow = tracked && i === activeStage;
            return (
              <li key={stage.label}>
                <span
                  className={`inline-block text-[13px] tabular-nums ${
                    activeNow ? "bg-[#ffe500] px-1.5 text-black" : "text-black/40"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-[clamp(20px,1.8vw,26px)] text-black">{stage.label}</h3>
                <ul className="mt-4 space-y-2.5">
                  {stage.docs.map((doc) => (
                    <li key={doc} className="flex items-center gap-2.5 text-[15px] text-black/75">
                      <DocIcon className="h-4 w-4 shrink-0 text-black/50" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
        </div>
      </section>

      <CtaSplit
        title="Need a hand?"
        body="Our team can update you on any shipment, or quote your next one."
        image="/figma/img/services/service-5.webp"
        alt="Specialists reviewing shipment documents"
      >
        <a
          href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-[56px] w-full items-center justify-center gap-2 border border-[#1e3a8a] px-8 text-[16px] text-black transition-colors hover:bg-[#1e3a8a] hover:text-white sm:w-auto"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Chat with support
        </a>
      </CtaSplit>
      <Footer />
    </main>
  );
}
