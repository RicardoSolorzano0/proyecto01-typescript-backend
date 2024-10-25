import type { Request, Response } from 'express';
import { z } from 'zod';
import { db } from '@/db/database';
import { existUser } from './utils/existUser';
import { validateDuplicateEmail } from './utils/validateDuplicateEmail';

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
        const repeatEmail = await validateDuplicateEmail(email,id);

        if(repeatEmail){
            res.status(400).json({ ok: false, error: 'El email ya existe' });
            return;
        }
    }

    const user = await existUser(id);

    if(!user){
        res.status(404).json({ ok: false, error: 'Usuario no encontrado' });
        return;
    }

    if(user.deleted_at){
        res.status(400).json({ ok: false, error: 'El usuario ya fue eliminado' });
        return;
    }
    
    await db
        .updateTable('users')
        .set({ name, last_name, birthdate, address, email, gender, user_type_id, updated_at: new Date() })
        .where('id', '=', id)
        .execute();
    res.status(200).json({ ok: true, message: 'Se actualizo con exito' });
}

export const updateUser = { func, schema }