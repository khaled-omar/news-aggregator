<?php

namespace App\Repositories\Contracts;

use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;

interface BaseRepositoryInterface
{
    public function all(): Collection;

    public function simplePaginate(): Paginator;

    public function find(int $id): ?object;

    public function findOrFail(int $id): ?object;

    public function create(array $data): object;

    public function update(int $id, array $data): bool;

    public function delete(int $id): bool;

    public function updateOrCreate(array $attributes, array $data): object;

    public function upsert(array $values, array $uniqueBy, array $update): int;
}
