<?php
require_once 'config.php';

// Handle preflight
handleOptions();

// Handle AJAX POST requests only
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
        exit;
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
        exit;
    }

    try {
        // Prepare and execute
        $stmt = $pdo->prepare("
            INSERT INTO orders (name, email, phone, pickup_time, coffee_selection, quantity, size, milk_option, special_instructions) 
            VALUES (:name, :email, :phone, :pickup_time, :coffee_selection, :quantity, :size, :milk_option, :special_instructions)
        ");
        
        $stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':phone' => $phone,
            ':pickup_time' => $pickup_time,
            ':coffee_selection' => $coffee_selection,
            ':quantity' => $quantity,
            ':size' => $size,
            ':milk_option' => $milk_option,
            ':special_instructions' => $special_instructions
        ]);

        echo json_encode(['success' => true, 'message' => 'Order placed successfully!']);
    } catch (PDOException $e) {
        error_log("Error inserting order: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error placing order. Please try again later.']);
    }
    exit;
}

// Method not allowed
http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
?>

