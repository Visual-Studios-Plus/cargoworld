"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckIcon, WhatsAppIcon } from "../Icons";
import {
  LOADS,
  DESTINATIONS,
  CARGO_SUGGESTIONS,
  READY,
  SERVICES,
  WHATSAPP,
  SALES_EMAIL,
  fmtDate,
} from "../../quote/options";

/**
 * Home quote — the complete quote flow, inline, without leaving the page.
 * Step 1 asks load + destination side by side (destination appears once a
 * load is picked); then cargo, timing, services, contact and a review that
 * sends the request on WhatsApp or by email. The sentence fills in live.
 */

const STEPS = ["Load", "Destination", "Cargo", "Timing", "Services", "Contact", "Review"] as const;

type Data = {
  load: string;
  cargo: string;
  destination: string;
  ready: string;
  services: string[];
  name: string;
  contact: string;
};

function Option({
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
      className={`flex min-h-[76px] w-full items-center justify-between gap-3 border px-4 py-3 text-left sm:min-h-[60px] sm:py-2.5 transition-colors duration-200 ${
        selected ? "border-black bg-[#ffe500]" : "border-black/20 bg-white hover:border-black"
      }`}
    >
      <span>
        <span className="block text-[16px] font-medium leading-tight text-black sm:text-[15px]">{title}</span>
        {hint && <span className="mt-1 block text-[13px] text-black/60 sm:mt-0.5 sm:text-[12px]">{hint}</span>}
      </span>
      <span
        className={`flex size-6 shrink-0 items-center sm:size-5 justify-center border transition-colors ${
          multi ? "" : "rounded-full"
        } ${selected ? "border-black bg-black text-[#ffe500]" : "border-black/30 text-transparent"}`}
      >
        <CheckIcon className="h-3 w-3" />
      </span>
    </button>
  );
}

function Blank({ value, placeholder, active }: { value: string; placeholder: string; active?: boolean }) {
  return (
    <span
      className={`mx-0.5 inline border-b-2 px-1.5 transition-colors duration-200 ${
        active
          ? "border-black bg-[#ffe500] text-black"
          : value
            ? "border-black text-black"
            : "border-black/25 text-black/30"
      }`}
    >
      {value || placeholder}
    </span>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] uppercase tracking-[0.16em] text-black/60">{children}</p>;
}

export default function QuickQuote() {
  const [step, setStep] = useState(0);
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

  useEffect(() => {
    setRef(`Q-${Math.floor(1000 + Math.random() * 9000)}`);
  }, []);

  const set = <K extends keyof Data>(k: K, v: Data[K]) => setD((p) => ({ ...p, [k]: v }));

  const valid = [
    !!d.load,
    !!d.destination,
    d.cargo.trim().length > 1,
    !!d.ready,
    d.services.length > 0,
    d.name.trim().length > 1 && d.contact.trim().length > 4,
    true,
  ];

  const go = (to: number) => setStep(Math.max(0, Math.min(STEPS.length - 1, to)));
  const next = () => valid[step] && go(step + 1);
  const back = () => go(step - 1);

  // Single-choice answers advance on their own, after a short beat — only from
  // the step they were answered on, so a quick "Continue" click can't double-skip.
  const advanceSoon = () => {
    const from = step;
    window.setTimeout(() => setStep((s) => (s === from ? Math.min(STEPS.length - 1, from + 1) : s)), 280);
  };

  const transit = DESTINATIONS.find((x) => x.v === d.destination)?.transit ?? "";

  const summary = useMemo(
    () =>
      [
        `Quote request ${ref}`,
        `Name: ${d.name || "—"} (${d.contact || "—"})`,
        `Shipping: ${d.load || "—"} of ${d.cargo || "cargo"}`,
        `Route: Colombo → ${d.destination || "—"} (est. ${transit || "—"})`,
        `Ready: ${d.ready || "—"}`,
        `Services: ${d.services.join(", ") || "—"}`,
      ].join("\n"),
    [ref, d, transit]
  );
  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(summary)}`;
  const mailHref = `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(
    `Quote request ${ref} — Colombo to ${d.destination || "US"}`
  )}&body=${encodeURIComponent(summary)}`;

  const rows: [string, string, number][] = [
    ["Load", d.load, 0],
    ["To", d.destination ? `${d.destination} · ${transit}` : "", 1],
    ["Cargo", d.cargo, 2],
    ["Ready", d.ready, 3],
    ["Services", d.services.join(", "), 4],
    ["Contact", d.name ? `${d.name} · ${d.contact}` : "", 5],
  ];

  const isReview = step === STEPS.length - 1;

  return (
    <section id="quick-quote" className="w-full bg-white">
      <div className="mx-auto flex min-h-[100svh] w-full max-w-[1280px] flex-col justify-center px-6 py-[clamp(48px,7vh,80px)] lg:px-10">
        {/* opener — 12-column grid shared with the other sections */}
        <div className="grid grid-cols-1 gap-y-3 md:grid-cols-12 md:gap-x-6">
          <div className="flex items-baseline justify-between gap-4 md:col-span-6 md:block lg:col-span-3">
            <p className="kicker text-black">Get a quote</p>
            <p className="text-[11px] uppercase tracking-[0.16em] text-black/50 tabular-nums md:mt-2">
              Step {step + 1} / {STEPS.length} · {STEPS[step]}
            </p>
          </div>
          {/* the sentence, filling in live */}
          <p className="text-[clamp(20px,2.2vw,32px)] font-medium md:col-span-6 lg:col-span-9 leading-[1.45] tracking-[-0.01em] text-black">
            I&apos;m shipping a <Blank value={d.load.toLowerCase()} placeholder="load" active={step === 0} /> of{" "}
            <Blank value={d.cargo.trim().toLowerCase()} placeholder="cargo" active={step === 2} /> from Colombo to{" "}
            <Blank value={d.destination} placeholder="destination" active={step === 1} /> ready by{" "}
            <Blank value={d.ready} placeholder="date" active={step === 3} />.
          </p>
        </div>

        {/* progress */}
        <div className="mt-6 h-[3px] w-full bg-black/10 md:ml-[calc(50%+12px)] lg:ml-[calc(25%+6px)] md:w-auto">
          <div
            className="h-full bg-black transition-[width] duration-500 ease-out"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-y-6 md:grid-cols-12 md:gap-x-6">
          {/* rail: live summary */}
          <dl className="hidden self-start border border-black md:col-span-6 md:block lg:col-span-3">
            <div className="flex items-center justify-between bg-black px-4 py-2.5">
              <span className="text-[11px] uppercase tracking-[0.16em] text-white">Your quote</span>
              <span className="bg-[#ffe500] px-2 py-0.5 text-[11px] text-black tabular-nums">{ref}</span>
            </div>
            {rows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-black/10 px-4 py-2 last:border-0">
                <dt className="text-[11px] uppercase tracking-[0.12em] text-black/50">{k}</dt>
                <dd className={`text-right text-[13px] ${v ? "text-black" : "text-black/30"}`}>{v || "—"}</dd>
              </div>
            ))}
          </dl>

          {/* the current question */}
          <div key={step} className="min-h-[300px] md:col-span-6 lg:col-span-9" style={{ animation: "qq-in 360ms cubic-bezier(.32,.72,0,1)" }}>
            {/* One question at a time: load first… */}
            {step === 0 && (
              <div>
                <Label>01 · What are you shipping?</Label>
                <div role="radiogroup" aria-label="Load" className="mt-3 grid grid-cols-2 gap-2">
                  {LOADS.map((o) => (
                    <Option
                      key={o.v}
                      title={o.v}
                      hint={o.hint}
                      selected={d.load === o.v}
                      onClick={() => {
                        set("load", o.v);
                        advanceSoon();
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* …then where it's going */}
            {step === 1 && (
              <div>
                <Label>02 · Where is it going?</Label>
                <div role="radiogroup" aria-label="Destination" className="mt-3 grid grid-cols-2 gap-2">
                  {DESTINATIONS.map((o) => (
                    <Option
                      key={o.v}
                      title={o.v}
                      hint={`Est. ${o.transit}`}
                      selected={d.destination === o.v}
                      onClick={() => {
                        set("destination", o.v);
                        advanceSoon();
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <Label>03 · What&apos;s inside?</Label>
                <input
                  autoFocus
                  value={d.cargo}
                  onChange={(e) => set("cargo", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && next()}
                  placeholder="e.g. Cotton garments"
                  aria-label="Cargo type"
                  className="mt-4 w-full border-b-2 border-black bg-transparent pb-3 text-[clamp(22px,2.6vw,32px)] text-black placeholder:text-black/25 focus:outline-none"
                />
                <div className="mt-5 flex flex-wrap gap-2">
                  {CARGO_SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => set("cargo", s)}
                      className={`border px-5 py-3 text-[15px] transition-colors sm:px-4 sm:py-2 sm:text-[14px] ${
                        d.cargo === s ? "border-black bg-[#ffe500]" : "border-black/20 hover:border-black"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <Label>04 · When will it be ready?</Label>
                <div role="radiogroup" className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
                  {READY.map((o) => (
                    <Option
                      key={o}
                      title={o.charAt(0).toUpperCase() + o.slice(1)}
                      selected={d.ready === o}
                      onClick={() => {
                        set("ready", o);
                        advanceSoon();
                      }}
                    />
                  ))}
                </div>
                <label className="mt-3 flex min-h-[64px] items-center justify-between gap-4 border border-black/20 px-4 py-3 focus-within:border-black">
                  <span className="text-[15px] font-medium text-black">A specific date</span>
                  <input
                    type="date"
                    aria-label="Ready by date"
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => {
                      if (!e.target.value) return;
                      set("ready", fmtDate(e.target.value));
                      advanceSoon();
                    }}
                    className="bg-transparent text-[15px] text-black focus:outline-none"
                  />
                </label>
              </div>
            )}

            {step === 4 && (
              <div>
                <Label>05 · Which services do you need? · choose any</Label>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {SERVICES.map((o) => {
                    const on = d.services.includes(o.v);
                    return (
                      <Option
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
              </div>
            )}

            {step === 5 && (
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <label className="block">
                  <Label>06 · Your name</Label>
                  <input
                    autoFocus
                    value={d.name}
                    onChange={(e) => set("name", e.target.value)}
                    autoComplete="name"
                    placeholder="Full name"
                    className="mt-3 w-full border-b-2 border-black bg-transparent pb-3 text-[clamp(20px,2.2vw,28px)] text-black placeholder:text-black/25 focus:outline-none"
                  />
                </label>
                <label className="block">
                  <Label>Email or WhatsApp number</Label>
                  <input
                    value={d.contact}
                    onChange={(e) => set("contact", e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && next()}
                    autoComplete="email"
                    placeholder="name@company.com or +94 …"
                    className="mt-3 w-full border-b-2 border-black bg-transparent pb-3 text-[clamp(20px,2.2vw,28px)] text-black placeholder:text-black/25 focus:outline-none"
                  />
                </label>
              </div>
            )}

            {isReview && (
              <div>
                <Label>All set — tap any line to change it</Label>
                <dl className="mt-3 border-t border-black">
                  {rows.map(([k, v, s]) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => go(s)}
                      className="group grid w-full grid-cols-[96px_1fr_auto] items-baseline gap-4 border-b border-black/15 py-2.5 text-left hover:bg-black/[0.03]"
                    >
                      <dt className="text-[11px] uppercase tracking-[0.16em] text-black/60">{k}</dt>
                      <dd className="text-[15px] text-black">{v || "—"}</dd>
                      <span className="text-[12px] text-black/40 group-hover:text-black">Edit</span>
                    </button>
                  ))}
                </dl>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-[60px] flex-1 items-center justify-center gap-2 bg-[#ffe500] sm:h-[52px] px-6 text-[15px] font-medium text-black transition-transform hover:scale-[1.02]"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Send on WhatsApp
                  </a>
                  <a
                    href={mailHref}
                    className="flex h-[60px] flex-1 items-center justify-center border border-black sm:h-[52px] px-6 text-[15px] text-black transition-colors hover:bg-black hover:text-white"
                  >
                    Send by email
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* nav */}
        <div className="mt-6 flex items-center justify-between gap-3 md:ml-[calc(50%+12px)] lg:ml-[calc(25%+6px)]">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="h-[56px] shrink-0 border border-black/20 px-5 text-[16px] text-black disabled:opacity-0 sm:h-11 sm:border-0 sm:px-1 sm:text-[15px]"
          >
            ← Back
          </button>
          {!isReview && (
            <button
              type="button"
              onClick={next}
              disabled={!valid[step]}
              className="h-[56px] flex-1 bg-[#ffe500] px-8 text-[16px] sm:h-[52px] sm:min-w-[170px] sm:flex-none sm:text-[15px] font-medium text-black transition-all hover:scale-[1.03] disabled:scale-100 disabled:bg-black/10 disabled:text-black/40"
            >
              {step === STEPS.length - 2 ? "Review" : "Continue →"}
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes qq-in { from { opacity: 0; transform: translateX(24px) } to { opacity: 1; transform: none } }
        @media (prefers-reduced-motion: reduce) { [style*="qq-in"] { animation: none !important } }
      `}</style>
    </section>
  );
}
