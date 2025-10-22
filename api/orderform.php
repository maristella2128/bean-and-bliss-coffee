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

    // Create orders table if it doesn't exist
    $createTable = "CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        pickup_time TIME NOT NULL,
        coffee_selection VARCHAR(100) NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        size VARCHAR(50) DEFAULT 'medium',
        milk_option VARCHAR(50) DEFAULT 'whole',
        special_instructions TEXT,
        order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";

    if ($conn->query($createTable) === FALSE) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error creating table: ' . $conn->error]);
        $conn->close();
        exit;
    }

    // Get form data
    $name = trim($_POST['order-name'] ?? '');
    $email = trim($_POST['order-email'] ?? '');
    $phone = trim($_POST['order-phone'] ?? '');
    $pickup_time = $_POST['order-time'] ?? '';
    $coffee_selection = $_POST['coffee-selection'] ?? '';
    $quantity = (int)($_POST['quantity'] ?? 1);
    $size = $_POST['size'] ?? 'medium';
    $milk_option = $_POST['milk-option'] ?? 'whole';
    $special_instructions = trim($_POST['special-instructions'] ?? '');

    // Validate required fields
    if (empty($name) || empty($email) || empty($phone) || empty($pickup_time) || empty($coffee_selection)) {
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

    // Insert order
    $stmt = $conn->prepare("INSERT INTO orders (name, email, phone, pickup_time, coffee_selection, quantity, size, milk_option, special_instructions) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssisss", $name, $email, $phone, $pickup_time, $coffee_selection, $quantity, $size, $milk_option, $special_instructions);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Order placed successfully!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error placing order: ' . $stmt->error]);
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

