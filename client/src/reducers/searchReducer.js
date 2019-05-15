import { CHANGE_SEARCH_FIELD } from '../actions/constants';

const intialState = {
    searchField: ''
};

 const searchItems = ( state=intialState, action={} )=>{
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
export default searchItems;