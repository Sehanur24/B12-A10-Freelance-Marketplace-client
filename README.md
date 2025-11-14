# 🚀 Freelance MarketPlace: A Job Posting & Task Management Platform

Freelance MarketPlace is a full-stack web application where users can post jobs, browse tasks, accept work from others, and manage freelance activities with a clean and modern interface.

## 🌐 Live Project URL

👉 [https://freelance-marketplace-zylos.netlify.app](https://freelance-marketplace-zylos.netlify.app)

---

## ⭐ Key Features

* **Full CRUD Operations** for adding, viewing, updating, and deleting jobs.
* **Protected Private Routes** using JWT authentication.
* **My Added Jobs page** showing only the jobs posted by the logged-in user.
* **My Accepted Tasks page** displaying tasks accepted by the user with Done/Cancel actions.
* **Dynamic Homepage** displaying the latest 6 jobs fetched from the database.
* **Responsive User Interface** with toast notifications for all actions.

---

## 🛠️ Tech Stack

### Frontend
* React
* React Router
* TailwindCSS
* Axios / TanStack Query
* Toast Notification Library

### Backend
* Node.js
* Express.js
* MongoDB Atlas
* JWT Authentication

### Deployment
* **Frontend:** Netlify
* **Backend:** Vercel

---

## 🌟 Key Advantages

* **✔ Smart Ownership Rules:** Users cannot accept their own job posts, creating a realistic freelance workflow.
* **✔ Consistent UI System:** All cards, grids, headings, and buttons follow a clean, uniform design.
* **✔ Instant UI Updates:** Accept, Done, Delete, and Cancel actions update instantly without page refresh.
* **✔ Smooth Authentication Flow:** Refreshing protected pages does not log the user out.

---

## 🔮 Future Enhancements

* Add real-time messaging between job posters and workers.
* Add secure payment integration for completed tasks.
* Introduce advanced filtering options (category, price, date).
* Add rating and review system for completed jobs.
* Add notification system for job updates and acceptances.

---

## 👥 User Role Behaviors

### Job Poster
* Can add, update, and delete **their own jobs**.
* **Cannot** accept their own posted jobs.

### Job Worker (Other Users)
* Can view and **accept jobs** posted by others.
* Can mark accepted jobs as **Done or Cancel**.

### Guest Users
* Can only view **public pages** (Home, All Jobs).
* Must login to access private pages or job details.

---

## 📡 API Capabilities

* Fetch all jobs from MongoDB.
* Retrieve a single job with full details.
* Add new job (`POST`).
* Update existing job (`PUT`).
* Delete user-owned job (`DELETE`).
* Accept jobs posted by others (`POST`).
* Manage accepted tasks (Done/Cancel).
* Register new user and login with JWT authentication.

---

## 🎨 UI / UX Highlights

* Clean grid layout across all pages.
* Consistent card size, image ratio, spacing, and typography.
* Responsive navigation bar with login/logout state.
* Smooth animations on banner or section transitions.
* Toast notifications for all success/error messages.
* No page reload—SPA behavior with fast routing.
