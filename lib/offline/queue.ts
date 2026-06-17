/**
 * Sync queue — enqueue + flush (Wave 0 stubs).
 *
 * Contract set here so Wave 1 plugs entity handlers in without touching screens:
 * actions call enqueue(...), a reconnect/background task calls flush(), and the
 * queue drains to Supabase with exponential backoff. On web getDb() returns null
 * (no SQLite) so every call is a safe no-op.
 */
import { getDb } from './db';
import type { SyncQueueRow } from './types';

function uid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export interface EnqueueInput {
  type: string;
  entity: string;
  payload: unknown;
}

/** Persist a pending mutation. Returns row id, or null on web (no SQLite). */
export async function enqueue(input: EnqueueInput): Promise<string | null> {
  const db = await getDb();
  if (!db) return null;
  const row: SyncQueueRow = {
    id: uid(),
    type: input.type,
    entity: input.entity,
    payload: JSON.stringify(input.payload ?? null),
    created_at: new Date().toISOString(),
    retry_count: 0,
    status: 'pending',
  };
  await db.runAsync(
    `INSERT INTO sync_queue (id, type, entity, payload, created_at, retry_count, status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [row.id, row.type, row.entity, row.payload, row.created_at, row.retry_count, row.status]
  );
  return row.id;
}

/** Count of rows not yet synced. Drives the per-record sync-health indicator. */
export async function pendingCount(): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const r = await db.getFirstAsync<{ n: number }>(
    `SELECT COUNT(*) as n FROM sync_queue WHERE status != 'done'`
  );
  return r?.n ?? 0;
}

/**
 * Drain the queue to Supabase. Wave 0 stub.
 *
 * TODO(Wave 1): per-entity handlers, exponential-backoff retry, Storage uploads
 * for cached photos, and a reconnect/background hook to flush. Inert until then.
 */
export async function flush(): Promise<void> {
  // TODO(Wave 1): implement set-based drain with backoff + entity dispatch.
  return;
}
