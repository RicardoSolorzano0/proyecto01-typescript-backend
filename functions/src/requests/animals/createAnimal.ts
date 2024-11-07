import type { Request, Response } from 'express'
import { z } from 'zod'
import { constructDB } from '@/db/database';

const schema = z.object({
    name: z.string(),
    description: z.string(),
});

const func = async (req: Request, res: Response) => {
    const { name, description } = req.payloadData as z.infer<typeof schema>;

    const db = constructDB();

    await db.insertInto('animals')
        .values({ name, description })
        .returning(['id', 'name', 'description'])
        .execute();

    res.status(201).json();
}

export const createAnimal = { func, schema }