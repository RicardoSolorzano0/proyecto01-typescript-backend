import type { Request, Response } from 'express';
import { z }                      from 'zod';
import { constructDB }            from '@/db/database';



const schema = z.object({
    user_id: z.string().uuid()
});

const func = async (req: Request, res: Response) => {
    const { user_id }  = req.payloadData as z.infer<typeof schema>;

    const db = constructDB();

    const favoritesAnimals = await db.selectFrom('animal_user')
        .innerJoin('animals', 'animal_user.animal_id', 'animals.id')
        .select(['animals.id', 'animals.name'])
        .where('user_id', '=', user_id)
        .execute();

    res.status(200).json(favoritesAnimals.length > 0 ? favoritesAnimals : []);
};

export const selectAnimalUsers = { func, schema };