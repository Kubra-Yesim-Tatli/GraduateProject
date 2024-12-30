import axiosInstance from '../../api/axiosInstance';

// Action Types
export const SET_USER = 'SET_USER';
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
export const LOGOUT = 'LOGOUT';

// Action Creators
export const setUser = (user) => {
  // Kullanıcı bilgilerini localStorage'a kaydet
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  return {
    type: SET_USER,
    payload: user,
  };
};

export const setAuthError = (error) => ({
  type: SET_AUTH_ERROR,
  payload: error,
});

export const logout = () => {
  // Kullanıcı bilgilerini localStorage'dan sil
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  return {
    type: LOGOUT,
  };
};

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
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (!token || !savedUser) {
      return;
    }

    // Set token in axios headers
    setAxiosToken(token);

    // Parse saved user
    const user = JSON.parse(savedUser);
    dispatch(setUser(user));

  } catch (error) {
    console.error('Token verification failed:', error);
    dispatch(setAuthError('Session expired'));
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const login = (credentials, rememberMe) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/login', credentials);
    
    if (response.data.token) {
      // Token'ı kaydet
      localStorage.setItem('token', response.data.token);
      setAxiosToken(response.data.token);
    }

    dispatch(setUser(response.data.user));
    
  } catch (error) {
    console.error('Login failed:', error);
    dispatch(setAuthError(error.response?.data?.message || 'Login failed'));
  }
};

export const logoutUser = () => (dispatch) => {
  setAxiosToken(null);
  dispatch(logout());
};
