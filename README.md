## Installation Steps
We are using laravel sail read more about it from [Sail docs](https://laravel.com/docs/11.x/sail)

To install project on your local machine, run the following commands:-

1. `cd backend` 
2. Build sail services using
```
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php84-composer:latest \
    composer install --ignore-platform-reqs
```

3. Run docker-compose services: `./vendor/bin/sail up --build`
4. Run migrations `./vendor/bin/sail migrate`
5. In order to scrapp articles from news sources run the following command `./vendor/bin/sail artisan news:aggregate`
6. Go to Backend => [Localhost:80](http://localhost:80/)
7. Go to Frontend => [Localhost:5173](http://localhost:5173/)
8. In order to stop services: `./vendor/bin/sail stop`

## Running services
1. Backend Server:  `Exposed Port: 80`
2. Mysql Server: `Exposed Port: 3306`
3. Frontend Server: `Exposed Port: 5173`
