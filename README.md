# 🛍️ Cartix - Modern E-Commerce Platform

A full-stack e-commerce web application built with the MERN stack, featuring secure authentication, payment integration, and a comprehensive admin panel.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Security](https://img.shields.io/badge/Security-JWT%20%7C%20bcrypt-red)

## 🎯 Project Overview

Cartix is a production-ready e-commerce platform that demonstrates modern web development practices with a focus on security, user experience, and scalability. Built as a portfolio project showcasing full-stack development skills.

### 🌐 Live Demo

- **Frontend**: [Cartix Store](https://your-frontend-url.vercel.app) *(Update with your URL)*
- **Admin Panel**: [Admin Dashboard](https://cartix-adminn-ebon.vercel.app)
- **Backend API**: Deployed on Railway/Render *(Update with your URL)*

## ✨ Key Features

### Customer Features
- 🔐 **Secure Authentication** - JWT-based login/registration with bcrypt password hashing
- 🛒 **Shopping Cart** - Persistent cart with size selection and quantity management
- 🔍 **Product Search & Filters** - Dynamic filtering by category, type, and search
- 💳 **Multiple Payment Options** - Stripe, Razorpay, and Cash on Delivery
- 📦 **Order Tracking** - Real-time order status with visual indicators
- 👤 **User Profile** - Editable profile with order history and statistics
- 📱 **Responsive Design** - Modern UI with mobile-first approach
- 🎨 **Dynamic Hero Carousel** - Auto-rotating image slideshow

### Admin Features
- 📊 **Dashboard Analytics** - Order management and product inventory
- ➕ **Product Management** - Add/edit/delete products with image upload
- 🖼️ **Multi-Image Upload** - Cloudinary integration for image storage
- 📋 **Order Management** - Update order status and track deliveries
- 🔒 **Admin Authentication** - Role-based access control

### Security Features (OWASP Compliant)
- 🛡️ **JWT Authentication** with 7-day token expiration
- 🔒 **bcrypt Password Hashing** (10 salt rounds)
- 🚦 **Rate Limiting** - Prevents brute force attacks (5 attempts/15min)
- 🧹 **NoSQL Injection Prevention** (express-mongo-sanitize)
- 🪖 **HTTP Security Headers** (Helmet.js)
- ✅ **Strong Password Policy** (8+ chars with complexity)
- 📁 **Secure File Uploads** (MIME validation, 5MB limit)
- 🌐 **CORS Configuration** (whitelist-based)
- 🔍 **Input Validation** (email, password, file types)

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern UI library with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client for API calls
- **Lucide React** - Modern icon library
- **React Toastify** - Toast notifications
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js & Express.js** - RESTful API server
- **MongoDB & Mongoose** - NoSQL database with ODM
- **JWT** - Secure token-based authentication
- **bcrypt** - Password hashing
- **Cloudinary** - Cloud image storage
- **Multer** - File upload middleware
- **Helmet.js** - Security headers
- **express-rate-limit** - DDoS prevention
- **express-mongo-sanitize** - NoSQL injection prevention
- **hpp** - HTTP parameter pollution prevention
- **Stripe & Razorpay** - Payment processing

### DevOps & Tools
- **Git & GitHub** - Version control
- **Vercel** - Frontend & admin deployment
- **Railway/Render** - Backend deployment
- **MongoDB Atlas** - Cloud database
- **ESLint** - Code linting

## 📂 Project Structure

```
Cartix/
├── frontend/              # React customer-facing application
│   ├── src/
│   │   ├── assets/       # Images and static files
│   │   ├── components/   # Reusable UI components
│   │   ├── context/      # React Context (ShopContext)
│   │   ├── pages/        # Route pages
│   │   └── App.jsx       # Main app component
│   └── package.json
│
├── admin/                 # React admin panel
│   ├── src/
│   │   ├── components/   # Admin components
│   │   ├── pages/        # Admin pages (Add, List, Orders)
│   │   └── App.jsx
│   └── package.json
│
├── backend/               # Node.js Express API
│   ├── config/           # Database & Cloudinary config
│   ├── controllers/      # Business logic
│   ├── middleware/       # Auth, rate limiting, file upload
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   └── server.js         # Entry point
│
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)
- Stripe & Razorpay accounts (for payments)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sufiyansayyed19/Cartix.git
cd Cartix
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Install Admin Panel Dependencies**
```bash
cd ../admin
npm install
```

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

# JWT
JWT_SECRET=your_jwt_secret_key

# Admin
ADMIN_EMAIL=admin@cartix.com
ADMIN_PASSWORD=your_admin_password

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Rate Limiting (optional)
AUTH_RATE_LIMIT_WINDOW=900000
AUTH_RATE_LIMIT_MAX=5
API_RATE_LIMIT_WINDOW=900000
API_RATE_LIMIT_MAX=100

# File Upload (optional)
MAX_FILE_SIZE=5242880
MAX_FILES_COUNT=5
```

Create a `.env` file in the `frontend` directory:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Create a `.env` file in the `admin` directory:

```env
VITE_BACKEND_URL=http://localhost:4000
```

### Running the Application

1. **Start Backend Server**
```bash
cd backend
npm run server
# Server runs on http://localhost:4000
```

2. **Start Frontend**
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

3. **Start Admin Panel**
```bash
cd admin
npm run dev
# Admin panel runs on http://localhost:5174
```

## 📡 API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/admin` - Admin login

### User
- `GET /api/user/profile` - Get user profile (protected)
- `POST /api/user/profile/update` - Update user profile (protected)

### Products
- `GET /api/product/list` - Get all products
- `POST /api/product/add` - Add product (admin)
- `POST /api/product/remove` - Remove product (admin)
- `POST /api/product/single` - Get single product

### Cart
- `POST /api/cart/add` - Add to cart (protected)
- `POST /api/cart/update` - Update cart (protected)
- `POST /api/cart/get` - Get user cart (protected)

### Orders
- `POST /api/order/place` - Place order - COD (protected)
- `POST /api/order/stripe` - Place order - Stripe (protected)
- `POST /api/order/razorpay` - Place order - Razorpay (protected)
- `POST /api/order/userorders` - Get user orders (protected)
- `POST /api/order/list` - List all orders (admin)
- `POST /api/order/status` - Update order status (admin)

## 🎨 Screenshots

*(Add screenshots of your application here)*

## 📝 For Resume/Portfolio

### Project Highlights

**Cartix - Secure Full-Stack E-Commerce Platform**  
*React • Node.js • Express • MongoDB • JWT • bcrypt • Stripe • Cloudinary*

- Architected secure authentication system using JWT tokens with 7-day expiration and bcrypt password hashing (10 salt rounds)
- Implemented rate limiting middleware preventing brute force attacks, restricting login attempts to 5 per 15 minutes
- Applied OWASP Top 10 security practices including NoSQL injection prevention, XSS protection, and input validation
- Developed secure file upload system with MIME type validation and 5MB size limits
- Configured role-based access control (RBAC) protecting 15+ API endpoints
- Integrated Stripe and Razorpay payment gateways with webhook handling
- Built responsive UI with Tailwind CSS supporting mobile, tablet, and desktop views
- Deployed full-stack application using Vercel (frontend) and Railway (backend)

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Sufiyan Sayyed**
- GitHub: [@sufiyansayyed19](https://github.com/sufiyansayyed19)
- LinkedIn: [Your LinkedIn](https://www.linkedin.com/in/sufiyan-sayyed-a88024186/) *(Update with your URL)*

## 📚 Additional Documentation

- [Security Implementation Guide](SECURITY.md)
- [Security Resume Guide](SECURITY_RESUME_GUIDE.md)
- [Security Testing Guide](SECURITY_TESTING.md)
- [Security Checklist](SECURITY_CHECKLIST.md)

---

⭐ **Star this repo if you find it helpful!**
