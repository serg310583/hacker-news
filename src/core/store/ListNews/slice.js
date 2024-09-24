import { createSlice } from '@reduxjs/toolkit';
import { getListNews } from './thunk';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  listNews: [],
};

const listNewsSlice = createSlice({
  name: 'listNews',
  initialState,
  reducers: {
    refresh() {
      return initialState;
    },
    updateListNews() {
      state.listNews = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //GET
      .addCase(getListNews.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getListNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.listNews = action.payload;
      })
      .addCase(getListNews.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});
export const { refresh, updateListNews } = listNewsSlice.actions;
export const listNewsState = (state) => state.listNews;

export default listNewsSlice.reducer;
