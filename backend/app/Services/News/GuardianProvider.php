<?php

namespace app\Services\News;

use app\Enums\NewsArticleSources;
use Carbon\Carbon;

class GuardianProvider extends BaseNewsProvider
{
    protected function getApiUrl(): string
    {
        return 'https://content.guardianapis.com/search';
    }

    protected function getApiParams(): array
    {
        return [
            'api-key' => env('GUARDIAN_API_KEY'),
            'show-fields' => 'trailText,thumbnail',
            'page-size' => 20,
        ];
    }

    protected function mapArticle(array $article): array
    {
        return [
            'title' => $article['webTitle'],
            'content' => $article['fields']['trailText'],
            'source' => NewsArticleSources::GUARDIAN,
            'published_at' => Carbon::parse($article['webPublicationDate']) ?? now(),
            'image_url' => $article['fields']['thumbnail'] ?? null,
            'url' => $article['webUrl'],
        ];
    }

    protected function getArticlesFromResponse(array $response): array
    {
        return $response['response']['results'] ?? [];
    }
}
