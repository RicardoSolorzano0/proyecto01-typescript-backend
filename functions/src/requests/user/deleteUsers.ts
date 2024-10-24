import type { Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../../db/database';

const schema = z.object({
    id: z.string().uuid(),
});

const func = async (req: Request, res: Response) => {
    const { id } = req.payloadData as z.infer<typeof schema>;

    const user = await db.selectFrom('users')
        .select(['id', 'name'])
        .where('id', '=', id)
        .execute();

    if (user.length === 0) {
        res.status(404).json({ ok: false, error: 'Usuario no encontrado' });
        return;
    }

    await db
        .deleteFrom('users')
        .where('id', '=', id)
        .returning(['id', 'name'])
        .execute();
    res.status(200).json({ ok: true, message: 'Se elimino con exito' });
}

export const deleteUsers = { func, schema };    