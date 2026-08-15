'use server';

import { db } from '@/db';
import { gymStats } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function updateStat(id: number, label: string, number: number, suffix: string) {
  try {
    await db.update(gymStats)
      .set({ label, number, suffix })
      .where(eq(gymStats.id, id));
      
    // Revalidate public site and admin paths
    revalidatePath('/');
    revalidatePath('/admin/stats');
    
    return { success: true };
  } catch (error) {
    console.error('Failed to update stat:', error);
    return { success: false, error: 'Failed to update database' };
  }
}
