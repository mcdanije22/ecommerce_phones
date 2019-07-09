import { combineReducers } from 'redux'
import searchReducer from './searchReducer';
import accountReducer from './accountReducer';
import shoppingCartReducer from './shoppingCartReducer';
export default combineReducers({
    search: searchReducer,
    account: accountReducer,
    shoppingCart:shoppingCartReducer
});
