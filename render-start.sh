#!/bin/bash
# Render start script for PHP API
# This script runs to start the service

echo "Starting PHP built-in server..."
cd api
php -S 0.0.0.0:${PORT:-10000}

