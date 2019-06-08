import {  GET_ACCOUNT_INFO } from '../actions/constants';

const intialState = {
    currentAccount: {}
};

const accountInfo = ( state=intialState, action={} )=>{
    switch(action.type){
        case GET_ACCOUNT_INFO:
        return {
            ...state,
            currentAccount: action.payload
        }
        default:
            return state
    }
}
export default accountInfo;