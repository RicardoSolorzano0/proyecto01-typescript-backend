/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('users')
        .addColumn('id', 'uuid', (col) => col.primaryKey())
        .addColumn('name', 'text', (col) => col.notNull())
        .addColumn('last_name', 'text', (col) => col.notNull())
        .addColumn('birthdate', 'date', (col) => col.notNull())
        .addColumn('address', 'text', (col) => col.notNull())
        .addColumn('email', 'text', (col) => col.notNull().unique())
        .addColumn('gender', 'char(1)', (col) => col.notNull())
        .addColumn('user_type_id', 'uuid', (col) =>
            col.references('user_types.id').onDelete('cascade').notNull(),
        )
        .addColumn('created_at', 'timestamptz', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
        .addColumn('updated_at', 'timestamptz', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
        .addColumn('deleted_at', 'timestamptz')
        .execute()

    // up migration code goes here...
    // note: up migrations are mandatory. you must implement this function.
    // For more info, see: https://kysely.dev/docs/migrations
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('users').execute()
    // down migration code goes here...
    // note: down migrations are optional. you can safely delete this function.
    // For more info, see: https://kysely.dev/docs/migrations
}
