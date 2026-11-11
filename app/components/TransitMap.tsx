const LINE = "#000000";
const ACCENT = "#ffdd00";

type Route = { id: string; d: string; dur: string; begin: string };

// Routes are <path>s so they both render the lane and drive the moving pulse.
const ROUTES: Route[] = [
  // India origin gateways feeding into Colombo
  { id: "tm-tut", d: "M60,190 L220,190 L340,260", dur: "2.6s", begin: "0.2s" },
  { id: "tm-che", d: "M60,330 L220,330 L340,260", dur: "2.6s", begin: "0.9s" },
  // Colombo fanning out to the North American offices
  { id: "tm-la", d: "M340,260 L460,140 L700,140", dur: "3.4s", begin: "0s" },
  { id: "tm-hou", d: "M340,260 L700,260", dur: "3.1s", begin: "0.6s" },
  { id: "tm-can", d: "M340,260 L460,380 L700,380", dur: "3.6s", begin: "1.1s" },
];

function Station({ x, y }: { x: number; y: number }) {
  return (
    <circle cx={x} cy={y} r={5} fill="#fff" stroke={LINE} strokeWidth={2.5} />
  );
}

function Label({
  x,
  y,
  children,
  anchor = "middle",
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={8.5}
      letterSpacing={0.6}
      fill={LINE}
      style={{ fontFamily: "var(--font-dm), sans-serif", fontWeight: 700 }}
    >
      {children}
    </text>
  );
}

function Terminus({
  x,
  y,
  label,
  sub,
  side,
}: {
  x: number;
  y: number;
  label: string;
  sub: string;
  side: "left" | "right";
}) {
  const tx = side === "right" ? x + 20 : x - 20;
  const anchor = side === "right" ? "start" : "end";
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill={LINE} />
      <circle cx={x} cy={y} r={4.5} fill="#fff" />
      <text
        x={tx}
        y={y - 1}
        textAnchor={anchor}
        fontSize={12.5}
        letterSpacing={0.4}
        fill={LINE}
        style={{ fontFamily: "var(--font-cal), sans-serif", fontWeight: 700 }}
      >
        {label}
      </text>
      <text
        x={tx}
        y={y + 11}
        textAnchor={anchor}
        fontSize={8}
        letterSpacing={0.5}
        fill="#8e9194"
        style={{ fontFamily: "var(--font-dm), sans-serif", fontWeight: 700 }}
      >
        {sub}
      </text>
    </g>
  );
}

const CSS = `
.tm-line{stroke-dasharray:1;stroke-dashoffset:1;animation:tm-draw 2.4s ease forwards;}
.tm-line.d1{animation-delay:.15s}
.tm-line.d2{animation-delay:.45s}
.tm-line.d3{animation-delay:.75s}
.tm-line.d4{animation-delay:1.05s}
@keyframes tm-draw{to{stroke-dashoffset:0}}
@media (prefers-reduced-motion: reduce){
  .tm-line{animation:none;stroke-dashoffset:0}
  .tm-pulse{display:none}
}
`;

export default function TransitMap() {
  return (
    <div className="mt-10 overflow-x-auto rounded-lg border border-[#d8d8d8] bg-[#ffffff] p-4 sm:p-8">
      <style>{CSS}</style>
      <svg
        viewBox="-110 0 980 460"
        role="img"
        aria-label="Animated transit map: India origin gateways in Tuticorin and Chennai feed the Colombo hub, which ships to Cargo World Wide's own North American offices in Los Angeles (Compton), Houston and Mississauga."
        className="h-auto w-full min-w-[640px]"
      >
        {/* Ghost background network */}
        <g stroke="#EDF1F6" strokeWidth={4} fill="none" strokeLinecap="round">
          <polyline points="30,110 720,110" />
          <polyline points="120,30 120,430" />
          <polyline points="700,410 520,410 360,410" />
        </g>

        {/* Routes (also used as motion paths) */}
        {ROUTES.map((r, i) => (
          <path
            key={r.id}
            id={r.id}
            d={r.d}
            pathLength={1}
            fill="none"
            stroke={LINE}
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`tm-line d${i}`}
          />
        ))}

        {/* Travelling cargo pulses */}
        {ROUTES.map((r) => (
          <circle key={`${r.id}-p`} r={5.5} fill={ACCENT} className="tm-pulse">
            <animateMotion
              dur={r.dur}
              begin={r.begin}
              repeatCount="indefinite"
              rotate="auto"
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="linear"
            >
              <mpath href={`#${r.id}`} />
            </animateMotion>
          </circle>
        ))}

        {/* Stations */}
        <Station x={280} y={225} />
        <Station x={280} y={295} />
        <Station x={400} y={200} />
        <Station x={540} y={140} />
        <Station x={620} y={140} />
        <Station x={480} y={260} />
        <Station x={600} y={260} />
        <Station x={400} y={320} />
        <Station x={540} y={380} />
        <Station x={620} y={380} />

        {/* Station labels */}
        <Label x={286} y={218} anchor="start">PALK STRAIT</Label>
        <Label x={286} y={310} anchor="start">BAY OF BENGAL</Label>
        <Label x={400} y={190}>SINGAPORE</Label>
        <Label x={540} y={130}>TRANSPACIFIC</Label>
        <Label x={620} y={130}>LONG BEACH</Label>
        <Label x={480} y={248}>SUEZ CANAL</Label>
        <Label x={600} y={248}>GULF OF MEXICO</Label>
        <Label x={400} y={338}>INDIAN OCEAN</Label>
        <Label x={540} y={398}>ATLANTIC</Label>
        <Label x={620} y={398}>ST. LAWRENCE</Label>

        {/* Termini — real Cargo World Wide offices */}
        <Terminus x={60} y={190} label="TUTICORIN" sub="INDIA GATEWAY" side="left" />
        <Terminus x={60} y={330} label="CHENNAI" sub="INDIA GATEWAY" side="left" />
        <Terminus x={700} y={140} label="LOS ANGELES" sub="COMPTON, CA" side="right" />
        <Terminus x={700} y={260} label="HOUSTON" sub="TEXAS" side="right" />
        <Terminus x={700} y={380} label="MISSISSAUGA" sub="ONTARIO, CANADA" side="right" />

        {/* Colombo hub interchange */}
        <g>
          <rect
            x={320}
            y={240}
            width={40}
            height={40}
            rx={12}
            fill={ACCENT}
            stroke={LINE}
            strokeWidth={3.5}
          />
          <circle cx={340} cy={260} r={6} fill={LINE} />
          <text
            x={340}
            y={228}
            textAnchor="middle"
            fontSize={15}
            letterSpacing={0.5}
            fill={LINE}
            style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700 }}
          >
            COLOMBO
          </text>
          <text
            x={340}
            y={300}
            textAnchor="middle"
            fontSize={8.5}
            letterSpacing={0.8}
            fill={LINE}
            style={{ fontFamily: "var(--font-dm), sans-serif", fontWeight: 700 }}
          >
            ORIGIN HUB · SRI LANKA
          </text>
        </g>
      </svg>
    </div>
  );
}
