import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';

export function RefreshBtn({ handleRefresh, isLoading }) {
  return (
    <Stack direction='row' spacing={2}>
      <LoadingButton
        onClick={handleRefresh}
        loading={isLoading ? true : undefined}
        loadingIndicator='Loading…'
        variant='outlined'
      >
        Обновить
      </LoadingButton>
    </Stack>
  );
}
