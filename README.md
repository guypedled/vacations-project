## GitHub Repository
https://github.com/guypedled/vacations-project

# 🌍 VacationHub Project

## 📌 Project Overview

VacationHub is a full-stack web application that allows users to browse vacations, like them, receive AI-powered recommendations, and analyze vacation popularity through reports and data visualization.

The system includes:

* User & Admin roles
* Vacation management
* Likes system
* AI recommendations
* Smart MCP queries
* CSV export
* Interactive charts

---

## 🧑‍💻 Features

### 👤 User

* View vacations
* Like / Unlike vacations
* Filter vacations (All, My Likes, Active, Upcoming)
* Ask smart MCP questions
* Get AI travel recommendations

### 👑 Admin

* Add new vacations
* Edit vacations
* Delete vacations
* Export CSV reports
* View popularity analytics (likes per vacation)

---

## 🐳 Running the Project (Docker)

### 1️⃣ Build & Run Containers

```bash
docker compose up --build
```

---

### 2️⃣ Seed the Database (IMPORTANT)

Run this command to populate the system with demo data:

```bash
docker exec -it vacations-project-backend-1 node seed.js
```

👉 This will:

* Create demo users and admin access
* Insert vacations
* Add initial likes
* Ensure charts and MCP queries work correctly

---

## 🔐 Demo Access

Users can register and explore the application for testing and demonstration purposes.

Admin demo access is also available.  
Please contact the developer if admin credentials are needed.

---

## 🌐 Application URL

After running:

```text
http://localhost:5173
```

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

### Frontend

* React (TypeScript)
* MUI (Material UI)

### DevOps

* Docker & Docker Compose

---

## 📊 Reports & Analytics

* Bar chart displaying likes per vacation
* CSV export containing:

  * Destination
  * Likes count

---

## 🤖 AI & MCP

### AI Recommendations

* Generates travel recommendations based on destination preferences

### MCP Smart Queries

Supports questions such as:

* "What is the average vacation price?"
* "Which vacation has the most likes?"
* "How many active vacations are there?"

---

## ⚠️ Notes

* Users must be logged in to access vacations
* Admin features are restricted to admin users only
* Likes are user-specific
* Global likes count is shared across all users

---

## ✅ Project Status

✔ Fully functional  
✔ Dockerized environment  
✔ AI integration included  
✔ Responsive UI  
✔ Ready for deployment

---
