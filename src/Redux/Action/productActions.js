import axiosInstance from '../../api/axiosInstance';

// Action Types
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
export const SET_PRODUCT_DETAIL = 'SET_PRODUCT_DETAIL';
export const SET_TOTAL = 'SET_TOTAL';
export const SET_FETCH_STATE = 'SET_FETCH_STATE';
export const SET_LIMIT = 'SET_LIMIT';
export const SET_OFFSET = 'SET_OFFSET';
export const SET_FILTER = 'SET_FILTER';

// Action Creators
export const setCategories = (categories) => ({ type: SET_CATEGORIES, payload: categories });
export const setProductList = (productList) => ({ type: SET_PRODUCT_LIST, payload: productList });
export const setProductDetail = (product) => ({ type: SET_PRODUCT_DETAIL, payload: product });
export const setTotal = (total) => ({ type: SET_TOTAL, payload: total });
export const setFetchState = (fetchState) => ({ type: SET_FETCH_STATE, payload: fetchState });
export const setLimit = (limit) => ({ type: SET_LIMIT, payload: limit });
export const setOffset = (offset) => ({ type: SET_OFFSET, payload: offset });
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter });

// Thunk Actions
export const fetchProductDetail = (productId) => async (dispatch) => {
  try {
    dispatch(setFetchState('FETCHING'));
    const response = await axiosInstance.get(`/products/${productId}`);
    dispatch(setProductDetail(response.data));
    dispatch(setFetchState('FETCHED'));
  } catch (error) {
    console.error('Error fetching product:', error);
    dispatch(setFetchState('FETCH_ERROR'));
  }
};
