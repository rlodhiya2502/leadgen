<?php
// backend.php
header('Content-Type: application/json');

// Database connection
$host = 'localhost';
$db = 'driving_school';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed.']);
    exit;
}

// Capture form data
$name = $_POST['name'] ?? '';
$mobile = $_POST['mobile'] ?? '';
$email = $_POST['email'] ?? '';
$location = $_POST['location'] ?? '';

if (empty($name) || empty($mobile)) {
    echo json_encode(['success' => false, 'message' => 'Name and mobile are required.']);
    exit;
}

// Insert into database
$stmt = $pdo->prepare("INSERT INTO leads (name, mobile, email, location) VALUES (?, ?, ?, ?)");
$result = $stmt->execute([$name, $mobile, $email, $location]);

if ($result) {
    echo json_encode(['success' => true, 'message' => 'Lead captured successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to capture lead.']);
}
