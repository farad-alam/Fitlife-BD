'use server';

import { db } from '@/db';
import { trainers } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function addTrainer(data: { name: string, specialization: string, experience: string, imageUrl: string }) {
  try {
    await db.insert(trainers).values({
      name: data.name,
      specialization: data.specialization,
      experience: data.experience,
      imageUrl: data.imageUrl,
    });
    revalidatePath('/');
    revalidatePath('/admin/trainers');
    return { success: true };
  } catch (error) {
    console.error('Failed to add trainer:', error);
    return { success: false, error: 'Failed to add trainer' };
  }
}

export async function updateTrainer(id: string, data: { name: string, specialization: string, experience: string, imageUrl: string, isVisible: boolean }) {
  try {
    await db.update(trainers).set(data).where(eq(trainers.id, id));
    revalidatePath('/');
    revalidatePath('/admin/trainers');
    return { success: true };
  } catch (error) {
    console.error('Failed to update trainer:', error);
    return { success: false, error: 'Failed to update trainer' };
  }
}

export async function deleteTrainer(id: string) {
  try {
    await db.delete(trainers).where(eq(trainers.id, id));
    revalidatePath('/');
    revalidatePath('/admin/trainers');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete trainer:', error);
    return { success: false, error: 'Failed to delete trainer' };
  }
}
