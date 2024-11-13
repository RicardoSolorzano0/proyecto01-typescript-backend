import type { Request, Response } from 'express';
import { z }                      from 'zod';
import { constructDB }            from '@/db/database';
import { validateRepeatedName }   from './utils/validateRepeatedName';




const schema = z.object({
    name: z.string(),
    description: z.string(),
    color: z.string().regex(/#[a-fA-F0-9]{6}/)
});

const func = async (req: Request, res: Response) => {
    const { name, description, color } = req.payloadData as z.infer<typeof schema>; 

    const db = constructDB();

    const repeatedName = await validateRepeatedName(db, name);

    if (repeatedName) {
        res.status(400).json({ ok: false, error: 'USER_TYPE_ALREADY_EXISTS' });
        // res.status(400).json({ ok: false, error: 'El nombre ya existe' });
        return;
    }

    await db
        .insertInto('user_types')
        .values({ name, description, color }).returning('id')
        .execute();

    res.status(201).json();
};

export const createUserType = { func, schema };