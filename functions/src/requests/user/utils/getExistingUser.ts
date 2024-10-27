import type { Kysely } from 'kysely';
import type { DB } from 'kysely-codegen';

export const getExistingUser = async (db:Kysely<DB>,id: string) => {
    const user = await db.selectFrom('users')
        .select(['id', 'name', 'deleted_at'])
        .where('id', '=', id)
        .execute();


    if(user.length > 0){
        const { id, name, deleted_at } = user[0]
        return {
            id,
            name,
            deleted_at
        }
    }else{
        return null
    }
}