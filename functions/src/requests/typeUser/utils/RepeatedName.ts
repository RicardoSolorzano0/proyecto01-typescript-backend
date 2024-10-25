import { db } from '@/db/database'

export const RepeatedName = async (name:string) : Promise<boolean> =>{
    const searchName = await db
        .selectFrom('user_types')
        .select(['name'])
        .where('name', '=', name)
        .execute()
    
    return searchName.length > 0;
}