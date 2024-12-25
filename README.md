## Installation Steps
We are using laravel sail read more about it from [Sail docs](https://laravel.com/docs/11.x/sail)

To install project on your local machine, run the following commands:-

1. Clone the project and change directory to the root `cd news-aggregator` 
2. Install dependencies using `sh setup.sh`
3. Change directory to the backend `cd backend`
4. Run & Build docker-compose services: `./vendor/bin/sail up --build`
5. Run migrations `./vendor/bin/sail migrate`
6. In order to scrapp articles from news sources run the following command `./vendor/bin/sail artisan news:aggregate`
7. Go to Backend => [Localhost:80](http://localhost:80/)
8. Go to Frontend => [Localhost:5173](http://localhost:5173/)
9. In order to stop services: `./vendor/bin/sail stop`

## Running services
1. Backend Server:  `Exposed Port: 80`
2. Mysql Server: `Exposed Port: 3306`
3. Frontend Server: `Exposed Port: 5173`
