import { createSlice } from '@reduxjs/toolkit';
import { getMainComments } from './thunk';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  mainComments: null,
};

const mainCommentsSlice = createSlice({
  name: 'mainComments',
  initialState,
  reducers: {
    refreshMainComments(state) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.mainComments = null;
    },
    updateMainComments() {
      state.mainComments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //GET
      .addCase(getMainComments.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getMainComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.mainComments = action.payload;
      })
      .addCase(getMainComments.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});
export const { refreshMainComments, updateMainComments } =
  mainCommentsSlice.actions;
export const mainCommentsState = (state) => state.mainComments;

export default mainCommentsSlice.reducer;
