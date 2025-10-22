<?php
// Handle AJAX POST requests only
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');

    // Database configuration
    $servername = 'localhost';
    $username = 'root'; // Default XAMPP username
    $password = '';     // Default XAMPP password (empty)
    $dbname = 'beanandblisscoffee';

    // Connect to MySQL server (without selecting DB first)
    $conn = new mysqli($servername, $username, $password);

    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Database server connection failed: ' . $conn->connect_error]);
        exit;
    }

    // Ensure database exists
    if ($conn->query("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci") === FALSE) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to ensure database: ' . $conn->error]);
        $conn->close();
        exit;
    }

    // Select the database
    if (!$conn->select_db($dbname)) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to select database: ' . $conn->error]);
        $conn->close();
        exit;
    }

    // Create users table if it doesn't exist
    $createTable = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        newsletter TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";

    if ($conn->query($createTable) === FALSE) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error creating users table: ' . $conn->error]);
        $conn->close();
        exit;
    }

    // Get form data
    $first_name = trim($_POST['reg-first-name'] ?? '');
    $last_name = trim($_POST['reg-last-name'] ?? '');
    $email = trim($_POST['reg-email'] ?? '');
    $password = $_POST['reg-password'] ?? '';
    $confirm_password = $_POST['reg-confirm-password'] ?? '';
    $phone = trim($_POST['reg-phone'] ?? '');
    $newsletter = isset($_POST['newsletter']) ? 1 : 0;
    $terms = isset($_POST['terms']) ? 1 : 0;

    // Validate required fields
    if (empty($first_name) || empty($last_name) || empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
        $conn->close();
        exit;
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
        $conn->close();
        exit;
    }

    // Check if passwords match
    if ($password !== $confirm_password) {
        echo json_encode(['success' => false, 'message' => 'Passwords do not match.']);
        $conn->close();
        exit;
    }

    // Check password length
    if (strlen($password) < 8) {
        echo json_encode(['success' => false, 'message' => 'Password must be at least 8 characters long.']);
        $conn->close();
        exit;
    }

    // Check if terms are accepted
    if (!$terms) {
        echo json_encode(['success' => false, 'message' => 'You must accept the Terms of Service and Privacy Policy.']);
        $conn->close();
        exit;
    }

    // Check if email already exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'An account with this email already exists.']);
        $stmt->close();
        $conn->close();
        exit;
    }
    $stmt->close();

    // Hash the password
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    // Prepare and bind for insertion
    $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, password_hash, phone, newsletter) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssi", $first_name, $last_name, $email, $password_hash, $phone, $newsletter);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Registration successful! Welcome to Bean & Bliss Coffee!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error creating account: ' . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
    exit;
}

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
}
?>

