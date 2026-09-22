import { db } from '@/db';
import { sessionEvents, sessionRegistrations } from '@/db/schema';
import { desc, asc } from 'drizzle-orm';
import SessionsClient from './SessionsClient';

export default async function AdminSessionsPage() {
  const events = await db.select().from(sessionEvents).orderBy(desc(sessionEvents.createdAt));
  const registrations = await db.select().from(sessionRegistrations).orderBy(desc(sessionRegistrations.submittedAt));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-black tracking-wider uppercase">Free Sessions</h1>
        <p className="text-gray-400">Manage free session announcements and send email invitations.</p>
      </div>

      <SessionsClient initialEvents={events} initialRegistrations={registrations} />
    </div>
  );
}
