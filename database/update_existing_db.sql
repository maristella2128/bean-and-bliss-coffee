-- =====================================================
-- Database Update Script
-- Bean & Bliss Coffee Shop - Authentication System
-- =====================================================
-- 
-- This script safely updates your existing database
-- to support the new login/authentication system
-- without losing any existing data.
--
-- HOW TO USE:
-- 1. Open phpMyAdmin (http://localhost/phpmyadmin)
-- 2. Select your 'beanandblisscoffee' database
-- 3. Go to SQL tab
-- 4. Copy and paste this entire script
-- 5. Click "Go"
-- =====================================================

USE beanandblisscoffee;

-- =====================================================
-- 1. UPDATE USERS TABLE
-- =====================================================

-- Add new columns to users table (if they don't exist)
ALTER TABLE `users` 
  ADD COLUMN IF NOT EXISTS `status` enum('active','inactive','suspended') DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS `email_verified` tinyint(1) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `last_login` timestamp NULL DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS `login_count` int(11) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp();

-- Add indexes for better performance (skip if exists)
ALTER TABLE `users`
  ADD KEY IF NOT EXISTS `idx_status` (`status`),
  ADD KEY IF NOT EXISTS `idx_last_login` (`last_login`);

-- Set all existing users to active and verified
UPDATE `users` 
SET `status` = 'active', 
    `email_verified` = 1,
    `login_count` = 0
WHERE `status` IS NULL OR `status` = '';

-- =====================================================
-- 2. CREATE USER_SESSIONS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS `user_sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `session_token` varchar(255) NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `login_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_activity` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `expires_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `session_token` (`session_token`),
  KEY `user_id` (`user_id`),
  KEY `is_active` (`is_active`),
  KEY `expires_at` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Add foreign key constraint (safely)
SET @fk_exists = (
  SELECT COUNT(*) 
  FROM information_schema.TABLE_CONSTRAINTS 
  WHERE CONSTRAINT_SCHEMA = 'beanandblisscoffee'
  AND CONSTRAINT_NAME = 'user_sessions_ibfk_1'
  AND TABLE_NAME = 'user_sessions'
);

SET @sql = IF(@fk_exists = 0,
  'ALTER TABLE `user_sessions` ADD CONSTRAINT `user_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE',
  'SELECT "Foreign key already exists" as message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- =====================================================
-- 3. CREATE LOGIN_ATTEMPTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS `login_attempts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `success` tinyint(1) DEFAULT 0,
  `attempt_time` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `email` (`email`),
  KEY `ip_address` (`ip_address`),
  KEY `attempt_time` (`attempt_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- =====================================================
-- 4. VERIFICATION & SUMMARY
-- =====================================================

-- Show summary of changes
SELECT 'DATABASE UPDATE COMPLETE!' as STATUS;

SELECT 
  'users' as table_name,
  COUNT(*) as total_records
FROM users
UNION ALL
SELECT 
  'user_sessions' as table_name,
  COUNT(*) as total_records
FROM user_sessions
UNION ALL
SELECT 
  'login_attempts' as table_name,
  COUNT(*) as total_records
FROM login_attempts
UNION ALL
SELECT 
  'orders' as table_name,
  COUNT(*) as total_records
FROM orders
UNION ALL
SELECT 
  'contacts' as table_name,
  COUNT(*) as total_records
FROM contacts;

-- Show all tables in database
SHOW TABLES;

-- =====================================================
-- DONE! Your database is now ready for authentication
-- =====================================================

