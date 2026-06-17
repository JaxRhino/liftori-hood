/**
 * Offline DB (native) — local SQLite mirror + durable sync queue.
 * Picked by Metro on iOS/Android. The web build resolves db.ts instead, which
 * is a no-op stub (expo-sqlite has no web target in SDK 51).
 */
import * as SQLite from 'expo-sqlite';
import type { SQLiteDatabaseLike, SyncQueueRow } from './types';

export const DB_NAME = 'liftori_hood.db';

let _db: SQLite.SQLiteDatabase | null = null;

export async function getDb(): Promise<SQLiteDatabaseLike | null> {
  if (_db) return _db;
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS sync_queue (
      id           TEXT PRIMARY KEY NOT NULL,
      type         TEXT NOT NULL,
      entity       TEXT NOT NULL,
      payload      TEXT NOT NULL,
      created_at   TEXT NOT NULL,
      retry_count  INTEGER NOT NULL DEFAULT 0,
      status       TEXT NOT NULL DEFAULT 'pending'
    );
    CREATE INDEX IF NOT EXISTS idx_sync_queue_status ON sync_queue (status, created_at);
  `);
  _db = db;
  return _db;
}

export type { SyncQueueRow };
