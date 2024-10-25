import type { Request, Response } from 'express';
import { z } from 'zod';
import { db } from '@/db/database';

const schema = z.object({
    option: z.enum(['all', 'active', 'inactive']),
});


const func = async (req: Request, res: Response) => {
    const { option }  = req.payloadData as z.infer<typeof schema>

    const user = await db
        .selectFrom('users')
        .selectAll()
        .$if(option === 'active', qb => qb.where('deleted_at', 'is', null))
        .$if(option === 'inactive', qb => qb.where('deleted_at', 'is not', null))
        .execute()

    res.json({ user, ok: true })
}

export const selectUsers = { func, schema }