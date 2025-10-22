# 🚀 Quick Database Setup

## 5-Minute Setup Guide

### ✨ What's New
Your database now supports:
- ✅ User authentication
- ✅ Session tracking
- ✅ Login history
- ✅ Security monitoring

---

## 📦 Choose Your Setup Method

### 🆕 New Installation (Fresh Start)

**Step 1:** Open phpMyAdmin
```
http://localhost/phpmyadmin
```

**Step 2:** Create Database
- Click "New"
- Name: `beanandblisscoffee`
- Collation: `utf8mb4_general_ci`
- Click "Create"

**Step 3:** Import SQL File
- Click "Import" tab
- Choose: `database/beanandblisscoffee.sql`
- Click "Go"

**Done!** ✅ You have all 5 tables ready!

---

### 🔄 Update Existing Database (Keep Your Data)

**Step 1:** Open phpMyAdmin
```
http://localhost/phpmyadmin
```

**Step 2:** Select Database
- Click on `beanandblisscoffee`

**Step 3:** Run Update Script
- Click "SQL" tab
- Open file: `database/update_existing_db.sql`
- Copy all content
- Paste into SQL box
- Click "Go"

**Done!** ✅ Your database is updated without data loss!

---

## 📊 What You Get

### 5 Tables Total:

1. **`contacts`** - Contact form submissions (existing)
2. **`orders`** - Coffee orders (existing)
3. **`users`** - User accounts (enhanced) ✨
4. **`user_sessions`** - Active sessions (new) ✨
5. **`login_attempts`** - Login tracking (new) ✨

---

## ✅ Verify Installation

**Step 1:** Check Tables Exist
```sql
SHOW TABLES;
```

You should see all 5 tables.

**Step 2:** Check Users Structure
```sql
DESCRIBE users;
```

You should see fields like: `status`, `email_verified`, `last_login`, `login_count`

**Step 3:** Count Records
```sql
SELECT 'users' as table_name, COUNT(*) as records FROM users
UNION ALL
SELECT 'user_sessions', COUNT(*) FROM user_sessions
UNION ALL
SELECT 'login_attempts', COUNT(*) FROM login_attempts;
```

---

## 🎯 Quick Test

**Test Registration:**
1. Go to your React app
2. Click "Login" → "Sign up here"
3. Register a new account
4. Check phpMyAdmin `users` table
5. Your data should appear!

**Test Login:**
1. Login with registered account
2. Check `user_sessions` table
3. Check `login_attempts` table
4. See your session and attempt logged!

---

## 📁 Files Reference

| File | Purpose |
|------|---------|
| `beanandblisscoffee.sql` | Complete database (use for fresh install) |
| `update_existing_db.sql` | Update script (use to update existing DB) |
| `DATABASE_UPDATE.md` | Detailed documentation |
| `README.md` | Full setup guide |
| `QUICK_SETUP.md` | This file (quick reference) |

---

## 🆘 Quick Fixes

### Can't find phpMyAdmin?
```
http://localhost/phpmyadmin
```
Make sure XAMPP MySQL is running!

### Database already exists?
Use the **Update Existing Database** method instead.

### Tables missing after import?
- Check for error messages
- Verify you selected the correct database
- Try fresh installation method

### Need to start over?
```sql
DROP DATABASE beanandblisscoffee;
```
Then follow **New Installation** steps.

---

## 🎉 You're Done!

Your database is ready for:
- ✅ User registration
- ✅ User login
- ✅ Session management
- ✅ Security tracking

**Next:** Test the login system in your React app!

---

## 📚 Need More Help?

- **Detailed docs:** See `DATABASE_UPDATE.md`
- **Full guide:** See `README.md`
- **SQL queries:** See `DATABASE_UPDATE.md` examples

---

**Setup Time:** ~5 minutes ⏱️  
**Difficulty:** Easy 🟢  
**Tables Created:** 5 📊

