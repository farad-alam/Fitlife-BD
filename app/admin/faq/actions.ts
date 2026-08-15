'use server';

import { db } from '@/db';
import { faqs } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function addFaq(question: string, answer: string) {
  try {
    await db.insert(faqs).values({ question, answer });
    revalidatePath('/');
    revalidatePath('/admin/faq');
    return { success: true };
  } catch (error) {
    console.error('Failed to add FAQ:', error);
    return { success: false, error: 'Failed to add FAQ' };
  }
}

export async function updateFaq(id: string, question: string, answer: string, isVisible: boolean) {
  try {
    await db.update(faqs)
      .set({ question, answer, isVisible })
      .where(eq(faqs.id, id));
    revalidatePath('/');
    revalidatePath('/admin/faq');
    return { success: true };
  } catch (error) {
    console.error('Failed to update FAQ:', error);
    return { success: false, error: 'Failed to update FAQ' };
  }
}

export async function deleteFaq(id: string) {
  try {
    await db.delete(faqs).where(eq(faqs.id, id));
    revalidatePath('/');
    revalidatePath('/admin/faq');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete FAQ:', error);
    return { success: false, error: 'Failed to delete FAQ' };
  }
}
