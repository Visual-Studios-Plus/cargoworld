import Hero from "./components/sections/Hero";
import WhyUs from "./components/sections/WhyUs";
import Timeline from "./components/sections/Timeline";
import Services from "./components/sections/Services";
import CallToAction from "./components/sections/CallToAction";
import Footer from "./components/sections/Footer";

export default function Home() {
  return (
    <main className="flex w-full flex-col bg-white">
      <Hero />
      <WhyUs />
      <Timeline />
      <Services />
      <CallToAction />
      <Footer />
    </main>
  );
}
