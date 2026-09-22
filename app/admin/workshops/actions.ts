'use server';

import { db } from '@/db';
import { workshops, globalPaymentMethods, workshopRegistrations } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function createWorkshop(data: any) {
  try {
    await db.insert(workshops).values(data);
    revalidatePath('/admin/workshops');
    revalidatePath('/workshops');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to create workshop' };
  }
}

export async function updateWorkshop(id: string, data: any) {
  try {
    await db.update(workshops).set(data).where(eq(workshops.id, id));
    revalidatePath('/admin/workshops');
    revalidatePath('/workshops');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to update workshop' };
  }
}

export async function deleteWorkshop(id: string) {
  try {
    await db.delete(workshopRegistrations).where(eq(workshopRegistrations.workshopId, id));
    await db.delete(workshops).where(eq(workshops.id, id));
    revalidatePath('/admin/workshops');
    revalidatePath('/workshops');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to delete workshop' };
  }
}

export async function addPaymentMethod(operator: string, accountNumber: string, accountType: string) {
  try {
    await db.insert(globalPaymentMethods).values({
      operator, accountNumber, accountType
    });
    revalidatePath('/admin/workshops');
    revalidatePath('/workshops');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to add payment method' };
  }
}

export async function deletePaymentMethod(id: string) {
  try {
    await db.delete(globalPaymentMethods).where(eq(globalPaymentMethods.id, id));
    revalidatePath('/admin/workshops');
    revalidatePath('/workshops');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to delete payment method' };
  }
}

export async function updatePaymentStatus(registrationId: string, status: string, notes?: string) {
  try {
    await db.update(workshopRegistrations).set({ paymentStatus: status, adminNotes: notes }).where(eq(workshopRegistrations.id, registrationId));
    revalidatePath('/admin/workshops');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to update payment status' };
  }
}
