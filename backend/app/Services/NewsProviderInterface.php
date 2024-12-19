<?php

namespace App\Services;

interface NewsProviderInterface
{
    /**
     * Fetch articles from the news source.
     */
    public function fetchArticles(): array;
}
