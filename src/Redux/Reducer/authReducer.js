import { SET_USER, SET_AUTH_ERROR, LOGOUT } from '../Action/authActions';

const initialState = {
  user: null,
  error: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        error: null,
        isAuthenticated: true,
      };
    case SET_AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        error: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
