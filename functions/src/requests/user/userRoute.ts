import { createUsers } from './createUsers';
import { deleteUsers } from './deleteUsers';
import { selectUsers } from './selectUsers';
import { updateUsers } from './updateUsers';

export const userRoute = {
    createUsers,
    selectUsers,
    updateUsers,
    deleteUsers
}