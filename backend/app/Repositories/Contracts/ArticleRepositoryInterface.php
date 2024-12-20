<?php

namespace App\Repositories\Contracts;

interface ArticleRepositoryInterface extends BaseRepositoryInterface
{
    public function findByUrl(string $url): ?object;
}
