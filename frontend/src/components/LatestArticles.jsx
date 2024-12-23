import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Container,
  Stack,
  Pagination, Box,
} from '@mui/material'
import Grid from "@mui/material/Grid2";
import ArticleService from "../services/ArticleService.js";
import LoadingIndicator from "./LoadingIndicator.jsx";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

const LIMIT = 9;

const LatestArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const fetchArticles = async (page = 1) => {
    try {
      const data = await ArticleService.findAll({ page: page, limit: LIMIT});
      setArticles(data.data);
      setTotalPages(data.meta.last_page);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filters = [];
    //
    // for(let entry of searchParams.entries()) {
    //   if (entry[0] === "page") continue;
    //   let key = entry[0];
    //   let value = entry[1];
    //   console.log(key)
    //   filters.push({
    //     [key]: value
    //   });
    // }

    fetchArticles(currentPage);
  }, [currentPage, searchParams]);

  const handlePageChange = (event, value) => {
    searchParams.set("page", value);
    setSearchParams(searchParams);
  };

  if (loading) {
    return <LoadingIndicator />;
  }


  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center"  sx={{ my: 4 }}>
        Latest Articles
      </Typography>
      { articles.length === 0 && <Box>
        <Typography variant="h6" align="center" gutterBottom>
          No articles found
        </Typography>
      </Box>}
      { articles.length > 0 && <Box>
      <Grid container spacing={4} >
        {articles?.map((article) => (
          <Grid size={{sm: 12,md:6, lg: 4 }} key={article.id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                image={article.image_url || "https://via.placeholder.com/180"}
                alt={article.title}
                height="180"
              />
              <CardContent>
                <Typography variant="body1" gutterBottom >
                  {article.title}
                </Typography>

                {article.published_at && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", my: 1 }}>
                    {dayjs(article.published_at).format("MMMM DD, YYYY")}
                  </Typography>
                )}

                {/*<Typography variant="body2" color="text.secondary" sx={{ display: "block", mt: 2 }}>*/}
                {/*  {article.content || "No content available"}*/}
                {/*</Typography>*/}

              </CardContent>
              <CardActions sx={{ mt: "auto", display: "flex", justifyContent: "flex-end" }}>
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
  );
};

export default LatestArticles;
