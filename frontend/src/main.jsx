import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from '@mui/material'
import theme from './Theme'
import router from './routes/router'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { RouterProvider } from 'react-router-dom'
import Home from './Home.jsx'

createRoot(document.getElementById('root')).render(<StrictMode>
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <RouterProvider router={router}>
          <Home/>
      </RouterProvider>
    </AuthProvider>

  </ThemeProvider>
</StrictMode>)
