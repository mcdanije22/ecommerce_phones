import { GET_ACCOUNT_INFO } from './constants';

export const loginAccount = (user) =>{
    return{
        type:'GET_ACCOUNT_INFO',
        payload:user
    }
};