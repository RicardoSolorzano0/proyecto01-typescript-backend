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
        .selectFrom('animals')
        .selectAll()
        .$if(option === 'active', qb => qb.where('deleted_at', 'is', null))
        .$if(option === 'inactive', qb => qb.where('deleted_at', 'is not', null))
        .orderBy('created_at', 'asc')
        .execute()

    res.status(200).json(user.length > 0 ? user : []);
}

export const selectAnimals = { func, schema }