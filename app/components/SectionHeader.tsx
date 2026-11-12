type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  index?: string;
  className?: string;
  /** "dark" for use on graphite bands */
  tone?: "light" | "dark";
  /**
   * "site" (default): animated by the site-wide motion layer.
   * "grid": animated by <GridReveal /> as part of a grid-column reveal.
   */
  motion?: "site" | "grid";
};

/**
 * Custo two-column section opener: a small caption on the left, the statement
 * on the right, aligned on one grid.
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  index,
  className = "",
  tone = "light",
  motion = "site",
}: Props) {
  const ink = tone === "dark" ? "text-white" : "text-black";
  const muted = tone === "dark" ? "text-[#d8d8d8]" : "text-black/70";
  const grid = motion === "grid";

  return (
    <div
      className={`grid grid-cols-1 gap-y-4 md:grid-cols-12 md:gap-x-6 ${className}`}
    >
      <p
        {...(grid ? { "data-reveal-meta": "" } : { "data-slide": "left" })}
        className={`kicker md:col-span-6 lg:col-span-3 ${ink}`}
      >
        {eyebrow}
        {index && <span className={`ml-2 ${muted}`}>({index})</span>}
      </p>
      <div className="md:col-span-6 lg:col-span-9">
        <h2
          {...(grid ? { "data-reveal-head": "" } : { "data-headline": "" })}
          className={`max-w-[22ch] text-[clamp(30px,3.6vw,57px)] font-medium leading-[1.05] tracking-[-0.015em] ${ink}`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            {...(grid ? { "data-reveal-meta": "" } : { "data-slide": "up", "data-slide-delay": "0.16" })}
            className={`mt-5 max-w-[60ch] text-[clamp(16px,1.3vw,19px)] leading-[1.42] ${muted}`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
