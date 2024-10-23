import type { APIOutput } from '@/types';
import { addMessage, addMessagePostRequest } from './addMessage';
import { buildRequests } from './buildRequests';
import { createTypeUser } from './createTypeUser';
import { createUsers } from './createUsers';

export const apiFunctions : APIOutput= {
    ...buildRequests([],{},{
        addMessage,
        addMessagePostRequest,
        createUsers,
        createTypeUser
    })
}