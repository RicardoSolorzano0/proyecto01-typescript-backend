import type { Request, Response } from 'express';
import { z } from 'zod'
import { constructDB } from '@/db/database';
import { paginate } from '@/db/paginate';

const schema = z.object({
    option: z.enum(['all', 'active', 'inactive']),
    limit: z.coerce.number(),
    page: z.coerce.number(),
    filter:z.string().optional(),
    userType: z.string().optional(),
});

const func = async (req: Request, res: Response) => {
    const { option, limit, page,filter,userType }  = req.payloadData as z.infer<typeof schema>

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
    
    const response = await paginate(baseQuery, limit, page,'users.created_at');

    const { data } = response

    const arr=data?.map(user => {
        return {
            ...user,
            birthdate: user.birthdate.toISOString().split('T')[0],
        }
    })

    res.status(200).json({ ...response, data: arr });
}

export const selectPaginatedUsers = { func, schema }