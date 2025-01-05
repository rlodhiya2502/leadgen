<?php
// submit-lead.php

// Include database configuration
require_once '../src/config/database.php';

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the form data
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $phone = trim($_POST['phone']);

    // Validate the data
    if (empty($name) || empty($email) || empty($phone)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required.']);
        exit;
    }

    // Prepare SQL statement to insert lead into the database
    $stmt = $pdo->prepare("INSERT INTO leads (name, email, phone) VALUES (:name, :email, :phone)");
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':phone', $phone);

    // Execute the statement and check for success
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Lead submitted successfully!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to submit lead.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>