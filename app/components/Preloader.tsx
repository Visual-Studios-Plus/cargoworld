"use client";

import { useEffect, useState } from "react";

/**
 * Page loader built on the GWW logo.
 *
 * The panel holds the screen while the page's images load in the background,
 * then lifts away and fires `preloader:done` so the hero can start. Assets are
 * preloaded through the HTTP cache, so nothing is downloaded twice; if the
 * network stalls the loader releases at a cap and the remaining images keep
 * streaming in behind the page.
 */

const MIN_MS = 850; // let the logo settle before lifting
const MAX_MS = 6000; // never hold the page longer than this
const FAILSAFE_MS = 7500;

// Fetch order: the first screen first, the long-tail logos last.
const FIRST = [
  "/figma/img/logo.webp",
  "/figma/img/container-front.webp",
  "/figma/img/container-back.webp",
  "/figma/img/bento-1.jpg",
  "/figma/img/bento-2.jpg",
  "/figma/img/bento-3.jpg",
  "/figma/img/bento-4.jpg",
];

declare global {
  interface Window {
    __preloaderDone?: boolean;
  }
}

function collectAssets() {
  const urls = new Set<string>(FIRST);
  document.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
    const src = img.currentSrc || img.src;
    if (src) urls.add(src);
  });

  const rank = (u: string) => {
    const i = FIRST.findIndex((p) => u.includes(p));
    return i === -1 ? FIRST.length : i;
  };
  return Array.from(urls).sort((a, b) => rank(a) - rank(b));
}

export default function Preloader() {
  const [phase, setPhase] = useState<"loading" | "leaving" | "gone">("loading");

  useEffect(() => {
    const finish = () => {
      window.__preloaderDone = true;
      window.dispatchEvent(new Event("preloader:done"));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // The stylesheet hides the panel for reduced motion; just release the page.
      finish();
      return;
    }

    const started = performance.now();
    let released = false;
    let leaveTimer = 0;
    let capTimer = 0;

    // Every page image, plus fonts and the window load event.
    const assets = collectAssets();
    const total = assets.length + 2;
    let done = 0;

    const release = () => {
      if (released) return;
      released = true;
      const wait = Math.max(0, MIN_MS - (performance.now() - started));
      leaveTimer = window.setTimeout(() => {
        setPhase("leaving");
        finish(); // the page starts animating while the panel lifts
        window.setTimeout(() => setPhase("gone"), 900);
      }, wait);
    };

    const bump = () => {
      done = Math.min(total, done + 1);
      if (done >= total) release();
    };

    assets.forEach((src) => {
      const img = new window.Image();
      img.decoding = "async";
      img.onload = bump;
      img.onerror = bump;
      img.src = src;
    });

    if (document.fonts?.ready) {
      document.fonts.ready.then(bump).catch(bump);
    } else {
      bump();
    }
    if (document.readyState === "complete") bump();
    else window.addEventListener("load", bump, { once: true });

    capTimer = window.setTimeout(release, MAX_MS);
    const failSafe = window.setTimeout(() => {
      setPhase("gone");
      finish();
    }, FAILSAFE_MS);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(capTimer);
      window.clearTimeout(failSafe);
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
      <div className="w-[min(76vw,360px)]">
        {/* Raw <img> on purpose: the loader logo must paint instantly, without
            waiting on the image optimiser. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma/img/logo.webp"
          alt="Cargo World Wide"
          width={779}
          height={320}
          decoding="async"
          fetchPriority="high"
          className="gww-logo h-auto w-full [filter:brightness(0)_invert(1)]"
        />
      </div>
      <link rel="preload" as="image" href="/figma/img/logo.webp" fetchPriority="high" />

      <style>{`
        .gww-loader { transition: transform .85s cubic-bezier(.77,0,.18,1), visibility .85s; animation: gww-fallback 0s ${FAILSAFE_MS}ms forwards; }
        .gww-loader.is-leaving { transform: translateY(-100%); }
        .gww-loader.is-leaving > div { transition: opacity .3s ease; opacity: 0; }

        .gww-logo {
          opacity: 0;
          transform: translateY(14px) scale(.985);
          animation:
            gww-logo-in .8s cubic-bezier(.2,.8,.2,1) .05s forwards,
            gww-breathe 2.4s ease-in-out 1s infinite;
        }
        @keyframes gww-logo-in { to { opacity: 1; transform: none; } }
        @keyframes gww-breathe { 0%, 100% { opacity: 1 } 50% { opacity: .62 } }

        @keyframes gww-fallback { to { visibility: hidden; } }

        @media (prefers-reduced-motion: reduce) {
          .gww-loader { display: none; }
          .gww-logo { opacity: 1; transform: none; animation: none; }
        }
      `}</style>
    </div>
  );
}
