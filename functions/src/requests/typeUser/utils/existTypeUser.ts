import { db } from '@/db/database'

export const existTypeUser = async (id: string) => {
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