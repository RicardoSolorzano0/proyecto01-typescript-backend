import { db } from '@/db/database'

export const existTypeUser = async (id: string) => {
    const typeUser = await db.selectFrom('user_types')
        .select(['id', 'name'])
        .where('id', '=', id)
        .execute()

    return typeUser.length > 0;
}