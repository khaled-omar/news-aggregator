<?php

namespace App\Http\Controllers;

use App\Http\Requests\ListArticleRequest;
use App\Models\Article;
use App\Repositories\Contracts\ArticleRepositoryInterface;

class ArticleController extends Controller
{

    public function __construct(protected ArticleRepositoryInterface $articleRepository ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(ListArticleRequest $request)
    {
        $items = $this->articleRepository->simplePaginate();

        return response()->json($items);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $article)
    {
        $item = $this->articleRepository->findOrFail($article);

        return response()->json($item);
    }
}
