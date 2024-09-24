// import Divider from '@mui/material/Divider';
import { Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { commentsState } from '../../core/store/GetComments/slice';
import { getComments } from '../../core/store/GetComments/thunk';
import { currentNewsState } from '../../core/store/GetCurrentNews/slice';
import { getCurrentNews } from '../../core/store/GetCurrentNews/thunk';
import { convertToDate } from '../../utils/convertDate';
import { RefreshBtn } from '../RefreshBtn/RefreshBtn';
import { SubComment } from './Comment/SubComment';
import style from './Comments.module.scss';

export function Comments() {
  const { comments, isSuccess } = useSelector(commentsState);
  const dispatch = useDispatch();
  const id = Number(useParams().id);
  const { isLoading } = useSelector(commentsState);
  const { currentNews } = useSelector(currentNewsState);
  const quantityComments = comments.length;

  const handleRefresh = async () => {
    dispatch(getCurrentNews(id));
    if (currentNews.kids) {
      dispatch(getComments(currentNews.kids));
    }
  };

  const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    '& > :not(style) ~ :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));

  return (
    <>
      <h3 className={style.titleComments}>{quantityComments} Comments</h3>
      {isSuccess && (
        <div>
          <Root>
            {comments.map((comment, index) => (
              <div key={comment.id}>
                <div className={style.commentsInfo}>
                  <div className={style.commentDetails}>{comment.by}</div>
                  <Divider
                    className={style.divider}
                    orientation='vertical'
                    variant='large'
                    flexItem
                  />
                  <div className={style.commentDetails}>
                    {convertToDate(comment.time)}
                  </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: comment.text }} />

                {comment.kids && comment.kids.length > 0 && (
                  <SubComment parent={comment.id} />
                )}
                {index < comments.length - 1 && <Divider />}
              </div>
            ))}
          </Root>
        </div>
      )}
      <div className={style.refreshBtn}>
        <RefreshBtn handleRefresh={handleRefresh} isLoading={isLoading} />
      </div>
    </>
  );
}
