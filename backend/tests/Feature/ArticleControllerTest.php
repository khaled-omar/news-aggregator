<?php

namespace Tests\Feature;

use App\Models\Article;
use App\Models\User;
use App\Models\UserPreference;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ArticleControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the index endpoint for articles.
     *
     * @return void
     */
    public function test_articles_index_returns_a_list_of_articles()
    {
        $articles = Article::factory()->count(5)->create();
        $user = User::factory()->create();

        $response = $this->actingAs($user)->getJson(route('articles.index'));

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'title',
                        'content',
                        'source',
                        'published_at',
                        'url',
                        'image_url',
                        'created_at',
                        'updated_at',
                    ],
                ],
            ])
            ->assertJsonCount(5, 'data')
            ->assertJsonFragment([
                'id' => $articles->first()->id,
                'title' => $articles->first()->title,
            ]);
    }

    /**
     * Test the show endpoint for a single article.
     *
     * @return void
     */
    public function test_article_show_returns_a_single_article()
    {
        $article = Article::factory()->create();
        $user = User::factory()->create();

        $response = $this->actingAs($user)->getJson(route('articles.show', $article->id));

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'title',
                    'content',
                    'source',
                    'published_at',
                    'url',
                    'image_url',
                    'created_at',
                    'updated_at',
                ],
            ])
            ->assertJsonFragment([
                'id' => $article->id,
                'title' => $article->title,
            ]);
    }

    /**
     * Test the show endpoint for a non-existing article.
     *
     * @return void
     */
    public function test_article_show_returns_404_for_non_existing_article()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->getJson(route('articles.show', 999));

        $response->assertStatus(404);
    }

    public function test_get_personalized_articles_without_filters()
    {
        $user = User::factory()->create();
        UserPreference::create([
            'user_id' => $user->id,
            'preferences' => ['news_sources' => ['news_api', 'guardian']],
        ]);

        Article::factory()->create(['source' => 'news_api']);
        Article::factory()->create(['source' => 'guardian']);
        Article::factory()->create(['source' => 'ny_times']);

        $this->actingAs($user);

        $response = $this->getJson(route('articles.index'));
        $response->assertStatus(200)
            ->assertJsonCount(2, 'data');
    }

    public function test_custom_filters_override_personalized_articles()
    {
        $user = User::factory()->create();
        UserPreference::create([
            'user_id' => $user->id,
            'preferences' => ['news_sources' => ['news_api', 'guardian']],
        ]);

        Article::factory()->create(['source' => 'news_api']);
        Article::factory()->create(['source' => 'guardian']);
        Article::factory()->create(['source' => 'ny_times']);

        $this->actingAs($user);

        $response = $this->getJson(route('articles.index', ['source' => ['ny_times']]));

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data')
            ->assertJsonFragment(['source' => 'ny_times']);
    }
}
