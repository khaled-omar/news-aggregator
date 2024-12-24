<?php

namespace App\Repositories;

use App\Models\Article;
use App\Repositories\Contracts\ArticleRepositoryInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
class ArticleRepository extends BaseRepository implements ArticleRepositoryInterface
{
    use ArticleRepoFilters;

    public function __construct(Article $article)
    {
        parent::__construct($article);
    }

    public function findByUrl(string $url): ?object
    {
        return $this->model->where('url', $url)->first();
    }

    public function paginate(array $filters = []): LengthAwarePaginator
    {
        $query = $this->model->query();

        $this->handleQueryFilters($filters, $query);

        $limit = $filters['limit'] ?? 9;

        return $query->paginate($limit);
    }

    protected function handleQueryFilters(array $filters, Builder $query): void {
        $this->filterBySource($filters, $query);
        $this->filterByKeyword($filters, $query);
        $this->filterByPublishDate($filters, $query);
    }
}
