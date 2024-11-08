import type { Request, Response } from 'express';
import { z } from 'zod';
import { constructDB } from '@/db/database';

const schema = z.object({
    animals: z.string().uuid().array(),
    user_id: z.string().uuid(),
});

const func = async (req: Request, res: Response) => {
    const { animals, user_id } = req.payloadData as z.infer<typeof schema> 
    
    const db = constructDB();

    //evaluar lo que ya teniamos en la base de datos
    const animalUser = await db.selectFrom('animal_user')
        .selectAll()
        .where('user_id', '=', user_id)
        .execute();

    // evaluando si animalUser es igual a animals
   
    const animalsAdd = animals.filter(x => !animalUser.some(y => y.animal_id === x));
    const animalsDelete = animalUser.filter(x => !animals.some(y => y === x.animal_id));

    if(animalsAdd.length === 0 && animalsDelete.length === 0){
        res.status(200).json({ ok:true });
        return;
    }
    else{
        //agregaremos

        if(animalsAdd.length>0){
            const favoritesAnimals = animalsAdd.map((animal) => ({ animal_id: animal, user_id }));

            await db
                .insertInto('animal_user')
                .values(favoritesAnimals)
                .execute()
        }

        //eliminaremos

        if(animalsDelete.length>0){
            for(const animal of animalsDelete){
                await db
                    .deleteFrom('animal_user')
                    .where('animal_id', '=', animal.animal_id)
                    .where('user_id', '=', user_id)
                    .execute()
            }
        }

        res.status(200).json({ animalsAdd, animalsDelete });
        return
    }
}

export const createAnimalUser = { func, schema }