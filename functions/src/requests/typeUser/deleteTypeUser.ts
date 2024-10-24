import type { Request, Response  } from 'express';
import { z } from 'zod';
import { db } from '../../db/database';

const schema = z.object({
    id: z.string().uuid(),
});

const func = async (req: Request, res: Response) => {
    const { id } = req.payloadData as z.infer<typeof schema>;
    
    const typeUser = await db.selectFrom('user_types')
        .select(['id', 'name'])
        .where('id', '=', id)
        .execute()

    if (typeUser.length === 0) {
        res.status(404).json({ ok: false, error: 'Tipo de Usuario no encontrado' })
        return
    } else {
        await db
            .deleteFrom('user_types')
            .where('id', '=', id)
            .returning(['id', 'name'])
            .execute()
        res.status(200).json({ ok: true, message: 'Se elimino con exito' })
    }
}

export const deleteTypeUser = { func, schema }