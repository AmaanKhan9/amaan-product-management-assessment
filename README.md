# 🚀 Full Stack Product Management System

A full-stack application for managing products and categories with authentication, built using:

- Backend: Node.js + Express + Prisma
- Frontend: Angular (Standalone Components)
- Database: PostgreSQL (or configured DB)
- Auth: JWT Authentication

---

# 📦 Features

## 🔐 Authentication
- User Register
- User Login
- JWT Protected Routes

## 📂 Categories
- Create Category
- View Categories
- Update Category
- Delete Category

## 📦 Products
- Create Product (with image upload)
- List Products (pagination, search, sort)
- Update Product
- Delete Product
- Bulk Upload CSV
- Export Products CSV

---

# 🏗️ Project Structure


backend/
frontend/


---

# 🚀 Setup Instructions

## Backend
```bash
cd backend
npm install
npm run dev
Frontend
cd frontend
npm install
ng serve


Environment Variables
Backend .env required:
DATABASE_URL=your_db_url
JWT_SECRET=your_secret
PORT=3000


API Base URL
http://localhost:3000/api


Author
Amaan Khan
