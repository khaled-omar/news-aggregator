<?php

namespace App\Repositories;

use App\Models\UserPreference;

class UserPreferencesRepository extends BaseRepository
{
    public function __construct(UserPreference $userPreference)
    {
        parent::__construct($userPreference);
    }

    /**
     * Update or create user preferences.
     */
    public function updatePreferences(int $userId, array $preferences): UserPreference
    {
        return $this->updateOrCreate(['user_id' => $userId], ['preferences' => json_encode($preferences)]);
    }

    /**
     * Find preferences by user ID.
     */
    public function findByUserId(int $userId): ?UserPreference
    {
        return $this->model->where('user_id', $userId)->first();
    }
}
