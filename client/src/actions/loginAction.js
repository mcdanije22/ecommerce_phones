import { GET_ACCOUNT_INFO } from './constants';

export const loginAccount = (text) =>{
    return{
        type:'GET_ACCOUNT_INFO',
        payload:text
    }
};