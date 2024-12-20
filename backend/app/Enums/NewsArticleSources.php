<?php

namespace app\Enums;

enum NewsArticleSources: string
{
    case NEWS_API = 'news_api';

    case GUARDIAN = 'guardian';

    case NEW_YORK_TIMES = 'ny_times';
}
