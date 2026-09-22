'use server';

import { db } from '@/db';
import { workshopRegistrations } from '@/db/schema';

export async function submitWorkshopRegistration(data: {
  workshopId: string;
  name: string;
  whatsappNumber: string;
  email: string;
  preferredBranch?: string;
  paymentOperator: string;
  paymentToNumber: string;
  transactionId: string;
}) {
  try {
    await db.insert(workshopRegistrations).values({
      workshopId: data.workshopId,
      name: data.name,
      whatsappNumber: data.whatsappNumber,
      email: data.email,
      preferredBranch: data.preferredBranch,
      paymentOperator: data.paymentOperator,
      paymentToNumber: data.paymentToNumber,
      transactionId: data.transactionId,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to submit workshop registration:', error);
    return { success: false, error: 'Failed to submit registration' };
  }
}
