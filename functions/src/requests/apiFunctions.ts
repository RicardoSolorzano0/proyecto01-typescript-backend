import type { APIOutput } from '@/types';
import { addMessage, addMessagePostRequest } from './addMessage';
import { buildRequests } from './buildRequests';

export const apiFunctions : APIOutput= {
    ...buildRequests([],{},{
        addMessage,
        addMessagePostRequest
    })
}