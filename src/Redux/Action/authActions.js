import axios from 'axios';

// Action Types
export const SET_USER = 'SET_USER';
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
export const LOGOUT = 'LOGOUT';

// Action Creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setAuthError = (error) => ({
  type: SET_AUTH_ERROR,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

// Helper Functions
const setAxiosToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Thunk Actions
export const verifyToken = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    // Set token in axios headers
    setAxiosToken(token);

    // Verify token
    const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/verify');
    
    // If verification successful, update user in store
    dispatch(setUser(response.data));

    // Renew token if new token is provided in response
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      setAxiosToken(response.data.token);
    }
  } catch (error) {
    // Clear invalid token
    localStorage.removeItem('token');
    setAxiosToken(null);
    dispatch(setAuthError(error.response?.data?.message || 'Token verification failed'));
  }
};

export const login = (credentials, rememberMe) => async (dispatch) => {
  try {
    const response = await axios.post('https://workintech-fe-ecommerce.onrender.com/login', credentials);
    
    // Always store token
    localStorage.setItem('token', response.data.token);
    
    // Set token in axios headers
    setAxiosToken(response.data.token);
    
    // Update user in store
    dispatch(setUser(response.data.user));
  } catch (error) {
    dispatch(setAuthError(error.response?.data?.message || 'Login failed'));
  }
};

export const logoutUser = () => (dispatch) => {
  // Clear token from localStorage
  localStorage.removeItem('token');
  
  // Clear token from axios headers
  setAxiosToken(null);
  
  // Clear user from store
  dispatch(logout());
};
