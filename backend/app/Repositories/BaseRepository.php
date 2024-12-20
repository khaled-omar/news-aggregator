<?php

namespace App\Repositories;

use App\Repositories\Contracts\BaseRepositoryInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;

abstract class BaseRepository implements BaseRepositoryInterface
{
    protected Model $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function all(): Collection
    {
        return $this->model->all();
    }

    public function simplePaginate(): Paginator
    {
        return $this->model->simplePaginate();
    }

    public function find(int $id): ?object
    {
        return $this->model->find($id);
    }

    public function findOrFail(int $id): ?object
    {
        return $this->model->findOrFail($id);
    }

    public function create(array $data): object
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data): bool
    {
        $record = $this->find($id);
        if (! $record) {
            return false;
        }

        return $record->update($data);
    }

    public function delete(int $id): bool
    {
        $record = $this->find($id);
        if (! $record) {
            return false;
        }

        return $record->delete();
    }

    public function updateOrCreate(array $attributes, array $data): object
    {
        return $this->model->newQuery()->updateOrCreate($attributes, $data);
    }

    public function upsert(array $values, array $uniqueBy, array $update): int
    {
        return $this->model->newQuery()->upsert($values, $uniqueBy, $update);
    }
}
