'use server';

import { db } from '@/db';
import { pricingPlans } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function updatePricingPlan(
  id: string,
  name: string,
  price: string,
  duration: string,
  bestFor: string,
  features: string[],
  isHighlighted: boolean,
  isActive: boolean
) {
  try {
    await db.update(pricingPlans)
      .set({
        name,
        price,
        duration,
        bestFor,
        features,
        isHighlighted,
        isActive
      })
      .where(eq(pricingPlans.id, id));
      
    revalidatePath('/');
    revalidatePath('/admin/pricing');
    
    return { success: true };
  } catch (error) {
    console.error('Failed to update pricing plan:', error);
    return { success: false, error: 'Failed to update database' };
  }
}
