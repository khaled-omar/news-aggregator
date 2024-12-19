<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(protected UserService $userService) {}

    /**
     * Display a listing of the resource.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(LoginRequest $request)
    {
        $user = $this->userService->doLogin($request->validated());

        return response()->json(['data' => $user]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function register(RegisterRequest $request)
    {
        $user = $this->userService->doRegister($request->validated());

        return response()->json(['data' => $user]);
    }

    /**
     * Display the specified resource.
     */
    public function me()
    {
        $user = auth()->user();

        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // @TODO:: Implement this
    }
}
