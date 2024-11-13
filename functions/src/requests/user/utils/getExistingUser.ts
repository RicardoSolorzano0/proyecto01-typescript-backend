import type { Kysely } from 'kysely';
import type { DB }     from 'kysely-codegen';


export const getExistingUser = async (db: Kysely<DB>, id: string) => {
    const user = await db.selectFrom('users')
        .select(['id', 'name', 'last_name',  'deleted_at', 'email'])
        .where('id', '=', id)
        .execute();

    if (user.length > 0) {
        const { id, name, last_name, deleted_at, email } = user[0];
        return {
            id,
            name,
            last_name,
            email,
            deleted_at
        };
    } else {
        return null;
    }
};