export const dynamic = 'force-dynamic';

import { db } from '@/db';
import { branches } from '@/db/schema';
import { BranchesClient } from './BranchesClient';
import { asc } from 'drizzle-orm';

export default async function BranchesPage() {
  let branchesList: any[] = [];
  try {
    branchesList = await db.select().from(branches).orderBy(asc(branches.sortOrder));
  } catch (error) {
    console.error('Failed to fetch branches:', error);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Branches Manager</h1>
        <p className="text-gray-400">Manage gym locations, addresses, and map links.</p>
      </div>

      <BranchesClient initialBranches={branchesList as any} />
    </div>
  );
}
