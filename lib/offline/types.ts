/** Shared offline types — safe to import on any platform (no native deps). */
export type SyncStatus = 'pending' | 'in_flight' | 'failed' | 'done';

export interface SyncQueueRow {
  id: string;
  type: string;
  entity: string;
  payload: string;
  created_at: string;
  retry_count: number;
  status: SyncStatus;
}

/**
 * Minimal surface of the native SQLite handle used by the queue. Kept loose
 * (any-typed methods) so the concrete expo-sqlite SQLiteDatabase assigns to it
 * without fighting its overloaded signatures.
 */
export interface SQLiteDatabaseLike {
  runAsync(...args: any[]): Promise<any>;
  getFirstAsync<T = any>(...args: any[]): Promise<T | null>;
}
