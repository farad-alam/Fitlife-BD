import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { eq } from 'drizzle-orm';

async function fixImages() {
  const { db } = await import('./db/index');
  const { trainers, transformations } = await import('./db/schema');

  console.log('Fixing Trainer Images...');
  const allTrainers = await db.select().from(trainers);
  for (const t of allTrainers) {
    if (t.imageUrl && t.imageUrl.endsWith('.jpg')) {
      await db.update(trainers).set({ imageUrl: '/images/trainer-1.png' }).where(eq(trainers.id, t.id));
    }
  }

  console.log('Fixing Transformation Images...');
  const allTrans = await db.select().from(transformations);
  for (const t of allTrans) {
    if (t.imageBefore && t.imageBefore.endsWith('.jpg')) {
      await db.update(transformations).set({ imageBefore: '/images/transformation-1.png' }).where(eq(transformations.id, t.id));
    }
    if (t.imageAfter && t.imageAfter.endsWith('.jpg')) {
      await db.update(transformations).set({ imageAfter: null }).where(eq(transformations.id, t.id));
    }
  }

  console.log('Fix completed!');
  process.exit(0);
}

fixImages().catch(console.error);
