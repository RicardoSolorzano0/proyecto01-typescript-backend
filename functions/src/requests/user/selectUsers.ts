import type { Request, Response } from 'express';
import { z } from 'zod';
import { db } from '@/db/database';

const schema = z.object({
    option: z.enum(['all', 'active', 'inactive']),
});


const func = async (req: Request, res: Response) => {
    const { option }  = req.payloadData as z.infer<typeof schema>

    let user;
    if (option === 'all') {
        user = await db.selectFrom('users').selectAll().execute()
    }else if (option === 'active') {
        user = await db.selectFrom('users').selectAll().where('deleted_at', 'is', null).execute()
    }
    else{
        user = await db.selectFrom('users').selectAll().where('deleted_at', 'is not', null).execute()
    }

    res.json({ user, ok: true })
}

export const selectUsers = { func, schema }