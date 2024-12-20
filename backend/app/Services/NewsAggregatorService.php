<?php

namespace App\Services;

use App\Repositories\Contracts\ArticleRepositoryInterface;
use app\Services\Contracts\NewsProviderInterface;
use Illuminate\Support\Facades\Log;

class NewsAggregatorService
{
    public function __construct(protected array $providers, protected ArticleRepositoryInterface $articleRepository) {}

    /**
     * Aggregate articles from all registered providers.
     */
    public function aggregate(): void
    {
        foreach ($this->providers as $provider) {
            try {
                $this->processProvider($provider);
            } catch (\Exception $exception) {
                Log::error('Failed to process provider: '.get_class($provider), [
                    'error' => $exception->getMessage(),
                ]);
            }
        }
    }

    /**
     * Process a single provider and save its articles.
     */
    protected function processProvider(NewsProviderInterface $provider): void
    {
        $articles = $provider->fetchArticles();

        if (filled($articles)) {
            $this->saveArticles($articles);
        }
    }

    /**
     * Save an article to the database.
     */
    protected function saveArticles(array $articles): void
    {
        $this->articleRepository->upsert($articles, ['url'], array_keys($articles[0]));
    }
}
