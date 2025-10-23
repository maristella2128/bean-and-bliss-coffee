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
    $first_name = trim($_POST['reg-first-name'] ?? '');
    $last_name = trim($_POST['reg-last-name'] ?? '');
    $email = trim($_POST['reg-email'] ?? '');
    $password = $_POST['reg-password'] ?? '';
    $confirm_password = $_POST['reg-confirm-password'] ?? '';
    $phone = trim($_POST['reg-phone'] ?? '');
    $newsletter = isset($_POST['newsletter']) ? true : false;
    $terms = isset($_POST['terms']) ? 1 : 0;

    // Validate required fields
    if (empty($first_name) || empty($last_name) || empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
        exit;
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
        exit;
    }

    // Check if passwords match
    if ($password !== $confirm_password) {
        echo json_encode(['success' => false, 'message' => 'Passwords do not match.']);
        exit;
    }

    // Check password length
    if (strlen($password) < 8) {
        echo json_encode(['success' => false, 'message' => 'Password must be at least 8 characters long.']);
        exit;
    }

    // Check if terms are accepted
    if (!$terms) {
        echo json_encode(['success' => false, 'message' => 'You must accept the Terms of Service and Privacy Policy.']);
        exit;
    }

    try {
        // Check if email already exists
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = :email");
        $stmt->execute([':email' => $email]);

        if ($stmt->fetch()) {
            echo json_encode(['success' => false, 'message' => 'An account with this email already exists.']);
            exit;
        }

        // Hash the password
        $password_hash = password_hash($password, PASSWORD_DEFAULT);

        // Insert user
        $stmt = $pdo->prepare("
            INSERT INTO users (first_name, last_name, email, password_hash, phone, newsletter) 
            VALUES (:first_name, :last_name, :email, :password_hash, :phone, :newsletter)
        ");
        
        $stmt->execute([
            ':first_name' => $first_name,
            ':last_name' => $last_name,
            ':email' => $email,
            ':password_hash' => $password_hash,
            ':phone' => $phone,
            ':newsletter' => $newsletter
        ]);

        echo json_encode(['success' => true, 'message' => 'Registration successful! Welcome to Bean & Bliss Coffee!']);
    } catch (PDOException $e) {
        error_log("Error creating user: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error creating account. Please try again later.']);
    }
    exit;
}

// Method not allowed
http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed']);
?>

