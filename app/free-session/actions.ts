'use server';

import { db } from '@/db';
import { sessionRegistrations } from '@/db/schema';

export async function submitSessionRegistration(data: {
  sessionEventId: string;
  name: string;
  whatsappNumber: string;
  email: string;
  age: number;
  gender: string;
  healthCategory: string;
  otherCategory?: string;
  fitnessGoal?: string;
  preferredBranch?: string;
}) {
  try {
    await db.insert(sessionRegistrations).values({
      sessionEventId: data.sessionEventId,
      name: data.name,
      whatsappNumber: data.whatsappNumber,
      email: data.email,
      age: data.age,
      gender: data.gender,
      healthCategory: data.healthCategory,
      otherCategory: data.otherCategory,
      fitnessGoal: data.fitnessGoal,
      preferredBranch: data.preferredBranch,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to submit session registration:', error);
    return { success: false, error: 'Failed to submit registration' };
  }
}
