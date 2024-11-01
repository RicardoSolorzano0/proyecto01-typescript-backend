import { createUserType } from './createUserType';
import { deleteUserType } from './deleteUserType';
import { selectPaginatedUserTypes } from './selectPaginatedUserTypes';
import { selectUserTypes } from './selectUserTypes';
import { updateUserType } from './updateUseTyper';

export const typeUserRoute ={
    createUserType,
    updateUserType,
    deleteUserType,
    selectUserTypes, 
    selectPaginatedUserTypes
}