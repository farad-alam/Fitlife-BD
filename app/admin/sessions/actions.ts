'use server';

import { db } from '@/db';
import { sessionEvents, sessionRegistrations } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createSessionEvent(data: {
  title: string;
  description: string;
  sessionDate: string | Date;
  targetCategory: string;
  inviteLink: string;
  isActive: boolean;
}) {
  try {
    const payload = { ...data, sessionDate: new Date(data.sessionDate) };
    
    if (payload.isActive) {
      await db.update(sessionEvents).set({ isActive: false });
    }
    await db.insert(sessionEvents).values(payload);
    revalidatePath('/admin/sessions');
    revalidatePath('/free-session');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to create session' };
  }
}

export async function updateSessionEvent(id: string, data: any) {
  try {
    const payload = { ...data };
    if (payload.sessionDate) {
      payload.sessionDate = new Date(payload.sessionDate);
    }
    
    if (payload.isActive) {
      await db.update(sessionEvents).set({ isActive: false });
    }
    await db.update(sessionEvents).set(payload).where(eq(sessionEvents.id, id));
    revalidatePath('/admin/sessions');
    revalidatePath('/free-session');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to update session' };
  }
}

export async function deleteSessionEvent(id: string) {
  try {
    await db.delete(sessionRegistrations).where(eq(sessionRegistrations.sessionEventId, id));
    await db.delete(sessionEvents).where(eq(sessionEvents.id, id));
    revalidatePath('/admin/sessions');
    revalidatePath('/free-session');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to delete session' };
  }
}

export async function sendSessionInvitations(sessionId: string, category: string) {
  try {
    // 1. Fetch the session event
    const sessionRes = await db.select().from(sessionEvents).where(eq(sessionEvents.id, sessionId));
    if (!sessionRes.length) return { success: false, error: 'Session not found' };
    const session = sessionRes[0];

    if (!session.inviteLink) return { success: false, error: 'No invite link configured for this session' };

    // 2. Fetch all uninvited registrations matching the category
    let conditions = and(
      eq(sessionRegistrations.sessionEventId, sessionId),
      eq(sessionRegistrations.isInvited, false)
    );
    
    if (category && category !== 'All') {
      conditions = and(conditions, eq(sessionRegistrations.healthCategory, category));
    }

    const uninvited = await db.select().from(sessionRegistrations).where(conditions);

    if (uninvited.length === 0) {
      return { success: false, error: 'No uninvited users found in this category.' };
    }

    // 3. Send emails via Resend
    let sentCount = 0;
    
    for (const user of uninvited) {
      if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY is not set. Simulating email to:', user.email);
        await db.update(sessionRegistrations).set({ isInvited: true }).where(eq(sessionRegistrations.id, user.id));
        sentCount++;
        continue;
      }

      try {
        await resend.emails.send({
          from: 'Fitlife Gym <invites@fitlifebd.com>', // Note: Must verify domain in Resend
          to: user.email,
          subject: `You're Invited — ${session.title} at Fitlife Gym`,
          text: `Hi ${user.name},\n\nGreat news! You've been selected to join our upcoming free session:\n\n🏋️ ${session.title}\n📅 ${new Date(session.sessionDate).toLocaleString()}\n\nJoin link: ${session.inviteLink}\n\nSee you there!\n— The Fitlife Team`
        });

        await db.update(sessionRegistrations).set({ isInvited: true }).where(eq(sessionRegistrations.id, user.id));
        sentCount++;
      } catch (err) {
        console.error('Failed to send email to', user.email, err);
      }
    }

    revalidatePath('/admin/sessions');
    return { success: true, count: sentCount };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to send invitations' };
  }
}
