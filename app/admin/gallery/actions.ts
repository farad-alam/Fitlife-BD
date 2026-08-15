'use server';

import { db } from '@/db';
import { galleryImages } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function addGalleryImage(data: { imageUrl: string, caption: string, category: string }) {
  try {
    await db.insert(galleryImages).values({
      imageUrl: data.imageUrl,
      caption: data.caption,
      category: data.category,
    });
    revalidatePath('/');
    revalidatePath('/admin/gallery');
    return { success: true };
  } catch (error) {
    console.error('Failed to add gallery image:', error);
    return { success: false, error: 'Failed to add image' };
  }
}

export async function updateGalleryImage(id: string, data: { caption: string, category: string, isVisible: boolean }) {
  try {
    await db.update(galleryImages).set(data).where(eq(galleryImages.id, id));
    revalidatePath('/');
    revalidatePath('/admin/gallery');
    return { success: true };
  } catch (error) {
    console.error('Failed to update gallery image:', error);
    return { success: false, error: 'Failed to update image' };
  }
}

export async function deleteGalleryImage(id: string) {
  try {
    await db.delete(galleryImages).where(eq(galleryImages.id, id));
    revalidatePath('/');
    revalidatePath('/admin/gallery');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete gallery image:', error);
    return { success: false, error: 'Failed to delete image' };
  }
}
