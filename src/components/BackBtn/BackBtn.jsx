import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { refreshCurrentNews } from '../../core/store/GetCurrentNews/slice';
import { refreshSubComments } from '../../core/store/GetSubComments/slice';

export function BackBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBackClick = () => {
    navigate(-1);
    dispatch(refreshCurrentNews());
    dispatch(refreshSubComments());
  };
  return (
    <Button variant='outlined' onClick={handleBackClick}>
      Back to List News
    </Button>
  );
}
