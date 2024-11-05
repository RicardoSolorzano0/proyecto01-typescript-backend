import type { Request, Response }from 'express';
import { z } from 'zod';
import { constructDB } from '@/db/database';
import { validateDuplicateEmail } from './utils/validateDuplicateEmail';

const schema = z.object({
    name: z.string(),
    last_name: z.string(),
    birthdate: z.coerce.date().max(new Date()),
    address: z.string(),
    email: z.string().email(),
    gender: z.enum(['M', 'F']),
    user_type_id: z.string().uuid(),
});

const func = async (req: Request, res: Response) => {
    const { name, last_name, birthdate, address, email, gender, user_type_id } = 
    req.payloadData as z.infer<typeof schema>;

    const db = constructDB();

    const repeatEmail = await validateDuplicateEmail(db,email);

    if(repeatEmail){
        //res.status(400).json({ ok: false, error: 'El email ya existe' });
        res.status(400).json({ ok: false, error: 'EMAIL_ALREADY_EXISTS' });
        return
    }

    const searchUserType = await db
        .selectFrom('user_types')
        .select(['id'])
        .where('id', '=', user_type_id)
        .execute();
    if(searchUserType.length === 0){
        res.status(400).json({ ok: false, error: 'El tipo de usuario no existe' });
        return
    }

    await db
        .insertInto('users')
        .values({
            name,
            last_name,
            birthdate,
            address,
            email,
            gender,
            user_type_id,
        })
        .returning('id')
        .execute();

    res.status(201).json();
}

export const createUser = { func, schema }