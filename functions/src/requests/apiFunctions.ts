import { DBSecretsArray } from '@/constants/secret';
import { auth }           from '@/middlewares/AuthenticateMiddleware';

import type { APIOutput }      from '@/types';
import { buildRequests }  from './buildRequests';


import { 
    animalsRoute, 
    animalUserRoute, 
    testLocalRoute, 
    typeUserRoute, 
    userRoute 
} from './index';



export const apiFunctions: APIOutput = {
    ...buildRequests([], {}, {
        ...testLocalRoute
    }),
    ...buildRequests([auth()], { secrets: DBSecretsArray }, {
        ...userRoute,
        ...typeUserRoute,
        ...animalsRoute,
        ...animalUserRoute
    })
};