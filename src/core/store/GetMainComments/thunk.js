import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApi } from '../../utils/mainRequest';

export const getMainComments = createAsyncThunk(
  'mainComments/get',
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
