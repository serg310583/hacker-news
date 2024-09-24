import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApi } from '../../utils/mainRequest';

export const getSubComments = createAsyncThunk(
  'subComments/get',
  async (currentSubCommentsIds, thunkAPI) => {
    try {
      const responses = await Promise.all(
        currentSubCommentsIds.map((id) => baseApi.get(`/item/${id}.json`))
      );
      return responses.map((response) => response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.errors || 'Error fetching subComments'
      );
    }
  }
);
