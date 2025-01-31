## 📌 What is HostCycle?
**HostCycle** is a web hosting platform similar to Vercel that allows users to deploy and manage websites. It provides scalable hosting solutions with automated deployment, domain management, and uptime monitoring. Users can subscribe to hosting plans for specific durations (e.g., monthly, yearly), and the system handles renewals, expirations, and notifications.
## 📌 Project Overview
This project is a **MERN stack** (MongoDB, Express.js, React, Node.js) 

## 🚀 Features
- 🔹 **User Authentication** (JWT-based login & registration)
- 🔹 **Admin Dashboard** (Manage users, transactions, Add, edit, delete)
- 🔹 **Real-time Notifications** (Using WebSockets)
- 🔹 **Responsive UI** (Built with React & Tailwind CSS)

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcrypt.js
- **Deployment:** Vercel (Frontend) & Vercel (Backend)

---

## 🚀 HostCycle Management System

A **Hosting Cycle Management System** that allows users to register, purchase, and manage hosting cycles. The system automatically sends notifications when hosting plans are about to expire using a **cron job and Node.js**.

## 📌 Features

- 🛒 **Add Hosting Cycle to Cart**: User can hosting plans to their accounts his website.
- ⏳ **Automatic Expiry Check**: A scheduled cron job checks hosting expiry daily.
- 📩 **Email Notifications**: Users get notified **one day before** their hosting plan expires.
- 🔧 **Admin Management**: Admins can delete users and manage hosting plans.
- 🔒 **Secure Authentication**: Uses authentication and authorization for security.
- 📡 **RESTful API**: Built with **Node.js, Express, and MongoDB**.

---

## 🏗️ System Architecture
```
┌───────────┐       ┌───────────┐       
│   Admin   │       │   User    │       
│  Manages  │       │  Accesses │       
└────┬──────┘       └────┬──────┘       
     │                   │                     
     │                   │ Uses                
     ▼                   ▼                     
┌──────────────────────────────────────────────┐
│          🚀 Frontend Container               │
│   - Client Application (React)               │
│   - Frontend Components                      │
│   - Authenticates via Backend API            │
└──────────────────────────────────────────────┘
                    │
        Routes to   ▼
┌──────────────────────────────────────────────┐
│         🛠️ Backend Container                 │
│   - API Server (Node.js, Express)            │
│   - API Routes                               │
│   - Service Components                       │
└──────────────────────────────────────────────┘
                    │
        Queries    ▼
┌──────────────────────────────────────────────┐
│         📦 Data Store Container               │
│   - Data Models (Mongoose)                   │
│   - Stored in MongoDB Database               │
└──────────────────────────────────────────────┘
```

## 🔧 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/MaizaAymen/HostCycle.git
cd HostCycle
```

### 2️⃣ Backend Setup
```sh
cd server
npm install
npm start
```
Create a `.env` file and configure:
```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

### 3️⃣ Frontend Setup
```sh
cd client
npm install
npm start
```

## 🚀 Deployment
- **Frontend:** Deploy on Vercel/Netlify
- **Backend:** Deploy on Vercel
- **Database:** MongoDB Atlas

## 📧 Contact
For questions or contributions, feel free to contact Aymen Maiza at maizaaymena@gmail.com or open an issue in the repository.

---
🌟 **Star the repo if you find it useful!**
