'use server';

import { db } from '@/db';
import { contactLeads } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function markLeadAsRead(id: string, isRead: boolean) {
  try {
    await db.update(contactLeads)
      .set({ isRead })
      .where(eq(contactLeads.id, id));
    revalidatePath('/admin/contact-leads');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Failed to update lead status:', error);
    return { success: false, error: 'Failed to update lead status' };
  }
}

export async function saveLeadNotes(id: string, notes: string) {
  try {
    await db.update(contactLeads)
      .set({ notes })
      .where(eq(contactLeads.id, id));
    revalidatePath('/admin/contact-leads');
    return { success: true };
  } catch (error) {
    console.error('Failed to save lead notes:', error);
    return { success: false, error: 'Failed to save notes' };
  }
}

export async function deleteLead(id: string) {
  try {
    await db.delete(contactLeads).where(eq(contactLeads.id, id));
    revalidatePath('/admin/contact-leads');
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete lead:', error);
    return { success: false, error: 'Failed to delete lead' };
  }
}
