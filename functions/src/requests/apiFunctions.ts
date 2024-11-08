import { DBSecretsArray } from '@/constants/secret';
import type { APIOutput } from '@/types';
import { buildRequests } from './buildRequests';
import { animalsRoute, animalUserRoute, testLocalRoute, typeUserRoute, userRoute } from './index';


export const apiFunctions : APIOutput= {
    ...buildRequests([],{},{
        ...testLocalRoute,
    }),
    ...buildRequests([],{ secrets:DBSecretsArray },{
        ...userRoute,
        ...typeUserRoute,
        ...animalsRoute,
        ...animalUserRoute
    })
}