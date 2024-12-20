<?php

namespace App\Repositories;

use App\Models\Article;
use App\Repositories\Contracts\ArticleRepositoryInterface;

class ArticleRepository extends BaseRepository implements ArticleRepositoryInterface
{
    public function __construct(Article $article)
    {
        parent::__construct($article);
    }

    public function findByUrl(string $url): ?object
    {
        return $this->model->where('url', $url)->first();
    }
}
