import { db } from '@/db';
import { workshops, globalPaymentMethods } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WorkshopsClient from './WorkshopsClient';

export const revalidate = 0; // Fetch fresh data

export default async function WorkshopsPage() {
  let activeWorkshops: any[] = [];
  let paymentMethods: any[] = [];

  try {
    activeWorkshops = await db
      .select()
      .from(workshops)
      .where(eq(workshops.isActive, true))
      .orderBy(asc(workshops.workshopDate));

    paymentMethods = await db.select().from(globalPaymentMethods);

  } catch (error) {
    console.error('Failed to fetch data for workshops page:', error);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-6" style={{ background: 'var(--bg)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-5xl font-display font-black tracking-wider uppercase mb-4" style={{ color: 'var(--text)' }}>
              Online <span style={{ color: 'var(--green)' }}>Workshops</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Deep-dive skill building and masterclasses led by expert coaches. Limited seats available.
            </p>
          </div>

          <WorkshopsClient 
            workshops={activeWorkshops} 
            globalPaymentMethods={paymentMethods} 
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
