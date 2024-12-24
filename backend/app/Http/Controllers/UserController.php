<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserPreferencesRequest;
use App\Http\Requests\UpdateUserProfileRequest;
use App\Http\Resources\UserResource;
use app\Services\UserService;

class UserController extends Controller
{
    public function __construct(protected UserService $userService) {}

    /**
     * Display the specified resource.
     */
    public function me()
    {
        $user = auth()->user();

        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserProfileRequest $request)
    {
        $this->userService->updateProfile($request->validated());

        return response([], 200);
    }

    /**
     * Update user search preferences.
     */
    public function updatePreferences(UpdateUserPreferencesRequest $request)
    {
        $this->userService->updateSearchPreferences($request->validated());

        return response([], 200);
    }
}
