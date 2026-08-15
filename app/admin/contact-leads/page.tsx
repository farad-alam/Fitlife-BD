import { db } from '@/db';
import { contactLeads } from '@/db/schema';
import { ContactLeadsClient } from './ContactLeadsClient';
import { desc } from 'drizzle-orm';

export default async function ContactLeadsPage() {
  let leads: any[] = [];
  try {
    leads = await db.select().from(contactLeads).orderBy(desc(contactLeads.submittedAt));
  } catch (error) {
    console.error('Failed to fetch contact leads:', error);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Contact Leads Inbox</h1>
        <p className="text-gray-400">Manage inquiries from the website's contact forms.</p>
      </div>

      <ContactLeadsClient initialLeads={leads as any} />
    </div>
  );
}
