import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApi } from '../../utils/mainRequest';

export const getCurrentNews = createAsyncThunk(
  'currentNews/get',
  async (id, thunkAPI) => {
    try {
      const response = await baseApi.get(`/item/${id}.json`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errors || 'Error fetching news'
      );
    }
  }
);
