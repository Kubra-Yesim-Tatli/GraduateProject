import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategories = createAsyncThunk(
    "categories/getCategories",
    async () => {
        const response = await axios.get("https://workintech-fe-ecommerce.onrender.com/categories");
        return response.data;
    }
);
