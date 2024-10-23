import type { APIOutput } from '@/types';
import { addMessage, addMessagePostRequest } from './addMessage';
import { buildRequests } from './buildRequests';
import { createUsers } from './createUsers';
import { createTypeUser } from './typeUser/createTypeUser';
import { deleteTypeUser } from './typeUser/deleteTypeUser';
import { selectTypeUser } from './typeUser/selectTypeUser';
import { updateTypeUser } from './typeUser/updateTypeUser';

export const apiFunctions : APIOutput= {
    ...buildRequests([],{},{
        addMessage,
        addMessagePostRequest,
        createUsers,
        createTypeUser,
        updateTypeUser,
        deleteTypeUser,
        selectTypeUser
    })
}