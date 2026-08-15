import { db } from '@/db';
import { pricingPlans } from '@/db/schema';
import { PricingClient } from './PricingClient';
import { asc, eq } from 'drizzle-orm';

export default async function PricingPage() {
  let plans: any[] = [];
  try {
    plans = await db.select().from(pricingPlans).where(eq(pricingPlans.isActive, true)).orderBy(asc(pricingPlans.sortOrder));
  } catch (error) {
    console.error('Failed to fetch pricing plans:', error);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Pricing Plans</h1>
        <p className="text-gray-400">Manage your membership packages and features.</p>
      </div>

      {plans.length > 0 ? (
        <PricingClient initialPlans={plans as any} />
      ) : (
        <div className="bg-[#111] border border-white/5 rounded-xl p-12 text-center text-gray-500">
          No pricing plans found or database not connected.
        </div>
      )}
    </div>
  );
}
