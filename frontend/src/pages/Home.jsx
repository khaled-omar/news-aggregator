import '../App.css'
import LatestArticles from '../components/LatestArticles.jsx'
import Grid from '@mui/material/Grid2'
import Filters from '../components/Filters.jsx'

function Home() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 3, md: 3 }}>
          <Filters/>
        </Grid>
        <Grid size={{ xs: 12, sm: 9, md: 9 }}>
          <LatestArticles/>
        </Grid>
      </Grid>

    </>
  )
}

export default Home
