import type { Request, Response } from 'express';
import { onRequest } from 'firebase-functions/v2/https';
import { z } from 'zod';

export const addMessage2 = onRequest( (req: Request, res: Response) => {
    //toma el parametro de texto
    const original = req.query.text;

    // Inserta el nuevo mensaje en Firestore usando el SDK de  de Firebase.
   

    // Enviar un mensaje de que hemos escrito correctamente el mensaje

    res.json({ result: `Mensaje con id: ${original as string} agregado.` });
});

const schema = z.object({
    text: z.string()
});

const func = (req: Request, res: Response) => {
    //toma el parametro de texto
    const original = req.payloadData as z.infer<typeof schema>;

    // Inserta el nuevo mensaje en Firestore usando el SDK de  de Firebase.
 

    // Enviar un mensaje de que hemos escrito correctamente el mensaje

    res.json({ result: `Mensaje con id: ${ original.text } agregado.` });
}

export const addMessage = { func, schema }