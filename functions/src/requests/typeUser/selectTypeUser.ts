import type { Request, Response } from 'express';
import { z } from 'zod'
import { db } from '../../db/database';

const schema = z.object({
    option: z.enum(['all', 'active', 'inactive']),
});


const func = async (req: Request, res: Response) => {
    const { option }  = req.payloadData as z.infer<typeof schema>

    let typeUser;
    if (option === 'all') {
        typeUser = await db.selectFrom('user_types').selectAll().execute()
    }else if (option === 'active') {
        typeUser = await db.selectFrom('user_types').selectAll().where('deleted_at', 'is', null).execute()
    }
    else{
        typeUser = await db.selectFrom('user_types').selectAll().where('deleted_at', 'is not', null).execute()
    }

    res.json({ typeUser, ok: true });
}

export const selectTypeUser = { func, schema }