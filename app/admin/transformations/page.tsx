import { db } from '@/db';
import { transformations } from '@/db/schema';
import { TransformationsClient } from './TransformationsClient';
import { asc } from 'drizzle-orm';

export default async function TransformationsPage() {
  let transformationsList: any[] = [];
  try {
    transformationsList = await db.select().from(transformations).orderBy(asc(transformations.sortOrder));
  } catch (error) {
    console.error('Failed to fetch transformations:', error);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Transformations Manager</h1>
        <p className="text-gray-400">Manage member before and after photos and testimonials.</p>
      </div>

      <TransformationsClient initialData={transformationsList as any} />
    </div>
  );
}
