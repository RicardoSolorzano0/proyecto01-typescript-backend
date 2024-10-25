import { db } from '@/db/database';

export const existUser = async (id: string) => {
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