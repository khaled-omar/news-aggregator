<?php

namespace App\Services;

use Carbon\Carbon;

class NewsApiProvider extends BaseNewsProvider
{
    protected function getApiUrl(): string
    {
        return 'https://newsapi.org/v2/top-headlines';
    }

    protected function getApiParams(): array
    {
        return [
            'apiKey' => env('NEWSAPI_API_KEY'),
            'country' => 'us',
        ];
    }

    protected function mapArticle(array $article): array
    {
        return [
            'title' => $article['title'],
            'content' => $article['description'],
            'source' => 'NewsAPI',
            'published_at' => Carbon::parse($article['publishedAt']),
            'remote_id' => $article['url'], // Unique identifier for deduplication
            'image_url' => $article['urlToImage'] ?? null,
            'url' => $article['url'],
        ];
    }

    protected function getArticlesFromResponse(array $response): array
    {
        return $response['articles'] ?? [];
    }
}
