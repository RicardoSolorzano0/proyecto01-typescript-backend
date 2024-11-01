import type { Request, Response } from 'express';
import { z } from 'zod'
import { constructDB } from '@/db/database';

const schema = z.object({
    option: z.enum(['all', 'active', 'inactive']),
    limit: z.coerce.number(),
    page: z.coerce.number(),
    filter:z.string().optional(),
    userType: z.string().optional(),
});

const func = async (req: Request, res: Response) => {
    const { option, limit, page,filter,userType }  = req.payloadData as z.infer<typeof schema>

    const offset = (page-1) * limit;

    const db = constructDB();

    const baseQuery = db
        .selectFrom('users')
        .$if(option === 'active', (qb) => qb.where('deleted_at', 'is', null))
        .$if(option === 'inactive', (qb) => qb.where('deleted_at', 'is not', null))
        .$if(userType !== '', (qb) => qb.where('user_type_id', '=', userType!))
        .$if(filter !== '', (qb) => qb.where((eb)=>eb.or([
            eb('users.name', 'ilike', `%${filter!}%`),
            eb('users.last_name', 'ilike', `%${filter!}%`),
            eb('users.email', 'ilike', `%${filter!}%`),
        ])));
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

    res.status(200).json({ data, page, perPage: limit, total: Number(totalCount) });
}

export const selectPaginatedUsers = { func, schema }