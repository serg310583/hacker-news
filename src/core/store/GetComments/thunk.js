import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApi } from '../../utils/mainRequest';

export const getComments = createAsyncThunk(
  'comments/get',
  async (currentCommentsIds, thunkAPI) => {
    try {
      const responses = await Promise.all(
        currentCommentsIds.map((id) => baseApi.get(`/item/${id}.json`))
      );
      const comments = responses
        .map((response) => response.data)
        .sort((a, b) => b.time - a.time);
      return comments;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errors || 'Error fetching comments'
      );
    }
  }
);
