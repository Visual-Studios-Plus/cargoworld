type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className = "",
}: Props) {
  return (
    <div className={`will-change-transform ${className}`}>
      {eyebrow && (
        <p className="text-center font-dm text-[11px] font-bold uppercase tracking-[0.18em] text-[#8f8f8f]">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-center font-cal text-[clamp(36px,3.2vw,54px)] leading-[1.05] tracking-[-0.03em] text-black">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-[520px] text-center font-cal text-[15px] leading-[1.45] tracking-[0.015em] text-[#808080]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
