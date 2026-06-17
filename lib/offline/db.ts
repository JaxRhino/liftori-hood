/**
 * Offline DB (web stub) — Metro resolves this on web; db.native.ts ships the
 * real SQLite implementation on device. The web preview renders UI only, so the
 * offline queue is inert here. expo-sqlite is intentionally NOT imported (it has
 * no web build in SDK 51 and breaks `expo export --platform web`).
 */
import type { SQLiteDatabaseLike, SyncQueueRow } from './types';

export const DB_NAME = 'liftori_hood.db';

export async function getDb(): Promise<SQLiteDatabaseLike | null> {
  return null;
}

export type { SyncQueueRow };
