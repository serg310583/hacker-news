import { useDispatch, useSelector } from 'react-redux';
import { NewsCard } from '../../components/NewsCard/NewsCard';
import { RefreshBtn } from '../../components/RefreshBtn/RefreshBtn';
import { listNewsState, refresh } from '../../core/store/ListNews/slice';
import { getListNews } from '../../core/store/ListNews/thunk';
import style from './ListNewsPage.module.scss';

export function ListNewsPage() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(listNewsState);
  const handleRefresh = () => {
    dispatch(refresh());
    dispatch(getListNews());
  };

  return (
    <div className={style.listNewsPageWrapper}>
      <div className={style.refreshBtn}>
        <RefreshBtn handleRefresh={handleRefresh} isLoading={isLoading} />
      </div>
      <div className={style.newsCardWrapper}>
        <NewsCard />
      </div>
    </div>
  );
}
