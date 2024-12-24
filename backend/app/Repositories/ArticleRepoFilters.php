<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Builder;

trait ArticleRepoFilters
{
    protected function filterBySource(array $filters, Builder $query): void
    {
        if (isset($filters['source']) && filled($filters['source'])) {
            $query->whereIn('source', $filters['source']);
        }
    }

    protected function filterByKeyword(array $filters, Builder $query): void
    {
        if (isset($filters['keyword']) && filled($filters['keyword'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('title', 'LIKE', "%{$filters['keyword']}%")
                    ->orWhere('content', 'LIKE', "%{$filters['keyword']}%");
            });
        }

    }

    protected function filterByPublishDate(array $filters, Builder $query): void
    {
        if (isset($filters['publish_date']) && filled($filters['publish_date'])) {
            $query->whereDate('published_at', '=', $filters['publish_date']);
        }
    }
}
