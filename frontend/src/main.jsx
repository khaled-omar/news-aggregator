import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import { ThemeProvider } from '@mui/material'
import theme from './Theme'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'

import '@fontsource/roboto/700.css'
import LoginForm from './pages/LoginForm.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
      <LoginForm/>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
