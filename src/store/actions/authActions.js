import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice';
import axiosInstance from '../../api/axiosInstance';

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await axiosInstance.post('/auth/login', credentials);
    dispatch(loginSuccess({
      user: response.data.user,
      token: response.data.token
    }));
    return response.data;
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
    throw error;
  }
};
