# 🗄️ Database Update - Authentication System

## ✅ Database Updated!

The database has been enhanced to support the complete authentication and login system.

---

## 📊 New Database Structure

### **1. Enhanced `users` Table**

**New Fields Added:**
- `status` - User account status (active, inactive, suspended)
- `email_verified` - Whether email is verified (0 or 1)
- `last_login` - Timestamp of last successful login
- `login_count` - Total number of successful logins
- `updated_at` - Auto-updates on any change

**Complete Structure:**
```sql
CREATE TABLE `users` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `phone` varchar(50),
  `newsletter` tinyint(1) DEFAULT 0,
  `status` enum('active','inactive','suspended') DEFAULT 'active',
  `email_verified` tinyint(1) DEFAULT 0,
  `last_login` timestamp NULL,
  `login_count` int(11) DEFAULT 0,
  `created_at` timestamp DEFAULT current_timestamp(),
  `updated_at` timestamp DEFAULT current_timestamp() ON UPDATE current_timestamp()
);
```

---

### **2. NEW `user_sessions` Table**

Tracks active user sessions for security and management.

**Purpose:**
- Track who is logged in
- Monitor session activity
- Implement session timeout
- Multi-device login tracking

**Structure:**
```sql
CREATE TABLE `user_sessions` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `session_token` varchar(255) UNIQUE NOT NULL,
  `ip_address` varchar(45),
  `user_agent` text,
  `login_time` timestamp DEFAULT current_timestamp(),
  `last_activity` timestamp DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `expires_at` timestamp NULL,
  `is_active` tinyint(1) DEFAULT 1,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
```

**Fields Explained:**
- `session_token` - Unique identifier for each session
- `ip_address` - User's IP address
- `user_agent` - Browser/device information
- `login_time` - When user logged in
- `last_activity` - Last time user was active
- `expires_at` - When session expires
- `is_active` - Whether session is still valid

---

### **3. NEW `login_attempts` Table**

Tracks all login attempts for security monitoring.

**Purpose:**
- Detect brute force attacks
- Monitor failed login attempts
- Implement account lockout
- Security analytics

**Structure:**
```sql
CREATE TABLE `login_attempts` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `ip_address` varchar(45),
  `success` tinyint(1) DEFAULT 0,
  `attempt_time` timestamp DEFAULT current_timestamp()
);
```

**Fields Explained:**
- `email` - Email used in login attempt
- `ip_address` - IP address of attempt
- `success` - 1 if successful, 0 if failed
- `attempt_time` - When attempt occurred

---

## 🚀 How to Update Your Database

### **Option 1: Fresh Install (Recommended)**

1. **Open phpMyAdmin**
   ```
   http://localhost/phpmyadmin
   ```

2. **Drop existing database** (if any):
   ```sql
   DROP DATABASE IF EXISTS beanandblisscoffee;
   ```

3. **Create new database:**
   ```sql
   CREATE DATABASE beanandblisscoffee;
   ```

4. **Import the SQL file:**
   - Select `beanandblisscoffee` database
   - Click "Import" tab
   - Choose file: `database/beanandblisscoffee.sql`
   - Click "Go"

### **Option 2: Update Existing Database**

If you want to keep existing data, run these SQL commands:

```sql
-- Use your database
USE beanandblisscoffee;

-- 1. Add new columns to users table
ALTER TABLE `users` 
  ADD COLUMN `status` enum('active','inactive','suspended') DEFAULT 'active',
  ADD COLUMN `email_verified` tinyint(1) DEFAULT 0,
  ADD COLUMN `last_login` timestamp NULL DEFAULT NULL,
  ADD COLUMN `login_count` int(11) DEFAULT 0,
  ADD COLUMN `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp();

-- 2. Add indexes to users table
ALTER TABLE `users`
  ADD KEY `status` (`status`),
  ADD KEY `last_login` (`last_login`);

-- 3. Create user_sessions table
CREATE TABLE `user_sessions` (
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
  KEY `expires_at` (`expires_at`),
  CONSTRAINT `user_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 4. Create login_attempts table
CREATE TABLE `login_attempts` (
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
```

---

## 📋 Table Summary

| Table | Purpose | Key Features |
|-------|---------|--------------|
| `users` | Store user accounts | Email verification, status tracking, login stats |
| `user_sessions` | Track active sessions | Session tokens, expiration, device tracking |
| `login_attempts` | Security monitoring | Failed logins, brute force detection |
| `orders` | Customer orders | Existing - no changes |
| `contacts` | Contact form submissions | Existing - no changes |

---

## 🔐 Security Features

### **1. Password Storage**
- Passwords stored as `password_hash` using PHP's `password_hash()` function
- Uses bcrypt algorithm (very secure)
- Never store plain text passwords!

### **2. Session Management**
- Each login creates a unique session token
- Sessions can expire after specified time
- Track multiple devices/browsers
- Can invalidate all sessions on logout

### **3. Login Attempt Tracking**
- Monitor failed login attempts
- Detect suspicious activity
- Can implement account lockout after X failed attempts
- Useful for security analytics

### **4. User Status**
- `active` - Normal user, can login
- `inactive` - Account disabled, cannot login
- `suspended` - Temporarily blocked

---

## 💡 Usage Examples

### **Create New User (Registration)**
```sql
INSERT INTO users (first_name, last_name, email, password_hash, phone, newsletter)
VALUES ('John', 'Doe', 'john@example.com', '$2y$10$...hashed...', '555-0123', 1);
```

### **Verify Login**
```sql
SELECT * FROM users 
WHERE email = 'john@example.com' 
AND status = 'active';
-- Then verify password_hash in PHP
```

### **Create Session on Login**
```sql
INSERT INTO user_sessions (user_id, session_token, ip_address, user_agent, expires_at)
VALUES (1, 'unique-token-here', '192.168.1.1', 'Mozilla/5.0...', DATE_ADD(NOW(), INTERVAL 7 DAY));

-- Update user's last login
UPDATE users 
SET last_login = NOW(), login_count = login_count + 1 
WHERE id = 1;
```

### **Track Login Attempt**
```sql
-- Failed login
INSERT INTO login_attempts (email, ip_address, success)
VALUES ('john@example.com', '192.168.1.1', 0);

-- Successful login
INSERT INTO login_attempts (email, ip_address, success)
VALUES ('john@example.com', '192.168.1.1', 1);
```

### **Get Active Sessions**
```sql
SELECT * FROM user_sessions 
WHERE user_id = 1 
AND is_active = 1 
AND (expires_at IS NULL OR expires_at > NOW());
```

### **Check Failed Login Attempts (Last Hour)**
```sql
SELECT COUNT(*) as failed_attempts
FROM login_attempts
WHERE email = 'john@example.com'
AND success = 0
AND attempt_time > DATE_SUB(NOW(), INTERVAL 1 HOUR);
```

### **Invalidate All User Sessions (Logout All Devices)**
```sql
UPDATE user_sessions 
SET is_active = 0 
WHERE user_id = 1;
```

---

## 📊 Useful Queries

### **Get User Statistics**
```sql
SELECT 
  CONCAT(first_name, ' ', last_name) as name,
  email,
  status,
  login_count,
  last_login,
  created_at
FROM users
ORDER BY last_login DESC;
```

### **Active Users Right Now**
```sql
SELECT DISTINCT u.id, u.first_name, u.last_name, u.email
FROM users u
JOIN user_sessions s ON u.id = s.user_id
WHERE s.is_active = 1 
AND s.last_activity > DATE_SUB(NOW(), INTERVAL 15 MINUTE);
```

### **Failed Login Report**
```sql
SELECT 
  email,
  COUNT(*) as attempts,
  MAX(attempt_time) as last_attempt
FROM login_attempts
WHERE success = 0
AND attempt_time > DATE_SUB(NOW(), INTERVAL 24 HOUR)
GROUP BY email
HAVING attempts > 3
ORDER BY attempts DESC;
```

### **User Growth Over Time**
```sql
SELECT 
  DATE(created_at) as date,
  COUNT(*) as new_users
FROM users
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

---

## 🔧 Maintenance Queries

### **Clean Old Sessions (Run Periodically)**
```sql
-- Delete expired sessions older than 30 days
DELETE FROM user_sessions
WHERE is_active = 0
AND login_time < DATE_SUB(NOW(), INTERVAL 30 DAY);
```

### **Clean Old Login Attempts**
```sql
-- Delete login attempts older than 90 days
DELETE FROM login_attempts
WHERE attempt_time < DATE_SUB(NOW(), INTERVAL 90 DAY);
```

### **Find Inactive Users**
```sql
SELECT * FROM users
WHERE status = 'active'
AND (last_login IS NULL OR last_login < DATE_SUB(NOW(), INTERVAL 6 MONTH));
```

---

## 📈 Database Indexes

Indexes added for better performance:

**Users Table:**
- PRIMARY: `id`
- UNIQUE: `email`
- INDEX: `status`, `last_login`

**User Sessions Table:**
- PRIMARY: `id`
- UNIQUE: `session_token`
- INDEX: `user_id`, `is_active`, `expires_at`

**Login Attempts Table:**
- PRIMARY: `id`
- INDEX: `email`, `ip_address`, `attempt_time`

---

## 🎯 Integration with Login System

Your frontend login system (in React) stores data in `localStorage`, but for production, you should:

1. **On Registration:**
   - Insert into `users` table
   - Hash password with `password_hash()`
   - Return success/error to frontend

2. **On Login:**
   - Check credentials against `users` table
   - Insert record into `login_attempts`
   - Create session in `user_sessions`
   - Update `last_login` and `login_count`
   - Return session token to frontend

3. **On Logout:**
   - Set `is_active = 0` in `user_sessions`
   - Clear frontend localStorage

---

## ✅ Testing the Database

Run these commands to test:

```sql
-- 1. Check tables exist
SHOW TABLES;

-- 2. Check users structure
DESCRIBE users;

-- 3. Check sessions structure
DESCRIBE user_sessions;

-- 4. Check login attempts structure
DESCRIBE login_attempts;

-- 5. Test insert user
INSERT INTO users (first_name, last_name, email, password_hash, phone)
VALUES ('Test', 'User', 'test@example.com', '$2y$10$test', '555-0123');

-- 6. View all users
SELECT * FROM users;
```

---

## 🚀 Next Steps

1. ✅ **Database Updated** - New tables created
2. 📝 **Update PHP APIs** - Modify registration.php and create login.php
3. 🔐 **Implement Sessions** - Use session tokens instead of localStorage
4. 📊 **Add Analytics** - Track user behavior
5. 🛡️ **Enhanced Security** - Rate limiting, email verification

---

## 📚 Additional Resources

- **Password Hashing:** https://www.php.net/password_hash
- **Session Security:** https://owasp.org/www-community/attacks/Session_hijacking_attack
- **SQL Injection Prevention:** Always use prepared statements!

---

**Your database is now ready for production-level authentication!** 🎉

All tables optimized with indexes and foreign keys for data integrity.

