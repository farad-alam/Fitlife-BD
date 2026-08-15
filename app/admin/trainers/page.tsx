import { db } from '@/db';
import { trainers } from '@/db/schema';
import { TrainersClient } from './TrainersClient';
import { asc } from 'drizzle-orm';

export default async function TrainersPage() {
  let trainersList: any[] = [];
  try {
    trainersList = await db.select().from(trainers).orderBy(asc(trainers.sortOrder));
  } catch (error) {
    console.error('Failed to fetch trainers:', error);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Trainers Manager</h1>
        <p className="text-gray-400">Manage the personal trainers displayed on your website.</p>
      </div>

      <TrainersClient initialTrainers={trainersList as any} />
    </div>
  );
}
