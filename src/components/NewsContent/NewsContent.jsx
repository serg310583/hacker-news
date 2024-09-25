import React from 'react';
import { BackBtn } from '../../components/BackBtn/BackBtn';
import { NewsDetails } from '../../components/NewsDetails/NewsDetails';
import style from './NewsConte.module.scss';

export function NewsContent({ news }) {
  return (
    <div className={style.newsWrapper}>
      <div className={style.backBtn}>
        <BackBtn />
      </div>

      <div
        className={style.titleNews}
        dangerouslySetInnerHTML={{ __html: news.title }}
      />
      <div
        className={style.textNews}
        dangerouslySetInnerHTML={{ __html: news.text }}
      />
      <NewsDetails item={news} />
      <div className={style.linkSource}>
        {news.url ? (
          <a href={news.url} target='blank'>
            source
          </a>
        ) : null}
      </div>
    </div>
  );
}
