<?php

namespace App\Providers;

use App\Services\GuardianProvider;
use App\Services\NewsAggregatorService;
use App\Services\NewsApiProvider;
use App\Services\NYTimesProvider;
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
            ]);
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
