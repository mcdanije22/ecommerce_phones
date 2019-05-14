import { CHANGE_SEARCH_FIELD } from '../actions/constants';

const intialState = {
    searchField: ''
};

export const searchItems = ( state=intialState, action={} )=>{
    console.log(action.type)
    switch(action.type){
        case CHANGE_SEARCH_FIELD:
        return {
            ...state,
            searchField: action.payload
        }
        default:
            return state
    }
}
