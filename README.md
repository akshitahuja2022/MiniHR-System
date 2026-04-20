# 🧑‍💼 Smart HR Management System

> A full-stack Mini HR Tool for managing employee leave requests, attendance records, and employee data — built as part of a Full-Stack Developer Take-Home Assignment.

---

## 🔗 Live Links

| Service  | URL |
|----------|-----|
| Frontend | https://mini-hr-system.netlify.app |
| Backend  | https://hrsystem-rbfu.onrender.com |
| GitHub   | https://github.com/akshitahuja2022/MiniHR-System |

---

## 📌 Project Overview

**Smart HR Management System** is a lightweight, full-stack HR tool that allows organizations to manage their workforce efficiently. The system supports two roles — **Admin** and **Employee** — each with clearly scoped access and features.

### Employee Features
- Secure login and profile view
- Mark daily attendance (Present/Absent)
- Apply for leave (Casual, Sick, Paid)
- Edit or cancel pending leave requests
- View leave and attendance history
- Track remaining leave balance

### Admin Features
- View all employee records
- Approve or reject leave requests
- Monitor and filter attendance records by date or employee

---

## 🛠️ Tech Stack & Justification

| Layer          | Technology        | Reason |
|----------------|-------------------|--------|
| Frontend       | React.js          | Component-based UI, fast development, wide ecosystem |
| Styling        | Tailwind CSS      | Utility-first, responsive design with minimal custom CSS |
| Backend        | Node.js + Express | Lightweight, fast REST API development |
| Database       | MongoDB           | Flexible schema suited for HR data with varying fields |
| Authentication | JWT               | Stateless, secure token-based authentication |
| Deployment     | Render            | Free-tier hosting for both frontend and backend |

---

## ⚙️ Installation & Local Setup

### Prerequisites
- Node.js v18+
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/akshitahuja2022/MiniHR-System.git
cd MiniHR-System
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory (see Environment Variables section below), then run:

```bash
npm start
# or for development:
npm run dev
```

The backend will start on `http://localhost:5000`.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

The frontend will start on `http://localhost:3000`.

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable         | Description                                      |
|------------------|--------------------------------------------------|
| `PORT`           | Port number for the Express server (e.g., `5000`) |
| `MONGO_URI`      | MongoDB connection string (Atlas or local)        |
| `JWT_SECRET`     | Secret key used to sign and verify JWT tokens     |
| `FRONTEND_URL`   | Frontend URL for CORS configuration               |

**Example:**
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/hrdb
JWT_SECRET=your_super_secret_key
FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)

| Variable            | Description                        |
|---------------------|------------------------------------|
| `REACT_APP_API_URL` | Base URL of the backend API server |

**Example:**
```env
REACT_APP_API_URL=http://localhost:5000
```

---

## 🔑 Admin Credentials (Seeded)

The admin account is pre-seeded in the database. Use the following credentials to log in as Admin:

| Field    | Value               |
|----------|---------------------|
| Email    | `admin@gmail.com`  |
| Password | `admin123`         |
| Role     | Admin               |

---

## 📡 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint              | Description                | Access    |
|--------|-----------------------|----------------------------|-----------|
| POST   | `/api/auth/register`  | Register a new employee    | Public    |
| POST   | `/api/auth/login`     | Login and receive JWT      | Public    |
| GET    | `/api/auth/logout`    | Logout and clear session   | Public    |
| GET    | `/api/auth/profile`   | Get logged-in user profile | Protected |

### Leave Routes — `/api/leave`

| Method | Endpoint                    | Description                        | Access    |
|--------|-----------------------------|------------------------------------|-----------|
| POST   | `/api/leave/apply`          | Apply for a new leave request      | Protected |
| GET    | `/api/leave/allLeaves`      | Get all own leave requests         | Protected |
| PUT    | `/api/leave/edit/:id`       | Edit a pending leave request       | Protected |
| DELETE | `/api/leave/cancel/:id`     | Cancel a pending leave request     | Protected |
| GET    | `/api/leave/leaveHistory`   | View full leave history            | Protected |
| GET    | `/api/leave/balance`        | Get remaining leave balance        | Protected |

### Attendance Routes — `/api/attendance`

| Method | Endpoint                       | Description                 | Access    |
|--------|--------------------------------|-----------------------------|-----------|
| POST   | `/api/attendance/marked`       | Mark today's attendance     | Protected |
| GET    | `/api/attendance/my-attendence`| Get own attendance history  | Protected |

### Admin Routes — `/api/admin`

| Method | Endpoint                       | Description                           | Access |
|--------|--------------------------------|---------------------------------------|--------|
| GET    | `/api/admin/users`             | Get all employee records              | Admin  |
| PUT    | `/api/admin/leave/approve/:id` | Approve a leave request by ID         | Admin  |
| PUT    | `/api/admin/leave/reject/:id`  | Reject a leave request by ID          | Admin  |
| GET    | `/api/admin/all`               | Get all employees' attendance records | Admin  |
| GET    | `/api/admin/leaves`            | Get all leave requests                | Admin  |

---

## 🗄️ Database Models

### User
```
{
  fullName:      String (required)
  email:         String (unique, required)
  password:      String (hashed)
  role:          Enum ["employee", "admin"]
  dateOfJoining: Date
  leaveBalance:  Number (default: 20)
}
```

### Leave
```
{
  employee:    ObjectId → User
  leaveType:   Enum ["Casual", "Sick", "Paid"]
  startDate:   Date
  endDate:     Date
  totalDays:   Number (auto-calculated)
  status:      Enum ["Pending", "Approved", "Rejected"] (default: "Pending")
  appliedDate: Date (auto)
  reason:      String (optional)
}
```

### Attendance
```
{
  employee:  ObjectId → User
  date:      Date
  status:    Enum ["Present", "Absent"]
}
```
> **Constraints:** One attendance record per employee per day; future dates are not allowed.

### Relationships
- A **User** can have many **Leave** records (one-to-many)
- A **User** can have many **Attendance** records (one-to-many)
- Leave approval decrements the user's `leaveBalance`

---

## 🤖 AI Tools Declaration

This project was built with the assistance of **GitHub Copilot**. Below is a transparent breakdown of AI-assisted vs manually implemented parts:

| Area | AI Contribution | Manual Implementation |
|---|---|---|
| **UI Design & Layout** | GitHub Copilot suggested component structures and Tailwind class combinations for the dashboard, forms, and responsive layout | All page-level composition and routing logic |
| **Mark Daily Attendance** | Used ChatGPT to understand frontend form logic and date validation concepts  | Business rule (one-per-day, no future dates) and backend controller written manually |
| **Filter Attendance by Date/Employee** |  Used ChatGPT to understand filter UI approaches | Backend query logic and API integration written manually |
| **Leave Balance Tracking** | CUsed ChatGPT to understand how to display remaining balance on the dashboard | The balance deduction logic on leave approval was implemented manually |
| **View Leave History** | Used ChatGPT to understand table structure and UI design   | API call wiring, state management, and data mapping done manually |
| **Responsive Design** | Used ChatGPT and GitHub Copilot to understand responsive UI patterns and layouts | Implemented responsiveness using CSS/Flexbox/Grid and media queries manually |
| **Notification Handling** | Used ChatGPT to understand notification/toast implementation approaches | Integrated notification system and handled state updates manually |
                      
> All core business logic — role-based access control, JWT authentication, leave status transitions, and attendance constraints — was implemented manually without AI generation.

---

## ⚠️ Known Limitations

- Email notifications are not implemented (no email service integrated).
- No pagination on leave/attendance tables for large datasets.
- Admin cannot edit employee profiles directly.
- Monthly attendance reports are not yet available.
- No unit or integration tests are included.
- Docker setup is not configured.

---

## ⏱️ Time Spent

| Phase        | Time       |
|-------------|------------|
| **Total**   | **~20 hours** |
---

## 📂 Project Structure
```
root
├── backend
│   ├── controllers      # Business logic for auth, leave, attendance, users
│   ├── routes           # Express route definitions
│   ├── models           # Mongoose schemas (User, Leave, Attendance)
│   ├── middleware       # JWT auth middleware, role-check middleware
│   └── config           # DB connection, environment config
├── frontend
│   ├── pages            # Login, Signup, Employee Dashboard, Admin Dashboard
│   ├── components       # Reusable UI components (Navbar, Forms, Tables)
│   ├── context          # Global state management (AuthContext, AppContext)
│   ├── notification     # Toasts/alerts system for user feedback
│
└── README.md
```
## 📄 License

This project was built for assessment purposes. All rights reserved by the author.
