import { createAsyncThunk } from '@reduxjs/toolkit';
import { quantityNews } from '../../../utils/variables';
import { baseApi } from '../../utils/mainRequest';
export const getListNews = createAsyncThunk(
  'listNews/get',
  async (thunkAPI) => {
    function getFromServer(url) {
      return baseApi
        .get(url)
        .then((response) => response.data)
        .catch((error) => {
          throw error;
        });
    }

    return getFromServer('/newstories.json?print=pretty')
      .then((lastStories) => {
        const last100Ids = lastStories.slice(0, quantityNews);

        return Promise.all(
          last100Ids.map((id) => getFromServer(`/item/${id}.json?print=pretty`))
        );
      })
      .then((newsItems) => {
        // Сортируем массив новостей по полю time (по убыванию)
        return newsItems.sort((a, b) => b.time - a.time);
      }) // Возвращаем массив новостей
      .catch((error) => thunkAPI.rejectWithValue(error.message));
  }
);
