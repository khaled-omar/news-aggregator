<?php

namespace App\Http\Requests;

use app\Enums\NewsArticleSources;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ListArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'source' => ['array'],
            'source.*' => ['string', Rule::in(array_column(NewsArticleSources::cases(), 'value'))],
            'keyword' => ['nullable', 'string'],
            'publish_date' => ['nullable', 'date'],
            'page' => ['nullable', 'integer', 'min:1'],
            'limit' => ['nullable', 'integer', 'min:1', 'max:100'],
        ];
    }

    public function messages(): array
    {
        return [
            'source.*.exists' => 'One or more sources are invalid.',
            'limit.max' => 'You cannot request more than 100 articles per page.',
        ];
    }
}
