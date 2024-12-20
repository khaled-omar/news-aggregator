<?php

namespace app\Services;

use App\Exceptions\InvalidPasswordException;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function __construct(protected UserRepositoryInterface $userRepository) {}

    /**
     * Display a listing of the resource.
     *
     * @throws \Illuminate\Validation\ValidationException
     * @throws \App\Exceptions\InvalidPasswordException
     */
    public function doLogin(array $data): User
    {
        $user = $this->userRepository->findByEmail($data['email']);

        if ($this->isUserPasswordExists($user, $data['password'])) {
            throw new InvalidPasswordException;
        }

        $user->token = $user->createToken($data['email'])->plainTextToken;

        return $user;
    }

    public function doRegister(array $data): User
    {
        /** @var User $user */
        $user = $this->userRepository->create([
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
