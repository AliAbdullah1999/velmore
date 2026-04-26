# Database Setup & Migrations Guide

## 📋 Database Prerequisites

Before setting up, ensure you have:
- ✅ PostgreSQL 12+ installed
- ✅ Database created and accessible
- ✅ Connection credentials (host, port, username, password, database)
- ✅ `.env.local` file with `DATABASE_URL`

## 🔌 Database Connection Setup

### 1. PostgreSQL Installation

**macOS (Homebrew):**
```bash
brew install postgresql@16
brew services start postgresql@16
```

**Windows:**
- Download from [postgresql.org](https://www.postgresql.org/download/windows/)
- Run installer and note credentials

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

### 2. Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE velmora_store;

# Create user
CREATE USER velmora_user WITH PASSWORD 'secure_password';

# Grant privileges
ALTER ROLE velmora_user SET client_encoding TO 'utf8';
ALTER ROLE velmora_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE velmora_user SET default_transaction_deferrable TO on;
ALTER ROLE velmora_user SET default_transaction_read_committed TO on;
GRANT ALL PRIVILEGES ON DATABASE velmora_store TO velmora_user;

# Exit
\q
```

### 3. Update Environment Variables

Edit `.env.local`:

```env
# PostgreSQL Connection String
DATABASE_URL="postgresql://velmora_user:secure_password@localhost:5432/velmora_store"
```

**URL Format:**
```
postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]
```

---

## 🔄 Prisma Setup & Migrations

### 1. Initialize Prisma (Already Done)

The Prisma schema is ready at `/prisma/schema.prisma`

### 2. Generate Prisma Client

```bash
npm run prisma:generate
# or
npx prisma generate
```

### 3. Run Database Migrations

```bash
npm run prisma:migrate
# or
npx prisma migrate dev --name init
```

This will:
- Create all tables
- Set up relationships
- Create indexes
- Initialize the database

### 4. Seed Sample Data

```bash
npm run prisma:seed
# or
node -r ts-node/register prisma/seed.ts
```

This will:
- Create 8 sample products
- Add categories
- Set up pricing
- Add ratings and reviews

---

## 📊 Database Schema

### Tables Created (11 total)

**1. User**
- Authentication and profile data
- Email, password, name, phone
- Relationships with orders, wishlist, reviews

**2. Product**
- Product catalog
- Name, description, price, images
- Stock tracking, ratings, categories

**3. ProductVariant**
- Product sizes/colors
- SKU tracking
- Stock per variant

**4. Order**
- Customer orders
- Order number, status, totals
- Payment and shipping info
- Date tracking

**5. OrderItem**
- Items in each order
- Product references
- Quantity, price at purchase

**6. Payment**
- Payment transaction records
- Transaction IDs from gateways
- Payment status
- Error tracking

**7. ShippingInfo**
- Delivery addresses
- Customer details
- Carrier and tracking info

**8. Address**
- Saved addresses for users
- Multiple addresses per user
- Default address flag

**9. Review**
- Product reviews
- Ratings (1-5)
- Comments and feedback

**10. WishlistItem**
- Saved products
- User-product relationship
- Created date

**11. Newsletter**
- Email subscriptions
- Subscriber email list

---

## 🔍 Database Verification

### Check Database Connection

```bash
# From project root
npx prisma studio
```

This opens Prisma Studio at `http://localhost:5555` where you can:
- View all records
- Create/edit/delete data
- Browse database structure
- Run queries

### Verify Tables

```bash
# Connect to PostgreSQL
psql velmora_store -U velmora_user

# List tables
\dt

# Describe table
\d "User"

# Count records
SELECT COUNT(*) FROM "Product";

# Exit
\q
```

---

## 📝 Sample Data

### Products Included
1. Premium Linen Shirt (Clothing) - PKR 8,500
2. Handcrafted Leather Bag (Handcrafted) - PKR 12,000
3. Minimalist Watch (Accessories) - PKR 15,000
4. Organic Cotton T-Shirt (Clothing) - PKR 3,500
5. Utility Canvas Backpack (Utility Gear) - PKR 5,500
6. Wool Blend Sweater (Clothing) - PKR 9,000
7. Handmade Ceramic Mug (Handcrafted) - PKR 2,000
8. Vintage Sunglasses (Accessories) - PKR 6,500

### Categories
- Clothing
- Handcrafted
- Utility Gear
- Accessories

---

## 🔐 Database Security

### Recommended Practices

**1. Secure Connection**
```env
# Use SSL for production
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

**2. User Permissions**
- Create limited-privilege user (done above)
- Don't use postgres superuser in app
- Use separate users for dev/prod

**3. Backups**
```bash
# Create backup
pg_dump velmora_store > backup.sql

# Restore backup
psql velmora_store < backup.sql
```

**4. Environment Security**
```env
# Never commit .env.local to git
# Add to .gitignore (already included)
# Use environment secrets in production
```

---

## 🚀 Production Database Setup

### AWS RDS PostgreSQL

1. Create RDS instance
2. Configure security groups
3. Get connection endpoint
4. Update `DATABASE_URL`:
```env
DATABASE_URL="postgresql://user:password@instance.amazonaws.com:5432/velmora_store"
```

### DigitalOcean Managed Database

1. Create PostgreSQL cluster
2. Get connection details
3. Configure firewall
4. Update environment

### Heroku PostgreSQL

```bash
# If using Heroku
heroku addons:create heroku-postgresql:standard-0

# Get connection string
heroku config:get DATABASE_URL
```

---

## 🔧 Troubleshooting

### Connection Failed

```bash
# Check PostgreSQL is running
pg_isready -h localhost -p 5432

# Check credentials
psql -U velmora_user -d velmora_store -h localhost
```

### Migration Issues

```bash
# View migration history
npx prisma migrate status

# Reset database (development only)
npx prisma migrate reset

# View SQL that would run
npx prisma migrate diff --from-empty --to-schema-datamodel
```

### Seed Script Errors

```bash
# Install ts-node if needed
npm install -D ts-node

# Run seed with logs
DEBUG=* node -r ts-node/register prisma/seed.ts
```

### Data Corruption

```bash
# Reset and reseed
npx prisma migrate reset --force
npm run prisma:seed
```

---

## 📈 Database Optimization

### Indexes (Already Configured)
- User email (unique)
- Product slug (unique)
- Product category
- Order user (foreign key)
- Payment order (unique)

### Query Optimization
- Prisma handles optimization
- Use `select` to limit fields
- Use `include` for relationships
- Consider pagination for large datasets

### Connection Pooling

For production, use PgBouncer or Supabase pooling:

```env
# With pooling
DATABASE_URL="postgresql://user:pass@host:6543/db?schema=public"
```

---

## 📚 Useful Prisma Commands

```bash
# Generate Prisma client
npm run prisma:generate

# Run pending migrations
npm run prisma:migrate

# Create migration without running
npx prisma migrate dev --name feature_name --create-only

# View database in UI
npx prisma studio

# Format schema
npx prisma format

# Validate schema
npx prisma validate

# Check database state
npx prisma db pull

# Push schema to database
npx prisma db push
```

---

## ✅ Post-Setup Verification

After running migrations and seeding:

```bash
# 1. Check products exist
npx prisma studio

# 2. Verify table structure
psql velmora_store -U velmora_user -c "\dt"

# 3. Count records
psql velmora_store -U velmora_user -c "SELECT COUNT(*) FROM \"Product\";"

# 4. Test app connection
npm run dev
```

Visit http://localhost:3000 to verify setup complete.

---

## 🔄 Data Migrations

### Add New Column
```prisma
// 1. Update schema
model User {
  id String @id @default(cuid())
  // ... existing fields
  role String @default("customer") // NEW
}

// 2. Run migration
npm run prisma:migrate

// 3. Use in app
```

### Add New Table
```prisma
// 1. Add to schema
model Promotion {
  id String @id @default(cuid())
  code String @unique
  discount Float
  // ...
}

// 2. Run migration
npm run prisma:migrate
```

---

## 📞 Database Support

- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **Prisma Docs:** https://www.prisma.io/docs/
- **DigitalOcean:** https://www.digitalocean.com/docs/
- **AWS RDS:** https://docs.aws.amazon.com/rds/

---

**Database setup complete!** 🎉

Your Velmora Store database is ready for development and testing.

Last Updated: April 2026
