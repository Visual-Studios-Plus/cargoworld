import Image from "next/image";
import Link from "next/link";

/**
 * Swiss layout kit for the sub-pages.
 *
 * One "breakout" grid of four tracks: two edge gutters and two content halves
 * that together cap at 1200px. That puts the content edge exactly where the
 * header logo and the home-page sections start (a 1280px box with 24/40px
 * padding), while photos and ink panels can still bleed to the screen edge.
 *
 *   phone:   [24px | content | 24px]                    (halves stack)
 *   md:      [≥24px | half ≤616 | half ≤616 | ≥24px]
 *   lg:      [≥40px | half ≤600 | half ≤600 | ≥40px]
 *
 * No cards, rounded pills, shadows or rules.
 */

export const GRID =
  "grid grid-cols-[24px_minmax(0,1fr)_24px] md:grid-cols-[minmax(24px,1fr)_minmax(0,616px)_minmax(0,616px)_minmax(24px,1fr)] lg:grid-cols-[minmax(40px,1fr)_minmax(0,600px)_minmax(0,600px)_minmax(40px,1fr)]";

/** Column placements on GRID. */
export const COL = {
  full: "col-[1/-1]",
  content: "col-[2/3] md:col-[2/4]",
  left: "col-[2/3] md:pr-10",
  right: "col-[2/3] md:col-[3/4] md:pl-10",
};

/* ------------------------------------------------------------------ */
/* Bleed row: a photo half and an ink half, text snapped to the grid   */
/* ------------------------------------------------------------------ */

function BleedRow({
  image,
  alt,
  priority,
  reverse,
  minH,
  children,
  topPad,
}: {
  image: string;
  alt: string;
  priority?: boolean;
  reverse?: boolean;
  minH: string;
  children: React.ReactNode;
  topPad?: boolean;
}) {
  return (
    <section className={`${GRID} w-full ${topPad ? "pt-[60px]" : ""} ${minH}`}>
      {/* photo: bleeds to the screen edge on its side */}
      <div
        className={`relative aspect-[4/3] w-full overflow-hidden md:row-start-1 md:aspect-auto ${COL.full} ${
          reverse ? "md:col-[3/5]" : "md:col-[1/3]"
        }`}
      >
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover grayscale"
        />
      </div>

      {/* ink half: bleeds to the other edge; text sits in the content track */}
      <div
        className={`bg-[#1e3a8a] text-white md:row-start-1 md:grid ${COL.full} ${
          reverse
            ? "md:col-[1/3] md:grid-cols-[minmax(24px,1fr)_minmax(0,616px)] lg:grid-cols-[minmax(40px,1fr)_minmax(0,600px)]"
            : "md:col-[3/5] md:grid-cols-[minmax(0,616px)_minmax(24px,1fr)] lg:grid-cols-[minmax(0,600px)_minmax(40px,1fr)]"
        }`}
      >
        <div
          className={`flex h-full flex-col justify-between gap-10 px-6 py-10 md:px-0 md:py-14 ${
            reverse ? "md:col-start-2 md:pr-10" : "md:col-start-1 md:pl-10"
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */

export function SwissHero({
  image,
  alt = "",
  eyebrow,
  title,
  description,
  children,
}: {
  image: string;
  alt?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <BleedRow image={image} alt={alt} priority topPad minH="md:min-h-[min(82svh,820px)]">
      {/* Swiss split: label + title hang from the top, the description and
          actions sit at the bottom, with open space between them */}
      <div>
        <p className="kicker font-semibold text-[#ffe500]">{eyebrow ?? " "}</p>
        <h1 className="mt-8 max-w-[14ch] text-[clamp(40px,5vw,80px)] text-white">{title}</h1>
      </div>
      <div className="mt-16 md:mt-24">
        {description && (
          <p className="max-w-[46ch] text-[clamp(15px,1.2vw,18px)] leading-[1.55] text-white/75">{description}</p>
        )}
        {children && <div className={`w-full ${description ? "mt-8" : ""}`}>{children}</div>}
      </div>
    </BleedRow>
  );
}

/* ------------------------------------------------------------------ */
/* Text block: heading left, lead + supporting text right              */
/* ------------------------------------------------------------------ */

export function Block({
  id,
  eyebrow,
  title,
  lead,
  children,
  tone = "light",
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  tone?: "light" | "grey";
}) {
  return (
    <section
      id={id}
      className={`${GRID} w-full py-[clamp(64px,9vw,128px)] ${tone === "grey" ? "bg-[#f4f5f7]" : "bg-white"}`}
    >
      <div className={COL.left}>
        {eyebrow && <p className="kicker mb-5 font-semibold text-black">{eyebrow}</p>}
        <h2 className="max-w-[16ch] text-[clamp(32px,3.6vw,56px)] text-black">{title}</h2>
      </div>
      <div className={`mt-8 flex flex-col md:mt-0 ${COL.right}`}>
        {lead && <p className="max-w-[40ch] text-[clamp(18px,1.6vw,24px)] leading-[1.4] text-black">{lead}</p>}
        {children && <div className={lead ? "mt-[clamp(40px,6vw,96px)]" : ""}>{children}</div>}
      </div>
    </section>
  );
}

/** Small supporting copy in two equal columns (stacks on mobile). */
export function Columns({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-8 text-[15px] leading-[1.6] text-black/65 sm:grid-cols-2 [&_p]:max-w-[34ch]">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Image + ink panel                                                    */
/* ------------------------------------------------------------------ */

export function InkPanel({
  image,
  alt = "",
  eyebrow,
  title,
  children,
  reverse = false,
}: {
  image: string;
  alt?: string;
  eyebrow?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <BleedRow image={image} alt={alt} reverse={reverse} minH="md:min-h-[clamp(420px,42vw,640px)]">
      <div>
        {eyebrow && <p className="kicker mb-5 font-semibold text-[#ffe500]">{eyebrow}</p>}
        <h2 className="max-w-[16ch] text-[clamp(28px,3vw,48px)] text-white">{title}</h2>
      </div>
      {children ? (
        <div className="text-[15px] leading-[1.6] text-white/75 [&_p]:max-w-[42ch]">{children}</div>
      ) : (
        <span aria-hidden="true" />
      )}
    </BleedRow>
  );
}

/* ------------------------------------------------------------------ */
/* Cells: numbered items on the grid                                    */
/* ------------------------------------------------------------------ */

export type Cell = { title: string; body?: string; meta?: string };

export function Cells({ items, columns = 4 }: { items: Cell[]; columns?: 2 | 3 | 4 }) {
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <ol className={`grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 ${cols}`}>
      {items.map((it, i) => (
        <li key={it.title} className="flex flex-col">
          <span className="text-[13px] tabular-nums text-black/40">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-6 text-[clamp(20px,1.8vw,26px)] text-black">{it.title}</h3>
          {it.meta && <p className="kicker mt-2 text-black/70">{it.meta}</p>}
          {it.body && <p className="mt-3 max-w-[32ch] text-[15px] leading-[1.6] text-black/65">{it.body}</p>}
        </li>
      ))}
    </ol>
  );
}

/** Full-measure content (cells, tables, maps) on the grid's content track. */
export function Band({
  children,
  tone = "light",
  id,
}: {
  children: React.ReactNode;
  tone?: "light" | "grey";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`${GRID} w-full pb-[clamp(64px,9vw,128px)] ${tone === "grey" ? "bg-[#f4f5f7]" : "bg-white"}`}
    >
      <div className={COL.content}>{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Closing split: call to action + photo                          */
/* ------------------------------------------------------------------ */

export function CtaSplit({
  title = "Get started",
  body = "Tell us what you're shipping and where it's going. We usually reply within one business day.",
  href = "/quote",
  label = "Get a quote",
  image = "/figma/img/bento-3.jpg",
  alt = "GWW-branded container lifted by a crane",
  children,
}: {
  title?: string;
  body?: string;
  href?: string;
  label?: string;
  image?: string;
  alt?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={`${GRID} w-full md:min-h-[clamp(380px,36vw,560px)]`}>
      <div className={`flex flex-col justify-between gap-10 py-[clamp(56px,7vw,96px)] md:row-start-1 ${COL.left}`}>
        <div>
          <h2 className="text-[clamp(32px,3.6vw,56px)] text-black">{title}</h2>
          <p className="mt-5 max-w-[38ch] text-[16px] leading-[1.55] text-black/65">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={href}
            className="flex h-[56px] w-full items-center justify-center bg-[#ffe500] px-10 text-[16px] font-medium text-black transition-colors hover:bg-[#1e3a8a] hover:text-white sm:w-auto"
          >
            {label}
          </Link>
          {children}
        </div>
      </div>
      <div
        className={`relative aspect-[4/3] min-h-[280px] overflow-hidden bg-[#1e3a8a] md:row-start-1 md:col-[3/5] md:aspect-auto ${COL.full}`}
      >
        <Image src={image} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover grayscale" />
      </div>
    </section>
  );
}

