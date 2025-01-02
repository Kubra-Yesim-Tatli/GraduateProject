import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../Action/authActions';

const token = localStorage.getItem('authToken');
const savedUser = localStorage.getItem('user');

const initialState = {
  isAuthenticated: !!token,
  user: savedUser ? JSON.parse(savedUser) : null,
  token: token || null,
  error: null,
  loading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
        loading: false
      };
    default:
      return state;
  }
};

export default authReducer;
