<?php

use App\Console\Commands\AggregateNewsCommand;
use Illuminate\Support\Facades\Schedule;

Schedule::command(AggregateNewsCommand::class)->daily();
