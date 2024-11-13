import type { Kysely } from 'kysely';
import type { DB }     from 'kysely-codegen';


export const validateDuplicateEmail = async (db: Kysely<DB>, email: string, id?: string): Promise<boolean> =>{
    const searchEmail = await db
        .selectFrom('users')
        .select(['email', 'id'])
        .where('email', '=', email)
        .execute();

    //si el id es diferente
    if ( searchEmail.length > 0 && id) {
        return id !== searchEmail[0].id;
    }

    return searchEmail.length > 0;
};