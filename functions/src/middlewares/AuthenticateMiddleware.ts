// import type { NextFunction, Request, Response } from 'express';
// import { getAuth }                              from 'firebase-admin/auth';
// import { logger }                               from 'firebase-functions';
// import type { MiddlewareType, RoleType }        from '@/types';

/*
export const authenticateMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
    roles?: RoleType[] | RoleType
) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        res.status(403).send('Unauthorized');
        return;
    }

    const idToken = req.headers.authorization.split('Bearer ')[1];

    
    try {
        
        req.user = await getAuth().verifyIdToken(idToken);

        if (req.user === undefined) {
            res.status(403).send('Invalid token');
            return;
        }

        if (roles !== undefined) {
            const rolesValid = Array.isArray(roles) ?
                roles.reduce((prev, role) => prev || (req.user?.[role] ?? false), false) :
                req.user?.[roles];

            if (!rolesValid) {
                res.status(403).send('Forbidden');
                return;
            }
        }

        next();

        return;
    } catch ( e ) {
        logger.error('Error while authenticating function', e);
        res.status(403).send('Unexpected auth error');
        return;
    }
        
};

export const auth = (roles?: RoleType[] | RoleType): MiddlewareType => handler =>
    (req, res) => authenticateMiddleware(req, res, () => handler(req, res), roles);
*/
// Para setear claims:
// https://firebase.google.com/docs/auth/admin/custom-claims#set_and_validate_custom_user_claims_via_the_admin_sdk