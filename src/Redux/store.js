import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import shoppingCardReducer from './Reducer/shoppingCardReducer';
import clientReducer from './Reducer/ClientReducer';
import productReducer from './Reducer/productReducer';
import categoryReducer from './Reducer/categorySlice';

const store = configureStore({
  reducer: {
    client: clientReducer,
    product: productReducer,
    shoppingCart: shoppingCardReducer,
    categories: categoryReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;
