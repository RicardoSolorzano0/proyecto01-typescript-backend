import { createTypeUser } from './createTypeUser';
import { deleteTypeUser } from './deleteTypeUser';
import { selectTypeUsers } from './selectTypeUsers';
import { updateTypeUser } from './updateTypeUser';

export const typeUserRoute ={
    createTypeUser,
    updateTypeUser,
    deleteTypeUser,
    selectTypeUsers
}