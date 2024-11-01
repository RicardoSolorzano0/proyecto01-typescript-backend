import type { Request, Response } from 'express';
import { z } from 'zod'
import { constructDB } from '@/db/database';

const schema = z.object({
    option: z.enum(['all', 'active', 'inactive']),
    limit: z.coerce.number(),
    page: z.coerce.number(),
});

const func = async (req: Request, res: Response) => {
    const { option, limit, page }  = req.payloadData as z.infer<typeof schema>
    const offset = (page-1) * limit;

    const db = constructDB();

    const baseQuery = db
        .selectFrom('user_types')
        .$if(option === 'active', (qb) => qb.where('deleted_at', 'is', null))
        .$if(option === 'inactive', (qb) => qb.where('deleted_at', 'is not', null))

    //haciendo consulta con paginacion
    const data = await baseQuery
        .orderBy('created_at', 'asc')
        .selectAll()
        .limit(limit)
        .offset(offset)
        .execute();

    const { totalCount }  = await baseQuery
        .select((eb) => eb.fn.countAll().as('totalCount'))
        .executeTakeFirstOrThrow();

    // SELECT count(name) FROM user_types
    // SELECT count(*) FROM user_types

    res.status(200).json({ data, page, perPage: limit, total: Number(totalCount) });
}

export const selectUserTypesPaginate = { func, schema }