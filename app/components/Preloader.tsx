"use client";

import { useEffect, useState } from "react";

/**
 * Page loader built from the GWW logo, redrawn as SVG.
 *
 * The slanted frame draws itself, the big "C" sweeps round, "GWW" rises in,
 * and the three speed bars shoot in and keep pulsing while the page loads.
 * Once the page has loaded (and a short minimum has passed) the blue panel
 * lifts away and `preloader:done` is dispatched so the hero can start.
 *
 * It is rendered on the server so it covers the first paint. If scripts
 * never run, a CSS fallback hides it after a few seconds.
 */

const MIN_MS = 1700; // long enough for the logo to finish drawing
const MAX_MS = 4500; // never hold the page longer than this

declare global {
  interface Window {
    __preloaderDone?: boolean;
  }
}

export default function Preloader() {
  const [phase, setPhase] = useState<"loading" | "leaving" | "gone">("loading");

  useEffect(() => {
    const finish = () => {
      window.__preloaderDone = true;
      window.dispatchEvent(new Event("preloader:done"));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("gone");
      finish();
      return;
    }

    const started = performance.now();
    let leaveTimer = 0;
    const leave = () => {
      if (leaveTimer) return;
      const wait = Math.max(0, MIN_MS - (performance.now() - started));
      leaveTimer = window.setTimeout(() => {
        setPhase("leaving");
        finish(); // the page starts animating while the panel lifts
        window.setTimeout(() => setPhase("gone"), 900);
      }, wait);
    };

    if (document.readyState === "complete") leave();
    else window.addEventListener("load", leave, { once: true });
    const cap = window.setTimeout(leave, MAX_MS);

    return () => {
      window.removeEventListener("load", leave);
      window.clearTimeout(cap);
      window.clearTimeout(leaveTimer);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      data-preloader
      role="status"
      aria-label="Loading"
      className={`gww-loader fixed inset-0 z-[2000] flex items-center justify-center bg-[#1e3a8a] ${
        phase === "leaving" ? "is-leaving" : ""
      }`}
    >
      <svg viewBox="0 0 780 320" className="w-[min(72vw,420px)] overflow-visible" aria-hidden="true">
        {/* slanted rounded frame — double line, like the logo */}
        <path
          className="gww-frame"
          pathLength={1}
          d="M128 10 H742 Q770 10 762 38 L704 282 Q697 310 668 310 H38 Q10 310 18 282 L78 38 Q85 10 128 10 Z"
          fill="none"
          stroke="#fff"
          strokeWidth="5"
        />
        <path
          className="gww-frame gww-frame--inner"
          pathLength={1}
          d="M134 20 H732 Q756 20 749 44 L694 274 Q688 300 662 300 H46 Q22 300 29 276 L86 44 Q92 20 134 20 Z"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeOpacity="0.7"
        />

        {/* the big C, open on the right */}
        <circle
          className="gww-c"
          cx="200"
          cy="160"
          r="96"
          fill="none"
          stroke="#fff"
          strokeWidth="44"
          strokeLinecap="round"
          pathLength={100}
          transform="rotate(40 200 160)"
        />

        {/* GWW, rising in letter by letter */}
        <g className="gww-letters" fill="#fff" fontFamily="var(--font-inter), Arial, sans-serif" fontWeight="800">
          <text className="gww-l gww-l1" x="152" y="214" fontSize="150">G</text>
          <text className="gww-l gww-l2" x="290" y="214" fontSize="150">W</text>
          <text className="gww-l gww-l3" x="420" y="214" fontSize="150">W</text>
        </g>
        <text
          className="gww-tag"
          x="304"
          y="252"
          fill="#fff"
          fontSize="27"
          fontWeight="700"
          letterSpacing="1"
          fontFamily="var(--font-inter), Arial, sans-serif"
        >
          CARGO WORLDWIDE
        </text>

        {/* speed bars: shoot in, then keep pulsing while loading */}
        <g fill="#fff">
          <rect className="gww-bar gww-bar1" x="582" y="84" width="176" height="30" rx="15" />
          <rect className="gww-bar gww-bar2" x="612" y="144" width="132" height="30" rx="15" />
          <rect className="gww-bar gww-bar3" x="650" y="202" width="80" height="30" rx="15" />
        </g>
      </svg>

      <style>{`
        .gww-loader { transition: transform .85s cubic-bezier(.77,0,.18,1); animation: gww-fallback 0s 6s forwards; }
        .gww-loader.is-leaving { transform: translateY(-100%); }
        .gww-loader.is-leaving svg { transition: opacity .35s ease, transform .6s cubic-bezier(.77,0,.18,1); opacity: 0; transform: translateY(-40px); }
        @keyframes gww-fallback { to { visibility: hidden; } }

        .gww-frame { stroke-dasharray: 1; stroke-dashoffset: 1; animation: gww-draw .9s cubic-bezier(.65,0,.35,1) forwards; }
        .gww-frame--inner { animation-delay: .12s; }
        @keyframes gww-draw { to { stroke-dashoffset: 0; } }

        .gww-c { stroke-dasharray: 78 100; stroke-dashoffset: 78; animation: gww-c .8s cubic-bezier(.65,0,.35,1) .2s forwards; }
        @keyframes gww-c { to { stroke-dashoffset: 0; } }

        .gww-l { opacity: 0; transform: translateY(26px); animation: gww-rise .55s cubic-bezier(.2,.8,.2,1) forwards; }
        .gww-l1 { animation-delay: .5s; } .gww-l2 { animation-delay: .62s; } .gww-l3 { animation-delay: .74s; }
        @keyframes gww-rise { to { opacity: 1; transform: none; } }

        .gww-tag { opacity: 0; animation: gww-fade .5s ease .95s forwards; }
        @keyframes gww-fade { to { opacity: 1; } }

        .gww-bar { transform-box: fill-box; transform-origin: right center; transform: scaleX(0); opacity: 0;
          animation: gww-shoot .5s cubic-bezier(.2,.8,.2,1) forwards, gww-pulse 1.1s ease-in-out infinite; }
        .gww-bar1 { animation-delay: .85s, 1.4s; } .gww-bar2 { animation-delay: .95s, 1.5s; } .gww-bar3 { animation-delay: 1.05s, 1.6s; }
        @keyframes gww-shoot { to { transform: scaleX(1); opacity: 1; } }
        @keyframes gww-pulse { 0%,100% { transform: scaleX(1); opacity: 1; } 50% { transform: scaleX(.55); opacity: .55; } }

        @media (prefers-reduced-motion: reduce) { .gww-loader { display: none; } }
      `}</style>
    </div>
  );
}
