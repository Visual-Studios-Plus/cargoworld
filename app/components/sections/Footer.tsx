import Image from "next/image";

const SITE = "https://www.cargoworldwideincsl.com";

const ABOUT_LINKS = [
  { label: "Who We Are", href: `${SITE}/about-us/` },
  { label: "Our Global Network", href: `${SITE}/our-global-network/` },
  { label: "Get A Quote", href: `${SITE}/get-a-quote/` },
  { label: "Partner With Us", href: `${SITE}/partner-with-us/` },
  { label: "Contact Us", href: `${SITE}/contact-us/` },
  { label: "Blog", href: `${SITE}/blog/` },
  { label: "Careers", href: `${SITE}/careers/` },
];

const INDUSTRY_LINKS = [
  { label: "Retail & Fashion", href: `${SITE}/retail-fashion/` },
  { label: "FMCG", href: `${SITE}/fmcg/` },
  { label: "HealthCare", href: `${SITE}/healthcare/` },
  { label: "Manufacturing", href: `${SITE}/manufacturing/` },
  { label: "Steam Activated Carbon", href: `${SITE}/steam-activated-carbon/` },
  { label: "Automobile", href: `${SITE}/automobile/` },
];

const SERVICE_LINKS = [
  { label: "Ocean Freight", href: `${SITE}/ocean-freight/` },
  { label: "Air Freight", href: `${SITE}/air-freight/` },
  { label: "Transportation", href: `${SITE}/transportation/` },
  {
    label: "Warehousing & Distribution",
    href: `${SITE}/warehousing-distribution/`,
  },
  { label: "Customs Brokerage", href: `${SITE}/customs-brokerage/` },
  {
    label: "4PL Services",
    href: `${SITE}/4pl-logistics-service-provider-cargo-worldwide-sri-lanka/`,
  },
  { label: "Project Cargo", href: `${SITE}/project-cargo/` },
];

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 font-cal font-bold text-white">{title}</h3>
      <ul className="space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-neutral-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative min-h-[500px] overflow-hidden border-t border-neutral-800 bg-[#111111] pb-36 pt-24 font-cal text-white lg:min-h-[600px]">
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 pb-16 pt-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col">
          <Image
            src="/figma/img/logo.png"
            alt="Cargo Worldwide Lanka"
            width={129}
            height={53}
            className="h-[53px] w-[129px] object-contain"
          />

          <h4 className="mt-7 text-sm font-bold text-white">
            Cargo Worldwide
          </h4>
          <address className="mt-3 space-y-2 text-sm not-italic leading-relaxed text-neutral-400">
            <p>
              Level 17, &quot;Parkland&quot;
              <br />
              33 Park Street, Colombo 2
            </p>
            <p>
              Phone:{" "}
              <a
                href="tel:+94112307748"
                className="transition-colors hover:text-white"
              >
                +94 112 307 748
              </a>
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:info.sl@cargoworldwideinc.com"
                className="break-all transition-colors hover:text-white"
              >
                info.sl@cargoworldwideinc.com
              </a>
            </p>
          </address>

          <p className="mt-auto pt-10 text-xs leading-relaxed text-neutral-500">
            © Copyright 2026 All Rights Reserved. Cargo Worldwide Sri Lanka.
          </p>
        </div>

        <LinkColumn title="About Us" links={ABOUT_LINKS} />
        <LinkColumn title="Industries" links={INDUSTRY_LINKS} />
        <LinkColumn title="E2E Services" links={SERVICE_LINKS} />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-72 lg:h-96">
        <Image
          src="/figma/img/bento-1.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent" />
    </footer>
  );
}
