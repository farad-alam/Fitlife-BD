'use server';

import { db } from '@/db';
import { branches } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function addBranch(data: { city: string, name: string, address: string, phone: string, mapLink: string, mapEmbed: string }) {
  try {
    await db.insert(branches).values({
      city: data.city,
      name: data.name,
      address: data.address,
      phone: data.phone,
      mapLink: data.mapLink,
      mapEmbed: data.mapEmbed,
    });
    revalidatePath('/');
    revalidatePath('/admin/branches');
    return { success: true };
  } catch (error) {
    console.error('Failed to add branch:', error);
    return { success: false, error: 'Failed to add branch' };
  }
}

export async function updateBranch(id: string, data: { city: string, name: string, address: string, phone: string, mapLink: string, mapEmbed: string, isActive: boolean }) {
  try {
    await db.update(branches).set(data).where(eq(branches.id, id));
    revalidatePath('/');
    revalidatePath('/admin/branches');
    return { success: true };
  } catch (error) {
    console.error('Failed to update branch:', error);
    return { success: false, error: 'Failed to update branch' };
  }
}

export async function deleteBranch(id: string) {
  try {
    await db.delete(branches).where(eq(branches.id, id));
    revalidatePath('/');
    revalidatePath('/admin/branches');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete branch:', error);
    return { success: false, error: 'Failed to delete branch' };
  }
}
