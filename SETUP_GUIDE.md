# Bean & Bliss Coffee Shop - Setup Guide

## Quick Start Guide

### Step 1: Start XAMPP
1. Open XAMPP Control Panel
2. Start **Apache** service
3. Start **MySQL** service

### Step 2: Setup Database (Optional - Auto-creates on first use)

**Option A: Automatic (Recommended)**
- The database creates itself when you submit any form
- No setup needed!

**Option B: Import SQL File**
1. Open phpMyAdmin: `http://localhost/phpmyadmin`
2. Click "Import" tab
3. Choose: `database/beanandblisscoffee.sql`
4. Click "Go"

See `DATABASE_SETUP.md` for detailed instructions.

### Step 3: Verify Backend API Location
The PHP API files should be in: `C:\xampp\htdocs\coffeeshopcelis\api\`

Files needed:
- `api/contact.php`
- `api/orderform.php`
- `api/registration.php`

### Step 4: Start React Development Server
Open a terminal/command prompt and run:

```bash
cd C:\xampp\htdocs\coffeeshopcelis\Celiscoffeeshop
npm run dev
```

### Step 5: Access the Application
Open your browser and navigate to: **http://localhost:5173**

## Database Information

The database will be created automatically when you first use any form. 

- **Database Name**: `beanandblisscoffee`
- **Tables Created**:
  - `contacts` - Stores contact form submissions
  - `orders` - Stores coffee orders
  - `users` - Stores registered users

### View Database
1. Open browser and go to: **http://localhost/phpmyadmin**
2. Look for database: `beanandblisscoffee`
3. View tables and data

## Testing the Application

### Test Contact Form
1. Click "Contact" in navigation
2. Fill in the form:
   - Name: Your Name
   - Email: test@example.com
   - Message: Test message
3. Click "Send Message"
4. Check phpMyAdmin → `contacts` table

### Test Order Form
1. Click "Order" in navigation
2. Fill in all required fields:
   - Name, Email, Phone
   - Pickup Time
   - Select a Coffee
   - Quantity, Size, Milk preference
3. Click "Place Order"
4. Check phpMyAdmin → `orders` table

### Test Registration
1. Click "Register" in navigation
2. Fill in the form:
   - First Name, Last Name
   - Email (must be unique)
   - Password (min 8 characters)
   - Confirm Password
3. Accept Terms & Conditions
4. Click "Create Account"
5. Check phpMyAdmin → `users` table

## Troubleshooting

### Issue: "Database connection failed"
**Solution**: Make sure MySQL is running in XAMPP

### Issue: "CORS Error" in browser console
**Solution**: The PHP files already have CORS headers. Make sure Apache is running.

### Issue: "404 Not Found" for API calls
**Solution**: 
- Verify API files are in `C:\xampp\htdocs\coffeeshopcelis\api\`
- Check that Apache is running in XAMPP
- Verify the URL in browser: `http://localhost/coffeeshopcelis/api/contact.php`

### Issue: React app won't start
**Solution**: 
```bash
cd Celiscoffeeshop
npm install
npm run dev
```

### Issue: "Module not found" errors
**Solution**: 
```bash
npm install react-router-dom
```

## Production Build

To create a production build:

```bash
cd Celiscoffeeshop
npm run build
```

The built files will be in `Celiscoffeeshop/dist/`

## Features Overview

### ✅ Completed Features
- [x] Responsive homepage with hero section
- [x] Interactive menu display
- [x] Special offers section
- [x] About section with company story
- [x] Customer testimonials
- [x] Photo gallery
- [x] Contact form with database integration
- [x] Online ordering system
- [x] User registration with password hashing
- [x] Loading animations
- [x] Smooth scrolling navigation
- [x] Parallax effects
- [x] Form validation
- [x] Success/Error messages
- [x] Mobile-responsive design

### 🎨 Design Features
- Modern gradient backgrounds
- Smooth hover animations
- Card-based layouts
- Icon integration (Font Awesome)
- Custom fonts (Playfair Display & Inter)
- Loading spinner animation
- Scroll animations

## File Structure Explained

```
coffeeshopcelis/
├── Celiscoffeeshop/          # React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Full page components
│   │   ├── App.tsx          # Main app with routing
│   │   └── main.tsx         # App entry point
│   ├── public/              # Static files
│   └── package.json         # Dependencies
│
└── api/                     # PHP Backend APIs
    ├── contact.php          # Contact form handler
    ├── orderform.php        # Order processing
    └── registration.php     # User registration

```

## Next Steps

1. ✅ Test all forms
2. ✅ Verify database entries
3. ✅ Test responsive design on mobile
4. ✅ Check all navigation links
5. 🔲 Customize content and images
6. 🔲 Add more menu items
7. 🔲 Deploy to production server

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Verify all services are running (Apache, MySQL)
3. Check browser console for errors
4. Check XAMPP error logs

---

**Enjoy your Bean & Bliss Coffee Shop! ☕**

