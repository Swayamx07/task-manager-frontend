🚀 Task Manager – Frontend

This repository contains the React frontend for a Task Manager full-stack application.
It provides a simple and responsive interface for users to view and create tasks by interacting with a backend REST API.

The frontend communicates with a Node.js + Express backend to manage task data.

📌 Overview

The application demonstrates frontend–backend integration using React and REST APIs.

Users can:

View all tasks stored in the database

Add new tasks through a simple interface

See updates instantly without refreshing the page

This project focuses on component-based architecture and API integration.

✨ Features

📋 View all tasks from backend

➕ Add new tasks using UI form

⚡ Real-time updates without page reload

🧩 Clean React component structure

🔗 Backend API integration

📱 Simple and responsive UI

🛠 Tech Stack
Frontend

React (Vite)

JavaScript (ES6)

HTML5

CSS3

API Communication

Fetch API

🔗 Backend Integration

The frontend communicates with a Node.js + Express backend API.

Base URL
${API_BASE_URL}
API Endpoints Used
Method	Endpoint	Description
GET	/tasks	Fetch all tasks
POST	/tasks	Create a new task

CORS is enabled on the backend to allow communication with the frontend.

📂 Project Structure
src
 ├── components
 │   ├── TaskList.jsx
 │   └── AddTask.jsx
 │
 ├── App.jsx
 ├── main.jsx
Component Responsibilities

TaskList.jsx

Fetches tasks from backend

Displays tasks in UI

AddTask.jsx

Handles new task creation

Sends POST request to backend

▶️ Running the Project Locally
1️⃣ Clone the Repository
git clone <your-repo-url>
cd task-manager-frontend
2️⃣ Install Dependencies
npm install
3️⃣ Start Development Server
npm run dev
4️⃣ Open in Browser
http://localhost:5173

⚠️ Ensure the backend server is running before using the application.

⚙️ Application Workflow

User opens frontend UI

React sends request to backend API

Backend fetches tasks from database

Tasks returned to frontend

React renders tasks dynamically

When a user adds a task:

Form submission triggers POST request

Backend saves task

Frontend updates task list instantly

📌 Current Status
Phase 1 – Completed

Backend API built using Node.js & Express

Frontend connected successfully

Task creation and fetching implemented

Upcoming Improvements

MongoDB database integration

Task completion toggle

Task deletion feature

User authentication

Improved UI styling

📖 Learning Outcomes

This project helped develop understanding of:

React component architecture

State management using React Hooks

REST API communication

Frontend–backend integration

Basic full-stack application workflow

👨‍💻 Author

Swayam Patil
AIML Undergraduate
Full-Stack Development Learner

⭐ Support

If you like this project:

⭐ Star the repository

🛠 Suggest improvements

🤝 Contribute to the project