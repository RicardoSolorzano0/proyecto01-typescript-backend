import type { Kysely } from 'kysely';
import type { DB } from 'kysely-codegen';


export const existTypeUser = async (db:Kysely<DB>,id: string,) => {
    const typeUser = await db.selectFrom('user_types')
        .select(['id', 'name', 'deleted_at'])
        .where('id', '=', id)
        .execute()

    if(typeUser.length > 0){
        const { id, name, deleted_at } = typeUser[0]
        return {
            id,
            name, 
            deleted_at
        }
    }else{
        return null
    }
}