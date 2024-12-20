<?php

namespace App\Providers;

use App\Repositories\Contracts\ArticleRepositoryInterface;
use app\Services\News\GuardianProvider;
use app\Services\News\NewsApiProvider;
use app\Services\News\NYTimesProvider;
use App\Services\NewsAggregatorService;
use Illuminate\Support\ServiceProvider;

class NewsServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(NewsAggregatorService::class, function ($app) {
            return new NewsAggregatorService([
                $app->make(NewsApiProvider::class),
                $app->make(NYTimesProvider::class),
                $app->make(GuardianProvider::class),
            ],
                $app->make(ArticleRepositoryInterface::class));
        });
    }
}
