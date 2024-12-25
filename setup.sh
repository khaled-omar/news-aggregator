#!/bin/bash

# Backend - Composer Install
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd)/backend:/var/www/html" \
    -w /var/www/html \
    laravelsail/php84-composer:latest \
    composer install --ignore-platform-reqs

# Frontend - NPM Install
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd)/frontend:/var/www/html" \
    -w /var/www/html \
    node:20-alpine \
    npm install
