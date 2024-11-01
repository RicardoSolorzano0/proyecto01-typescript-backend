import { createUser } from './createUser';
import { deleteUser } from './deleteUser';
import { selectPaginatedUsers } from './selectPaginatedUsers';
import { selectUsers } from './selectUsers';
import { updateUser } from './updateUser';

export const userRoute = {
    createUser,
    selectUsers,
    updateUser,
    deleteUser,
    selectPaginatedUsers
}