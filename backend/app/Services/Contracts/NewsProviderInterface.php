<?php

namespace app\Services\Contracts;

use Illuminate\Support\Collection;

interface NewsProviderInterface
{
    /**
     * Fetch articles from the news source.
     */
    public function fetchArticles(): Collection;
}
