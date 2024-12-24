<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test the user can use me endpoint to get logged in user.
     *
     * @return void
     */
    public function test_user_can_use_me_endpoint()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->getJson(route('user.me'));

        $response->assertSuccessful()
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'email',
                    'created_at',
                    'updated_at',
                    'access_token',
                ],
            ])
            ->assertJsonFragment([
                'name' => $user->name,
                'email' => $user->email,
            ]);
    }

    public function test_user_can_update_profile()
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->putJson(route('user.update'), [
                'name' => 'Updated Name',
                'email' => 'updated@example.com',
                'password' => 'password',
                'password_confirmation' => 'password',
            ])->assertSuccessful();

    }

    public function test_user_can_update_preferences_with_valid_sources()
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->putJson(route('user.preferences.update'), [
                'news_sources' => ['news_api', 'guardian'],
            ])
            ->assertSuccessful();
    }
}
