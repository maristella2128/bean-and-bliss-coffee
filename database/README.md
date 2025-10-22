# Database Setup Guide

## Database Information
- **Database Name**: `beanandblisscoffee`
- **Character Set**: UTF8MB4
- **Collation**: utf8mb4_general_ci

## Tables Overview

### 1. `contacts` Table
Stores contact form submissions from the website.

**Columns:**
- `id` - Auto-increment primary key
- `name` - Contact person's name
- `email` - Contact email address
- `message` - Message content
- `submitted_at` - Timestamp of submission

### 2. `orders` Table
Stores coffee orders placed through the order form.

**Columns:**
- `id` - Auto-increment primary key
- `name` - Customer name
- `email` - Customer email
- `phone` - Customer phone number
- `pickup_time` - Scheduled pickup time
- `coffee_selection` - Selected coffee type
- `quantity` - Number of items (1-10)
- `size` - Cup size (small/medium/large)
- `milk_option` - Milk preference (whole/skim/almond/oat/soy/none)
- `special_instructions` - Additional notes
- `order_time` - Timestamp of order placement

### 3. `users` Table
Stores registered user accounts with authentication support.

**Columns:**
- `id` - Auto-increment primary key
- `first_name` - User's first name
- `last_name` - User's last name
- `email` - Unique email address
- `password_hash` - Bcrypt hashed password
- `phone` - User's phone number (optional)
- `newsletter` - Newsletter subscription (0/1)
- `status` - Account status (active/inactive/suspended) ✨ NEW
- `email_verified` - Email verification status (0/1) ✨ NEW
- `last_login` - Last successful login timestamp ✨ NEW
- `login_count` - Total number of logins ✨ NEW
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp ✨ NEW

### 4. `user_sessions` Table ✨ NEW
Tracks active user sessions for security and multi-device support.

**Columns:**
- `id` - Auto-increment primary key
- `user_id` - Reference to users table
- `session_token` - Unique session identifier
- `ip_address` - User's IP address
- `user_agent` - Browser/device information
- `login_time` - When session started
- `last_activity` - Last activity timestamp
- `expires_at` - Session expiration time
- `is_active` - Whether session is active (0/1)

### 5. `login_attempts` Table ✨ NEW
Tracks all login attempts for security monitoring.

**Columns:**
- `id` - Auto-increment primary key
- `email` - Email used in login attempt
- `ip_address` - IP address of attempt
- `success` - Success status (0/1)
- `attempt_time` - When attempt occurred

## Setup Methods

### Method 1: Fresh Installation (Recommended for New Projects)

1. Open phpMyAdmin: `http://localhost/phpmyadmin`
2. Click "New" in the left sidebar
3. Database name: `beanandblisscoffee`
4. Collation: `utf8mb4_general_ci`
5. Click "Create"
6. Select the database
7. Click "Import" tab
8. Choose file: `database/beanandblisscoffee.sql`
9. Click "Go"

✅ This includes all 5 tables with authentication support!

### Method 2: Update Existing Database (Keep Your Data)

If you already have the database and want to add authentication:

1. Open phpMyAdmin: `http://localhost/phpmyadmin`
2. Select `beanandblisscoffee` database
3. Click "SQL" tab
4. Copy and paste contents from: `database/update_existing_db.sql`
5. Click "Go"

✅ This adds new tables and columns without losing existing data!

### Method 3: Automatic Setup (Basic Tables Only)
The PHP API files automatically create basic database and tables when first used.

1. Start XAMPP (Apache + MySQL)
2. Run the React app
3. Use any form (Contact, Order, or Registration)
4. The database and tables will be created automatically

⚠️ Note: This won't create the new `user_sessions` and `login_attempts` tables

### Method 3: Command Line Import

```bash
# Navigate to MySQL bin directory or use full path
mysql -u root -p

# In MySQL prompt:
CREATE DATABASE beanandblisscoffee CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE beanandblisscoffee;
SOURCE C:/xampp/htdocs/coffeeshopcelis/database/beanandblisscoffee.sql;
EXIT;
```

Or in one line:
```bash
mysql -u root -p beanandblisscoffee < database/beanandblisscoffee.sql
```

## Database Configuration

The PHP API files use these settings:
```php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "beanandblisscoffee";
```

### To Change Database Credentials:

Edit these files:
- `api/contact.php`
- `api/orderform.php`
- `api/registration.php`

Update the database configuration section in each file.

## Sample Data

The SQL dump includes sample data:

**Contacts**: 3 sample submissions
**Orders**: 2 sample coffee orders
**Users**: 1 sample registered user
- Email: example@gmail.com
- Password: (hashed, original unknown)
- Status: Active
- Email Verified: Yes

**User Sessions**: Empty (will be populated on login)
**Login Attempts**: Empty (will be populated when users login)

## Verify Database Connection

### Using phpMyAdmin:
1. Go to `http://localhost/phpmyadmin`
2. Look for `beanandblisscoffee` in the left sidebar
3. Click on each table to view data

### Using React App:
1. Start the React app: `npm run dev`
2. Try submitting a contact form
3. Check phpMyAdmin to see the new entry

## Backup Database

### Via phpMyAdmin:
1. Select `beanandblisscoffee` database
2. Click "Export" tab
3. Click "Go"
4. Save the .sql file

### Via Command Line:
```bash
mysqldump -u root -p beanandblisscoffee > backup.sql
```

## Restore Database

### Via phpMyAdmin:
1. Drop existing database (if needed)
2. Create new database
3. Import the backup .sql file

### Via Command Line:
```bash
mysql -u root -p beanandblisscoffee < backup.sql
```

## Troubleshooting

### Error: "Database does not exist"
- The API files will create it automatically on first use
- Or manually create it using Method 2 or 3 above

### Error: "Access denied for user 'root'@'localhost'"
- Check if MySQL is running in XAMPP
- Verify username/password in PHP files
- Default XAMPP MySQL has no password

### Error: "Table already exists"
- The database was already created
- Safe to ignore this error
- Or drop the database and recreate it

### Cannot connect to database
1. Verify XAMPP MySQL is running
2. Check if port 3306 is not blocked
3. Test connection in phpMyAdmin
4. Review PHP error logs

## Security Notes

⚠️ **Important**: The default XAMPP configuration has no root password. This is fine for development but **NOT for production**.

For production:
1. Set a strong MySQL root password
2. Update PHP files with new credentials
3. Use environment variables for sensitive data
4. Enable SSL/TLS for database connections
5. Implement proper access controls

## API Endpoints That Use This Database

- **POST** `api/contact.php` → Inserts into `contacts` table
- **POST** `api/orderform.php` → Inserts into `orders` table
- **POST** `api/registration.php` → Inserts into `users` table
- **POST** `api/login.php` → Queries `users`, inserts into `user_sessions` and `login_attempts` ✨ (To be created)
- **POST** `api/logout.php` → Updates `user_sessions` ✨ (To be created)

## Database Files

- `beanandblisscoffee.sql` - Complete database dump with all tables
- `update_existing_db.sql` - Update script for existing databases ✨ NEW
- `DATABASE_UPDATE.md` - Detailed documentation of changes ✨ NEW
- `README.md` - This file

## Next Steps

After setting up the database:
1. ✅ Verify all 5 tables are created
2. ✅ Test each form in the React app
3. ✅ Check that data appears in phpMyAdmin
4. ✅ Review sample data
5. ✅ Test login/registration functionality ✨ NEW
6. ✅ Monitor user sessions ✨ NEW
7. ✅ Set up regular backups

## Additional Documentation

📚 **For detailed authentication setup**: See `DATABASE_UPDATE.md`
- Complete table documentation
- Usage examples
- Security features
- SQL query examples
- Maintenance procedures

---

**Database Version**: 2.0 (Authentication Update)
**Last Updated**: October 22, 2025
**Changes**: Added user sessions, login tracking, enhanced user table

