import { db } from '@/db';
import { faqs } from '@/db/schema';
import { FaqClient } from './FaqClient';
import { asc } from 'drizzle-orm';

export default async function FaqPage() {
  let faqList: any[] = [];
  try {
    faqList = await db.select().from(faqs).orderBy(asc(faqs.sortOrder));
  } catch (error) {
    console.error('Failed to fetch FAQs:', error);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">FAQs</h1>
        <p className="text-gray-400">Manage Frequently Asked Questions.</p>
      </div>

      <FaqClient initialFaqs={faqList as any} />
    </div>
  );
}
