CREATE DATABASE driving_school;

USE driving_school;

CREATE TABLE leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    email VARCHAR(100),
    location TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);