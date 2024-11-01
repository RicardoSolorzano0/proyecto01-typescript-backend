import { createUserType } from './createUserType';
import { deleteUserType } from './deleteUserType';
import { selectUserTypes } from './selectUserTypes';
import { selectPaginatedUserTypes } from './selectUserTypesPaginate';
import { updateUserType } from './updateUseTyper';

export const typeUserRoute ={
    createUserType,
    updateUserType,
    deleteUserType,
    selectUserTypes, 
    selectUserTypesPaginate: selectPaginatedUserTypes
}