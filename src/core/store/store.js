import { configureStore } from '@reduxjs/toolkit';
import CommentsReducer from './GetComments/slice';
import currentNewsReducer from './GetCurrentNews/slice';
import mainCommentsReducer from './GetMainComments/slice';
import subCommentsReducer from './GetSubComments/slice';
import listNewsReducer from './ListNews/slice';
export const store = configureStore({
  reducer: {
    listNews: listNewsReducer,
    mainComments: mainCommentsReducer,
    comments: CommentsReducer,
    currentNews: currentNewsReducer,
    subComments: subCommentsReducer,
  },
});
