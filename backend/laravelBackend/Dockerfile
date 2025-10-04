FROM php:8.2-fpm

WORKDIR /var/www/html

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libzip-dev \
    libssl-dev \
    libonig-dev \
    libpq-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    pkg-config \
    nano \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && docker-php-ext-install mbstring zip bcmath pdo pdo_pgsql \
    && pecl install redis \
    && docker-php-ext-enable redis

# Install Node.js and npm 
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Install MongoDB PHP extension (v1.19.1)
RUN curl -L -o mongodb.tgz https://pecl.php.net/get/mongodb-1.19.1.tgz \
    && mkdir -p mongodb \
    && tar -xzf mongodb.tgz -C mongodb --strip-components=1 \
    && rm mongodb.tgz \
    && cd mongodb \
    && phpize \
    && ./configure \
    && make -j"$(nproc)" \
    && make install \
    && docker-php-ext-enable mongodb

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer


RUN mkdir -p /var/www/html/storage /var/www/html/bootstrap/cache \
    && chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache


EXPOSE 9000

CMD ["php-fpm"]
