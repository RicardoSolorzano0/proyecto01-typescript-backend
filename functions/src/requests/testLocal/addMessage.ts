import type { Request, Response } from 'express';
import { z } from 'zod';

const schemaObjectBody = z.object({
    propiedad1: z.string(),
    propiedad2: z.string(),
    propiedad3:z.number(),
    propiedad4:z.boolean(),
    propiedad5:z.array(z.string()),
});

const addMessagePost =  (req: Request, res: Response) => {
    //toma el body
    const original = req.payloadData as z.infer<typeof schemaObjectBody>;

    // Inserta el nuevo mensaje en Firestore usando el SDK de  de Firebase.
   

    // Enviar un mensaje de que hemos escrito correctamente el mensaje

    res.json({ result: 'ok', original });
}

export const addMessagePostRequest = { func:addMessagePost,schema: schemaObjectBody }

const schema = z.object({
    text: z.string(),
    propiedad: z.string()
});

const func = (req: Request, res: Response) => {
    //toma el parametro de texto
    console.log(req.payloadData, 'revisando todo el request');
    const original = req.payloadData as z.infer<typeof schema>;

    // Inserta el nuevo mensaje en Firestore usando el SDK de  de Firebase.
 

    // Enviar un mensaje de que hemos escrito correctamente el mensaje

    res.json({ result: `Mensaje con id: ${ original.text } agregado.`, original });
}

export const addMessage = { func, schema }