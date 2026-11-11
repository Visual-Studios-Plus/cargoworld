import Hero from "./components/sections/Hero";
import WhyUs from "./components/sections/WhyUs";
import Timeline from "./components/sections/Timeline";
import Services from "./components/sections/Services";

export default function Home() {
  return (
    <main className="flex w-full flex-col bg-white">
      <Hero />
      <WhyUs />
      <Timeline />
      <Services />
    </main>
  );
}
