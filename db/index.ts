import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Required environment variable
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in the environment variables.');
}

// Setup Neon client
const sql = neon(process.env.DATABASE_URL);

// Create Drizzle ORM instance
export const db = drizzle(sql, { schema });
