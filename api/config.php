<?php
// Database configuration for PostgreSQL
// This file reads from environment variables for security

// Get database credentials from environment variables
$db_host = getenv('DB_HOST') ?: 'localhost';
$db_port = getenv('DB_PORT') ?: '5432';
$db_name = getenv('DB_NAME') ?: 'beanandblisscoffee';
$db_user = getenv('DB_USER') ?: 'postgres';
$db_password = getenv('DB_PASSWORD') ?: '';

// PostgreSQL DSN
$dsn = "pgsql:host=$db_host;port=$db_port;dbname=$db_name";

// Create PDO connection
function getDbConnection() {
    global $dsn, $db_user, $db_password;
    
    try {
        $pdo = new PDO($dsn, $db_user, $db_password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
        return $pdo;
    } catch (PDOException $e) {
        error_log("Database connection failed: " . $e->getMessage());
        return null;
    }
}

// Set CORS headers
function setCorsHeaders() {
    // Get allowed origins from environment or use default
    $allowed_origins = getenv('ALLOWED_ORIGINS') ?: '*';
    
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: $allowed_origins");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');
}

// Handle preflight OPTIONS request
function handleOptions() {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        setCorsHeaders();
        http_response_code(200);
        exit;
    }
}
?>

