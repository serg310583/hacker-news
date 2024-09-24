import { createSlice } from '@reduxjs/toolkit';
import { getSubComments } from './thunk';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  subComments: [],
};

const subCommentsSlice = createSlice({
  name: 'subComments',
  initialState,
  reducers: {
    refreshSubComments(state) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.subComments = [];
    },
    updateSubComments() {
      state.subComments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //GET
      .addCase(getSubComments.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getSubComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.subComments = action.payload;
      })
      .addCase(getSubComments.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});
export const { refreshSubComments, updateSubComments } =
  subCommentsSlice.actions;
export const subCommentsState = (state) => state.subComments;

export default subCommentsSlice.reducer;
