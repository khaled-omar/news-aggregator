<?php

namespace App\Models;

use app\Enums\NewsArticleSources;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'source',
        'title',
        'content',
        'image_url',
        'url',
        'published_at',
    ];

    protected $casts = [
        'source' => NewsArticleSources::class,
    ];

}
