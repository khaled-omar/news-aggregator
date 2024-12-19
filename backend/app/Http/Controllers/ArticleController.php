<?php

namespace App\Http\Controllers;

use App\Http\Requests\ListArticleRequest;
use App\Models\Article;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ListArticleRequest $request)
    {
        return response()->json(Article::query()->simplePaginate());
    }

    /**
     * Display the specified resource.
     */
    public function show(int $article)
    {
        return response()->json(Article::query()->findOrFail($article));
    }
}
