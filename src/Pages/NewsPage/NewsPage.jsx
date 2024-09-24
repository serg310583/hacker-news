import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { BackBtn } from '../../components/BackBtn/BackBtn';
import { Comments } from '../../components/Comments/Comments';
import { NewsDetails } from '../../components/NewsDetails/NewsDetails';
import { refresh } from '../../core/store/GetComments/slice';
import { getComments } from '../../core/store/GetComments/thunk';
import { currentNewsState } from '../../core/store/GetCurrentNews/slice';
import { getCurrentNews } from '../../core/store/GetCurrentNews/thunk';
import style from './NewsPage.module.scss';

export function NewsPage() {
  const dispatch = useDispatch();
  const id = Number(useParams().id);

  const { currentNews, isSuccess } = useSelector(currentNewsState);

  useEffect(() => {
    dispatch(refresh());
    dispatch(getCurrentNews(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (isSuccess && currentNews.kids && currentNews.kids.length > 0) {
      dispatch(getComments(currentNews.kids)); // Отправляем запрос для получения комментариев
    }
  }, [isSuccess, currentNews, dispatch]);

  if (isSuccess) {
    return (
      <div className={style.newsWrapper}>
        <div className={style.backBtn}>
          <BackBtn />
        </div>

        <div
          className={style.titleNews}
          dangerouslySetInnerHTML={{ __html: currentNews.title }}
        />
        <div
          className={style.textNews}
          dangerouslySetInnerHTML={{ __html: currentNews.text }}
        />
        <NewsDetails item={currentNews} />
        <div className={style.linkSource}>
          {currentNews.url ? (
            <a href={currentNews.url} target='blank'>
              source
            </a>
          ) : null}
        </div>

        <Comments />
      </div>
    );
  }
}
