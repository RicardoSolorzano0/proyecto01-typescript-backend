import type { Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../db/database';

const schema = z.object({
   
    name: z.string(),
    description: z.string(),
    color: z.string(),
});

const func =async (req: Request, res: Response) => {
    const info = req.payloadData as z.infer<typeof schema> 
    

    const result = await db
        .insertInto('user_types')
        .values({ name: info.name, description: info.description, color: info.color }).returning('id')
        .executeTakeFirst()


    res.json({ result , info });
}

export const createTypeUser = { func, schema }