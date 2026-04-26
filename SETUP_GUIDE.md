# Velmora Store - E-Commerce Platform

A modern, full-stack e-commerce platform built with Next.js, featuring complete payment processing for Pakistan and international customers.

## Features

### 🛒 E-Commerce Core
- **Product Catalog** - Advanced filtering, search, and sorting
- **Shopping Cart** - Persistent cart with quantity management
- **Product Reviews** - Customer ratings and reviews
- **Wishlist** - Save favorite items
- **Recent Products** - Auto-tracking of viewed products

### 💳 Payment Integration (Pakistan + International)
- **JazzCash** - Pakistan's leading mobile wallet
- **Easypaisa** - Popular mobile payment service
- **HBL Pakistan** - Bank payment integration
- **Stripe** - International credit/debit card payments
- **PayPal** - International payment processing
- **Bank Transfer** - Direct bank account transfers
- **Cash on Delivery (COD)** - Pay at delivery option

### 👤 User Management
- **Registration & Login** - Secure authentication with NextAuth.js
- **User Profiles** - Manage personal information
- **Order History** - Track all orders and status
- **Saved Addresses** - Multiple delivery addresses
- **Wishlist Management** - Save items for later

### 📦 Order Management
- **Order Creation** - Seamless checkout experience
- **Order Tracking** - Real-time order status updates
- **Payment Status** - Track payment confirmations
- **Shipping Information** - Carrier and tracking details
- **Order Notifications** - Email confirmations and updates

### 🎯 Admin Dashboard
- **Dashboard Overview** - Sales metrics and statistics
- **Product Management** - Add, edit, delete products
- **Order Management** - View and manage orders
- **Customer Management** - Customer database
- **Analytics** - Sales trends and insights

### 📧 Email Service
- Order confirmations
- Payment notifications
- Shipment tracking
- Newsletter subscriptions
- Password resets

## Tech Stack

**Frontend:**
- Next.js 16.2.2
- React 19.2.4
- TypeScript
- Tailwind CSS 4
- Framer Motion (animations)
- React Hook Form (forms)
- Lucide Icons

**Backend:**
- Next.js API Routes
- NextAuth.js (authentication)
- Prisma ORM
- PostgreSQL

**Payments:**
- Stripe
- PayPal SDK
- JazzCash API
- Easypaisa API
- HBL API

**Email:**
- SendGrid / Mailgun
- Nodemailer

**Validation:**
- Zod (schema validation)

## Installation & Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### 1. Clone and Install

```bash
git clone <your-repo>
cd velmora-store
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

**Database Setup:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/velmora_store"
```

**Authentication:**
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here
```

**Stripe Integration:**
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**PayPal Integration:**
```env
PAYPAL_CLIENT_ID=your-client-id
PAYPAL_CLIENT_SECRET=your-client-secret
```

**Pakistan Payment Methods:**
```env
# JazzCash
JAZZCASH_MERCHANT_ID=your-merchant-id
JAZZCASH_PASSWORD=your-password
JAZZCASH_INTEGRITY_CHECK_KEY=your-integrity-key

# Easypaisa
EASYPAISA_MERCHANT_ID=your-merchant-id
EASYPAISA_API_KEY=your-api-key
EASYPAISA_STORE_ID=your-store-id

# HBL
HBL_MERCHANT_ID=your-merchant-id
HBL_API_KEY=your-api-key
```

**Email Service (Choose one):**
```env
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your-api-key

# OR

EMAIL_SERVICE=mailgun
MAILGUN_API_KEY=your-api-key
MAILGUN_DOMAIN=your-domain
```

### 3. Database Setup

Create the database and run migrations:

```bash
npm run prisma:migrate
```

Seed sample data:

```bash
npm run prisma:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Documentation

### Authentication

#### Sign Up
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe",
  "phone": "+923001234567"
}
```

#### Sign In
```bash
POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Products

#### Get Products
```bash
GET /api/products?category=Clothing&minPrice=1000&maxPrice=10000&sort=price-asc
```

Query Parameters:
- `category` - Filter by category
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `search` - Search query
- `sort` - Sort by: price-asc, price-desc, newest, rating
- `limit` - Results per page (default: 12)
- `offset` - Pagination offset

#### Get Product Detail
```bash
GET /api/products/[slug]
```

Response includes product details and related products.

### Orders

#### Create Order
```bash
POST /api/orders
Content-Type: application/json
Authorization: Bearer [token]

{
  "paymentMethod": "stripe",
  "shippingInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+923001234567",
    "address": "123 Main Street",
    "city": "Karachi",
    "province": "Sindh",
    "zipCode": "75500"
  },
  "cartItems": [
    {
      "productId": "prod-123",
      "quantity": 2,
      "size": "M",
      "name": "Product Name",
      "price": 5000
    }
  ]
}
```

#### Get Orders
```bash
GET /api/orders
Authorization: Bearer [token]
```

### Payments

#### Process Payment
```bash
POST /api/payment/process
Content-Type: application/json

{
  "orderId": "order-123",
  "amount": 15000,
  "email": "customer@example.com",
  "name": "John Doe",
  "phone": "+923001234567",
  "paymentMethod": "jazz_cash"
}
```

**Payment Methods:**
- `stripe` - Stripe (International)
- `paypal` - PayPal (International)
- `jazz_cash` - JazzCash (Pakistan)
- `easypaisa` - Easypaisa (Pakistan)
- `hbl` - HBL Bank (Pakistan)
- `bank_transfer` - Direct Bank Transfer
- `cod` - Cash on Delivery

### Newsletter

#### Subscribe
```bash
POST /api/newsletter
Content-Type: application/json

{
  "email": "user@example.com"
}
```

## Admin Dashboard

Access admin panel at `/admin` (requires admin email)

### Default Admin Setup

1. Create admin user in database:
```bash
npm run prisma:migrate
```

2. Update user email to include "admin" for access

3. Navigate to `http://localhost:3000/admin`

Features:
- Dashboard analytics
- Product management
- Order management
- Customer management
- Revenue tracking

## Payment Gateway Setup Guides

### Stripe
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Create account and get API keys
3. Add keys to `.env.local`
4. Set webhook URL: `https://yourdomain.com/api/webhooks/stripe`

### PayPal
1. Go to [PayPal Developer](https://developer.paypal.com)
2. Create app and get credentials
3. Add Client ID and Secret to `.env.local`

### JazzCash (Pakistan)
1. Contact JazzCash merchant support
2. Get Merchant ID and API credentials
3. Add to `.env.local`

### Easypaisa (Pakistan)
1. Register at [Easypaisa Merchant Portal](https://merchant.easypaisa.com.pk)
2. Get Merchant ID and API keys
3. Add to `.env.local`

### HBL (Pakistan)
1. Contact HBL e-commerce support
2. Get merchant credentials
3. Add to `.env.local`

## Email Service Setup

### SendGrid
1. Create account at [SendGrid](https://sendgrid.com)
2. Generate API key
3. Add to `.env.local`

### Mailgun
1. Sign up at [Mailgun](https://www.mailgun.com)
2. Get API key and domain
3. Add to `.env.local`

## Database Schema

Key tables:
- **User** - Customer accounts
- **Product** - Product catalog
- **Order** - Customer orders
- **OrderItem** - Items in orders
- **Payment** - Payment records
- **ShippingInfo** - Delivery details
- **Review** - Product reviews
- **WishlistItem** - Saved items
- **Newsletter** - Email subscriptions

## Deployment

### Vercel (Recommended)

```bash
vercel deploy
```

Add environment variables in Vercel dashboard.

### Other Platforms

1. Build the app:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

## Security Best Practices

- ✅ Secure password hashing with bcryptjs
- ✅ JWT-based authentication
- ✅ API request validation with Zod
- ✅ HTTPS/TLS encryption
- ✅ SQL injection protection (Prisma)
- ✅ CSRF protection with NextAuth.js
- ✅ Secure session management
- ✅ PCI DSS compliance for payments

## Support & Contact

For issues and support:
- Email: support@velmora.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/velmora-store/issues)

## License

MIT License - see LICENSE file for details

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

---

**Built with ❤️ by Velmora Team**

Last updated: April 2026
