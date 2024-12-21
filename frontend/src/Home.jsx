import './App.css'
import { Box, Button, Container, Typography } from '@mui/material'
import { Copyright } from '@mui/icons-material'

function Home() {
  return (
    <Container maxWidth="lg" sx={{ backgroundColor: 'gray' }}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Material UI Vite.js example
        </Typography>
      </Box>
    </Container>
  );
}

export default Home
