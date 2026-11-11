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
        <div className="mx-auto w-full max-w-[1280px] px-6 pb-[clamp(40px,5vw,80px)] pt-[clamp(48px,6vw,96px)]">
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

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            {/* From -> To arc */}
            <div className="rounded-tl-[32px] rounded-br-[32px] bg-[#F0F4F9] p-8">
              <svg viewBox="0 0 400 180" className="w-full" aria-hidden="true">
                <path
                  d="M46 150 Q200 -10 354 150"
                  fill="none"
                  stroke="#0a1f33"
                  strokeWidth="2.5"
                  strokeDasharray="1 11"
                  strokeLinecap="round"
                />
                {/* apex interchange node */}
                <circle cx="200" cy="40" r="24" fill="#0a1f33" />
                <circle cx="200" cy="40" r="30" fill="none" stroke="#fffb96" strokeWidth="2.5" />
                <g
                  transform="translate(182 22)"
                  stroke="#fffb96"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 24l1.6-8h27l3.3 8" opacity="0.5" />
                  <path d="M9 16V7h8l6 9" />
                  <path d="M1 28c2.3 0 2.3 1.6 4.6 1.6S8 28 10.3 28s2.3 1.6 4.6 1.6S17.3 28 19.6 28s2.3 1.6 4.6 1.6S26.6 28 29 28s2.3 1.6 4.6 1.6" />
                </g>
                {/* endpoints */}
                <circle cx="46" cy="150" r="8" fill="#fff" stroke="#0a1f33" strokeWidth="3" />
                <circle cx="354" cy="150" r="8" fill="#0a1f33" />
              </svg>
              <div className="mt-2 flex items-center justify-between">
                <div className="text-left">
                  <p className="font-dm text-[11px] font-bold uppercase tracking-[0.14em] text-[#808080]">
                    From
                  </p>
                  <p className="font-cal text-[18px] font-bold text-[#0a1f33]">
                    Colombo
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-dm text-[11px] font-bold uppercase tracking-[0.14em] text-[#808080]">
                    To
                  </p>
                  <p className="font-cal text-[18px] font-bold text-[#0a1f33]">
                    Buyer&apos;s door
                  </p>
                </div>
              </div>
            </div>

            {/* Numbered vertical timeline */}
            <div className="rounded-tl-[32px] rounded-br-[32px] border border-[#E3E9F1] bg-white p-6 sm:p-8">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-cal text-[18px] font-bold text-[#0a1f33]">
                  {tracked ? `Shipment ${tracked}` : "Shipment journey"}
                </p>
                {tracked && (
                  <span className="rounded-full bg-[#fffb96] px-3 py-1 font-dm text-[11px] font-bold uppercase tracking-[0.1em] text-[#0a1f33]">
                    In transit
                  </span>
                )}
              </div>

              <ol>
                {STAGES.map((stage, i) => {
                  const done = tracked ? i < activeStage : false;
                  const activeNow = tracked ? i === activeStage : false;
                  const last = i === STAGES.length - 1;
                  return (
                    <li key={stage.label} className="relative flex gap-4 pb-6 last:pb-0">
                      {!last && (
                        <span
                          className={`absolute left-[19px] top-10 bottom-0 w-[2px] transition-colors duration-500 ${
                            done ? "bg-[#fffb96]" : "bg-[#E3E9F1]"
                          }`}
                        />
                      )}
                      <span
                        className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 font-cal text-[15px] font-bold transition-all duration-500 ${
                          done
                            ? "border-[#fffb96] bg-[#fffb96] text-[#0a1f33]"
                            : activeNow
                            ? "border-[#fffb96] bg-[#fffb96] text-[#0a1f33] shadow-[0_0_0_5px_rgba(255,251,150,0.35)]"
                            : "border-[#E3E9F1] bg-white text-[#9aa6b5]"
                        }`}
                      >
                        {done ? <CheckIcon className="h-5 w-5" /> : i + 1}
                      </span>

                      <div
                        className={`flex-1 rounded-tl-[16px] rounded-br-[16px] px-4 py-2.5 transition-colors duration-500 ${
                          activeNow ? "bg-[#F0F4F9]" : ""
                        }`}
                      >
                        <p
                          className={`font-cal text-[16px] font-bold leading-tight ${
                            done || activeNow ? "text-[#0a1f33]" : "text-[#9aa6b5]"
                          }`}
                        >
                          {stage.label}
                        </p>
                        <p className="mt-1 font-cal text-[13.5px] leading-[1.45] text-[#808080]">
                          {stage.caption}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation checklist */}
      <section className="w-full bg-[#F0F4F9]">
        <div className="mx-auto w-full max-w-[1280px] px-6 pb-[clamp(56px,7vw,112px)] pt-[clamp(48px,6vw,104px)]">
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
