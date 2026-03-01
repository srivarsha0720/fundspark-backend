# 🚀 FundSpark – Crowdfunding Platform (Backend)
## Project Links
Frontend Repository:https://github.com/srivarsha0720/fundspark-frontend

Live Application (Vercel):https://fundspark-crowd.vercel.app/

Backend API (Render):https://fundspark-backend.onrender.com

---
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
| Method | Endpoint | Description |
|--------|----------|------------|
POST |/api/auth/register | Register a new user (Hashes password with bcrypt).|
POST | /api/auth/login | Authenticate user & return JWT token |  

---

### 📂 Project Routes

| Method | Endpoint | Description |
|--------|----------|------------|
| GET | /api/projects/ | Fetch all projects (Homepage listing) |
| GET | /api/projects/:id | Fetch single project by ID |
| POST | /api/projects/create | Create new project (Protected) |
| PUT | /api/projects/:id | Update project details (Protected) |
| DELETE | /api/projects/:id | Delete a project (Protected) |
| POST | /api/projects/fund/:id | Fund a project (Protected) |
| POST | /api/projects/:id/updates | Creator adds project update |
| GET | /api/projects/:id/updates | Get all updates for a project |
| GET | /api/projects/:id/comments | Get all comments of a project |
| POST | /api/projects/:id/comments | Add comment (Protected) |
| PUT | /api/projects/comments/:commentId | Update comment (Protected) |
| DELETE | /api/projects/comments/:commentId | Delete comment (Protected) |

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
- id uuid(Primary Key)
- title 
- description 
- image
- category
- goal
- deadline
- raised
- backers
- creator_id (foreign key reference)
- created_at

---
### 🎁 Rewards Table
- id (Primary Key)
- project_id (Foreign Key → Projects)
- title
- amount
- description
- created_at
---
### 🎯 Milestones Table
- id (Primary Key)
- project_id (Foreign Key → Projects)
- title
- amount
- created_at
  
---
### 💳 Funding Table
- id (Primary Key)
- project_id (Foreign Key → Projects)
- user_id
- payment_method
- amount
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
SUPABASE_URL=https://atnhicltjrorhskvxyxn.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0bmhpY2x0anJvcmhza3Z4eXhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjAxNjg0MSwiZXhwIjoyMDg3NTkyODQxfQ.tUET98X_MSkNEv7wYS2xHuCZohflBd4pPZdMfQdeaxI
JWT_SECRET=mysupersecret
PORT=5000
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

## 📌 Environment Variables Required

SUPABASE_URL=https://atnhicltjrorhskvxyxn.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0bmhpY2x0anJvcmhza3Z4eXhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjAxNjg0MSwiZXhwIjoyMDg3NTkyODQxfQ.tUET98X_MSkNEv7wYS2xHuCZohflBd4pPZdMfQdeaxI
JWT_SECRET=mysupersecret
PORT=5000

---

