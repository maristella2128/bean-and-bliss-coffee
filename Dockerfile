# Dockerfile for PHP API Backend
FROM php:8.2-apache

# Install PostgreSQL extension and other dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo pdo_pgsql pgsql \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Enable Apache modules
RUN a2enmod rewrite headers

# Copy API files
COPY api/ /var/www/html/api/

# Set working directory
WORKDIR /var/www/html

# Create Apache configuration for API
RUN echo '<Directory /var/www/html/api>\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>' > /etc/apache2/conf-available/api.conf

RUN a2enconf api

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]

