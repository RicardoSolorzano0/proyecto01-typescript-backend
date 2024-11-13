/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Kysely } from 'kysely';
import { sql }         from 'kysely';

export const softDelete = <DB, TR extends keyof DB & string>(db: Kysely<DB>, from: TR) => {
    return db.updateTable(from).set({ deleted_at: sql`CURRENT_TIMESTAMP` } as any);
};