import { Pool, QueryResultRow } from 'pg';

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgresql://postgres:PtVmhzSsxvYNRMmfqiWjnyYIqTDldmFv@ballast.proxy.rlwy.net:59751/railway',
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
) {
  const result = await pool.query<T>(text, params);
  return result.rows;
}

export default pool;
