'use server';

import { db } from '@/db';
import { contactLeads } from '@/db/schema';

export async function submitContactLead(data: {
  name: string;
  phone: string;
  email?: string;
  message?: string;
}) {
  try {
    await db.insert(contactLeads).values({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      message: data.message || null,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to submit contact lead:', error);
    return { success: false, error: 'Failed to submit' };
  }
}
