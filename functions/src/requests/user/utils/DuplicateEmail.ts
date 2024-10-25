import { db } from '@/db/database';

export const DuplicateEmail = async (email:string) : Promise<boolean> =>{
    const searchEmail = await db
        .selectFrom('users')
        .select(['email'])
        .where('email', '=', email)
        .execute()

    return searchEmail.length>0;
}