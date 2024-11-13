import type { Request }                      from 'express';

import type { ZodFormattedError, ZodSchema } from 'zod';

type SuccessType<Output> = { data: Output; success: true; };
type FailureType<Output> = {
  errors: ZodFormattedError<Output>;
  success: false;
};
type ReturnType<Output> = SuccessType<Output> | FailureType<Output>;

const validatePayload = <Output>(
    payload: unknown,
    schema: ZodSchema<Output>
): ReturnType<Output> => {
    const result = schema.safeParse(payload);

    if (!result.success) {
        const errorMessages = result.error.format();
        return { errors: errorMessages, success: false };
    }

    return { data: result.data, success: true };
};

export const validateBodyPayload = <Output>(
    req: Request,
    schema: ZodSchema<Output>
): ReturnType<Output> => validatePayload(req.body, schema);

export const validateQueryPayload = <Output>(
    req: Request,
    schema: ZodSchema<Output>
): ReturnType<Output> => validatePayload(req.query, schema);
