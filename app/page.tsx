export const revalidate = 86400; // ISR: rebuild max once per 24 hours. Admin saves trigger immediate revalidation.

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
import nextDynamic from "next/dynamic";
import { db } from "@/db";
import { gymStats, pricingPlans, faqs, trainers, transformations, branches, galleryImages } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

const FitnessCalculator = nextDynamic(() => import("@/components/sections/FitnessCalculator"));
const Transformations = nextDynamic(() => import("@/components/sections/Transformations"));
const Gallery = nextDynamic(() => import("@/components/sections/Gallery"));
const Trainers = nextDynamic(() => import("@/components/sections/Trainers"));
const HireCoach = nextDynamic(() => import("@/components/sections/HireCoach"));

export default async function Home() {
  let statsData: any = [];
  let pricingData: any = [];
  let faqData: any = [];
  let trainersData: any = [];
  let transformationsData: any = [];
  let branchesData: any = [];
  let galleryData: any = [];

  try {
    statsData = await db.select().from(gymStats).orderBy(asc(gymStats.sortOrder));
    
    const dbPricing = await db.select().from(pricingPlans).where(eq(pricingPlans.isActive, true)).orderBy(asc(pricingPlans.sortOrder));
    pricingData = dbPricing.map(p => ({
      name: p.name,
      tagline: p.bestFor,
      price: p.price,
      duration: p.duration,
      period: p.bestFor,
      features: p.features,
      cta: 'Get Started',
      highlight: p.isHighlighted,
    }));

    const dbFaqs = await db.select().from(faqs).where(eq(faqs.isVisible, true)).orderBy(asc(faqs.sortOrder));
    faqData = dbFaqs.map(f => ({ q: f.question, a: f.answer }));

    trainersData = await db.select().from(trainers).where(eq(trainers.isVisible, true)).orderBy(asc(trainers.sortOrder));
    transformationsData = await db.select().from(transformations).where(eq(transformations.isVisible, true)).orderBy(asc(transformations.sortOrder));
    branchesData = await db.select().from(branches).where(eq(branches.isActive, true)).orderBy(asc(branches.sortOrder));
    galleryData = await db.select().from(galleryImages).where(eq(galleryImages.isVisible, true)).orderBy(asc(galleryImages.sortOrder));

  } catch (error) {
    console.error("Failed to fetch data for homepage:", error);
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full overflow-x-hidden">
        <Hero />
        <Stats data={statsData} />
        <FitnessCalculator />
        <About />
        <Services />
        <Trainers data={trainersData} />
        <HireCoach />
        {/* <Pricing data={pricingData} /> */}
        <Transformations data={transformationsData} />
        <Branches data={branchesData} />
        <Gallery data={galleryData} />
        <FAQ data={faqData} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
