import { db } from '@/db';
import { gymStats } from '@/db/schema';
import { StatsClient } from './StatsClient';
import { asc } from 'drizzle-orm';

export default async function StatsPage() {
  // Fetch stats from Neon DB
  let stats: any[] = [];
  try {
    stats = await db.select().from(gymStats).orderBy(asc(gymStats.sortOrder));
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    // If DB is not connected yet, we'll pass an empty array
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Gym Stats</h1>
        <p className="text-gray-400">Manage the 4 key statistics displayed on the public homepage.</p>
      </div>

      <div className="bg-[#111] border border-white/5 rounded-xl p-6">
        {stats.length > 0 ? (
          <StatsClient initialStats={stats} />
        ) : (
          <div className="text-center py-12 text-gray-500">
            No stats found or database not connected.
          </div>
        )}
      </div>
    </div>
  );
}
