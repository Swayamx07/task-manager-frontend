# Task Manager Frontend

This is the React frontend for the Task Manager full-stack application.
It allows users to view tasks and create new tasks by interacting with a backend REST API.

---

## 🚀 Features

- View all tasks fetched from the backend
- Add new tasks using a simple UI
- Real-time UI update without page refresh
- Clean component-based architecture
- Integrated with backend using Fetch API

---

## 🛠️ Tech Stack

- React (Vite)
- JavaScript
- HTML & CSS
- Fetch API

---

## 🔗 Backend Integration

The frontend connects to a Node.js + Express backend running at:

http://localhost:5000

### APIs Used:
- GET /tasks – Fetch all tasks
- POST /tasks – Create a new task

CORS is enabled in the backend to allow frontend communication.

---

## 📂 Project Structure

src/
├── components/
│   ├── TaskList.jsx
│   └── AddTask.jsx
├── App.jsx
├── main.jsx

---

## ▶️ How to Run Locally

1. Clone the repository
2. Install dependencies:
   npm install
3. Start the development server:
   npm run dev
4. Open in browser:
   http://localhost:5173

Make sure the backend server is running before using the app.

---

## 📌 Current Status

Phase 1 – Frontend ↔ Backend Integration Completed

- Backend CRUD implemented
- Frontend connected successfully
- MongoDB integration planned next

---

## 📖 Learning Outcome

This project demonstrates:
- React component design
- State management using hooks
- REST API consumption
- Full-stack data flow understanding

---

## 👤 Author

Swayam Patil  
AIML Undergraduate | Full-Stack Development Learner
