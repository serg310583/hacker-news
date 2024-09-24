import { createSlice } from '@reduxjs/toolkit';
import { getCurrentNews } from './thunk';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  currentNews: null,
};

const currentNewsSlice = createSlice({
  name: 'currentNews',
  initialState,
  reducers: {
    refreshCurrentNews(state) {
      // Модифицируем текущий state
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.currentNews = null; // Сбрасываем currentNews
    },
    updateCurrentNews() {
      state.currentNews = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //GET
      .addCase(getCurrentNews.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getCurrentNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.currentNews = action.payload;
      })
      .addCase(getCurrentNews.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});
export const { refreshCurrentNews, updateCurrentNews } =
  currentNewsSlice.actions;
export const currentNewsState = (state) => state.currentNews;

export default currentNewsSlice.reducer;
