'use server';

import { db } from '@/db';
import { transformations } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function addTransformation(data: { name: string, goal: string, quote: string, imageBefore: string, imageAfter: string }) {
  try {
    await db.insert(transformations).values({
      name: data.name,
      goal: data.goal,
      quote: data.quote,
      imageBefore: data.imageBefore,
      imageAfter: data.imageAfter,
    });
    revalidatePath('/');
    revalidatePath('/admin/transformations');
    return { success: true };
  } catch (error) {
    console.error('Failed to add transformation:', error);
    return { success: false, error: 'Failed to add transformation' };
  }
}

export async function updateTransformation(id: string, data: { name: string, goal: string, quote: string, imageBefore: string, imageAfter: string, isVisible: boolean }) {
  try {
    await db.update(transformations).set(data).where(eq(transformations.id, id));
    revalidatePath('/');
    revalidatePath('/admin/transformations');
    return { success: true };
  } catch (error) {
    console.error('Failed to update transformation:', error);
    return { success: false, error: 'Failed to update transformation' };
  }
}

export async function deleteTransformation(id: string) {
  try {
    await db.delete(transformations).where(eq(transformations.id, id));
    revalidatePath('/');
    revalidatePath('/admin/transformations');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete transformation:', error);
    return { success: false, error: 'Failed to delete transformation' };
  }
}
