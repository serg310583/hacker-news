import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApi } from '../../utils/mainRequest';

export const getComments = createAsyncThunk(
  'comments/get',
  async (currentCommentsIds, thunkAPI) => {
    try {
      const responses = await Promise.all(
        currentCommentsIds.map((id) => baseApi.get(`/item/${id}.json`))
      );
      return responses.map((response) => response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errors || 'Error fetching comments'
      );
    }
  }
);
