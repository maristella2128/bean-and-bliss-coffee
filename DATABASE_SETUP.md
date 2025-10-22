# Bean & Bliss Coffee - Database Setup

## Quick Setup (Choose One Method)

### 🚀 Method 1: Automatic (Easiest)
**The database creates itself automatically!**

1. Start XAMPP (Apache + MySQL)
2. Run your React app: `cd Celiscoffeeshop && npm run dev`
3. Submit any form (Contact, Order, or Register)
4. ✅ Done! The database and tables are created automatically

### 📂 Method 2: Import SQL File

1. Open phpMyAdmin: `http://localhost/phpmyadmin`
2. Click "Import" in the top menu
3. Choose file: `database/beanandblisscoffee.sql`
4. Click "Go"
5. ✅ Database imported with sample data!

### 💻 Method 3: MySQL Command Line

```bash
mysql -u root -p
```

Then in MySQL:
```sql
CREATE DATABASE beanandblisscoffee;
USE beanandblisscoffee;
SOURCE C:/xampp/htdocs/coffeeshopcelis/database/beanandblisscoffee.sql;
```

## Database Details

**Name:** `beanandblisscoffee`

**Tables:**
- `contacts` - Contact form submissions
- `orders` - Coffee orders
- `users` - Registered users

**Sample Data Included:**
- 3 contact messages
- 2 coffee orders
- 1 registered user

## Verify Setup

1. Open phpMyAdmin: `http://localhost/phpmyadmin`
2. Look for `beanandblisscoffee` in the left sidebar
3. Click on it to see the 3 tables
4. Click on each table to view sample data

## Connection Settings

The application uses these default XAMPP settings:
- **Host:** localhost
- **Username:** root
- **Password:** (empty)
- **Database:** beanandblisscoffee

## Test the Connection

1. Start React app: `cd Celiscoffeeshop && npm run dev`
2. Go to: `http://localhost:5173/contact`
3. Fill and submit the contact form
4. Check phpMyAdmin → `contacts` table for the new entry

## Need Help?

**Database not found?**
- Just use the app - it creates the database automatically!

**MySQL not running?**
- Open XAMPP Control Panel
- Click "Start" next to MySQL

**Can't access phpMyAdmin?**
- Make sure Apache is running in XAMPP
- Visit: `http://localhost/phpmyadmin`

## File Locations

- SQL Dump: `database/beanandblisscoffee.sql`
- API Files: `api/contact.php`, `api/orderform.php`, `api/registration.php`
- Database Guide: `database/README.md`

---

✅ **That's it!** The database is ready to use with your Bean & Bliss Coffee app!

