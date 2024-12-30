import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import productReducer from './Reducer/productReducer';
import categoryReducer from './Reducer/categorySlice';
import authReducer from './Reducer/authReducer';
import cartReducer from './Reducer/cartReducer';

const store = configureStore({
    reducer: {
        product: productReducer,
        categories: categoryReducer,
        auth: authReducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;
