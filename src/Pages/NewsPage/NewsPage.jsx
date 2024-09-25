import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Comments } from '../../components/Comments/Comments';
import { NewsContent } from '../../components/NewsContent/NewsContent';
import { refresh } from '../../core/store/GetComments/slice';
import { getComments } from '../../core/store/GetComments/thunk';
import { currentNewsState } from '../../core/store/GetCurrentNews/slice';
import { getCurrentNews } from '../../core/store/GetCurrentNews/thunk';
import style from './NewsPage.module.scss';

export function NewsPage() {
  const dispatch = useDispatch();
  const id = Number(useParams().id);

  const { currentNews, isSuccess, isLoading } = useSelector(currentNewsState);

  useEffect(() => {
    dispatch(refresh());
    dispatch(getCurrentNews(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (isSuccess && currentNews.kids && currentNews.kids.length > 0) {
      dispatch(getComments(currentNews.kids));
    }
  }, [isSuccess, currentNews, dispatch]);

  if (isLoading) {
    return (
      <div className={style.skeleton}>
        <Stack spacing={1}>
          <Skeleton variant='rectangular' width={800} height={80} />
          <Skeleton variant='text' width={300} height={40} />
          <Skeleton variant='rectangular' width={500} height={80} />
        </Stack>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div>
        <NewsContent news={currentNews} /> <Comments />
      </div>
    );
  }

  return null;
}
