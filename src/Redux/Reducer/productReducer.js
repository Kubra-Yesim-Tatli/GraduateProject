import {
  SET_CATEGORIES,
  SET_PRODUCT_LIST,
  SET_PRODUCT_DETAIL,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER
} from '../Action/productActions';

const initialState = {
  categories: [],
  productList: [],
  productDetail: null,
  total: 0,
  fetchState: 'IDLE',
  limit: 25,
  offset: 0,
  filter: ''
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case SET_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload
      };
    case SET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: action.payload
      };
    case SET_TOTAL:
      return {
        ...state,
        total: action.payload
      };
    case SET_FETCH_STATE:
      return {
        ...state,
        fetchState: action.payload
      };
    case SET_LIMIT:
      return {
        ...state,
        limit: action.payload
      };
    case SET_OFFSET:
      return {
        ...state,
        offset: action.payload
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
};

export default productReducer;
