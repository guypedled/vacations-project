# 🌍 VacationHub Project

## 📌 Project Overview

VacationHub is a full-stack web application that allows users to browse vacations, like them, get AI recommendations, and analyze vacation popularity through reports.

The system includes:

* User & Admin roles
* Vacation management
* Likes system
* AI recommendations
* Smart MCP questions
* CSV export
* Data visualization (charts)

---

## 🧑‍💻 Features

### 👤 User

* View vacations
* Like / Unlike vacations
* Filter vacations (All, My Likes, Active, Upcoming)
* Ask smart questions (MCP)
* Get AI travel recommendations

### 👑 Admin

* Add new vacations
* Edit vacations
* Delete vacations
* Export CSV report
* View popularity chart (likes per vacation)

---

## 🐳 Running the Project (Docker)

### 1️⃣ Build & Run Containers

```bash
docker compose up --build
```

---

### 2️⃣ Seed the Database (IMPORTANT)

Run this command to populate the system with data:

```bash
docker exec -it vacations-project-backend-1 node seed.js
```

👉 This will:

* Create admin user
* Insert vacations
* Add initial likes
* Ensure charts and MCP work correctly

---

## 🔐 Admin Credentials

Use the following credentials:

```
Email: admin@test.com
Password: 1234
```

---

## 🌐 Application URL

After running:

```
http://localhost:5173
```

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express
* MongoDB (Mongoose)
* JWT Authentication

### Frontend

* React (TypeScript)
* MUI (Material UI)

### DevOps

* Docker & Docker Compose

---

## 📊 Reports

* Bar chart showing number of likes per vacation
* CSV export containing:

  * Destination
  * Likes

---

## 🤖 AI & MCP

### AI Recommendation

* Generates travel recommendations based on destination

### MCP Questions

Supports queries like:

* "What is the average vacation price?"
* "Which vacation has the most likes?"
* "How many active vacations are there?"

---

## ⚠️ Notes

* Users must be logged in to access vacations
* Admin features are restricted to admin users only
* Likes are user-specific (each user has their own likes)
* Global likes count is shared across all users

---

## ✅ Project Status

✔ Fully functional
✔ Meets all requirements
✔ Ready for submission

---
