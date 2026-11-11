"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SectionHeader from "../components/SectionHeader";
import PageHero from "../components/PageHero";
import Footer from "../components/sections/Footer";
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

  const progress =
    STAGES.length > 1 ? (activeStage / (STAGES.length - 1)) * 100 : 0;
  const current = tracked ? STAGES[activeStage] : null;

  const waText = tracked
    ? `Hi Cargo World Wide, please update me on shipment ${tracked}.`
    : "Hi Cargo World Wide, I'd like to track my shipment.";

  return (
    <main className="flex w-full flex-col bg-white">
      <SiteHeader />

      <PageHero
        image="/figma/img/bento-1.jpg"
        title={<>know exactly where your cargo is</>}
        description="Enter a B/L or container number and watch your shipment move through all six stages, from Colombo to the buyer's door."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            startTracking(reference);
          }}
          className="flex w-full max-w-[560px] items-center gap-2"
        >
          <label htmlFor="ref" className="sr-only">
            B/L or container number
          </label>
          <div className="flex h-[62px] flex-1 items-center rounded-tl-[20px] rounded-br-[20px] bg-white/10 pl-6 pr-2 backdrop-blur-md">
            <input
              id="ref"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="B/L or container no. (e.g. OWWU 162037)"
              className="min-w-0 flex-1 bg-transparent font-dm text-[13px] font-bold text-white placeholder:text-white/70 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="flex h-[62px] shrink-0 items-center justify-center rounded-tl-[20px] rounded-br-[20px] bg-[#fffb96] px-8 font-cal text-[18px] text-black transition-transform hover:scale-[1.03]"
          >
            Track
          </button>
        </form>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <button
            type="button"
            onClick={() => {
              setReference("OWWU 162037");
              startTracking("OWWU 162037");
            }}
            className="font-dm text-[13px] font-bold text-[#fff8cf]/80 underline-offset-4 transition-colors hover:text-[#fffb96] hover:underline"
          >
            Try sample: OWWU 162037
          </button>
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 font-cal text-[14px] text-white transition-transform hover:scale-[1.03]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Track on WhatsApp
          </a>
        </div>
      </PageHero>

      {/* Milestones */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1160px] px-6 pb-[clamp(40px,5vw,80px)] pt-[clamp(48px,6vw,96px)]">
          {tracked && (
            <div className="mb-10 flex flex-wrap items-center justify-between gap-3 rounded-tl-[24px] rounded-br-[24px] bg-[#F0F4F9] px-6 py-4">
              <div>
                <p className="font-dm text-[11px] font-bold uppercase tracking-[0.15em] text-[#808080]">
                  Tracking reference
                </p>
                <p className="font-cal text-[20px] font-bold text-[#0a1f33]">
                  {tracked}
                </p>
              </div>
              <span className="rounded-full bg-[#0a1f33] px-4 py-1.5 font-cal text-[13px] text-[#fffb96]">
                Stage {activeStage + 1} of {STAGES.length} · {current?.label}
              </span>
            </div>
          )}

          <SectionHeader
            eyebrow="Your shipment journey"
            title="the six-stage journey"
            subtitle="Every shipment moves through the same clear path. Enter a reference above to watch it light up stage by stage."
          />

          {/* Progress rail */}
          <div className="relative mt-14">
            <div className="absolute left-0 right-0 top-[22px] hidden h-[3px] rounded-full bg-[#E3E9F1] md:block" />
            <div
              className="absolute left-0 top-[22px] hidden h-[3px] rounded-full bg-[#fffb96] transition-all duration-700 ease-out md:block"
              style={{ width: `${progress}%` }}
            />

            <ol className="grid grid-cols-1 gap-6 md:grid-cols-6 md:gap-3">
              {STAGES.map((stage, i) => {
                const done = tracked && i < activeStage;
                const activeNow = tracked && i === activeStage;
                const reached = done || activeNow;
                return (
                  <li
                    key={stage.label}
                    className="relative flex gap-4 md:flex-col md:gap-0"
                  >
                    <div
                      className={`relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                        reached
                          ? "border-[#fffb96] bg-[#fffb96] text-[#0a1f33]"
                          : "border-[#E3E9F1] bg-white text-[#9aa6b5]"
                      } ${
                        activeNow
                          ? "scale-110 shadow-[0_0_0_6px_rgba(255,251,150,0.3)]"
                          : ""
                      }`}
                    >
                      {done ? (
                        <CheckIcon className="h-5 w-5" />
                      ) : (
                        <stage.Icon className="h-6 w-6" />
                      )}
                    </div>
                    <div className="md:mt-4">
                      <p
                        className={`font-cal text-[16px] font-bold leading-tight ${
                          reached ? "text-[#0a1f33]" : "text-[#9aa6b5]"
                        }`}
                      >
                        {stage.label}
                      </p>
                      <p className="mt-1 font-cal text-[13px] leading-[1.4] text-[#808080]">
                        {stage.caption}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Documentation checklist */}
      <section className="w-full bg-[#F0F4F9]">
        <div className="mx-auto w-full max-w-[1160px] px-6 pb-[clamp(56px,7vw,112px)] pt-[clamp(48px,6vw,104px)]">
          <SectionHeader
            eyebrow="Documentation"
            title="paperwork at every stage"
            subtitle="The right documents keep cargo moving. Here is what each stage needs."
          />

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {STAGES.map((stage, i) => (
              <div
                key={stage.label}
                className={`rounded-tl-[24px] rounded-br-[24px] border bg-white p-6 transition-all duration-300 ${
                  tracked && i === activeStage
                    ? "border-[#fffb96] shadow-lg ring-2 ring-[#fffb96]/40"
                    : "border-[#E3E9F1]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-[#0a1f33] font-cal text-[14px] text-[#fffb96]">
                    {i + 1}
                  </span>
                  <h3 className="font-cal text-[18px] font-bold text-[#0a1f33]">
                    {stage.label}
                  </h3>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {stage.docs.map((doc) => (
                    <li
                      key={doc}
                      className="flex items-center gap-2.5 font-cal text-[14px] text-[#44505f]"
                    >
                      <DocIcon className="h-4 w-4 shrink-0 text-[#0a1f33]/60" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/quote"
              className="rounded-tl-[20px] rounded-br-[20px] bg-[#fffb96] px-7 py-3.5 font-cal text-[16px] text-black transition-transform hover:scale-[1.03]"
            >
              Get a quote
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-tl-[20px] rounded-br-[20px] border border-[#0a1f33]/15 bg-white px-7 py-3.5 font-cal text-[16px] text-[#0a1f33] transition-colors hover:bg-[#F0F4F9]"
            >
              <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
              Chat with support
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
