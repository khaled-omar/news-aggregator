<?php

namespace App\Services;

use Carbon\Carbon;

class NYTimesProvider extends BaseNewsProvider
{
    protected function getApiUrl(): string
    {
        return 'https://api.nytimes.com/svc/topstories/v2/home.json';
    }

    protected function getApiParams(): array
    {
        return [
            'api-key' => env('NYTIMES_API_KEY'),
        ];
    }

    protected function mapArticle(array $article): array
    {
        return [
            'title' => $article['title'],
            'content' => $article['abstract'],
            'source' => 'NYTimes',
            'published_at' => Carbon::parse($article['published_date']) ?? now(),
            'image_url' => isset($article['multimedia'][1])
              ? $article['multimedia'][1]['url']
              : $article['multimedia'][0]['url'] ?? null,
            'url' => $article['url'],
        ];
    }

    protected function getArticlesFromResponse(array $response): array
    {
        return $response['results'] ?? [];
    }
}
