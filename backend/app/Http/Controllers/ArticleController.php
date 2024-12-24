<?php

namespace App\Http\Controllers;

use App\Http\Requests\ListArticleRequest;
use App\Http\Resources\ArticleResource;
use App\Repositories\Contracts\ArticleRepositoryInterface;
use App\Services\ArticleService;

class ArticleController extends Controller
{
    public function __construct(protected ArticleRepositoryInterface $articleRepository, protected ArticleService $articleService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(ListArticleRequest $request)
    {
        $filters = $request->validated();

        $items = $this->articleService->getPersonalizedArticles($filters);

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
