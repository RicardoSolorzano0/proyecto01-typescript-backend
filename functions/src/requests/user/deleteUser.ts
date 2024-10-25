import type { Request, Response } from 'express';
import { z } from 'zod';
import { db } from '@/db/database';
import { softDelete } from '@/db/softDelete';
import { existUser } from './utils/existUser';

const schema = z.object({
    id: z.string().uuid(),
});

const func = async (req: Request, res: Response) => {
    const { id } = req.payloadData as z.infer<typeof schema>;

    const user = await existUser(id);

    if (!user) {
        res.status(404).json({ ok: false, error: 'Usuario no encontrado' });
        return;
    }

    if (user.deleted_at) {
        res.status(400).json({ ok: false, error: 'El usuario ya fue eliminado' });
        return;
    }

    await softDelete(db, 'users')
        .where('id', '=', id)
        .returning(['id'])
        .execute();

    res.status(200).json({ ok: true, message: 'Se elimino con exito' });
}

export const deleteUser = { func, schema };    