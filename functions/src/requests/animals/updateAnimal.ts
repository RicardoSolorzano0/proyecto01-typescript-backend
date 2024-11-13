import type { Request, Response } from 'express';
import { z }                      from 'zod';
import { constructDB }            from '@/db/database';
import { getExistingAnimal }      from './utils/getExistingAnimal';




const schema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    id: z.string().uuid()
});

const func = async (req: Request, res: Response) => {
    const { id, name, description } = 
    req.payloadData as z.infer<typeof schema> ;

    const db = constructDB();

    const existingAnimal = await getExistingAnimal(db, id);

    if (!existingAnimal) {
        res.status(404).json({ ok: false, error: 'ANIMAL_NOT_FOUND' });
        return;
    }

    if (existingAnimal.deleted_at) {
        res.status(400).json({ ok: false, error: 'ANIMAL_ALREADY_DELETED' });
        return;
    }

    await db
        .updateTable('animals')
        .set({ name, description, updated_at: new Date() })
        .where('id', '=', id)
        .execute();
        
    res.status(200).json();
};

export const updateAnimal = { func, schema };