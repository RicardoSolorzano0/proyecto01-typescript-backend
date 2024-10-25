import { db } from '@/db/database'

export const validateRepeatedName = async (name:string, id?:string) : Promise<boolean> =>{
    const searchName = await db
        .selectFrom('user_types')
        .select(['name', 'id'])
        .where('name', '=', name)
        .execute()
       
    //si el id el diferente 
    if(searchName.length > 0 && id){
        return id!==searchName[0].id
    }
    
    return searchName.length > 0;
}
