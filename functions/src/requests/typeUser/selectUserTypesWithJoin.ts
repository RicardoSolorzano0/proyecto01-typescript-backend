import type { Request, Response } from 'express';
import { jsonArrayFrom } from 'kysely/helpers/postgres'
import { z } from 'zod'
import { constructDB } from '@/db/database';

const schema = z.object({
    option: z.enum(['all', 'active', 'inactive']),
});


const func = async (req: Request, res: Response) => {
    const { option }  = req.payloadData as z.infer<typeof schema>

    const db = constructDB();

    const typeUser = await db
        .selectFrom('user_types')
        .selectAll()
        .$if(option === 'active', qb => qb.where('deleted_at', 'is', null))
        .$if(option === 'inactive', qb => qb.where('deleted_at', 'is not', null))
        .select((eb)=>[
            'user_types.id',
            'user_types.name',
            jsonArrayFrom(
                eb.selectFrom('users')
                    .select(['users.id as user_id', 'users.name'])
                    .whereRef('users.user_type_id', '=', 'user_types.id')
                    .orderBy('users.name')
            ).as('users')
        ])
        .orderBy('user_types.created_at', 'asc')
        .execute()

    res.json(typeUser);
}

export const selectUserTypesWithJoin = { func, schema }