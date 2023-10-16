import { Box, CircularProgress } from '@mui/material';

const LoadingOverlay = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.65)', // White background with opacity
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999 // Ensure it's on top of other elements
      }}
    >
      <CircularProgress color='primary' />
    </Box>
  );
};

export default LoadingOverlay;
