import type { Request, Response  } from 'express';
import { z }                       from 'zod';
import { constructDB }             from '@/db/database';
import { softDelete }              from '@/db/softDelete';
import { getExistingUserType }     from './utils/getExistingUserType';





const schema = z.object({
    id: z.string().uuid()
});

const func = async (req: Request, res: Response) => {
    const { id } = req.payloadData as z.infer<typeof schema>;

    const db = constructDB();

    const typeUser = await getExistingUserType(db, id);

    if (!typeUser) {
        res.status(404).json({ ok: false, error: 'USER_TYPE_NOT_FOUND' });
        // res.status(404).json({ ok: false, error: 'Tipo de Usuario no encontrado' })
        return;
    } 

    const users = await db
        .selectFrom('users')
        .select(['id'])
        .where('user_type_id', '=', id)
        .execute();

    if (users.length > 0) {
        res.status(422).json({ ok: false, error: 'USERS_ASSOCIATED' });
        //res.status(422).json({ ok: false, error: 'El tipo de usuario tiene usuarios asociados' })
        return;
    }

    if (typeUser.deleted_at) {
        res.status(400).json({ ok: false, error: 'USER_TYPE_ALREADY_DELETED' });
        //res.status(400).json({ ok: false, error: 'El tipo de usuario ya fue eliminado' })
        return;
    }

    await softDelete(db, 'user_types')
        .where('id', '=', id)
        .returning(['id'])
        .execute();
   
    res.status(200).json();
};

export const deleteUserType = { func, schema };