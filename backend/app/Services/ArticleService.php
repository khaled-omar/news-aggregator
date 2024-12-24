<?php

namespace App\Services;

use App\Repositories\ArticleRepository;
use App\Repositories\UserPreferencesRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class ArticleService
{
    public function __construct(protected ArticleRepository $articleRepository, protected UserPreferencesRepository $preferencesRepository) {}

    /**
     * Get personalized articles or use custom filters.
     */
    public function getPersonalizedArticles(array $filters): LengthAwarePaginator
    {
        // Determine if custom filters are applied (excluding pagination parameters)
        if ($this->hasCustomFilters($filters)) {
            return $this->articleRepository->paginate($filters);
        }

        // Apply user personalization if no custom filters are provided
        $userPreferences = $this->getUserPreferences();

        if ($userPreferences) {
            $filters['source'] = $userPreferences['news_sources'] ?? [];
        }

        return $this->articleRepository->paginate($filters);
    }

    /**
     * Check if the filters contain any custom filtering parameters.
     */
    protected function hasCustomFilters(array $filters): bool
    {
        $customFilters = array_diff_key($filters, array_flip(['page', 'limit']));

        return filled($customFilters);
    }

    /**
     * Retrieve the authenticated user's preferences.
     */
    protected function getUserPreferences(): ?array
    {
        $userId = Auth::id();

        if (! $userId) {
            return null;
        }

        $preferences = $this->preferencesRepository->findByUserId($userId);

        if ($preferences && filled($preferences->preferences)) {
            return $preferences->preferences;
        }

        return null;
    }
}
