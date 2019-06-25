import {  GET_ACCOUNT_INFO, GET_ACCOUNT_ADDRESSES, GET_ACCOUNT_CARDS } from '../actions/constants';

const intialState = {
    currentAccount: '',
    loggedIn: false,
    accountAddresses:[],
    accountCards:[]
};

const accountInfo = ( state=intialState, action={} )=>{
    switch(action.type){
        case GET_ACCOUNT_INFO:
            return {
            ...state,
            currentAccount: action.payload,
            loggedIn:action.payload === ''?false:true
        }
        case GET_ACCOUNT_ADDRESSES:
            return{
            ...state,
            accountAddresses:action.payload
            }
        case GET_ACCOUNT_CARDS:
            return{
                ...state,
                accountCards:action.payload
            }
        default:
            return state
    }
}
export default accountInfo;