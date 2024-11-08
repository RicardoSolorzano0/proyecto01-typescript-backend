/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { type Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('animal_user')
        .addColumn('id', 'integer', (col) => col.generatedAlwaysAsIdentity().primaryKey())
        .addColumn('animal_id', 'uuid', (col) => 
            col.references('animals.id').onDelete('cascade').notNull()
        )
        .addColumn('user_id', 'uuid', (col) => 
            col.references('users.id').onDelete('cascade').notNull()
        )
        .addColumn('created_at', 'timestamptz', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
        .addColumn('updated_at', 'timestamptz', (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
        //.addColumn('deleted_at', 'timestamptz') hacer un hard delete
        .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('animal_user').execute()
    // down migration code goes here...
    // note: down migrations are optional. you can safely delete this function.
    // For more info, see: https://kysely.dev/docs/migrations
}
