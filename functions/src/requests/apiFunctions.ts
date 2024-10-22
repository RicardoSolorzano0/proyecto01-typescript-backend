import type { APIOutput } from '@/types';
import { addMessage, addMessagePostRequest } from './addMessage';
import { buildRequests } from './buildRequests';
import { createUsers } from './createUsers';

export const apiFunctions : APIOutput= {
    ...buildRequests([],{},{
        addMessage,
        addMessagePostRequest,
        createUsers
    })
}