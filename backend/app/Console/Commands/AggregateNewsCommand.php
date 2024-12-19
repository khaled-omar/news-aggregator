<?php

namespace App\Console\Commands;

use App\Services\NewsAggregatorService;
use Illuminate\Console\Command;

class AggregateNewsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:aggregate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Aggregate news from multiple sources';

    protected NewsAggregatorService $aggregator;

    public function __construct(NewsAggregatorService $aggregator)
    {
        parent::__construct();
        $this->aggregator = $aggregator;
    }

    public function handle()
    {
        $this->aggregator->aggregate();
        $this->info('News articles aggregated successfully!');
    }
}
