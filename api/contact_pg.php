<?php
require_once 'config.php';

// Handle preflight
handleOptions();

// Handle form submission and respond with JSON
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    setCorsHeaders();

    // Get database connection
    $pdo = getDbConnection();
    
    if (!$pdo) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Database connection failed']);
        exit;
    }

    // Get form data
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');

    // Validate required fields
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
        exit;
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
        exit;
    }

    try {
        // Prepare and execute
        $stmt = $pdo->prepare("INSERT INTO contacts (name, email, message) VALUES (:name, :email, :message)");
        $stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':message' => $message
        ]);

        echo json_encode(['success' => true, 'message' => 'Thank you for your message! We\'ll get back to you soon.']);
    } catch (PDOException $e) {
        error_log("Error inserting contact: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error sending message. Please try again later.']);
    }
    exit;
}

// Method not allowed
http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
?>

