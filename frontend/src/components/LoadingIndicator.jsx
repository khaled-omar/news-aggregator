import { Box, CircularProgress } from '@mui/material'

function LoadingIndicator() {
  return (<Box sx={{ display: 'flex', justifyContent: 'center' }}>
    <CircularProgress/>
  </Box>)
}

export default LoadingIndicator
