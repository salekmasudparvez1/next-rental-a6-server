# 🏠 Rental Management Platform - Backend API

A comprehensive TypeScript/Node.js backend system for a rental management platform featuring role-based access control, property management, tenant applications, and integrated payment processing via Stripe.

## 👨‍💻 Author

**Salek Masud Parvez**  
📧 Email: [salekmasudparvez@gmail.com](mailto:salekmasudparvez@gmail.com)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Database Models](#database-models)
- [Authentication & Authorization](#authentication--authorization)
- [Payment Integration](#payment-integration)
- [Error Handling](#error-handling)
- [Deployment](#deployment)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

This backend API powers a full-featured rental management platform that connects landlords with tenants. The system provides a secure, scalable solution for property listings, tenant applications, user management, and payment processing.

### Core Capabilities:
- **Multi-role System**: Admin, Landlord, and Tenant roles with specific permissions
- **Property Management**: Complete CRUD operations for rental properties
- **Application System**: Tenants can apply to properties, landlords can approve/reject
- **Payment Processing**: Integrated Stripe payment gateway for rent payments
- **Image Management**: Cloudinary integration for property images
- **Email Notifications**: Automated email system using Nodemailer
- **Security**: JWT-based authentication with bcrypt password hashing

---

## ✨ Key Features

### 🔐 Authentication & User Management
- User registration and login with email/password
- JWT token-based authentication
- Password encryption using bcrypt
- Profile management and updates
- Role-based access control (RBAC)
- User status management (active/blocked)

### 🏘️ Property Management
- Create, read, update, and delete rental properties
- Upload multiple property images (up to 4)
- Property search and filtering
- Location-based property listings
- Rent amount management
- Property status tracking

### 📝 Tenant Application System
- Submit rental applications
- Track application status (pending/approved/rejected)
- Landlord dashboard for managing applications
- Application history and tracking

### 💳 Payment Processing
- Stripe checkout integration
- Secure payment intent creation
- Webhook handling for payment confirmations
- Transaction history and tracking
- Payment status management
- Tenant payment records

### 👨‍💼 Admin Features
- User management and moderation
- System-wide oversight
- User status updates
- Platform analytics access

---

## 🛠️ Technology Stack

### Backend Framework & Runtime
- **Node.js** - JavaScript runtime environment
- **TypeScript** - Type-safe JavaScript superset
- **Express.js** - Fast, minimalist web framework

### Database & ODM
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Authentication & Security
- **JWT (jsonwebtoken)** - Secure token-based authentication
- **bcrypt** - Password hashing
- **cookie-parser** - HTTP cookie parsing

### File & Image Management
- **Multer** - Multipart/form-data file uploads
- **Cloudinary** - Cloud-based image storage and optimization

### Payment Processing
- **Stripe** - Payment gateway integration

### Validation & Error Handling
- **Zod** - TypeScript-first schema validation
- **http-status** - HTTP status codes utility

### Communication
- **Nodemailer** - Email sending functionality

### Development Tools
- **ts-node** - TypeScript execution for Node.js
- **nodemon** - Auto-restart development server
- **CORS** - Cross-Origin Resource Sharing

---

## 🏗️ Project Architecture

```
backend/
├── src/
│   ├── server.ts                    # Application entry point
│   ├── app.ts                       # Express app configuration
│   ├── global.d.ts                  # Global type definitions
│   └── app/
│       ├── config/
│       │   ├── index.ts             # Configuration exports
│       │   └── cloudinary.ts        # Cloudinary setup
│       │
│       ├── errors/
│       │   ├── AppError.ts          # Custom error class
│       │   ├── handleCastError.ts   # MongoDB cast error handler
│       │   ├── handleDuplicateError.ts
│       │   ├── handleValidationError.ts
│       │   └── handleZodError.ts    # Zod validation error handler
│       │
│       ├── interface/
│       │   ├── error.ts             # Error interfaces
│       │   └── index.d.ts           # Type definitions
│       │
│       ├── middlewares/
│       │   ├── globalErrorhandler.ts    # Centralized error handling
│       │   ├── notFound.ts              # 404 handler
│       │   ├── validateRequest.ts       # Zod validation middleware
│       │   ├── verifyAdmin.ts           # Admin authorization
│       │   ├── verifyLandLoard.ts       # Landlord authorization
│       │   ├── verifyLogin.ts           # Login verification
│       │   ├── verifyTenant copy.ts     # Tenant authorization
│       │   └── verifyUser.ts            # User authentication
│       │
│       ├── modules/
│       │   ├── auth/                    # Authentication module
│       │   │   ├── auth.controller.ts
│       │   │   ├── auth.interface.ts
│       │   │   ├── auth.model.ts
│       │   │   ├── auth.routes.ts
│       │   │   ├── auth.service.ts
│       │   │   ├── auth.utils.ts
│       │   │   └── auth.validations.ts
│       │   │
│       │   ├── admin/                   # Admin module
│       │   │   ├── admin.controller.ts
│       │   │   ├── admin.interface.ts
│       │   │   ├── admin.model.ts
│       │   │   ├── admin.routes.ts
│       │   │   ├── admin.service.ts
│       │   │   └── admin.validations.ts
│       │   │
│       │   ├── landloard/               # Landlord module
│       │   │   ├── landloard.controller.ts
│       │   │   ├── landloard.interface.ts
│       │   │   ├── landloard.model.ts
│       │   │   ├── landloard.routes.ts
│       │   │   ├── landloard.service.ts
│       │   │   ├── landloard.utils.ts
│       │   │   └── landloard.validations.ts
│       │   │
│       │   ├── tenent/                  # Tenant module
│       │   │   ├── tenent.controller.ts
│       │   │   ├── tenent.interface.ts
│       │   │   ├── tenent.model.ts
│       │   │   ├── tenent.routes.ts
│       │   │   ├── tenent.service.ts
│       │   │   └── tenent.validations.ts
│       │   │
│       │   └── pay/                     # Payment module
│       │       ├── pay.controller.ts
│       │       ├── pay.interface.ts
│       │       ├── pay.model.ts
│       │       ├── pay.routes.ts
│       │       ├── pay.service.ts
│       │       └── pay.utils.ts
│       │
│       └── utils/
│           ├── catchAsync.ts            # Async error wrapper
│           ├── multer.ts                # File upload configuration
│           ├── sendEmail.ts             # Email utility
│           ├── sendResponse.ts          # Standardized response
│           └── uploadImages.ts          # Cloudinary upload utility
│
├── uploads/                             # Temporary file storage
├── package.json                         # Project dependencies
├── tsconfig.json                        # TypeScript configuration
├── vercel.json                          # Vercel deployment config
└── readme.md                            # Project documentation
```

### Design Patterns & Principles
- **MVC Architecture**: Model-View-Controller pattern for separation of concerns
- **Modular Structure**: Feature-based module organization
- **Middleware Pipeline**: Express middleware for cross-cutting concerns
- **Service Layer**: Business logic separation from controllers
- **Error Handling**: Centralized error handling with custom error classes
- **Validation Layer**: Input validation using Zod schemas

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **bun** package manager
- **MongoDB** instance (local or cloud)
- **Cloudinary** account
- **Stripe** account

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install

   # Or using bun
   bun install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory
   - Add required environment variables (see next section)

4. **Run the development server**
   ```bash
   # Using npm
   npm run dev

   # Or using bun
   bun run dev
   ```

5. **Access the API**
   - Server runs on: `http://localhost:5000` (or configured PORT)
   - Test endpoint: `GET http://localhost:5000/`

---

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL=mongodb://localhost:27017/rental-management
DATABASE_NAME=rental-management

# Authentication
BCRYPT_SALT_ROUNDS=10
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email Configuration (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Frontend URLs (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Configuration Notes:
- **DATABASE_URL**: MongoDB connection string (local or MongoDB Atlas)
- **JWT_SECRET**: Use a strong, random string for production
- **CLOUDINARY**: Obtain credentials from [cloudinary.com](https://cloudinary.com)
- **STRIPE**: Get keys from [stripe.com](https://stripe.com) dashboard
- **EMAIL**: Configure SMTP settings for email notifications

---

## 📚 API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

### API Endpoints

#### 🔐 Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register new user | No |
| POST | `/login` | User login | No |
| GET | `/profile` | Get user profile | Yes |
| GET | `/getSingle/:email` | Get user by email | No |
| PATCH | `/update-user/:id` | Update user (Admin) | Admin |
| PATCH | `/update` | Update user status | Admin |
| PATCH | `/update/user` | Update user name | Yes |
| PATCH | `/update/password` | Update password | Yes |

**Signup Request:**
```json
POST /api/auth/signup
{
  "username": "john_doe",
  "email": "john@example.com",
  "phoneNumber": "+1234567890",
  "password": "securePassword123",
  "role": "tenant",
  "photoURL": "https://example.com/photo.jpg"
}
```

**Login Request:**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Login Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "user_id",
      "username": "john_doe",
      "email": "john@example.com",
      "role": "tenant"
    },
    "token": "jwt_token_here"
  }
}
```

---

#### 🏘️ Landlord (`/api/landlords`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/properties` | Create property | Landlord |
| GET | `/properties` | Get all properties | Landlord |
| GET | `/properties/:id` | Get property by ID | Landlord |
| PATCH | `/properties/:id` | Update property | Landlord |
| DELETE | `/properties/:id` | Delete property | Landlord |
| GET | `/requests` | Get tenant requests | Landlord |
| PATCH | `/requests/:id` | Update request status | Landlord |

**Create Property Request:**
```json
POST /api/landlords/properties
Content-Type: multipart/form-data

{
  "location": "123 Main St, New York, NY",
  "description": "Spacious 2-bedroom apartment",
  "rentAmount": 1500,
  "bedrooms": 2,
  "bathrooms": 1,
  "images": [file1, file2, file3, file4]
}
```

---

#### 👤 Tenant (`/api/tenants`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/requests` | Submit rental application | Tenant |
| GET | `/requests` | Get tenant's applications | Tenant |
| GET | `/requests/:id` | Get application by ID | Tenant |

**Submit Application:**
```json
POST /api/tenants/requests
{
  "rentalHouseId": "property_id",
  "message": "I'm interested in renting this property"
}
```

---

#### 👨‍💼 Admin (`/api/admin`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | Get all users | Admin |
| PATCH | `/users/:id/status` | Update user status | Admin |
| DELETE | `/users/:id` | Delete user | Admin |
| GET | `/statistics` | Get platform statistics | Admin |

---

#### 💳 Payment (`/api/pay`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/create-checkout-session` | Create Stripe checkout | User |
| POST | `/webhook` | Stripe webhook handler | No |
| GET | `/transactions` | Get all transactions | User |
| GET | `/transactions/:id` | Get tenant transactions | User |
| GET | `/transactions/status` | Get by payment status | Tenant |
| GET | `/transaction/paymentIntentId/:id` | Get by payment intent | User |

**Create Checkout Session:**
```json
POST /api/pay/create-checkout-session
{
  "amount": 1500,
  "rentalHouseId": "property_id",
  "landlordId": "landlord_id"
}
```

---

## 💾 Database Models

### User Model (`users` collection)
```typescript
{
  username: string;
  email: string;          // unique
  phoneNumber: string;
  password: string;       // hashed
  role: 'admin' | 'landlord' | 'tenant';
  photoURL?: string;
  status: 'active' | 'blocked';
  createdAt: Date;
  updatedAt: Date;
}
```

### Rental House Model (`rentalHouses` collection)
```typescript
{
  location: string;
  description: string;
  rentAmount: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];       // Cloudinary URLs (max 4)
  landlordId: ObjectId;   // ref: User
  status: 'available' | 'rented';
  createdAt: Date;
  updatedAt: Date;
}
```

### Tenant Request Model (`tenantRequests` collection)
```typescript
{
  tenantId: ObjectId;     // ref: User
  rentalHouseId: ObjectId; // ref: RentalHouse
  landlordId: ObjectId;   // ref: User
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}
```

### Transaction Model (`transactions` collection)
```typescript
{
  tenantId: ObjectId;     // ref: User
  landlordId: ObjectId;   // ref: User
  rentalHouseId: ObjectId; // ref: RentalHouse
  amount: number;
  paymentIntentId: string; // Stripe payment intent ID
  status: 'pending' | 'completed' | 'failed';
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Model Relationships
- Each **Rental House** belongs to one **Landlord** (User)
- Each **Tenant Request** connects a **Tenant**, **Rental House**, and **Landlord**
- Each **Transaction** involves a **Tenant**, **Landlord**, and **Rental House**
- Mongoose `populate()` is used for relation resolution

---

## 🔒 Authentication & Authorization

### Authentication Flow
1. **Registration**: User signs up with email, password, and role
2. **Password Hashing**: Password is hashed using bcrypt with salt rounds
3. **Login**: User provides email and password
4. **Token Generation**: JWT token generated with user ID and role
5. **Token Storage**: Token sent in response and stored in cookies
6. **Protected Routes**: Token verified on each protected route request

### Authorization Middleware

#### `verifyUser`
- Verifies JWT token from cookies or headers
- Attaches user info to request object
- Used for all authenticated routes

#### `verifyAdmin`
- Extends `verifyUser`
- Checks if user role is 'admin'
- Used for admin-only routes

#### `verifyLandlord`
- Extends `verifyUser`
- Checks if user role is 'landlord'
- Used for landlord-specific routes

#### `verifyTenant`
- Extends `verifyUser`
- Checks if user role is 'tenant'
- Used for tenant-specific routes

### JWT Token Structure
```json
{
  "userId": "user_id",
  "email": "user@example.com",
  "role": "landlord",
  "iat": 1234567890,
  "exp": 1234567890
}
```

---

## 💳 Payment Integration

### Stripe Integration
The platform uses **Stripe** for secure payment processing.

#### Payment Flow
1. **Create Checkout Session**: Frontend requests payment intent
2. **Stripe Checkout**: User redirected to Stripe checkout page
3. **Payment Processing**: User completes payment on Stripe
4. **Webhook Notification**: Stripe sends webhook to backend
5. **Transaction Recording**: Backend saves transaction to database
6. **Confirmation**: Payment status updated

#### Webhook Handling
```typescript
POST /api/pay/webhook
Content-Type: application/json
Stripe-Signature: webhook_signature

// Stripe sends payment events
// Backend verifies signature and processes event
// Transactions are created/updated based on event type
```

#### Security Features
- Webhook signature verification
- Raw body parsing for signature validation
- Idempotency key handling
- Payment intent tracking

---

## 🛡️ Error Handling

### Centralized Error Handler
All errors are handled by `globalErrorHandler` middleware.

### Error Types
1. **AppError**: Custom application errors
2. **ValidationError**: Mongoose validation errors
3. **CastError**: MongoDB cast errors (invalid ObjectId)
4. **DuplicateError**: Unique constraint violations
5. **ZodError**: Zod schema validation errors

### Error Response Format
```json
{
  "success": false,
  "message": "Error message",
  "errorMessages": [
    {
      "path": "field_name",
      "message": "Specific error message"
    }
  ],
  "stack": "Error stack (development only)"
}
```

### HTTP Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict (duplicate)
- `500` - Internal Server Error

---

## 🚀 Deployment

### Vercel Deployment
This project is configured for **Vercel** serverless deployment.

#### Configuration (`vercel.json`)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.ts"
    }
  ]
}
```

#### Deployment Steps
1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables**
   - Go to Vercel dashboard
   - Navigate to project settings
   - Add all environment variables from `.env`

#### Frontend CORS Configuration
Ensure frontend URLs are added to CORS whitelist:
```typescript
cors({
  origin: [
    'http://localhost:3000',
    'https://findbasa.vercel.app',
    'https://findbasa.netlify.app'
  ],
  credentials: true
})
```

---

## 📜 Scripts

```json
{
  "dev": "nodemon src/server.ts",      // Start development server
  "build": "tsc",                       // Compile TypeScript to JavaScript
  "start": "node dist/server.js"        // Run production build
}
```

### Usage
```bash
# Development
npm run dev

# Build for production
npm run build

# Run production server
npm run start
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Standards
- Follow TypeScript best practices
- Use ESLint and Prettier
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for API changes

---

## 📄 License

This project is proprietary software developed by **Salek Masud Parvez**.  
All rights reserved. Do not redistribute without permission.

---

## 📞 Contact & Support

**Developer**: Salek Masud Parvez  
**Email**: [salekmasudparvez@gmail.com](mailto:salekmasudparvez@gmail.com)

For bugs, feature requests, or questions, please reach out via email.

---

## 🙏 Acknowledgments

- **Express.js** - Web framework
- **MongoDB** - Database
- **Stripe** - Payment processing
- **Cloudinary** - Image management
- **Vercel** - Hosting platform

---

**Built with ❤️ by Salek Masud Parvez**