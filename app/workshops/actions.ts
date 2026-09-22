'use server';

import { db } from '@/db';
import { workshopRegistrations } from '@/db/schema';

export async function submitWorkshopRegistration(data: {
  workshopId: string;
  name: string;
  whatsappNumber: string;
  email: string;
  senderPhoneNumber?: string | null;
  paymentOperator?: string | null;
  paymentToNumber?: string | null;
  transactionId?: string | null;
  paymentStatus?: string;
}) {
  try {
    await db.insert(workshopRegistrations).values({
      workshopId: data.workshopId,
      name: data.name,
      whatsappNumber: data.whatsappNumber,
      email: data.email,
      senderPhoneNumber: data.senderPhoneNumber || null,
      paymentOperator: data.paymentOperator || null,
      paymentToNumber: data.paymentToNumber || null,
      transactionId: data.transactionId || null,
      paymentStatus: data.paymentStatus || 'pending',
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to submit workshop registration:', error);
    return { success: false, error: 'Failed to submit registration' };
  }
}
