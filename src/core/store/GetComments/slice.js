import { createSlice } from '@reduxjs/toolkit';
import { getComments } from './thunk';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  comments: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    refresh() {
      return initialState;
    },
    updateComments() {
      state.comments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //GET
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});
export const { refresh, updateComments } = commentsSlice.actions;
export const commentsState = (state) => state.comments;

export default commentsSlice.reducer;
