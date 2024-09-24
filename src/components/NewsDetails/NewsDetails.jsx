import Divider from '@mui/material/Divider';
import { convertToDate } from '../../utils/convertDate';
import style from './NewsDetails.module.scss';

export function NewsDetails({ item }) {
  return (
    <div className={style.detailsWrapper}>
      {/* <span>by:{}</span> */}
      <div className={style.itemDetails}>{item.by}</div>

      <Divider
        className={style.divider}
        orientation='vertical'
        variant='large'
        flexItem
      />
      <div className={style.itemDetails}>{convertToDate(item.time)}</div>

      <Divider
        className={style.divider}
        orientation='vertical'
        variant='large'
        flexItem
      />
      <div className={style.itemDetails}>{item.score}</div>
    </div>
  );
}
