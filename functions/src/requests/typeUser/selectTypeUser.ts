import type { Request, Response } from 'express';
import { z } from 'zod'
import { db } from '../../db/database';

const schema = z.object({
    option: z.enum(['all', 'active', 'inactive', 'id']),
    id: z.string().uuid().optional(),
});


const func = async (req: Request, res: Response) => {
    const { option,id }  = req.payloadData as z.infer<typeof schema>

    let typeUser;
    if (option === 'all') {
        typeUser = await db.selectFrom('user_types').selectAll().execute()
    }else if (option === 'active') {
        typeUser = await db.selectFrom('user_types').selectAll().where('deleted_at', 'is', null).execute()
    }
    else if(option === 'inactive') {
        typeUser = await db.selectFrom('user_types').selectAll().where('deleted_at', 'is not', null).execute()
    }else{
        if(id === undefined) {
            res.status(400).json({ ok: false, error: 'Debe enviar el id' })
            return
        }
        typeUser = await db.selectFrom('user_types').selectAll().where('id', '=', id).execute()
    }

    res.json({ typeUser, ok: true });
}

export const selectTypeUser = { func, schema }