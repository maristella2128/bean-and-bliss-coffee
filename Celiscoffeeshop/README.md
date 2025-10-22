# Bean & Bliss Coffee - React Application

A modern, fully responsive coffee shop website built with React, TypeScript, and Vite.

## Features

- 🏠 Beautiful landing page with hero section
- ☕ Interactive menu showcase
- 📱 Fully responsive design
- 🛒 Online ordering system
- 📧 Contact form
- 👤 User registration
- 🎨 Modern UI with smooth animations
- 🔄 Client-side routing with React Router

## Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: CSS3 with custom properties
- **Icons**: Font Awesome 6.5.0
- **Fonts**: Google Fonts (Playfair Display & Inter)

## Backend API

The application uses PHP backend APIs for:
- Contact form submissions (`api/contact.php`)
- Order processing (`api/orderform.php`)
- User registration (`api/registration.php`)

### Database Setup

The PHP APIs automatically create the necessary database and tables on first use. Make sure you have:
- XAMPP or similar local server running
- MySQL server active
- Database name: `beanandblisscoffee`

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- XAMPP (for PHP backend)

### Frontend Setup

1. Navigate to the project directory:
   ```bash
   cd Celiscoffeeshop
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit: `http://localhost:5173`

### Backend Setup

1. Ensure XAMPP is running with Apache and MySQL services active

2. The API files are located in the `api/` folder in the parent directory

3. Make sure the APIs are accessible at: `http://localhost/coffeeshopcelis/api/`

4. The database will be created automatically on first API call

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
Celiscoffeeshop/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Menu.tsx
│   │   ├── Offers.tsx
│   │   ├── About.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Gallery.tsx
│   │   ├── Footer.tsx
│   │   └── Loading.tsx
│   ├── pages/           # Page components
│   │   ├── Home.tsx
│   │   ├── Contact.tsx
│   │   ├── OrderForm.tsx
│   │   └── Registration.tsx
│   ├── App.tsx          # Main app component with routing
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── api/                 # PHP backend APIs
│   ├── contact.php
│   ├── orderform.php
│   └── registration.php
└── public/             # Static assets
```

## Pages

- **Home** (`/`) - Landing page with menu, offers, about, testimonials, and gallery
- **Contact** (`/contact`) - Contact form to get in touch
- **Order** (`/order`) - Coffee ordering form
- **Register** (`/register`) - User registration page

## Features Detail

### Menu Section
- Display of signature coffee drinks
- Beautiful card-based layout
- Hover effects and animations
- Price display

### Ordering System
- Complete order form
- Coffee selection dropdown
- Quantity and size options
- Milk preference selection
- Special instructions field
- Form validation
- Database integration

### Contact Form
- Name, email, and message fields
- Form validation
- Success/error messages
- Database storage

### Registration
- User account creation
- Password validation
- Email uniqueness check
- Terms & conditions acceptance
- Newsletter subscription option
- Secure password hashing

### Responsive Design
- Mobile-first approach
- Breakpoints for tablets and desktops
- Optimized for all screen sizes

## Styling

The application uses:
- CSS custom properties (CSS variables) for theming
- Modular CSS files for each component
- Google Fonts for typography
- Font Awesome for icons
- Smooth animations and transitions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## API Endpoints

All APIs use CORS headers to allow cross-origin requests.

### Contact API
- **URL**: `http://localhost/coffeeshopcelis/api/contact.php`
- **Method**: POST
- **Fields**: name, email, message

### Order API
- **URL**: `http://localhost/coffeeshopcelis/api/orderform.php`
- **Method**: POST
- **Fields**: order-name, order-email, order-phone, order-time, coffee-selection, quantity, size, milk-option, special-instructions

### Registration API
- **URL**: `http://localhost/coffeeshopcelis/api/registration.php`
- **Method**: POST
- **Fields**: reg-first-name, reg-last-name, reg-email, reg-password, reg-confirm-password, reg-phone, newsletter, terms

## Contributing

Feel free to submit issues and enhancement requests!

## License

© 2025 Bean & Bliss Coffee. All rights reserved.
