import type { Request, Response } from 'express';
import { db } from '../../db/database';

const func = async (req: Request, res: Response) => {
    const typeUser = await db.selectFrom('user_types').selectAll().execute()

    res.json({ typeUser, ok: true });
}

export const selectTypeUser = { func }