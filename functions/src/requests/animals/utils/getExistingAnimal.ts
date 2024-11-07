import type { Kysely } from 'kysely';
import type { DB } from 'kysely-codegen';

export const getExistingAnimal = async (db:Kysely<DB>,id: string) => {
    const animal = await db.selectFrom('animals')
        .select(['id', 'name', 'deleted_at'])
        .where('id', '=', id)
        .execute();
    
    if(animal.length > 0){
        const { id, name, deleted_at } = animal[0]
        return {
            id,
            name,
            deleted_at
        }
    }else{
        return null
    }
}