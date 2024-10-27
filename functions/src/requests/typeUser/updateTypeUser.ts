import type { Request, Response } from 'express';
import { z } from 'zod';
import { constructDB } from '@/db/database';
import { getExistingUserType } from './utils/getExistingUserType';
import { validateRepeatedName } from './utils/validateRepeatedName';

const schema = z.object({
    id: z.string().uuid(),
    name: z.string().optional(),
    description: z.string().optional(),
    color: z.string().regex(/#[a-fA-F0-9]{6}/).optional(),
});

const func = async (req: Request, res: Response) => {
    const { id, name, description, color } = req.payloadData as z.infer<typeof schema>;
    
    const db = constructDB();

    if(name){
        const repeatedName = await validateRepeatedName(db,name, id);

        if(repeatedName){
            res.status(400).json({ ok: false, error: 'El nombre ya existe' });
            return;
        }
    }

    const typeUser = await getExistingUserType(db,id );

    if(!typeUser) {
        res.status(404).json({ ok: false, error: 'Tipo de Usuario no encontrado' });
        return
    } 

    if(typeUser.deleted_at){
        res.status(400).json({ ok: false, error: 'El tipo de usuario ya fue eliminado' });
        return
    }

    await db
        .updateTable('user_types')
        .set({ name, description, color, updated_at: new Date() })
        .where('id', '=', id)
        .execute()

    res.status(200).json({ ok: true, message: 'Se actualizo con exito' });
}

export const updateTypeUser = { func, schema }