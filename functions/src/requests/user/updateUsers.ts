import type { Request, Response } from 'express';
import { z } from 'zod';
import { DuplicateEmail } from './utils/DuplicateEmail';
import { db } from '../../db/database';

const schema = z.object({
    name:z.string().optional(),
    last_name:z.string().optional(),
    birthdate:z.coerce.date().max(new Date()).optional(),
    address:z.string().optional(),
    email:z.string().email().optional(),
    gender:z.enum(['M', 'F']).optional(),
    user_type_id:z.string().uuid().optional(),
    id:z.string().uuid()
});

const func = async (req: Request, res: Response) => {
    const { name, last_name, birthdate, address, email, gender, user_type_id, id } = 
    req.payloadData as z.infer<typeof schema> ;

    if(email){
        const repeatEmail = await DuplicateEmail(email);

        if(repeatEmail){
            res.status(400).json({ ok: false, error: 'El email ya existe' });
            return;
        }
    }

    const user = await db.selectFrom('users')
        .select(['id', 'name'])
        .where('id', '=', id)
        .execute();

    if(user.length === 0){
        res.status(404).json({ ok: false, error: 'Usuario no encontrado' });
        return;
    }else{
        await db
            .updateTable('users')
            .set({ name, last_name, birthdate, address, email, gender, user_type_id, updated_at: new Date() })
            .where('id', '=', id)
            .execute();
        res.status(200).json({ ok: true, message: 'Se actualizo con exito' });
    }
}

export const updateUsers = { func, schema }