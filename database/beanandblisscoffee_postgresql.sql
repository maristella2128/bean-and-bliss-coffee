-- PostgreSQL Database Schema for Bean and Bliss Coffee
-- Compatible with PostgreSQL 12+

-- Create database (run separately if needed)
-- CREATE DATABASE beanandblisscoffee;
-- \c beanandblisscoffee;

-- Enable UUID extension (optional, for better session tokens)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------
-- Table structure for table "contacts"
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- Table structure for table "orders"
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    pickup_time TIME NOT NULL,
    coffee_selection VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    size VARCHAR(50) DEFAULT 'medium',
    milk_option VARCHAR(50) DEFAULT 'whole',
    special_instructions TEXT DEFAULT NULL,
    order_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- Table structure for table "users"
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(50) DEFAULT NULL,
    newsletter BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    email_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP NULL DEFAULT NULL,
    login_count INTEGER DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- --------------------------------------------------------
-- Table structure for table "user_sessions"
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS user_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    login_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL DEFAULT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_user_sessions_user_id FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE
);

-- Create trigger to auto-update last_activity timestamp
CREATE TRIGGER update_user_sessions_last_activity BEFORE UPDATE ON user_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- --------------------------------------------------------
-- Table structure for table "login_attempts"
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS login_attempts (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45) DEFAULT NULL,
    success BOOLEAN DEFAULT FALSE,
    attempt_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- Indexes for better performance
-- --------------------------------------------------------

-- Indexes for users table
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_last_login ON users(last_login);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Indexes for user_sessions table
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_is_active ON user_sessions(is_active);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires_at ON user_sessions(expires_at);

-- Indexes for login_attempts table
CREATE INDEX IF NOT EXISTS idx_login_attempts_email ON login_attempts(email);
CREATE INDEX IF NOT EXISTS idx_login_attempts_ip_address ON login_attempts(ip_address);
CREATE INDEX IF NOT EXISTS idx_login_attempts_attempt_time ON login_attempts(attempt_time);

-- --------------------------------------------------------
-- Sample data (optional - comment out if not needed)
-- --------------------------------------------------------

-- Insert sample user
INSERT INTO users (first_name, last_name, email, password_hash, phone, newsletter, status, email_verified, last_login, login_count, created_at)
VALUES (
    'Maristella',
    'celis',
    'example@gmail.com',
    '$2y$10$yEO8MhHvLRXIU0GrKG/0VuqrzmtcKV/EkzF2cJJT3GUXS6vU9MPcW',
    '925631477852',
    TRUE,
    'active',
    TRUE,
    '2025-10-22 10:30:00',
    5,
    '2025-09-03 06:55:25'
) ON CONFLICT (email) DO NOTHING;

-- --------------------------------------------------------
-- Helpful queries for maintenance
-- --------------------------------------------------------

-- Clean up expired sessions (run periodically)
-- DELETE FROM user_sessions WHERE expires_at < CURRENT_TIMESTAMP AND is_active = TRUE;

-- Clean up old login attempts (older than 30 days)
-- DELETE FROM login_attempts WHERE attempt_time < CURRENT_TIMESTAMP - INTERVAL '30 days';

