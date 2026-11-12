import SiteHeader from "./components/SiteHeader";
import Hero from "./components/sections/Hero";
import WhyUs from "./components/sections/WhyUs";
import Timeline from "./components/sections/Timeline";
import Services from "./components/sections/Services";
import QuickQuote from "./components/sections/QuickQuote";
import CoreCarriers from "./components/sections/CoreCarriers";
import CallToAction from "./components/sections/CallToAction";
import Footer from "./components/sections/Footer";
import GridReveal from "./components/GridReveal";

export default function Home() {
  return (
    <main className="flex w-full flex-col bg-[#ffffff]">
      <SiteHeader />
      <Hero />
      <GridReveal />
      {/* Slides over the sticky hero */}
      <div data-hero-next className="relative z-10 flex w-full flex-col bg-[#ffffff]">
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
