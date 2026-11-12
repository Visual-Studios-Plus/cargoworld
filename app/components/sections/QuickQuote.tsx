"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckIcon } from "../Icons";
import { LOADS, DESTINATIONS } from "../../quote/options";

/**
 * Home quick-quote — the first two questions of the /quote wizard, inline,
 * sized to fit one screen. The sentence fills in live; "Continue" hands the
 * answers to /quote, which picks up at the next question.
 */

function Option({
  selected,
  onClick,
  title,
  hint,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`flex min-h-[60px] w-full items-center justify-between gap-3 border px-4 py-2.5 text-left transition-colors duration-200 ${
        selected ? "border-black bg-[#ffe500]" : "border-black/20 bg-white hover:border-black"
      }`}
    >
      <span>
        <span className="block text-[15px] font-medium leading-tight text-black">{title}</span>
        <span className="mt-0.5 block text-[12px] text-black/60">{hint}</span>
      </span>
      <span
        className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
          selected ? "border-black bg-black text-[#ffe500]" : "border-black/30 text-transparent"
        }`}
      >
        <CheckIcon className="h-3 w-3" />
      </span>
    </button>
  );
}

function Blank({ value, placeholder }: { value: string; placeholder: string }) {
  return (
    <span
      className={`mx-0.5 inline border-b-2 px-1.5 transition-colors duration-200 ${
        value ? "border-black bg-[#ffe500] text-black" : "border-black/25 text-black/30"
      }`}
    >
      {value || placeholder}
    </span>
  );
}

export default function QuickQuote() {
  const [load, setLoad] = useState("");
  const [destination, setDestination] = useState("");

  const transit = DESTINATIONS.find((d) => d.v === destination)?.transit;
  const qs = new URLSearchParams();
  if (load) qs.set("load", load);
  if (destination) qs.set("destination", destination);
  const href = `/quote${qs.toString() ? `?${qs}` : ""}`;

  return (
    <section id="quick-quote" className="w-full bg-white">
      <div className="mx-auto flex min-h-[100svh] w-full max-w-[1280px] flex-col justify-center px-6 py-[clamp(48px,7vh,80px)] lg:px-10">
        {/* opener — same 280px rail + rule as the other sections */}
        <div className="grid grid-cols-1 gap-3 border-t border-black pt-5 md:grid-cols-[280px_1fr] md:gap-10">
          <p className="kicker text-black">
            Get a quote <span className="ml-2 text-black/70">· under a minute</span>
          </p>
          {/* the sentence, filling in live */}
          <p className="text-[clamp(22px,2.4vw,34px)] font-medium leading-[1.4] tracking-[-0.01em] text-black">
            I&apos;m shipping a <Blank value={load.toLowerCase()} placeholder="load" /> from Colombo to{" "}
            <Blank value={destination} placeholder="destination" />.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-[280px_1fr] md:gap-10">
          {/* rail: live estimate */}
          <dl className="hidden self-start border border-black md:block">
            <div className="bg-black px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] text-white">Your quote</div>
            {[
              ["Load", load],
              ["To", destination],
              ["Transit", transit ? `${transit}` : ""],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-black/10 px-4 py-2.5 last:border-0">
                <dt className="text-[11px] uppercase tracking-[0.12em] text-black/50">{k}</dt>
                <dd className={`text-right text-[13px] ${v ? "text-black" : "text-black/30"}`}>{v || "—"}</dd>
              </div>
            ))}
          </dl>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-black/60">01 · What are you shipping?</p>
              <div role="radiogroup" aria-label="Load" className="mt-3 grid grid-cols-2 gap-2">
                {LOADS.map((o) => (
                  <Option key={o.v} title={o.v} hint={o.hint} selected={load === o.v} onClick={() => setLoad(o.v)} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-black/60">02 · Where is it going?</p>
              <div role="radiogroup" aria-label="Destination" className="mt-3 grid grid-cols-2 gap-2">
                {DESTINATIONS.map((o) => (
                  <Option
                    key={o.v}
                    title={o.v}
                    hint={`Est. ${o.transit}`}
                    selected={destination === o.v}
                    onClick={() => setDestination(o.v)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-stretch gap-3 border-t border-black/15 pt-6 sm:flex-row sm:items-center sm:justify-end md:ml-[320px]">
          <p className="text-[13px] text-black/60 sm:mr-auto">
            {transit ? `Est. ${transit} door to door. ` : ""}Next: what&apos;s inside, timing and services.
          </p>
          <Link
            href={href}
            className="flex h-[52px] items-center justify-center bg-[#ffe500] px-8 text-[15px] font-medium text-black transition-transform hover:scale-[1.03]"
          >
            Continue your quote →
          </Link>
        </div>
      </div>
    </section>
  );
}
