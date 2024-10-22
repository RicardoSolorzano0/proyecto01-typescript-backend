import type { Request , Response }from 'express';
import { z } from 'zod';

const schema = z.object({
    name: z.string(),
    last_name: z.string(),
    birthdate: z.coerce.date(),
    address: z.string(),
    email: z.string().email(),
    gender: z.string(),
});

const func = (req: Request, res: Response) => {
    const info = req.payloadData as z.infer<typeof schema>;

    

    res.json({ result: 'ok', info });
}

export const createUsers = { func, schema }