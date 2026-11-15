"use client";

import { useEffect, useRef } from "react";

const LINE = "#1e3a8a";
const ACCENT = "#ffe500";
const FONT = "var(--font-inter), system-ui, sans-serif";

type Lane = {
  id: string;
  y: number; // y of the lane's straight run
  city: string;
  sub: string;
  via: string;
  dur: string;
  begin: string;
};

const HUB = { x: 200, y: 230 };
const END_X = 750;
const STATION_X = 500;

// Colombo fans out to our own US warehouses. Lanes are 100 units apart so a
// label above one line never touches the line above it.
const LANES: Lane[] = [
  { id: "tm-la", y: 80, city: "Los Angeles", sub: "Compton, CA", via: "Transpacific · 26–32 days", dur: "3.4s", begin: "0s" },
  { id: "tm-hou", y: 180, city: "Houston", sub: "Texas", via: "Suez · Gulf · 30–36 days", dur: "3.2s", begin: "0.5s" },
  { id: "tm-ny", y: 280, city: "New York", sub: "New York", via: "Suez · Atlantic · 32–38 days", dur: "3.3s", begin: "0.9s" },
  { id: "tm-wv", y: 380, city: "West Virginia", sub: "Via East Coast", via: "Atlantic · 34–40 days", dur: "3.6s", begin: "1.3s" },
];

// 45° elbow out of the hub, then a straight run to the terminus.
const lanePath = (y: number) => {
  const dy = y - HUB.y;
  return `M${HUB.x},${HUB.y} L${HUB.x + Math.abs(dy) + 40},${y} L${END_X},${y}`;
};

const halo = {
  paintOrder: "stroke" as const,
  stroke: "#ffffff",
  strokeWidth: 5,
  strokeLinejoin: "round" as const,
};

const CSS = `
.tm-line{stroke-dasharray:1;stroke-dashoffset:0}
.tm-drawn .tm-line{animation:tm-draw 2.2s cubic-bezier(.5,0,.2,1) both}
.tm-drawn .tm-line.d1{animation-delay:.2s}
.tm-drawn .tm-line.d2{animation-delay:.4s}
.tm-drawn .tm-line.d3{animation-delay:.6s}
@keyframes tm-draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}

.tm-label{opacity:0;transition:opacity .7s ease}
.tm-drawn .tm-label{opacity:1}

.tm-pulse{opacity:0;transition:opacity .5s ease 1.2s}
.tm-drawn .tm-pulse{opacity:1}

.tm-ring{opacity:0;transform-box:fill-box;transform-origin:center}
.tm-drawn .tm-ring{animation:tm-ring 3s cubic-bezier(.2,.6,.2,1) .9s infinite}
@keyframes tm-ring{0%{opacity:.85;transform:scale(.55)}70%{opacity:0;transform:scale(1.7)}100%{opacity:0;transform:scale(1.7)}}

@media (prefers-reduced-motion: reduce){
  .tm-line,.tm-drawn .tm-line{animation:none;stroke-dashoffset:0}
  .tm-pulse{display:none}
  .tm-label{opacity:1}
  .tm-ring{display:none}
}
`;

type Props = {
  /** Drop the page-style frame and reveal wrapper — for embedding in a panel. */
  bare?: boolean;
  /** Slightly larger labels, for narrower embedded columns. */
  compact?: boolean;
};

export default function TransitMap({ bare = false, compact = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // The lanes draw when the map actually scrolls into view, not on page load.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("tm-drawn");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("tm-drawn");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -18% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const svg = (
    <svg
      viewBox="0 20 940 420"
      role="img"
      aria-label="Animated transit map: Colombo ships direct to Cargo World Wide's own US warehouses in Los Angeles, Houston, New York and West Virginia."
      className={`h-auto w-full ${bare ? "min-w-[560px]" : "min-w-[640px]"}`}
    >
      {/* Lanes (also the motion paths for the cargo pulses) */}
      {LANES.map((l, i) => (
        <path
          key={l.id}
          id={l.id}
          d={lanePath(l.y)}
          pathLength={1}
          fill="none"
          stroke={LINE}
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`tm-line d${i}`}
        />
      ))}

      {LANES.map((l) => (
        <circle key={`${l.id}-p`} r={5.5} fill={ACCENT} stroke={LINE} strokeWidth={1.5} className="tm-pulse">
          <animateMotion dur={l.dur} begin={l.begin} repeatCount="indefinite" calcMode="linear">
            <mpath href={`#${l.id}`} />
          </animateMotion>
        </circle>
      ))}

      {/* Mid-lane station + route label, set clearly above the line */}
      {LANES.map((l, i) => (
        <g
          key={`${l.id}-s`}
          className="tm-label"
          style={{ transitionDelay: `${0.45 + i * 0.12}s` }}
        >
          <circle cx={STATION_X} cy={l.y} r={6} fill="#fff" stroke={LINE} strokeWidth={2.5} />
          <text
            x={STATION_X}
            y={l.y - 18}
            textAnchor="middle"
            fontSize={compact ? 13 : 12}
            letterSpacing={0.4}
            fill={LINE}
            style={{ fontFamily: FONT, fontWeight: 600, ...halo }}
          >
            {l.via.toUpperCase()}
          </text>
        </g>
      ))}

      {/* Termini — our own US warehouses */}
      {LANES.map((l, i) => (
        <g
          key={`${l.id}-t`}
          className="tm-label"
          style={{ transitionDelay: `${0.65 + i * 0.12}s` }}
        >
          <circle cx={END_X} cy={l.y} r={11} fill={LINE} />
          <circle cx={END_X} cy={l.y} r={4.5} fill="#fff" />
          <text
            x={END_X + 22}
            y={l.y - 1}
            fontSize={compact ? 17 : 16}
            fill={LINE}
            style={{ fontFamily: FONT, fontWeight: 700, ...halo }}
          >
            {l.city.toUpperCase()}
          </text>
          <text
            x={END_X + 22}
            y={l.y + 15}
            fontSize={compact ? 12 : 11}
            letterSpacing={0.4}
            fill="#5b6675"
            style={{ fontFamily: FONT, fontWeight: 500, ...halo }}
          >
            {l.sub.toUpperCase()}
          </text>
        </g>
      ))}

      {/* Colombo hub — label sits to the left, away from every lane */}
      <g className="tm-label" style={{ transitionDelay: "0.3s" }}>
        <circle cx={HUB.x} cy={HUB.y} r={22} fill="none" stroke={ACCENT} strokeWidth={2.5} className="tm-ring" />
        <rect
          x={HUB.x - 22}
          y={HUB.y - 22}
          width={44}
          height={44}
          fill={ACCENT}
          stroke={LINE}
          strokeWidth={3}
        />
        <circle cx={HUB.x} cy={HUB.y} r={6} fill={LINE} />
        <text
          x={HUB.x - 36}
          y={HUB.y - 2}
          textAnchor="end"
          fontSize={compact ? 22 : 20}
          fill={LINE}
          style={{ fontFamily: FONT, fontWeight: 700 }}
        >
          COLOMBO
        </text>
        <text
          x={HUB.x - 36}
          y={HUB.y + 16}
          textAnchor="end"
          fontSize={compact ? 12 : 11}
          letterSpacing={0.6}
          fill="#5b6675"
          style={{ fontFamily: FONT, fontWeight: 500 }}
        >
          ORIGIN HUB · SRI LANKA
        </text>
      </g>
    </svg>
  );

  if (bare) {
    return (
      <div ref={ref} className="w-full overflow-x-auto">
        <style>{CSS}</style>
        {svg}
      </div>
    );
  }

  return (
    <div ref={ref} data-reveal className="mt-10 overflow-x-auto border border-[#d8d8d8] bg-white p-4 sm:p-8">
      <style>{CSS}</style>
      {svg}
    </div>
  );
}
