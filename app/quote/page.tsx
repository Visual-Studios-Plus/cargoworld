"use client";

import { useEffect, useMemo, useState } from "react";
import SiteHeader from "../components/SiteHeader";
import PageHero from "../components/PageHero";
import Footer from "../components/sections/Footer";
import { CheckIcon, DocIcon, WhatsAppIcon } from "../components/Icons";

const WHATSAPP = "94112307748";
const SALES_EMAIL = "info.sl@cargoworldwideinc.com";

const LOADS = ["20 ft container", "40 ft container", "Pallet", "Loose Cargo"];
const DESTINATIONS = ["Houston", "Los Angeles", "New York", "West Virginia"];

const TRANSIT: Record<string, string> = {
  Houston: "30–36 days",
  "Los Angeles": "26–32 days",
  "New York": "32–38 days",
  "West Virginia": "34–40 days",
};

const ADDONS = [
  "Ocean freight",
  "Air freight",
  "Customs brokerage",
  "Transportation",
  "Warehousing",
  "4PL services",
  "Project cargo",
];

const PAPERWORK = ["Commercial Invoice", "Packing List", "Certificate of Origin"];

function Field({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative mx-1 inline-flex items-center bg-[#ffffff] ring-1 ring-inset ring-[#1e3a8a]/15 transition-colors focus-within:ring-2 focus-within:ring-black">
      {children}
    </span>
  );
}

export default function QuotePage() {
  const [load, setLoad] = useState(LOADS[1]);
  const [cargo, setCargo] = useState("");
  const [destination, setDestination] = useState(DESTINATIONS[0]);
  const [readyBy, setReadyBy] = useState("");
  const [addons, setAddons] = useState<string[]>(["Ocean freight"]);
  const [ref, setRef] = useState("Q-1042");

  useEffect(() => {
    setRef(`Q-${Math.floor(1000 + Math.random() * 9000)}`);
  }, []);

  const toggleAddon = (a: string) =>
    setAddons((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );

  const cargoText = cargo.trim() || "cargo";
  const transit = TRANSIT[destination];

  const summary = useMemo(() => {
    const lines = [
      `Quote request ${ref}`,
      `Shipping: ${load} of ${cargoText}`,
      `From: Colombo  →  To: ${destination}`,
      readyBy ? `Ready by: ${readyBy}` : `Ready by: to be confirmed`,
      `Estimated transit: ${transit}`,
      addons.length ? `Services: ${addons.join(", ")}` : `Services: to be advised`,
      `Paperwork: ${PAPERWORK.join(", ")}`,
    ];
    return lines.join("\n");
  }, [ref, load, cargoText, destination, readyBy, transit, addons]);

  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(summary)}`;
  const mailHref = `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(
    `Quote request ${ref} — Colombo to ${destination}`
  )}&body=${encodeURIComponent(summary)}`;

  return (
    <main className="flex w-full flex-col bg-[#ffffff]">
      <SiteHeader />

      <PageHero
        image="/figma/img/services/service-1.webp"
        title={<>tell us your shipment in one sentence</>}
        description="No long forms. Fill in the blanks, pick your services, and send it straight to our team."
      >
        <span className="bg-[#ffe500] px-4 py-1.5 font-dm text-[12px] font-medium uppercase tracking-[0.12em] text-black">
          Reference {ref}
        </span>
      </PageHero>

      <section className="w-full bg-[#ffffff]">
        <div data-section className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-8 px-6 lg:px-10 pb-[clamp(56px,7vw,112px)] pt-[clamp(40px,5vw,80px)] lg:grid-cols-[1.4fr_1fr]">
          {/* Builder */}
          <div data-reveal>
            {/* Sentence */}
            <div className="border border-[#d8d8d8] bg-[#ffffff] p-7 sm:p-9">
              <p className="font-syne text-[clamp(20px,2.1vw,30px)] font-medium leading-[1.9] tracking-[-0.01em] text-[#1e3a8a]">
                I&apos;m shipping a
                <Field>
                  <select
                    aria-label="Load type"
                    value={load}
                    onChange={(e) => setLoad(e.target.value)}
                    className="cursor-pointer appearance-none bg-transparent px-3 py-1.5 pr-8 font-syne text-[#1e3a8a] focus:outline-none"
                  >
                    {LOADS.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-2.5 h-4 w-4 text-[#1e3a8a]/50"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </Field>
                of
                <Field>
                  <input
                    aria-label="Cargo type"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    placeholder="cargo type"
                    size={Math.max(cargo.length || 10, 8)}
                    className="bg-transparent px-3 py-1.5 font-syne text-[#1e3a8a] placeholder:text-[#1e3a8a]/40 focus:outline-none"
                  />
                </Field>
                from
                <Field>
                  <span className="px-3 py-1.5 font-syne text-[#1e3a8a]">
                    Colombo
                  </span>
                </Field>
                to
                <Field>
                  <select
                    aria-label="Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="cursor-pointer appearance-none bg-transparent px-3 py-1.5 pr-8 font-syne text-[#1e3a8a] focus:outline-none"
                  >
                    {DESTINATIONS.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-2.5 h-4 w-4 text-[#1e3a8a]/50"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </Field>
                ready by
                <Field>
                  <input
                    type="date"
                    aria-label="Ready by date"
                    value={readyBy}
                    onChange={(e) => setReadyBy(e.target.value)}
                    className="cursor-pointer bg-transparent px-3 py-1.5 font-syne text-[#1e3a8a] focus:outline-none"
                  />
                </Field>
                .
              </p>
            </div>

            {/* Add-ons */}
            <div className="mt-8">
              <h2 className="font-cal text-[22px] font-medium text-[#1e3a8a]">
                Add services
              </h2>
              <p className="mt-1 font-cal text-[14px] text-black/60">
                Select everything you need — tap to toggle.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2" data-stagger>
                {ADDONS.map((a) => {
                  const checked = addons.includes(a);
                  return (
                    <button
                      key={a}
                      type="button"
                      role="checkbox"
                      aria-checked={checked}
                      onClick={() => toggleAddon(a)}
                      className={`flex items-center gap-3 border px-4 py-3.5 text-left font-cal text-[15px] transition-all duration-300 ${
                        checked
                          ? "border-black bg-[#ffe500] text-[#1e3a8a]"
                          : "border-[#d8d8d8] bg-[#ffffff] text-[#1e3a8a]/70 hover:border-[#1e3a8a]/25"
                      }`}
                    >
                      <span
                        className={`flex size-6 shrink-0 items-center justify-center border transition-colors ${
                          checked
                            ? "border-black bg-black text-white"
                            : "border-[#cbd3de] bg-[#ffffff] text-transparent"
                        }`}
                      >
                        <CheckIcon className="h-4 w-4" />
                      </span>
                      {a}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Live preview */}
          <aside className="lg:sticky lg:top-[88px] lg:self-start" data-reveal>
            <div className="overflow-hidden border border-[#d8d8d8] bg-[#ffffff]">
              <div className="flex items-center justify-between bg-[#1e3a8a] px-6 py-4">
                <p className="font-cal text-[16px] font-medium text-white">
                  Your quote
                </p>
                <span className="bg-[#ffe500] px-3 py-1 font-dm text-[12px] font-medium text-black">
                  {ref}
                </span>
              </div>

              <div className="px-6 py-6">
                <dl className="space-y-3 font-cal text-[14.5px]">
                  <div className="flex justify-between gap-4">
                    <dt className="text-black/60">Load</dt>
                    <dd className="text-right font-medium text-[#1e3a8a]">
                      {load}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-black/60">Cargo</dt>
                    <dd className="text-right font-medium text-[#1e3a8a]">
                      {cargoText}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-black/60">Lane</dt>
                    <dd className="text-right font-medium text-[#1e3a8a]">
                      Colombo → {destination}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-black/60">Ready by</dt>
                    <dd className="text-right font-medium text-[#1e3a8a]">
                      {readyBy || "—"}
                    </dd>
                  </div>
                </dl>

                {/* Transit estimate */}
                <div className="mt-5 border border-[#d8d8d8] bg-[#ffffff] p-4">
                  <p className="font-dm text-[11px] font-medium uppercase tracking-[0.12em] text-black/60">
                    Estimated transit
                  </p>
                  <p className="mt-1 font-syne text-[26px] font-medium text-[#1e3a8a]">
                    {transit}
                  </p>
                  <p className="font-cal text-[12px] text-black/60">
                    Weekly sailings via MSC, Maersk, ONE · our own warehouse &amp;
                    trucks at {destination}.
                  </p>
                </div>

                {/* Services */}
                <div className="mt-5">
                  <p className="font-dm text-[11px] font-medium uppercase tracking-[0.12em] text-black/60">
                    Services
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {addons.length ? (
                      addons.map((a) => (
                        <span
                          key={a}
                          className="bg-[#1e3a8a] px-3 py-1 font-cal text-[12px] text-[#ffe500]"
                        >
                          {a}
                        </span>
                      ))
                    ) : (
                      <span className="font-cal text-[13px] text-black/40">
                        None selected yet
                      </span>
                    )}
                  </div>
                </div>

                {/* Paperwork */}
                <div className="mt-5">
                  <p className="font-dm text-[11px] font-medium uppercase tracking-[0.12em] text-black/60">
                    Required paperwork
                  </p>
                  <ul className="mt-2 space-y-2">
                    {PAPERWORK.map((d) => (
                      <li
                        key={d}
                        className="flex items-center gap-2.5 font-cal text-[13.5px] text-[#1e3a8a]/70"
                      >
                        <DocIcon className="h-4 w-4 shrink-0 text-[#1e3a8a]/60" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-2 bg-[#ffe500] px-6 py-4 font-cal text-[17px] text-black transition-transform hover:scale-[1.02]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Send on WhatsApp
                </a>
                <a
                  href={mailHref}
                  className="mt-3 flex w-full items-center justify-center gap-2 border border-[#1e3a8a]/15 px-6 py-3.5 font-cal text-[15px] text-[#1e3a8a] transition-colors hover:bg-[#ffffff]"
                >
                  Email the sales team
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
