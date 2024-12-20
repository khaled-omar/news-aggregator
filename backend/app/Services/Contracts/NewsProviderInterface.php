<?php

namespace app\Services\Contracts;

interface NewsProviderInterface
{
    /**
     * Fetch articles from the news source.
     */
    public function fetchArticles(): array;
}
