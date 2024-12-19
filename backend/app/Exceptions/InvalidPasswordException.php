<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Validation\ValidationException;

class InvalidPasswordException extends Exception
{
    protected $message = 'The provided credentials are incorrect.';

    public function __construct()
    {
        parent::__construct($this->message, 422);
    }

    /**
     * @throws \Illuminate\Validation\ValidationException
     */
    public function render()
    {
        throw ValidationException::withMessages([
            'password' => [$this->message],
        ]);
    }
}
