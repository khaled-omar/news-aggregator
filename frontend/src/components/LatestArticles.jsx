import  { useState, useEffect } from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Container,
  Stack,
  Pagination, Box, Alert,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import ArticleService from '../services/ArticleService.js'
import LoadingIndicator from './LoadingIndicator.jsx'
import { useSearchParams } from 'react-router-dom'
import dayjs from 'dayjs'
import LazyLoad from 'react-lazy-load'

const LIMIT = 9

const LatestArticles = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(1)
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = parseInt(searchParams.get('page') || '1', 10)

  const fetchArticles = async () => {
    try {
      setLoading(true)
      setError(null)
      const filters = buildFilters()
      const data = await ArticleService.findAll(filters)
      setArticles(data.data)
      setTotalPages(data.meta.last_page)
    } catch (e) {
      setError('Failed to fetch articles. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  function buildFilters() {
    const filters = {
      page: currentPage,
      limit: LIMIT,
    }

    for (let [key, value] of searchParams.entries()) {
      if (key.endsWith('[]')) {
        const actualKey = key.slice(0, -2)
        if (!filters[actualKey]) {
          filters[actualKey] = []
        }
        filters[actualKey].push(value)
      } else {
        filters[key] = value
      }
    }

    return filters
  }

  useEffect(() => {
    fetchArticles()
  }, [currentPage, searchParams])

  const handlePageChange = (event, value) => {
    searchParams.set('page', value)
    setSearchParams(searchParams)
  }

  if (loading) {
    return <LoadingIndicator/>
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Latest Articles
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {!error && articles.length === 0 && <Box>
        <Typography variant="body2" align="center" color="text.secondary"
                    sx={{ display: 'block', my: 2 }}>
          The are no results found matching your search criteria
        </Typography>
      </Box>}
      {articles.length > 0 && <Box>
        <Typography variant="caption" color="text.secondary"
                    sx={{ display: 'block', my: 2 }}>
          {`Showing ${articles.length} of ${totalPages * LIMIT} articles`}
        </Typography>

        <Grid container spacing={4}>
          {articles?.map((article) => (
            <Grid size={{ sm: 12, md: 6, lg: 4 }} key={article.id}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <LazyLoad height={180}>
                  <CardMedia
                    component="img"
                    image={article.image_url || 'https://via.placeholder.com/180'}
                    alt={article.title}
                    height="180"
                  />
                </LazyLoad>
                <CardContent>
                  <Typography variant="body1" gutterBottom>
                    {article.title}
                  </Typography>

                  {article.published_at && (
                    <Typography variant="caption" color="text.secondary"
                                sx={{ display: 'block', my: 1 }}>
                      {dayjs(article.published_at).format('MMMM DD, YYYY')}
                    </Typography>
                  )}
                </CardContent>
                <CardActions
                  sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                  <Button size="small" href={article.url} target="_blank">
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Stack direction="row" justifyContent="center" my={4}>
          <Pagination
            size="small"
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            siblingCount={1}
            boundaryCount={1}
          />
        </Stack>
      </Box>}
    </Container>
  )
}

export default LatestArticles
