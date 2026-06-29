# 🚀 Full Stack Product Management System

A full-stack application for managing products and categories with authentication, built using:

- Backend: Node.js + Express + Prisma
- Frontend: Angular (Standalone Components)
- Database: PostgreSQL
- Auth: JWT Authentication

---

# 📦 Features

## 🔐 Authentication
- User Register
- User Login
- JWT Protected Routes (Auth Guard + Interceptor)

---

## 📂 Categories
- Create Category
- View Categories
- Update Category
- Delete Category

---

## 📦 Products
- Create Product (with image upload)
- List Products
  - Pagination (server-side)
  - Search (product + category)
  - Sorting (price asc/desc)
- Update Product
- Delete Product
- Bulk Upload CSV
- Export Products (CSV download)

---

# 🏗️ Project Structure


backend/
frontend/


---

# 🚀 Setup Instructions

## Backend Setup
cd backend
npm install
npm run dev

## Frontend Setup
cd frontend
npm install
ng serve

🔐 Environment Variables (Backend)
Modify .env file in backend:
DATABASE_URL=your_db_url
JWT_SECRET=your_secret
PORT=3000


🌐 API Base URL
http://localhost:3000/api


📌 Tech Highlights
Angular Standalone Architecture
Reactive Forms
Lazy Loaded Routes
JWT Authentication Flow
File Upload (Multer)
CSV Export using server-side streaming
Prisma ORM for DB management


👨‍💻 Author
Amaan Khan
