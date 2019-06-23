import { GET_ACCOUNT_INFO, GET_ACCOUNT_ADDRESSES, GET_ACCOUNT_CARDS } from './constants';

export const loginAccount = (user) =>{
    return{
        type:GET_ACCOUNT_INFO,
        payload:user
    }
};
export const accountAddresses = (list) =>{
    return{
        type:GET_ACCOUNT_ADDRESSES,
        payload: list
    }
};
export const accountCards = (list) =>{
    return{
        type:GET_ACCOUNT_CARDS,
        payload: list
    }
};