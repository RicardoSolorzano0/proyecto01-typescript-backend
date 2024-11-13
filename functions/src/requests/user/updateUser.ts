import type { Request, Response } from 'express';
import { getAuth }                from 'firebase-admin/auth';
import { z }                      from 'zod';
import { constructDB }            from '@/db/database';
import { getExistingUser }        from './utils/getExistingUser';




import { validateDuplicateEmail } from './utils/validateDuplicateEmail';

const schema = z.object({
    name: z.string(),
    last_name: z.string(),
    birthdate: z.coerce.date().max(new Date()),
    address: z.string(),
    email: z.string().email(),
    gender: z.enum(['M', 'F']),
    user_type_id: z.string().uuid(),
    id: z.string().uuid()
});

const func = async (req: Request, res: Response) => {
    const { name, last_name, birthdate, address, email, gender, user_type_id, id } = 
    req.payloadData as z.infer<typeof schema> ;

    const db = constructDB();

    if (email) {
        const repeatEmail = await validateDuplicateEmail(db, email, id);

        if (repeatEmail) {
            res.status(400).json({ ok: false, error: 'USER_ALREADY_EXISTS' });
            return;
        }
    }

    const user = await getExistingUser(db, id);

    if (!user) {
        res.status(404).json({ ok: false, error: 'USER_NOT_FOUND' });
        return;
    }

    if (user.deleted_at) {
        res.status(400).json({ ok: false, error: 'USER_ALREADY_DELETED' });
        return;
    }
    
    await db.transaction().execute(async trx => {
        await trx
            .updateTable('users')
            .set({ name, last_name, birthdate, address, email, gender, user_type_id, updated_at: new Date() })
            .where('id', '=', id)
            .execute();

        if (user.email !== email || user.name !== name || user.last_name !== last_name) {
            try {
                await getAuth().updateUser(id, {
                    displayName: `${name} ${last_name}`,
                    email
                });
                res.status(200).json();
            } catch (err) {
                await getAuth()
                    .createUser({ 
                        uid: id,
                        displayName: `${name} ${last_name}`,
                        email, 
                        password: '123456'
                    });
                res.status(200).json();
            } 
        }
    });
};

export const updateUser = { func, schema };