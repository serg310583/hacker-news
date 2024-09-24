import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listNewsState } from '../../core/store/ListNews/slice';
import { getListNews } from '../../core/store/ListNews/thunk';
import { NewsDetails } from '../NewsDetails/NewsDetails';
import style from './NewsCard.module.scss';

export function NewsCard() {
  const dispatch = useDispatch();
  const { listNews, isLoading, isSuccess } = useSelector(listNewsState);

  useEffect(() => {
    if (!listNews.length) {
      dispatch(getListNews());
    }

    const interval = setInterval(() => {
      dispatch(getListNews());
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch, listNews.length]);
  if (isLoading) {
    return (
      <Stack spacing={1}>
        <Skeleton variant='rectangular' width={500} height={80} />
        <Skeleton variant='text' width={300} height={40} />
        <Skeleton variant='rectangular' width={500} height={80} />
        <Skeleton variant='text' width={300} height={40} />
        <Skeleton variant='rectangular' width={500} height={80} />
        <Skeleton variant='text' width={300} height={40} />
        <Skeleton variant='rectangular' width={500} height={80} />
        <Skeleton variant='text' width={300} height={40} />
        <Skeleton variant='rectangular' width={500} height={80} />
        <Skeleton variant='text' width={300} height={40} />
        <Skeleton variant='rectangular' width={500} height={80} />
        <Skeleton variant='text' width={300} height={40} />
      </Stack>
    );
  }
  if (isSuccess) {
    return (
      <div>
        {listNews.map((item) => (
          <Card className={style.cardNews} key={item.id} sx={{ minWidth: 500 }}>
            <CardContent>
              <Typography variant='h6' component='div'>
                <Link className={style.linkNews} to={`/news/${item.id}`}>
                  {item.title}
                </Link>
              </Typography>
              <NewsDetails item={item} />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}
