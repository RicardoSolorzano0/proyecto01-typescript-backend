import { Kysely, PostgresDialect } from 'kysely';
import type { DB } from 'kysely-codegen';
import { Pool } from 'pg';

export const db = new Kysely<DB>({
    dialect: new PostgresDialect({
        pool: new Pool({
            database: 'base_prueba',
            host: 'localhost',
            user: 'ricardosolorzano',
            port: 5432,
            max: 10,
        })
    }),
});

//    ^ { created_at: Date; email: string; id: number; ... }[]