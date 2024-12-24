<?php

namespace App\Repositories;

use App\Models\Article;
use App\Repositories\Contracts\ArticleRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class ArticleRepository extends BaseRepository implements ArticleRepositoryInterface
{
    use ArticleRepoFilters;

    public function __construct(Article $article)
    {
        parent::__construct($article);
    }

    public function getLatestArticles(array $filters = []): LengthAwarePaginator
    {
        $query = $this->model->query();

        $this->handleQueryFilters($filters, $query);

        $limit = $filters['limit'] ?? 9;

        $query->orderByDesc('published_at');

        return $query->paginate($limit);
    }


}
