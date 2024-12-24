<?php

namespace App\Http\Requests;

use app\Enums\NewsArticleSources;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserPreferencesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'news_sources' => ['nullable', 'array'],
            'news_sources.*' => [
                'string',
                Rule::in(array_column(NewsArticleSources::cases(), 'value')),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'news_sources.*.in' => 'The selected news source is invalid.',
        ];
    }
}
