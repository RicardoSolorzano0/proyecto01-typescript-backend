import corsRequest from 'cors';
import type { MiddlewareType } from '@/types';


const corsMiddleware = corsRequest({ origin: true });

export const cors: MiddlewareType = handler =>
    (req, res) => corsMiddleware(req, res, () => handler(req, res));