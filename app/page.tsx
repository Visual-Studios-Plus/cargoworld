import SiteHeader from "./components/SiteHeader";
import Hero from "./components/sections/Hero";
import WhyUs from "./components/sections/WhyUs";
import Timeline from "./components/sections/Timeline";
import Services from "./components/sections/Services";
import QuickQuote from "./components/sections/QuickQuote";
import CoreCarriers from "./components/sections/CoreCarriers";
import CallToAction from "./components/sections/CallToAction";
import Footer from "./components/sections/Footer";

export default function Home() {
  return (
    <main className="flex w-full flex-col bg-[#ffffff]">
      <SiteHeader />
      <Hero />
      {/* Slides over the sticky hero */}
      <div data-hero-next className="relative z-10 flex w-full flex-col bg-[#ffffff]">
      {/* Corrugated container-wall band that leads the section in */}
      <div
        data-hero-band
        aria-hidden
        className="flex h-[14px] w-full origin-center items-stretch gap-[3px] bg-[#1f3fa8] px-[3px] md:h-[18px]"
      >
        {Array.from({ length: 48 }, (_, i) => (
          <span key={i} className="flex-1 origin-top bg-[#2b4fc4]" />
        ))}
      </div>
      <WhyUs />
      <Timeline />
      <Services />
      <QuickQuote />
      <CoreCarriers />
      <CallToAction />
      <Footer />
      </div>
    </main>
  );
}
