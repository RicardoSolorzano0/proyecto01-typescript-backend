import { db } from '@/db/database';

export const validateDuplicateEmail = async (email:string, id?:string) : Promise<boolean> =>{
    const searchEmail = await db
        .selectFrom('users')
        .select(['email','id'])
        .where('email', '=', email)
        .execute()

    //si el id es diferente
    if(id){
        return id!==searchEmail[0].id
    }

    return searchEmail.length>0;
}