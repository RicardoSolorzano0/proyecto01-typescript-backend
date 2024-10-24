/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Kysely } from 'kysely'
import { sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    // up migration code goes here...
    // note: up migrations are mandatory. you must implement this function.
    // For more info, see: https://kysely.dev/docs/migrations
    await db.schema
        .createTable('user_types')
        .addColumn('id', 'uuid', (col) => col.defaultTo(sql`gen_random_uuid()`).primaryKey())
        .addColumn('name', 'text', (col) => col.notNull().unique())
        .addColumn('description', 'text', (col) => col.notNull())
        .addColumn('color', 'char(7)', (col) => col.notNull())
        .addColumn('created_at', 'timestamptz', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
        .addColumn('updated_at', 'timestamptz', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
        .addColumn('deleted_at', 'timestamptz')
        .execute()


}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('user_types').execute()
    // down migration code goes here...
    // note: down migrations are optional. you can safely delete this function.
    // For more info, see: https://kysely.dev/docs/migrations
}
