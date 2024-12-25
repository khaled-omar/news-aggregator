import 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        textAlign: 'center',
        gap: 3,
      }}
    >
      <Typography variant="h3" color="error">
        Oops! Page not found.
      </Typography>
      <Typography variant="body1">
        The page you are looking for might have been removed or is temporarily unavailable.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')}>
        Go Back to Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
