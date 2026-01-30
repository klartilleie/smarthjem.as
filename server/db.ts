import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";

const connectionString = process.env.smarthjem_db || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "Database connection string must be set (smarthjem_db or DATABASE_URL)",
  );
}

export const pool = new Pool({ 
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

export const db = drizzle(pool, { schema });
