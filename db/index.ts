import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Setup Neon client (with fallback for Next.js build workers)
const sql = neon(process.env.DATABASE_URL || 'postgres://dummy:dummy@dummy/dummy');

// Create Drizzle ORM instance
export const db = drizzle(sql, { schema });
