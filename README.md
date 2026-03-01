# 🚀 FundSpark – Crowdfunding Platform (Backend)

## 📌 Project Overview

FundSpark Backend is built using Node.js and Express.js.  
It handles user authentication, project creation, milestone tracking, and reward management.  
The backend securely connects to a Supabase database and provides RESTful APIs for frontend integration.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- Supabase
- JWT (JSON web Token)
- bcrypt (Password Hashing)
- Render (Deployment)

---

## 📡 API Documentation

### 🔐 Authentication Routes

POST /api/auth/register  
POST /api/auth/login  

---

### 📂 Project Routes

GET /api/projects  
GET /api/projects/:id  
POST /api/projects/create  
PUT /api/projects/:id  
DELETE /api/projects/:id  

---


## 🗄 Database Schema Explanation (Supabase)

### 👤 Users Table
- id
- name
- email
- password (hashed)
- created_at

---

### 📁 Projects Table
- id
- title
- description
- image
- category
- goal
- deadline
- milestones
- rewards
- creator_id (foreign key reference)
- created_at

---

## ⚙ Installation & Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/srivarsha0720/fundspark-backend.git
```

### 2️⃣ Navigate into the folder

```bash
cd fundspark-backend
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Create .env file

Create a `.env` file in the root directory and add:

```
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key
JWT_SECRET=your_secret_key
```

### 5️⃣ Start the server

```bash
npm start
```

Server will run on:

```
http://localhost:5000
```

---

## 🌐 Deployment Link

🔗 https://fundspark-backend.onrender.com

---

## 📦 API Base URL

```
https://fundspark-backend.onrender.com/api
```

---

## 📌 Environment Variables Required

SUPABASE_URL=https://atnhicltjrorhskvxyxn.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0bmhpY2x0anJvcmhza3Z4eXhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjAxNjg0MSwiZXhwIjoyMDg3NTkyODQxfQ.tUET98X_MSkNEv7wYS2xHuCZohflBd4pPZdMfQdeaxI
JWT_SECRET=mysupersecret
PORT=5000

---

## 👨‍💻 Developed By

Sri Varsha  
Masai School – Construct Week Project
