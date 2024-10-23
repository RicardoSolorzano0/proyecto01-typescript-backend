import type { Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../../db/database';

const schema = z.object({
    id: z.string(),
    name: z.string().optional(),
    description: z.string().optional(),
    color: z.string().optional(),
});

const func = async (req: Request, res: Response) => {
    const { id } = req.payloadData as z.infer<typeof schema>;
    
    try{
        const [user] = await db.selectFrom('user_types')
            .select(['id', 'name'])
            .where('id', '=', id)
            .execute()


        if(!user.id){
            res.status(404).json({ ok: false, error: 'Usuario no encontrado' });
        }else{
            const { name, description, color } = req.payloadData as z.infer<typeof schema>;
            await db
                .updateTable('user_types')
                .set({ name, description, color, updated_at: new Date() })
                .where('id', '=', user.id)
                .execute()


            res.status(200).json({ ok: true, message: 'Se actualizo con exito' });
        }
    }catch(error){
        res.status(500).json({ ok: false, error: 'El id es erroneo' });
    }
}

export const updateTypeUser = { func, schema }