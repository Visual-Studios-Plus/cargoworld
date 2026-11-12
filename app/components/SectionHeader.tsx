type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  index?: string;
  className?: string;
  /** "dark" for use on graphite bands */
  tone?: "light" | "dark";
};

/**
 * Custo two-column section opener: a small caption on the left, the statement
 * on the right, both hung from one 1px rule.
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  index,
  className = "",
  tone = "light",
}: Props) {
  const ink = tone === "dark" ? "text-white" : "text-black";
  const muted = tone === "dark" ? "text-[#d8d8d8]" : "text-black/70";
  const rule = tone === "dark" ? "border-white/40" : "border-black";

  return (
    <div
      className={`grid grid-cols-1 gap-4 border-t ${rule} pt-6 md:grid-cols-[280px_1fr] md:gap-10 ${className}`}
    >
      <p data-slide="left" className={`kicker ${ink}`}>
        {eyebrow}
        {index && <span className={`ml-2 ${muted}`}>({index})</span>}
      </p>
      <div>
        <h2
          data-headline
          className={`max-w-[22ch] text-[clamp(30px,3.6vw,57px)] font-medium leading-[1.05] tracking-[-0.015em] ${ink}`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            data-slide="up"
            data-slide-delay="0.16"
            className={`mt-5 max-w-[60ch] text-[clamp(16px,1.3vw,19px)] leading-[1.42] ${muted}`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
