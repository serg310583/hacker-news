import { Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentsState } from '../../../core/store/GetComments/slice';
import { subCommentsState } from '../../../core/store/GetSubComments/slice';
import { getSubComments } from '../../../core/store/GetSubComments/thunk';
import { convertToDate } from '../../../utils/convertDate';
import style from './SubComment.module.scss';

export function SubComment({ parent }) {
  const dispatch = useDispatch();
  const [commentVisible, setCommentVisible] = useState(false);
  const { comments } = useSelector(commentsState);
  const { subComments, isSuccess } = useSelector(subCommentsState);
  // http://localhost:3000/news/41633581

  const handleCommentVisible = () => setCommentVisible(!commentVisible);

  const subCommentIds = useMemo(() => {
    const subCommentArr = comments.flatMap((comment) => comment.kids || []);
    return subCommentArr;
  }, [comments]);

  // Фильтруем подкомментарии для текущего родителя
  const filteredSubComments = subComments.filter(
    (subComment) => subComment.parent === parent
  );

  // Количество подкомментариев для конкретного родителя
  const quantitySubComments = filteredSubComments.length;

  useEffect(() => {
    if (subCommentIds.length > 0) {
      dispatch(getSubComments(subCommentIds));
    }
  }, [subCommentIds, dispatch]);

  const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    '& > :not(style) ~ :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));

  return (
    <div>
      <Button onClick={handleCommentVisible} variant='plain' size='sm'>
        {quantitySubComments === 0
          ? 'no comment'
          : `${quantitySubComments} ${
              quantitySubComments === 1 ? 'comment' : 'comments'
            }`}
      </Button>

      {commentVisible && (
        <div className={style.subCommentWrapper}>
          {isSuccess && (
            <Root>
              {subComments
                .filter((subComment) => subComment.parent === parent)
                .map((subComment, index) => (
                  <div key={subComment.id}>
                    <div className={style.commentsInfo}>
                      <div className={style.commentDetails}>
                        {subComment.by}
                      </div>
                      <Divider
                        className={style.divider}
                        orientation='vertical'
                        variant='large'
                        flexItem
                      />
                      <div className={style.commentDetails}>
                        {convertToDate(subComment.time)}
                      </div>
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: subComment.text }}
                    />

                    {index < subComments.length - 1 && <Divider />}
                  </div>
                ))}
            </Root>
          )}
        </div>
      )}
    </div>
  );
}
