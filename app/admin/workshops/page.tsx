import { db } from '@/db';
import { workshops, workshopPaymentMethods, workshopRegistrations } from '@/db/schema';
import { desc } from 'drizzle-orm';
import WorkshopsClient from './WorkshopsClient';

export default async function AdminWorkshopsPage() {
  const allWorkshops = await db.select().from(workshops).orderBy(desc(workshops.createdAt));
  const allRegistrations = await db.select().from(workshopRegistrations).orderBy(desc(workshopRegistrations.submittedAt));
  const allPaymentMethods = await db.select().from(workshopPaymentMethods);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-black tracking-wider uppercase">Workshops</h1>
        <p className="text-gray-400">Manage paid workshops, payment numbers, and manual payment confirmations.</p>
      </div>

      <WorkshopsClient 
        initialWorkshops={allWorkshops} 
        initialRegistrations={allRegistrations} 
        initialPaymentMethods={allPaymentMethods} 
      />
    </div>
  );
}
