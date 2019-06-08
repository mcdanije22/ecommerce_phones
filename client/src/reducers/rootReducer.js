import { combineReducers } from 'redux'
import searchReducer from './searchReducer';
import accountReducer from './accountReducer';

export default combineReducers({
    search: searchReducer,
    account: accountReducer
});
