import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async () => {
        try {
            const response = await axiosInstance.get('/categories');
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    }
);
