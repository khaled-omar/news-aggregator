import { Box, CircularProgress } from '@mui/material'

function LoadingIndicator() {
  return (<Box sx={{ textAlign: 'center', mt:5 }}>
    <CircularProgress/>
  </Box>)
}

export default LoadingIndicator
