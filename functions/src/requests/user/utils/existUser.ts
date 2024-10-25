import { db } from '@/db/database';

export const existUser = async (id: string) => {
    const user = await db.selectFrom('users')
        .select(['id', 'name'])
        .where('id', '=', id)
        .execute();

    return user.length > 0;
}