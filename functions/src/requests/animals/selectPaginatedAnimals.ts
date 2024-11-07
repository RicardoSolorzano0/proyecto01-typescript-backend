import type { Request, Response } from 'express';
import { z } from 'zod'
import { constructDB } from '@/db/database';
import { paginate } from '@/db/paginate';

const schema = z.object({
    option: z.enum(['all', 'active', 'inactive']),
    limit: z.coerce.number(),
    page: z.coerce.number(),
    
});

const func = async (req: Request, res: Response) => {
    const { option, limit, page }  = req.payloadData as z.infer<typeof schema>

    const db = constructDB();

    const baseQuery = db
        .selectFrom('animals')
        .$if(option === 'active', (qb) => qb.where('deleted_at', 'is', null))
        .$if(option === 'inactive', (qb) => qb.where('deleted_at', 'is not', null))

    //haciendo consulta con paginacion
    
    const response = await paginate(baseQuery, limit, page,'created_at');
  
    res.status(200).json(response);
}

export const selectPaginatedAnimals = { func, schema }