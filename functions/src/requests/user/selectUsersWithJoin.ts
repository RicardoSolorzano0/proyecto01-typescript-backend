import {  type Request, type Response } from 'express';
import { jsonArrayFrom }                from 'kysely/helpers/postgres';
import { z }                            from 'zod';
import { constructDB }                  from '@/db/database';




const schema = z.object({
    option: z.enum(['all', 'active', 'inactive'])
});


const func = async (req: Request, res: Response) => {
    const { option }  = req.payloadData as z.infer<typeof schema>;

    const db = constructDB();

    const user = await db
        .selectFrom('users')
        .innerJoin('user_types', 'user_types.id', 'users.user_type_id')
        .select([
            'users.id', 
            'users.name', 
            'users.last_name', 
            'users.birthdate', 
            'users.address', 
            'users.email', 
            'users.gender', 
            'user_types.name as user_type',
            'users.user_type_id',
            'users.created_at'
        ])
        .$if(option === 'active', qb => qb.where('users.deleted_at', 'is', null))
        .$if(option === 'inactive', qb => qb.where('users.deleted_at', 'is not', null))
        .select(eb=>[
            jsonArrayFrom(
                eb.selectFrom('animal_user')
                    .innerJoin('animals', 'animals.id', 'animal_user.animal_id')    
                    .select(['animal_user.id as user_animal_id', 'animal_user.animal_id as id', 'animals.name as name'])
                    .whereRef('animal_user.user_id', '=', 'users.id')
                    .orderBy('animal_user.created_at', 'asc')
            ).as('animals')
        ])
        .orderBy('users.created_at', 'asc')
        .execute();

    // const arr=user?.map(user => {
    //     return {
    //         id: user.id,
    //         name: user.name,
    //         last_name: user.last_name,
    //         birthdate: user.birthdate.toISOString().split('T')[0],
    //         address: user.address,
    //         email: user.email,
    //         gender: user.gender,
    //         user_type: user.user_type,
    //         user_type_id: user.user_type_id,
    //         created_at: user.created_at
    //     }
    // })

    res.json(user);
};

export const selectUsersWithJoin = { func, schema };