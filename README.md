# RentNest 🏠 — Backend API

**"Find & List Rental Properties with Ease"**

A backend API for a rental property marketplace built with Node.js, Express, TypeScript, PostgreSQL, and Prisma. Landlords can list properties, tenants can browse and request rentals, make payments via Stripe, and admins moderate the platform.

---

## 📌 Submission Info

| Item | Link |
|------|------|
| **Backend Repo** | [https://github.com/rabbani37/L2A4-RentNest](https://github.com/rabbani37/L2A4-RentNest) |
| **Live API** | [https://rentnest-backend-ten.vercel.app/](https://rentnest-backend-ten.vercel.app/) |
| **API Documentation (Postman)** | [https://github.com/rabbani37/RentNest-Backend-1.postman_collection](https://github.com/rabbani37/RentNest-Backend-1.postman_collection) |

### 🔑 Admin Credentials

```
Email    : admin@rentnest.com
Password : admin123
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js + Express | REST API |
| TypeScript | Type safety |
| PostgreSQL + Prisma | Database + ORM |
| JWT | Authentication |
| Stripe | Payment processing |
| Manual Validation | Input validation |

---

## 👥 Roles & Permissions

| Role | Key Permissions |
|------|------------------|
| **Tenant** | Browse listings, submit rental requests, make payments, leave reviews, manage profile |
| **Landlord** | Create/manage listings, approve/reject rental requests, view rental history |
| **Admin** | Manage users (ban/unban), manage categories, oversee all listings & requests |

> Users select their role (`TENANT` / `LANDLORD`) during registration. Admin account is created separately (not via public registration).



## 📚 API Endpoints Overview

### Authentication
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user (tenant/landlord) |
| POST | `/api/auth/login` | Public | Login user, return JWT |
| GET | `/api/auth/me` | Authenticated | Get current authenticated user |

### Categories
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/categories` | Public | Get all property categories |
| POST | `/api/categories` | Admin | Create a new category |

### Properties
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/properties` | Public | Get all properties (filter by location, price, type) |
| GET | `/api/properties/:id` | Public | Get property details |
| POST | `/api/landlord/properties` | Landlord | Create new property listing |
| PUT | `/api/landlord/properties/:id` | Landlord | Update property listing |
| DELETE | `/api/landlord/properties/:id` | Landlord | Remove property listing |

### Rental Requests
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/rentals` | Tenant | Submit a rental request |
| GET | `/api/rentals` | Tenant | Get own rental requests |
| GET | `/api/landlord/requests` | Landlord | Get all requests for landlord's properties |
| PATCH | `/api/landlord/requests/:id` | Landlord | Approve or reject a rental request |

### Payments (Stripe)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/payments/create` | Tenant | Create a payment session for an approved rental |
| POST | `/api/payments/webhook` | Stripe | Webhook to confirm payment & update status |

### Reviews
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/reviews` | Tenant | Create a review for a property |

### Admin
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/admin/users` | Admin | Get all users |
| PATCH | `/api/admin/users/:id` | Admin | Update user status (ban/unban) |
| GET | `/api/admin/properties` | Admin | Get all properties |
| GET | `/api/admin/rentals` | Admin | Get all rental requests |

---

## 🔄 Rental Request Flow

```
PENDING → (Landlord approves) → APPROVED → Payment (Stripe) → ACTIVE → COMPLETED
PENDING → (Landlord rejects)  → REJECTED
```

---

## ⚠️ Error Response Format

All errors are returned in a consistent structured format:

```json
{
  "success": false,
  "message": "Error message describing what went wrong",
  "errorDetails": "Additional error details"
}
```

---

## 🗄️ Database Models

- **User** — Stores tenant, landlord, and admin accounts (role-based)
- **Category** — Property type categories (Apartment, House, Studio, etc.)
- **Property** — Rental property listings (linked to landlord & category)
- **RentalRequest** — Rental requests between tenants and landlords
- **Payment** — Payment transactions (Stripe integration)
- **Review** — Tenant reviews for properties

---

## 🎥 Demo Video Covers

1. Project overview & API architecture
2. All 3 roles demonstrated via Postman (Tenant, Landlord, Admin)
3. CRUD operations on key endpoints
4. Error handling & validation in action
5. Payment flow (Stripe checkout + webhook confirmation)

---

## 👤 Author

**Md Golam RABBANI**
Backend Assignment 4 — Programming Hero
