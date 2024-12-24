<?php

namespace app\Services;

use App\Exceptions\InvalidPasswordException;
use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\UserPreferencesRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function __construct(protected UserRepositoryInterface $userRepository, protected UserPreferencesRepository $preferencesRepository) {}

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

    /**
     * Update the authenticated user's profile.
     */
    public function updateProfile(array $data): bool
    {
        $userId = Auth::id();

        return $this->userRepository->update($userId, $data);
    }

    /**
     * Update the authenticated user's search preferences.
     */
    public function updateSearchPreferences(array $preferences): void
    {
        $userId = Auth::id();
        $this->preferencesRepository->updatePreferences($userId, $preferences);
    }

    protected function isUserPasswordExists($user, $password): bool
    {
        return ! $user || ! Hash::check($password, $user->password);
    }
}
