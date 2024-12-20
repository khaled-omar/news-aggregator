<?php

namespace Database\Factories;

use app\Enums\NewsArticleSources;
use App\Models\Article;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    protected $model = Article::class;

    public function definition()
    {
        return [
          'title' => $this->faker->sentence,
          'content' => $this->faker->paragraph,
          'source' => NewsArticleSources::NEWS_API,
          'published_at' => $this->faker->dateTime,
          'url' => $this->faker->url,
          'image_url' => $this->faker->imageUrl,
        ];
    }
}
