import axiosInstance from '../../api/axiosInstance';

// Action Types
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

// Action Creators
export const loginStart = () => ({
  type: LOGIN_START
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const logoutAction = () => ({
  type: LOGOUT
});

// Helper Functions
const setAxiosToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = token; 
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// Thunk Actions
export const verifyToken = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    
    if (!token || !savedUser) {
      return;
    }

    // Set token in axios headers
    setAxiosToken(token);

    // Parse saved user
    const user = JSON.parse(savedUser);
    dispatch(loginSuccess({
      token,
      user
    }));

  } catch (error) {
    console.error('Token verification failed:', error);
    dispatch(loginFailure('Session expired'));
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};

export const login = (credentials, rememberMe) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await axiosInstance.post('/login', credentials);
    
    const { token, user } = response.data;
    
    if (rememberMe) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
    }

    setAxiosToken(token);
    dispatch(loginSuccess({ token, user }));
    
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
    throw error;
  }
};

export const logout = () => (dispatch) => {
  setAxiosToken(null);
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  dispatch(logoutAction());
};
