import type { Request, Response  } from 'express';
import { z } from 'zod';
import { db } from '@/db/database';
import { softDelete } from '@/db/softDelete';
import { existTypeUser } from './utils/existTypeUser';

const schema = z.object({
    id: z.string().uuid(),
});

const func = async (req: Request, res: Response) => {
    const { id } = req.payloadData as z.infer<typeof schema>;

    const typeUser = await existTypeUser(id)

    if (!typeUser) {
        res.status(404).json({ ok: false, error: 'Tipo de Usuario no encontrado' })
        return
    } 

    const users = await db
        .selectFrom('users')
        .select(['id'])
        .where('user_type_id', '=', id)
        .execute()

    if(users.length > 0){
        res.status(422).json({ ok: false, error: 'El tipo de usuario tiene usuarios asociados' })
        return
    }

    if(typeUser.deleted_at){
        res.status(400).json({ ok: false, error: 'El tipo de usuario ya fue eliminado' })
        return
    }

    await softDelete(db, 'user_types')
        .where('id', '=', id)
        .returning(['id'])
        .execute();
   
    res.status(200).json({ ok: true, message: 'Se elimino con exito' })
}

export const deleteTypeUser = { func, schema }