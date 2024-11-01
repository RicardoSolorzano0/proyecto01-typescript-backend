import type { ReferenceExpression, SelectQueryBuilder } from 'kysely'
import type { DB } from 'kysely-codegen';

export const Paginate = async <TableName extends keyof DB & string>(
    baseQuery: SelectQueryBuilder<DB, TableName, Partial<Omit<unknown, never>>>,
    limit: number,
    page: number,
    direction: 'asc' | 'desc' = 'asc',
    orderBy: ReferenceExpression<DB, TableName>,
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
        total: Number(totalCount)
    }
}