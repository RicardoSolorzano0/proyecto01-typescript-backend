import type { HttpsOptions } from 'firebase-functions/v2/https';
import { onRequest } from 'firebase-functions/v2/https';
import { schemaValidator } from '@/middlewares';
import type { APIInput, APIOutput, MiddlewareType } from '@/types';

export const buildRequests = (middlewares: MiddlewareType[], options: HttpsOptions, functions: APIInput) =>
    Object.entries(functions).reduce<APIOutput>((prev, [key, apiFunction]) => {
        const funcWithMiddlewares = middlewares.reduce(
            (handledFunc, middleware) => middleware(handledFunc),
            schemaValidator(apiFunction.schema)(apiFunction.func)
        );

        return {
            ...prev,
            [key]: onRequest(options, funcWithMiddlewares)
        }
    }, {});