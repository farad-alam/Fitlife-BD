import { db } from '@/db';
import { sessionEvents, sessionRegistrations } from '@/db/schema';
import { desc } from 'drizzle-orm';
import SessionsClient from './SessionsClient';

export default async function AdminSessionsPage() {
  let events: any[] = [];
  let registrations: any[] = [];
  let dbError: string | null = null;

  try {
    events = await db.select().from(sessionEvents).orderBy(desc(sessionEvents.createdAt));
    registrations = await db.select().from(sessionRegistrations).orderBy(desc(sessionRegistrations.submittedAt));
  } catch (error: any) {
    console.error('AdminSessionsPage DB error:', error);
    dbError = error?.message || 'Failed to load data from database.';
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-black tracking-wider uppercase">Free Sessions</h1>
        <p className="text-gray-400">Manage free session announcements and send email invitations.</p>
      </div>

      {dbError ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-red-400">
          <p className="font-bold mb-1">Database Error</p>
          <p className="text-sm font-mono">{dbError}</p>
        </div>
      ) : (
        <SessionsClient initialEvents={events} initialRegistrations={registrations} />
      )}
    </div>
  );
}

