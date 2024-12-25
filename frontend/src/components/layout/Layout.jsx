import 'react'
import { Box, Container } from '@mui/material'
import Header from './Header.jsx'
import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'

export default function Layout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Header/>

      {/* Main Content */}
      <Container
        maxWidth="lg"
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: '30px',
        }}
      >
        <Outlet/>

      </Container>

      {/* Footer */}
      <Footer/>
    </Box>
  )
}
