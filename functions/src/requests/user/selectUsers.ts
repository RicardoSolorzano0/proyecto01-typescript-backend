import type { Request, Response } from 'express';
import { z } from 'zod';
import { db } from '@/db/database';

const schema = z.object({
    option: z.enum(['all', 'active', 'inactive', 'id']),
    id: z.string().uuid().optional(),
});


const func = async (req: Request, res: Response) => {
    const { option, id }  = req.payloadData as z.infer<typeof schema>

    let user;
    if (option === 'all') {
        user = await db.selectFrom('users').selectAll().execute()
    }else if (option === 'active') {
        user = await db.selectFrom('users').selectAll().where('deleted_at', 'is', null).execute()
    }
    else if(option === 'inactive') {
        user = await db.selectFrom('users').selectAll().where('deleted_at', 'is not', null).execute()
    }else{
        if(id === undefined) {
            res.status(400).json({ ok: false, error: 'Debe enviar el id' })
            return
        }
        user = await db.selectFrom('users').selectAll().where('id', '=', id).execute()
    }

    res.json({ user, ok: true })
}

export const selectUsers = { func, schema }