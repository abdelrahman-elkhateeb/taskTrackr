# TaskTracker

TaskTracker is a **full-featured task and project management system** designed to improve productivity, collaboration, and accountability for individuals and teams. The platform provides a unified workspace for managing tasks, projects, and missions with clear roles, permissions, and real-time updates.

---

## Features

### Authentication & Authorization

* Secure user authentication (Sign up / Login / Logout)
* Role-based access control (Owner, Manager, Contributor, Viewer)
* Protected routes and permissions for sensitive actions

### Task Management

* Create, update, and delete tasks
* Assign priorities (High, Medium, Low)
* Filter and sort tasks by status, priority, and due date
* Search tasks by title or description

### Project Management

* Create and manage multiple projects
* Project ownership with restricted delete permissions
* Invite members and manage roles
* Clear separation of responsibilities per role

### Mission Management

* Create, update, and delete missions within projects
* Assign missions to team members
* Track mission status (Not Started, In Progress, Completed)
* Improve accountability and progress visibility

### Real-Time Notifications

* Notifications for newly assigned missions
* Updates on task and project changes

### User Experience

* Responsive and accessible UI
* Dark mode support
* Clean dashboard with recent activity and upcoming deadlines

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Redux (state management)

### Backend

* Node.js
* Express.js
* RESTful APIs

### Database

* MongoDB
* Mongoose

---

## System Architecture

* Client-server architecture
* REST API for communication between frontend and backend
* MongoDB for persistent and scalable data storage
* Role-based authorization enforced at API level

---

## Getting Started

### Prerequisites

* Node.js (v14 or higher)
* MongoDB (Local or MongoDB Atlas)
* Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/abdelrahman-elkhateeb/depi-final-project.git

# Navigate to project folder
cd depi-final-project

# Install backend dependencies
cd backend
npm install
npm run dev

# Install frontend dependencies
cd ../frontend
npm install
npm run dev
```

Open the app at: `http://localhost:5173`

---

## User Roles Overview

* **Owner**: Full access to projects, members, missions, and tasks
* **Manager**: Manage missions and project members
* **Contributor**: Complete assigned missions
* **Viewer**: View project data without modification

---

## Project Goals

* Boost individual and team productivity
* Simplify task and project management
* Improve collaboration and accountability
* Provide a scalable and secure management system

---

## Acknowledgment

This project was developed as part of the **Digital Egypt Pioneers Initiative (DEPI)**.

**Team Members:**

* Abdelrahman Elkhateeb
* Ahmed Abdelrashed Hassan
* Ahmed Abo Raya
* Mahmoud Said Romeh

---

⭐ If you find this project useful, feel free to star the repository!
