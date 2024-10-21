import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';
import type { MiddlewareType } from '@/types';
import { validateBodyPayload, validateQueryPayload } from '@/utils';

export const schemaMiddleware =  (
    req: Request,
    res: Response,
    next: NextFunction,
    schema?: ZodSchema
) => {
    if (!schema) {
        next();
        return;
    }

    const payload =
    req.method === 'GET'
        ? validateQueryPayload(req, schema)
        : validateBodyPayload(req, schema);

    if (!payload.success) {
        res.status(422).send(payload.errors);
        return;
    }

    req.payloadData = payload.data as Record<string, unknown>;

    next();
    return;
};

export const schemaValidator =
  (schema?: ZodSchema): MiddlewareType =>
      (handler) =>
          (req, res) =>
              schemaMiddleware(req, res, () => handler(req, res), schema);
