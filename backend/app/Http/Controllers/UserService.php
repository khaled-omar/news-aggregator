<?php

namespace App\Http\Controllers;

use App\Exceptions\InvalidPasswordException;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    /**
     * Display a listing of the resource.
     *
     * @throws \Illuminate\Validation\ValidationException
     * @throws \App\Exceptions\InvalidPasswordException
     */
    public function doLogin(array $data): User
    {
        $user = User::where('email', $data['email'])->first();

        if ($this->isUserPasswordExists($user, $data['password'])) {
            throw new InvalidPasswordException;
        }

        $user->token = $user->createToken($data['email'])->plainTextToken;

        return $user;
    }

    public function doRegister(array $data): User
    {
        $user = User::query()->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $user->token = $user->createToken($data['email'])->plainTextToken;

        return $user;
    }

    protected function isUserPasswordExists($user, $password): bool
    {
        return ! $user || ! Hash::check($password, $user->password);
    }
}
