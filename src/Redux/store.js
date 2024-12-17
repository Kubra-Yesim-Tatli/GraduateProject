import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import logger from 'redux-logger';


import shoppingCardReducer from './Reducer/shoppingCardReducer';
import clientReducer from './Reducer/ClientReducer';
import productReducer from './Reducer/productReducer';


const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCardReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
