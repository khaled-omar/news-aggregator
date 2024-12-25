import 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={(theme) => ({bgcolor: 'primary.main',
        color: 'primary.contrastText',
        py: 2,
        textAlign: 'center',
        mt: 'auto',
        zIndex: theme.zIndex.drawer + 1,})}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} News Magazine. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
