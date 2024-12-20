<?php

namespace tests\Feature;

use App\Models\Article;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test the user can register an accounts.
     *
     * @return void
     */
    public function test_user_can_register()
    {
        $data = [
            'username' => $this->faker->userName,
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'password' => $this->faker->password,
        ];

        $data['password_confirmation'] = $data['password'];


        $response = $this->postJson(route('user.register'), $data);


        $response->assertSuccessful()
                 ->assertJsonStructure([
                   'data' => [
                     'id',
                     'name',
                     'email',
                     'created_at',
                     'updated_at',
                     'access_token',
                   ]
                 ])
                 ->assertJsonFragment([
                   'name' => $data['name'],
                   'email' => $data['email'],
                 ]);
    }

    /**
     * Test the user can login using existing  account.
     *
     * @return void
     */
    public function test_user_can_login()
    {
        $user = User::factory()->create();
        $data = [
            'email' => $user->email,
            'password' => 'password',
        ];

        $response = $this->postJson(route('user.login'), $data);



        $response->assertSuccessful()
                 ->assertJsonStructure([
                   'data' => [
                     'id',
                     'name',
                     'email',
                     'created_at',
                     'updated_at',
                     'access_token',
                   ]
                 ])
                 ->assertJsonFragment([
                   'name' => $user->name,
                   'email' => $data['email'],
                 ]);
    }


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
                   ]
                 ])
                 ->assertJsonFragment([
                   'name' => $user->name,
                   'email' => $user->email,
                 ]);
    }
}
