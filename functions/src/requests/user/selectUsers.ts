import type { Request, Response } from 'express';
import { z } from 'zod';
import { constructDB } from '@/db/database';

const schema = z.object({
    option: z.enum(['all', 'active', 'inactive']),
});


const func = async (req: Request, res: Response) => {
    const { option }  = req.payloadData as z.infer<typeof schema>

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
            'users.user_type_id'
        ])
        .$if(option === 'active', qb => qb.where('deleted_at', 'is', null))
        .$if(option === 'inactive', qb => qb.where('deleted_at', 'is not', null))
        .execute()

    res.json({ user, ok: true })
}

export const selectUsers = { func, schema }