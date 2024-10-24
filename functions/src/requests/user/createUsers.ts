import type { Request, Response }from 'express';
import { z } from 'zod';
import { db } from '@/db/database';

const schema = z.object({
    name: z.string(),
    last_name: z.string(),
    birthdate: z.coerce.date(), //Validar
    address: z.string(),
    email: z.string().email(),
    gender: z.enum(['M', 'F']),
    user_type_id: z.string(),
});

const func = async (req: Request, res: Response) => {
    const info = req.payloadData as z.infer<typeof schema>;

    const [result] = await db
        .insertInto('users')
        .values({
            name: info.name,
            last_name: info.last_name,
            birthdate: info.birthdate,
            address: info.address,
            email: info.email,
            gender: info.gender,
            user_type_id: info.user_type_id,
        })
        .returning('id')
        .execute();

    res.json({ result, ok: true });
}

export const createUsers = { func, schema }