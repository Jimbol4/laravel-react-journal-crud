## Laravel React CRUD App Example

A CRUD app built using Laravel on the back end and react on the front end.

## Files and directories of interest

Back end:

- PostController: https://github.com/Jimbol4/laravel-react-journal-crud/blob/master/app/Http/Controllers/PostController.php
- API Routes: https://github.com/Jimbol4/laravel-react-journal-crud/blob/master/routes/api.php
- Post Policies: https://github.com/Jimbol4/laravel-react-journal-crud/blob/master/app/Policies/PostPolicy.php
- Integration tests: https://github.com/Jimbol4/laravel-react-journal-crud/blob/master/tests/Feature/PostTest.php

Front end:

- React components: https://github.com/Jimbol4/laravel-react-journal-crud/tree/master/resources/js/components

## Usage

Install the application like so once you have updated your environment variables/set up databases:

```composer install
php artisan migrate
php artisan db:seed```

You can then visit the app at /, but you'll need to create an account and log in to use it.

## Running tests

Once you have set up and migrated a test database (possible example in config/database.php), execute the following:

```./vendor/bin/phpunit```


