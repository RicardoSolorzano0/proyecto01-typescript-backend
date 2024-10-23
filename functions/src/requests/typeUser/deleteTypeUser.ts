import type { Request, Response  } from 'express';
import { z } from 'zod';
import { db } from '../../db/database';

const schema = z.object({
    id: z.string(),
});

const func = async (req: Request, res: Response) => {
    const { id } = req.payloadData as z.infer<typeof schema>;
    try {
        const [typeUser] = await db.selectFrom('user_types')
            .select(['id', 'name'])
            .where('id', '=', id)
            .execute()

        if (!typeUser.id) {
            res.status(404).json({ ok: false, error: 'Tipo de Usuario no encontrado' })
        } else {
            await db
                .deleteFrom('user_types')
                .where('id', '=', typeUser.id)
                .returning(['id', 'name'])
                .execute()


            res.status(200).json({ ok: true, message: 'Se elimino con exito' })
        }
    } catch (error) {
        res.status(500).json({ ok: false, error: 'El id es erroneo' })
    }
}

export const deleteTypeUser = { func, schema }