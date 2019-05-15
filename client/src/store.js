import {createStore,applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import rootReducer from './reducers/rootReducer';

const middleware = [createLogger()];
const initialState = {};

// const rootReducer = combineReducers(

// );

const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));
export default store;
