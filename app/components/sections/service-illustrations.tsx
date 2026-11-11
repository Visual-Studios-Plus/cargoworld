import type { SVGProps } from "react";

type ArtProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 200 120",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
  preserveAspectRatio: "xMidYMid meet",
  className: "service-art h-full w-full",
} as const;

export function OceanFreightArt(props: ArtProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="158" cy="32" r="17" className="ill-soft" opacity="0.55" />
      <path
        d="M18 103c12 0 12 5 24 5s12-5 24-5 12 5 24 5 12-5 24-5 12 5 24 5 12-5 24-5 12 5 24 5"
        className="art-wave ill-line-secondary"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <g className="art-bob">
        <path d="M32 78h136l-17 21H49L32 78Z" className="ill-main" />
        <rect x="44" y="63" width="112" height="17" rx="3" className="ill-main" />
        <rect x="52" y="45" width="25" height="16" rx="2.5" className="ill-accent" />
        <rect x="81" y="45" width="25" height="16" rx="2.5" className="ill-window" />
        <rect x="110" y="45" width="25" height="16" rx="2.5" className="ill-accent" />
        <rect x="66" y="29" width="25" height="14" rx="2.5" className="ill-window" />
        <rect x="95" y="29" width="25" height="14" rx="2.5" className="ill-accent" />
        <rect x="134" y="46" width="20" height="32" rx="3" className="ill-main" />
        <rect x="139" y="52" width="10" height="7" rx="1.5" className="ill-window" />
        <path
          d="M144 46V34h11"
          className="ill-line"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <circle cx="26" cy="42" r="3" className="ill-accent" />
      <circle cx="174" cy="56" r="2.5" className="ill-accent" opacity="0.7" />
    </svg>
  );
}

export function AirCargoArt(props: ArtProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="42" cy="36" r="16" className="ill-soft" opacity="0.55" />
      <path
        d="M24 98C56 82 96 58 178 22"
        className="art-path ill-line-accent"
        strokeWidth="2.5"
        strokeDasharray="3 8"
        strokeLinecap="round"
      />
      <g className="art-drift">
        <rect x="126" y="30" width="40" height="12" rx="6" className="ill-soft" />
        <rect x="144" y="50" width="32" height="10" rx="5" className="ill-soft" />
      </g>
      <g transform="translate(22 2) scale(4.35)">
        <g className="art-plane">
          <path
            d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2Z"
            className="ill-main"
          />
          <circle cx="15" cy="14" r="1.15" className="ill-accent" />
        </g>
      </g>
      <circle cx="170" cy="82" r="3" className="ill-accent" />
    </svg>
  );
}

export function LandTransportArt(props: ArtProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="160" cy="30" r="15" className="ill-soft" opacity="0.5" />
      <path
        d="M18 106h164"
        className="art-road ill-line-secondary"
        strokeWidth="2.5"
        strokeDasharray="10 9"
        strokeLinecap="round"
      />
      <g className="art-float-slow">
        <path d="M116 54h22l18 20v13h-40V54Z" className="ill-main" />
        <rect x="122" y="59" width="14" height="12" rx="2" className="ill-window" />
        <rect x="30" y="36" width="86" height="50" rx="6" className="ill-main" />
        <rect x="30" y="52" width="86" height="6" className="ill-accent" />
        <rect x="42" y="64" width="18" height="10" rx="2" className="ill-window" opacity="0.85" />
        <rect x="28" y="86" width="130" height="6" rx="3" className="ill-secondary" />
        <circle cx="153" cy="82" r="3" className="ill-accent" />
        <g className="art-wheel">
          <circle cx="58" cy="94" r="11" className="ill-main" />
          <circle cx="58" cy="94" r="4.5" className="ill-window" />
          <path d="M58 84v20M48 94h20" className="ill-line-window" strokeWidth="2" />
        </g>
        <g className="art-wheel">
          <circle cx="136" cy="94" r="11" className="ill-main" />
          <circle cx="136" cy="94" r="4.5" className="ill-window" />
          <path d="M136 84v20M126 94h20" className="ill-line-window" strokeWidth="2" />
        </g>
      </g>
      <path d="M14 44h16M10 54h12" className="ill-line-accent" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function WarehousingArt(props: ArtProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="158" cy="34" r="17" className="ill-soft" opacity="0.5" />
      <path d="M28 56 100 24l72 32-7 9-65-28-65 28-7-9Z" className="ill-accent" />
      <rect x="42" y="54" width="116" height="50" rx="4" className="ill-soft ill-line" strokeWidth="2.5" />
      <rect x="84" y="68" width="32" height="36" rx="2" className="ill-main" />
      <path d="M84 78h32M84 88h32M84 98h32" className="ill-line-window" strokeWidth="2" opacity="0.6" />
      <rect x="53" y="66" width="20" height="13" rx="2" className="ill-main" />
      <rect x="128" y="66" width="20" height="13" rx="2" className="ill-main" />
      <g className="art-hook">
        <path d="M100 32v16" className="ill-line" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="88" y="48" width="24" height="15" rx="2.5" className="ill-main" />
        <rect x="93" y="53" width="14" height="4" rx="2" className="ill-accent" />
      </g>
      <rect x="28" y="88" width="13" height="16" rx="2" className="ill-accent" />
      <rect x="166" y="92" width="10" height="12" rx="2" className="ill-accent" opacity="0.7" />
    </svg>
  );
}

export function CustomsArt(props: ArtProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="44" cy="40" r="15" className="ill-soft" opacity="0.5" />
      <rect x="58" y="16" width="84" height="86" rx="8" fill="none" className="ill-line" strokeWidth="3" />
      <path d="M118 16v20h24" fill="none" className="ill-line" strokeWidth="3" strokeLinejoin="round" />
      <path d="M74 44h52M74 57h40M74 70h46" className="ill-line-secondary" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="120" cy="82" r="13" className="ill-accent" />
      <path d="m113 82 5 5 9-10" fill="none" className="art-check ill-line-window" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <g className="art-stamp">
        <g transform="rotate(-12 48 40)">
          <rect x="39" y="27" width="24" height="17" rx="3" className="ill-accent" />
          <rect x="45" y="15" width="12" height="10" rx="3" className="ill-main" />
          <path d="M44 38h14" className="ill-line-window" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>
      <circle cx="164" cy="58" r="2.5" className="ill-accent" />
    </svg>
  );
}

export function GlobalLogisticsArt(props: ArtProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="100" cy="60" r="42" fill="none" className="ill-line" strokeWidth="2.5" />
      <ellipse cx="100" cy="60" rx="18" ry="42" fill="none" className="ill-line-secondary" strokeWidth="2" />
      <path d="M60 44h80M58 60h84M60 76h80" fill="none" className="ill-line-secondary" strokeWidth="2" />
      <g className="art-orbit">
        <ellipse cx="100" cy="60" rx="62" ry="24" fill="none" className="ill-line-accent" strokeWidth="2" strokeDasharray="4 7" />
        <circle cx="162" cy="60" r="5" className="ill-accent" />
        <circle cx="38" cy="60" r="3" className="ill-accent" opacity="0.7" />
      </g>
      <circle cx="112" cy="44" r="4" className="ill-accent" />
      <circle cx="84" cy="72" r="3" className="ill-accent" opacity="0.8" />
      <circle cx="99" cy="61" r="3" className="ill-main" />
    </svg>
  );
}

export function DigitalTrackingArt(props: ArtProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="100" cy="66" r="42" fill="none" className="ill-line-secondary" strokeWidth="2" />
      <circle cx="100" cy="66" r="27" fill="none" className="ill-line-secondary" strokeWidth="2" />
      <circle cx="100" cy="66" r="13" fill="none" className="ill-line-secondary" strokeWidth="2" />
      <path d="M100 22v88M56 66h88" fill="none" className="ill-line-secondary" strokeWidth="1.5" opacity="0.45" />
      <circle cx="100" cy="66" r="20" fill="none" className="art-pulse ill-line-accent" strokeWidth="2.5" />
      <g className="art-sweep">
        <path d="M100 66 100 24a42 42 0 0 1 34 18Z" className="ill-accent" opacity="0.22" />
        <path d="M100 66 100 24" className="ill-line-accent" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <circle cx="118" cy="52" r="3" className="ill-accent" />
      <circle cx="82" cy="82" r="2.5" className="ill-accent" opacity="0.8" />
      <g className="art-float">
        <path
          d="M138 24c-7 0-12 5-12 12 0 9 12 20 12 20s12-11 12-20c0-7-5-12-12-12Z"
          className="ill-main"
        />
        <circle cx="138" cy="36" r="4" className="ill-window" />
      </g>
    </svg>
  );
}

export function SpecialCargoArt(props: ArtProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="152" cy="36" r="16" className="ill-soft" opacity="0.5" />
      <g className="art-snow">
        <path
          d="M50 38v-8M50 38v8M50 38l-7-4M50 38l7-4M50 38l-7 4M50 38l7 4M45 43l-3 3M55 33l3-3M45 33l-3-3M55 43l3 3"
          fill="none"
          className="ill-line"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>
      <path d="M70 44 100 28l30 16-30 16-30-16Z" className="ill-accent" />
      <path d="M70 44v32l30 16V60L70 44Z" className="ill-main" />
      <path d="M130 44v32l-30 16V60l30-16Z" className="ill-secondary" />
      <path d="M85 52v20M115 52v20M70 62l30 16" className="ill-line-window" strokeWidth="2" opacity="0.55" />
      <rect x="79" y="58" width="14" height="9" rx="2" className="ill-window" />
      <path d="M146 84a18 18 0 0 1 36 0" fill="none" className="ill-line-secondary" strokeWidth="2.5" strokeLinecap="round" />
      <g className="art-needle">
        <path d="M164 84V71" className="ill-line-accent" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <circle cx="164" cy="84" r="4" className="ill-main" />
      <circle cx="30" cy="72" r="2.5" className="ill-accent" />
      <circle cx="182" cy="94" r="2" className="ill-accent" opacity="0.7" />
    </svg>
  );
}
