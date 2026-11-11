import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function OceanIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 32h4l2-10h18l4 10h4" opacity="0.4" />
      <path d="M12 22V12h10l8 10" />
      <path d="M22 22V12" />
      <path d="M4 36c3 0 3 2 6 2s3-2 6-2 3 2 6 2 3-2 6-2 3 2 6 2 3-2 6-2" />
      <path d="M4 42c3 0 3 2 6 2s3-2 6-2 3 2 6 2 3-2 6-2 3 2 6 2 3-2 6-2" opacity="0.4" />
    </svg>
  );
}

export function AirIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 26l34-10-4 6 6 2-10 6" opacity="0.4" />
      <path d="M6 30l36-14-5 20-9-6-6 8-3-7-13-1z" />
    </svg>
  );
}

export function CustomsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M24 6l14 5v8c0 10-6 16-14 19-8-3-14-9-14-19v-8l14-5z" opacity="0.4" />
      <path d="M18 24l4 4 9-9" />
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 14h22v18H4z" />
      <path d="M26 20h8l6 6v6H26z" opacity="0.4" />
      <circle cx="14" cy="36" r="3.5" />
      <circle cx="33" cy="36" r="3.5" />
    </svg>
  );
}

export function WarehouseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 20L24 10l18 10v22H6z" opacity="0.4" />
      <path d="M14 42V28h20v14" />
      <path d="M14 34h20" />
    </svg>
  );
}

export function FourPlIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="24" cy="24" r="6" />
      <circle cx="10" cy="12" r="4" opacity="0.4" />
      <circle cx="38" cy="12" r="4" opacity="0.4" />
      <circle cx="10" cy="36" r="4" opacity="0.4" />
      <circle cx="38" cy="36" r="4" opacity="0.4" />
      <path d="M13 15l6 5M35 15l-6 5M13 33l6-5M35 33l-6-5" />
    </svg>
  );
}

export function ProjectIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M24 6l16 9v18l-16 9-16-9V15z" opacity="0.4" />
      <path d="M8 15l16 9 16-9M24 24v18" />
    </svg>
  );
}

export function ApparelIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M18 8l6 4 6-4 10 6-5 8-5-3v16H18V19l-5 3-5-8z" opacity="0.4" />
      <path d="M18 8c0 3 2.6 5 6 5s6-2 6-5" />
    </svg>
  );
}

export function TeaIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10 18h26v8a12 12 0 01-12 12h-2A12 12 0 0110 26z" opacity="0.4" />
      <path d="M36 20h4a4 4 0 010 8h-4" />
      <path d="M18 12c0 2-2 2-2 4M24 10c0 2-2 2-2 4M30 12c0 2-2 2-2 4" />
    </svg>
  );
}

export function FmcgIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 16l18-8 18 8-18 8z" opacity="0.4" />
      <path d="M6 16v16l18 8 18-8V16" />
      <path d="M24 24v16M15 12l18 8" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function DocIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6M8 13h8M8 17h8M8 9h2" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.52 0-3.01-.41-4.3-1.18l-.31-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 01-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.42 5.82c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
