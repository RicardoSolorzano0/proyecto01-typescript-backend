import type { APIOutput } from '@/types';
import { addMessage } from './addMessage';
import { buildRequests } from './buildRequests';

export const apiFunctions : APIOutput= {
    ...buildRequests([],{},{
        addMessage
    })
}