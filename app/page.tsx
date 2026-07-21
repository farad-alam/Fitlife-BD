import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import Branches from "@/components/sections/Branches";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import dynamic from "next/dynamic";

const FitnessCalculator = dynamic(() => import("@/components/sections/FitnessCalculator"));
const Transformations = dynamic(() => import("@/components/sections/Transformations"));
const Gallery = dynamic(() => import("@/components/sections/Gallery"));
const Trainers = dynamic(() => import("@/components/sections/Trainers"));

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full overflow-x-hidden">
        <Hero />
        <Stats />
        <FitnessCalculator />
        <About />
        <Services />
        <Trainers />
        <Pricing />
        <Transformations />
        <Branches />
        <Gallery />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
