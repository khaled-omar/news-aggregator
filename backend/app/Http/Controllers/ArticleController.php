<?php

namespace App\Http\Controllers;

use App\Http\Requests\ListArticleRequest;
use App\Http\Resources\ArticleResource;
use App\Repositories\Contracts\ArticleRepositoryInterface;

class ArticleController extends Controller
{
    public function __construct(protected ArticleRepositoryInterface $articleRepository) {}

    /**
     * Display a listing of the resource.
     */
    public function index(ListArticleRequest $request)
    {
        $items = $this->articleRepository->simplePaginate();

        return ArticleResource::collection($items);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $article)
    {
        $item = $this->articleRepository->findOrFail($article);

        return new ArticleResource($item);
    }
}
