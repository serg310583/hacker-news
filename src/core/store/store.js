import { configureStore } from '@reduxjs/toolkit';
import CommentsReducer from './GetComments/slice';
import currentNewsReducer from './GetCurrentNews/slice';
import subCommentsReducer from './GetSubComments/slice';
import listNewsReducer from './ListNews/slice';
export const store = configureStore({
  reducer: {
    listNews: listNewsReducer,
    comments: CommentsReducer,
    currentNews: currentNewsReducer,
    subComments: subCommentsReducer,
  },
});
