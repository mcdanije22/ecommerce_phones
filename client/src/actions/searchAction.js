import { CHANGE_SEARCH_FIELD, CLEAR_SEARCH_FIELD } from './constants';

export const setSearchField = (text) => {
    return{
        type: CHANGE_SEARCH_FIELD,
        payload: text
    }
};
export const clearSearchField = () =>{
    return{
        type:CLEAR_SEARCH_FIELD
    }
}