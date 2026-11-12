"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SiteHeader from "../components/SiteHeader";
import Footer from "../components/sections/Footer";
import { CheckIcon, WhatsAppIcon } from "../components/Icons";

const WHATSAPP = "94112307748";
const SALES_EMAIL = "info.sl@cargoworldwideinc.com";
const Y = "#ffe500";

const LOADS = [
  { v: "20 ft container", hint: "Up to ~28 m³" },
  { v: "40 ft container", hint: "Up to ~58 m³" },
  { v: "Pallet", hint: "One or a few pallets" },
  { v: "Loose cargo", hint: "Boxes, cartons, LCL" },
];

const CARGO_SUGGESTIONS = ["Apparel", "Tea & spices", "FMCG", "Machinery", "Furniture"];

const DESTINATIONS = [
  { v: "Los Angeles", transit: "26–32 days" },
  { v: "Houston", transit: "30–36 days" },
  { v: "New York", transit: "32–38 days" },
  { v: "West Virginia", transit: "34–40 days" },
];

// Phrased to complete "…ready by ___."
const READY = ["next week", "the end of the month", "next month", "a flexible date"];

const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const SERVICES = [
  { v: "Ocean freight", hint: "FCL & LCL sailings" },
  { v: "Air freight", hint: "When time is critical" },
  { v: "Customs brokerage", hint: "We clear it at the US port" },
  { v: "Warehousing", hint: "Our own US warehouses" },
  { v: "Final-mile trucking", hint: "To the buyer's door" },
  { v: "Project cargo", hint: "Oversized & heavy-lift" },
];

const STEPS = ["Load", "Cargo", "Destination", "Timing", "Services", "Contact", "Review"] as const;

type Data = {
  load: string;
  cargo: string;
  destination: string;
  ready: string;
  services: string[];
  name: string;
  contact: string;
};

function Tile({
  selected,
  onClick,
  title,
  hint,
  multi,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  hint?: string;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={selected}
      onClick={onClick}
      className={`group flex min-h-[76px] w-full items-center justify-between gap-4 border px-5 py-4 text-left transition-all duration-200 active:scale-[0.99] ${
        selected ? "border-black bg-[#ffe500]" : "border-black/20 bg-white hover:border-black"
      }`}
    >
      <span>
        <span className="block text-[17px] font-medium leading-tight text-black">{title}</span>
        {hint && <span className="mt-1 block text-[13px] text-black/60">{hint}</span>}
      </span>
      <span
        className={`flex size-6 shrink-0 items-center justify-center border transition-colors ${
          multi ? "" : "rounded-full"
        } ${selected ? "border-black bg-black text-[#ffe500]" : "border-black/30 text-transparent"}`}
      >
        <CheckIcon className="h-3.5 w-3.5" />
      </span>
    </button>
  );
}

export default function QuotePage() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [ref, setRef] = useState("Q-1042");
  const [d, setD] = useState<Data>({
    load: "",
    cargo: "",
    destination: "",
    ready: "",
    services: ["Ocean freight"],
    name: "",
    contact: "",
  });
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRef(`Q-${Math.floor(1000 + Math.random() * 9000)}`);
  }, []);

  const set = <K extends keyof Data>(k: K, v: Data[K]) => setD((p) => ({ ...p, [k]: v }));

  const valid = [
    !!d.load,
    d.cargo.trim().length > 1,
    !!d.destination,
    !!d.ready,
    d.services.length > 0,
    d.name.trim().length > 1 && d.contact.trim().length > 4,
    true,
  ];

  const go = (to: number) => {
    setDir(to > step ? 1 : -1);
    setStep(Math.max(0, Math.min(STEPS.length - 1, to)));
  };
  const next = () => valid[step] && go(step + 1);
  const back = () => go(step - 1);

  // Single-choice steps advance on tap, with a short beat so the selection registers.
  const pick = <K extends keyof Data>(k: K, v: Data[K]) => {
    set(k, v);
    window.setTimeout(() => {
      setDir(1);
      setStep((s) => Math.min(STEPS.length - 1, s + 1));
    }, 260);
  };

  // Focus the first field of each step for keyboard users.
  useEffect(() => {
    const el = panelRef.current?.querySelector<HTMLElement>("input, button[aria-checked]");
    el?.focus({ preventScroll: true });

    // Bring the start of the flow back into view if the user had scrolled past it.
    const wrap = panelRef.current?.parentElement;
    if (wrap && step > 0) {
      const top = wrap.getBoundingClientRect().top + window.scrollY - 76;
      if (window.scrollY > top) window.scrollTo({ top, behavior: "smooth" });
    }
  }, [step]);

  const transit = DESTINATIONS.find((x) => x.v === d.destination)?.transit ?? "—";

  const summary = useMemo(
    () =>
      [
        `Quote request ${ref}`,
        `Name: ${d.name || "—"} (${d.contact || "—"})`,
        `Shipping: ${d.load || "—"} of ${d.cargo || "cargo"}`,
        `Route: Colombo → ${d.destination || "—"} (est. ${transit})`,
        `Ready: ${d.ready || "—"}`,
        `Services: ${d.services.join(", ") || "—"}`,
      ].join("\n"),
    [ref, d, transit]
  );

  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(summary)}`;
  const mailHref = `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(
    `Quote request ${ref} — Colombo to ${d.destination || "US"}`
  )}&body=${encodeURIComponent(summary)}`;

  const progress = ((step + 1) / STEPS.length) * 100;

  const rows: [string, string, number][] = [
    ["Load", d.load, 0],
    ["Cargo", d.cargo, 1],
    ["To", d.destination ? `${d.destination} · ${transit}` : "", 2],
    ["Ready", d.ready, 3],
    ["Services", d.services.join(", "), 4],
    ["Contact", d.name ? `${d.name} · ${d.contact}` : "", 5],
  ];

  return (
    <main className="flex w-full flex-col bg-white">
      <SiteHeader />

      {/* Slim title strip — the first question stays above the fold */}
      <section className="w-full border-b border-black/15 bg-white pt-[60px]">
        <div className="mx-auto flex w-full max-w-[1280px] items-end justify-between gap-6 px-6 pb-6 pt-8 lg:px-10 lg:pt-14">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-black/60">Get a quote</p>
            <p className="mt-2 text-[15px] text-black/70">One question at a time · about a minute</p>
          </div>
        </div>
      </section>

      <section className="w-full bg-white">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 px-6 pb-32 pt-8 lg:grid-cols-[1fr_340px] lg:gap-16 lg:px-10">
          {/* Wizard */}
          <div>
            {/* Progress */}
            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-black/60">
              <span>
                Step {step + 1} of {STEPS.length} · {STEPS[step]}
              </span>
              <span className="tabular-nums">{ref}</span>
            </div>
            <div className="mt-3 h-[3px] w-full bg-black/10">
              <div
                className="h-full bg-black transition-[width] duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* The sentence — fills in live as each step is answered */}
            <p className="mt-8 text-[clamp(22px,2.6vw,34px)] leading-[1.55] text-black">
              I&apos;m shipping a{" "}
              <Blank value={d.load.toLowerCase()} placeholder="load" active={step === 0} onClick={() => go(0)} /> of{" "}
              <Blank value={d.cargo.trim().toLowerCase()} placeholder="cargo" active={step === 1} onClick={() => go(1)} />{" "}
              from Colombo to{" "}
              <Blank value={d.destination} placeholder="destination" active={step === 2} onClick={() => go(2)} /> ready
              by <Blank value={d.ready} placeholder="date" active={step === 3} onClick={() => go(3)} />.
            </p>

            {/* Panel */}
            <div
              key={step}
              ref={panelRef}
              className="mt-10 min-h-[420px] border-t border-black/15 pt-8"
              style={{ animation: `${dir === 1 ? "q-in-r" : "q-in-l"} 380ms cubic-bezier(.32,.72,0,1)` }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && step !== STEPS.length - 1) {
                  e.preventDefault();
                  next();
                }
              }}
            >
              {step === 0 && (
                <Step q="What are you shipping?" sub="Pick the closest fit — we'll confirm the details.">
                  <div role="radiogroup" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {LOADS.map((o) => (
                      <Tile key={o.v} title={o.v} hint={o.hint} selected={d.load === o.v} onClick={() => pick("load", o.v)} />
                    ))}
                  </div>
                </Step>
              )}

              {step === 1 && (
                <Step q="What's inside?" sub="A word or two is enough.">
                  <input
                    value={d.cargo}
                    onChange={(e) => set("cargo", e.target.value)}
                    placeholder="e.g. Cotton garments"
                    aria-label="Cargo type"
                    className="w-full border-b-2 border-black bg-transparent pb-3 text-[clamp(24px,3vw,36px)] text-black placeholder:text-black/25 focus:outline-none"
                  />
                  <div className="mt-6 flex flex-wrap gap-2">
                    {CARGO_SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => set("cargo", s)}
                        className={`border px-4 py-2 text-[14px] transition-colors ${
                          d.cargo === s ? "border-black bg-[#ffe500]" : "border-black/20 hover:border-black"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </Step>
              )}

              {step === 2 && (
                <Step q="Where is it going?" sub="From Colombo to one of our own US warehouses.">
                  <div role="radiogroup" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {DESTINATIONS.map((o) => (
                      <Tile
                        key={o.v}
                        title={o.v}
                        hint={`Est. ${o.transit} door to door`}
                        selected={d.destination === o.v}
                        onClick={() => pick("destination", o.v)}
                      />
                    ))}
                  </div>
                </Step>
              )}

              {step === 3 && (
                <Step q="When will it be ready?" sub="Pick a date, or a rough idea is fine.">
                  <div role="radiogroup" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {READY.map((o) => (
                      <Tile
                        key={o}
                        title={o.charAt(0).toUpperCase() + o.slice(1)}
                        selected={d.ready === o}
                        onClick={() => pick("ready", o)}
                      />
                    ))}
                  </div>
                  <label className="mt-6 flex min-h-[76px] items-center justify-between gap-4 border border-black/20 px-5 py-4 focus-within:border-black">
                    <span className="text-[17px] font-medium text-black">A specific date</span>
                    <input
                      type="date"
                      aria-label="Ready by date"
                      min={new Date().toISOString().slice(0, 10)}
                      onChange={(e) => e.target.value && pick("ready", fmtDate(e.target.value))}
                      className="bg-transparent text-[16px] text-black focus:outline-none"
                    />
                  </label>
                </Step>
              )}

              {step === 4 && (
                <Step q="Which services do you need?" sub="Choose as many as you like.">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {SERVICES.map((o) => {
                      const on = d.services.includes(o.v);
                      return (
                        <Tile
                          key={o.v}
                          multi
                          title={o.v}
                          hint={o.hint}
                          selected={on}
                          onClick={() =>
                            set("services", on ? d.services.filter((x) => x !== o.v) : [...d.services, o.v])
                          }
                        />
                      );
                    })}
                  </div>
                </Step>
              )}

              {step === 5 && (
                <Step q="Where should we send your quote?" sub="We usually reply within one business day.">
                  <div className="space-y-8">
                    <label className="block">
                      <span className="text-[11px] uppercase tracking-[0.16em] text-black/60">Your name</span>
                      <input
                        value={d.name}
                        onChange={(e) => set("name", e.target.value)}
                        autoComplete="name"
                        placeholder="Full name"
                        className="mt-2 w-full border-b-2 border-black bg-transparent pb-3 text-[clamp(20px,2.4vw,28px)] text-black placeholder:text-black/25 focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="text-[11px] uppercase tracking-[0.16em] text-black/60">
                        Email or WhatsApp number
                      </span>
                      <input
                        value={d.contact}
                        onChange={(e) => set("contact", e.target.value)}
                        autoComplete="email"
                        placeholder="name@company.com or +94 …"
                        className="mt-2 w-full border-b-2 border-black bg-transparent pb-3 text-[clamp(20px,2.4vw,28px)] text-black placeholder:text-black/25 focus:outline-none"
                      />
                    </label>
                  </div>
                </Step>
              )}

              {step === 6 && (
                <Step q="All set. Ready to send?" sub="Check the details — tap any line to change it.">
                  <dl className="border-t border-black">
                    {rows.map(([k, v, s]) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => go(s)}
                        className="group grid w-full grid-cols-[110px_1fr_auto] items-baseline gap-4 border-b border-black/15 py-4 text-left hover:bg-black/[0.03]"
                      >
                        <dt className="text-[11px] uppercase tracking-[0.16em] text-black/60">{k}</dt>
                        <dd className="text-[16px] text-black">{v || "—"}</dd>
                        <span className="text-[12px] text-black/40 group-hover:text-black">Edit</span>
                      </button>
                    ))}
                  </dl>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-14 flex-1 items-center justify-center gap-2 bg-[#ffe500] px-6 text-[16px] font-medium text-black transition-transform active:scale-[0.99]"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      Send on WhatsApp
                    </a>
                    <a
                      href={mailHref}
                      className="flex h-14 flex-1 items-center justify-center border border-black px-6 text-[16px] text-black transition-colors hover:bg-black hover:text-white"
                    >
                      Send by email
                    </a>
                  </div>
                </Step>
              )}
            </div>

            {/* Nav — sticky on mobile like an app */}
            {step < STEPS.length - 1 && (
              <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/15 bg-white/95 px-6 py-3 backdrop-blur lg:px-10 lg:py-4">
                <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={back}
                    disabled={step === 0}
                    className="h-12 px-2 text-[15px] text-black disabled:opacity-0"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    disabled={!valid[step]}
                    className="h-12 min-w-[160px] bg-black px-8 text-[15px] font-medium text-white transition-all disabled:bg-black/15 disabled:text-black/40"
                  >
                    {step === STEPS.length - 2 ? "Review" : "Continue"}
                  </button>
                </div>
              </div>
            )}
            {step === STEPS.length - 1 && (
              <button type="button" onClick={back} className="mt-8 text-[15px] text-black">
                ← Back
              </button>
            )}
          </div>

          {/* Live summary */}
          <aside className="hidden lg:block">
            <div className="sticky top-[88px] border border-black">
              <div className="flex items-center justify-between bg-black px-5 py-3">
                <span className="text-[11px] uppercase tracking-[0.16em] text-white">Your quote</span>
                <span className="px-2 py-0.5 text-[11px] text-black" style={{ background: Y }}>
                  {ref}
                </span>
              </div>
              <dl>
                {rows.map(([k, v, s]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-black/10 px-5 py-3 last:border-0">
                    <dt className="text-[12px] uppercase tracking-[0.12em] text-black/50">{k}</dt>
                    <dd className={`text-right text-[14px] ${v ? "text-black" : "text-black/30"}`}>
                      {v || (s === step ? "…" : "—")}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <style>{`
        @keyframes q-in-r { from { opacity: 0; transform: translateX(28px) } to { opacity: 1; transform: none } }
        @keyframes q-in-l { from { opacity: 0; transform: translateX(-28px) } to { opacity: 1; transform: none } }
        @media (prefers-reduced-motion: reduce) { [style*="q-in"] { animation: none !important } }
      `}</style>

      <Footer />
    </main>
  );
}

function Blank({
  value,
  placeholder,
  active,
  onClick,
}: {
  value: string;
  placeholder: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Edit ${placeholder}`}
      className={`mx-0.5 inline border-b-2 px-1.5 align-baseline transition-colors duration-200 ${
        active
          ? "border-black bg-[#ffe500] text-black"
          : value
            ? "border-black text-black hover:bg-[#ffe500]/50"
            : "border-black/25 text-black/30 hover:border-black/60"
      }`}
    >
      {value || placeholder}
    </button>
  );
}

function Step({ q, sub, children }: { q: string; sub?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[clamp(22px,2.2vw,30px)] text-black">{q}</h2>
      {sub && <p className="mt-2 text-[15px] text-black/60">{sub}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}
