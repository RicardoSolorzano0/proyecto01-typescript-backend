import type { Request, Response } from 'express';
import { z } from 'zod';
import { constructDB } from '@/db/database';
import { softDelete } from '@/db/softDelete';
import { getExistingAnimal } from './utils/getExistingAnimal';

const schema = z.object({
    id: z.string().uuid(),
});

const func = async (req: Request, res: Response) => {
    const { id } = req.payloadData as z.infer<typeof schema>;

    const db = constructDB();

    const animal = await getExistingAnimal(db, id);

    if(!animal){
        res.status(404).json({ ok: false, error: 'ANIMAL_NOT_FOUND' });
        // res.status(404).json({ ok: false, error: 'Animal no encontrado' });
        return;
    }

    if(animal.deleted_at){
        res.status(400).json({ ok: false, error: 'ANIMAL_ALREADY_DELETED' });
        //res.status(400).json({ ok: false, error: 'El animal ya fue eliminado' });
        return;
    }

    await softDelete(db, 'animals')
        .where('id', '=', id)
        .returning(['id'])
        .execute();

    res.status(200).json();
}

export const deleteAnimal = { func, schema };    