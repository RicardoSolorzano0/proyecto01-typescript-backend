import { DBSecretsArray } from '@/constants/secret';
import type { APIOutput } from '@/types';
import { buildRequests } from './buildRequests';
import { testLocalRoute, typeUserRoute, userRoute } from './index';


export const apiFunctions : APIOutput= {
    ...buildRequests([],{ secrets:DBSecretsArray },{
        ...testLocalRoute,
        ...userRoute,
        ...typeUserRoute
    })
}