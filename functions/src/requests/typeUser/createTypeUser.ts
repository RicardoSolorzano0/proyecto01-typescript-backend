import type { Request, Response } from 'express';
import { z } from 'zod';
import { db } from '@/db/database';
import { validateRepeatedName } from './utils/validateRepeatedName';

const schema = z.object({
    name: z.string(),
    description: z.string(),
    color: z.string().regex(/#[a-fA-F0-9]{6}/),
});

const func = async (req: Request, res: Response) => {
    const { name, description, color } = req.payloadData as z.infer<typeof schema> 

    const repeatedName = await validateRepeatedName(name);

    if (repeatedName) {
        res.status(400).json({ ok: false, error: 'El nombre ya existe' });
        return;
    }

    const [result] = await db
        .insertInto('user_types')
        .values({ name, description, color }).returning('id')
        .execute()

    res.json({ result , ok: true });
}

export const createTypeUser = { func, schema }