import { Link as RouterLink, useRouteError } from 'react-router-dom'
import { Box, Container, Link as MuiLink, Typography } from '@mui/material'
import Header from '../components/layout/Header.jsx'
import React from 'react'

export default function ErrorPage() {
  const error = useRouteError()

  return (
    <>
      <Header/>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" align="center"
                      sx={{ my: 4 }}>Oops!</Typography>
          <Typography variant="body1" color="text.secondary"
                      sx={{ display: 'block', my: 2 }}>
            Sorry, an unexpected error has occurred.
          </Typography>
          <Typography variant="body" color="text.secondary"
                      sx={{ display: 'block', my: 2 }}>
            <i>{error.statusText || error.message}</i>
          </Typography>

          <MuiLink component={RouterLink} to="/">
            Go to home page
          </MuiLink>
        </Box>
      </Container>
    </>
  )

}
