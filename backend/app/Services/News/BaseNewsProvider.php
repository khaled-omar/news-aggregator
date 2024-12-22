<?php

namespace app\Services\News;

use app\Services\Contracts\NewsProviderInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

abstract class BaseNewsProvider implements NewsProviderInterface
{
    /**
     * Fetch articles from the API.
     *
     * @throws \Exception
     */
    public function fetchArticles(): Collection
    {
        $response = Http::get($this->getApiUrl(), $this->getApiParams());

        if (! $response->successful()) {
            throw new \Exception($response->body());
        }

        return collect($this->getArticlesFromResponse($response->json()))
            ->map(fn ($article) => $this->mapArticle($article));
    }

    /**
     * Get the API endpoint URL.
     */
    abstract protected function getApiUrl(): string;

    /**
     * Get the API query parameters.
     */
    abstract protected function getApiParams(): array;

    /**
     * Map the raw API response to the unified article structure.
     */
    abstract protected function mapArticle(array $article): array;

    /**
     * Extract the articles array from the API response.
     */
    abstract protected function getArticlesFromResponse(array $response): array;
}
