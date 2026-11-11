import SiteHeader from "./components/SiteHeader";
import Hero from "./components/sections/Hero";
import WhyUs from "./components/sections/WhyUs";
import Timeline from "./components/sections/Timeline";
import Services from "./components/sections/Services";
import CoreCarriers from "./components/sections/CoreCarriers";
import CallToAction from "./components/sections/CallToAction";
import Footer from "./components/sections/Footer";

export default function Home() {
  return (
    <main className="flex w-full flex-col bg-[#ffffff]">
      <SiteHeader />
      <Hero />
      <WhyUs />
      <Timeline />
      <Services />
      <CoreCarriers />
      <CallToAction />
      <Footer />
    </main>
  );
}
