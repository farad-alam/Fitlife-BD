import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Trainers from "@/components/sections/Trainers";
import Pricing from "@/components/sections/Pricing";
import Transformations from "@/components/sections/Transformations";
import Branches from "@/components/sections/Branches";
import Gallery from "@/components/sections/Gallery";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full overflow-x-hidden">
        <Hero />
        <Stats />
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
