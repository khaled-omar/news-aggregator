import '../App.css'
import { Box, Button, Container, Typography } from '@mui/material'
import { Copyright } from '@mui/icons-material'
import LatestArticles from '../components/LatestArticles.jsx'
import Header from '../components/layout/Header.jsx'
import Grid from '@mui/material/Grid2'
import Filters from '../components/Filters.jsx'

function Home() {
  return (
    <>

      <Header/>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 3, md: 3 }}>
            <Filters/>
          </Grid>
          <Grid size={{ xs: 12, sm: 9, md: 9 }}>
            <LatestArticles/>
          </Grid>
        </Grid>
      </Container>

    </>
  );
}

export default Home
