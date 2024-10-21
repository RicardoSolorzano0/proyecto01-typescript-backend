import type { Request, Response } from 'express';
import type { HttpsFunction } from 'firebase-functions/v2/https';
import type { ZodSchema } from 'zod';

export type HandlerType = (req: Request, res: Response) => Promise<void> | void;
export type APIFunction = {
  func: HandlerType;
  schema?: ZodSchema;
};
export type APIInput = Record<string, APIFunction>;
export type APIOutput = Record<string, HttpsFunction>;
export type MiddlewareType = (handler: HandlerType) => HandlerType;
