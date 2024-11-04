import type { ReferenceExpression, SelectQueryBuilder } from 'kysely'
import type { DB } from 'kysely-codegen';

export const paginate = async <TableName extends keyof DB & string>(
    baseQuery: SelectQueryBuilder<DB, TableName, Partial<Omit<unknown, never>>>,
    limit: number,
    page: number,
    orderBy: ReferenceExpression<DB, TableName>,
    direction: 'asc' | 'desc' = 'asc'
) => {

    const offset = (page-1) * limit;
   
    const data = await baseQuery
        .orderBy(orderBy, direction)
        .selectAll()
        .limit(limit)
        .offset(offset)
        .execute();
    
    const { totalCount }  = await baseQuery
        .select((eb) => eb.fn.countAll().as('totalCount'))
        .executeTakeFirstOrThrow();

    return {
        data,
        page, 
        perPage: limit,
        total: Number(totalCount),
    }
}