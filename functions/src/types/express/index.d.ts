import { auth }             from 'firebase-admin';
import type { RoleType }    from '@/types';

declare global {
    namespace Express {
        import DecodedIdToken = auth.DecodedIdToken;

        export interface Request {
            user?: DecodedIdToken & {
                [k in RoleType]?: boolean
            };
            payloadData?: Record<string, unknown>;
        }
    }
}