import type { Request, Response } from 'express';
import { z } from 'zod'
import { constructDB } from '@/db/database';
import { Paginate } from '@/db/paginate';

const schema = z.object({
    option: z.enum(['all', 'active', 'inactive']),
    limit: z.coerce.number(),
    page: z.coerce.number(),
    name: z.string().optional(),
});

const func = async (req: Request, res: Response) => {
    const { option, limit, page, name }  = req.payloadData as z.infer<typeof schema>

    const db = constructDB();

    const baseQuery = db
        .selectFrom('user_types')
        .$if(option === 'active', (qb) => qb.where('deleted_at', 'is', null))
        .$if(option === 'inactive', (qb) => qb.where('deleted_at', 'is not', null))
        .$if( name !== '', (qb) => qb.where('name', 'ilike', `%${name!}%`));

    const { data, total } = await Paginate(baseQuery, limit, page, 'asc','created_at')

    res.status(200).json({ data, page, perPage: limit, total });
}

export const selectPaginatedUserTypes = { func, schema }