import {createStore, combineReducers} from 'redux';
import { searchItems } from './reducers/searchReducer';

const initialState = {};

// const rootReducer = combineReducers(

// );

const store = createStore(searchItems, initialState);
export default store;
