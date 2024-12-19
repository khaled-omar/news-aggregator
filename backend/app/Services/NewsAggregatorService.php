<?php

namespace App\Services;

use App\Models\Article;
use Illuminate\Support\Facades\Log;

class NewsAggregatorService
{
    protected array $providers;

    public function __construct(array $providers)
    {
        $this->providers = $providers;
    }

    /**
     * Aggregate articles from all registered providers.
     */
    public function aggregate(): void
    {
        foreach ($this->providers as $provider) {
            try {
                $this->processProvider($provider);
            } catch (\Exception $exception) {
                Log::error("Failed to process provider: " . get_class($provider), [
                  'error' => $exception->getMessage(),
                ]);
            }
        }
    }

    /**
     * Process a single provider and save its articles.
     *
     * @param \App\Services\NewsProviderInterface $provider
     */
    protected function processProvider(NewsProviderInterface $provider): void
    {
        $articles = $provider->fetchArticles();

        foreach ($articles as $article) {
            $this->saveArticle($article);
        }
    }

    /**
     * Save an article to the database.
     *
     * @param array $article
     */
    protected function saveArticle(array $article): void
    {
        Article::query()->updateOrCreate(
          ['url' => $article['url']], // Unique constraint
          $article
        );
    }
}
