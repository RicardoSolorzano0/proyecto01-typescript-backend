import type { Request, Response } from 'express';
import { z } from 'zod';
import { RepeatedName } from './utils/RepeatedName';
import { db } from '../../db/database';

const schema = z.object({
    id: z.string().uuid(),
    name: z.string().optional(),
    description: z.string().optional(),
    color: z.string().regex(/#[a-fA-F0-9]{6}/).optional(),
});

const func = async (req: Request, res: Response) => {
    const { id, name, description, color } = req.payloadData as z.infer<typeof schema>;
    
    if(name){
        const repeatedName = await RepeatedName(name);

        if(repeatedName){
            res.status(400).json({ ok: false, error: 'El nombre ya existe' });
            return;
        }
    }

    const typeUser = await db.selectFrom('user_types')
        .select(['id', 'name'])
        .where('id', '=', id)
        .execute()

    if(typeUser.length === 0){
        res.status(404).json({ ok: false, error: 'Tipo de Usuario no encontrado' });
        return 
    }else{
        await db
            .updateTable('user_types')
            .set({ name, description, color, updated_at: new Date() })
            .where('id', '=', id)
            .execute()

        res.status(200).json({ ok: true, message: 'Se actualizo con exito' });
    }
}

export const updateTypeUser = { func, schema }