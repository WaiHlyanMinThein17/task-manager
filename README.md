# Task Manager

A full-stack task management app built with React (TypeScript) on the frontend and Node.js/Express on the backend. Users can add tasks, mark them complete, and delete them. Data persists across page refreshes using a JSON file store.

---

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Express
- **Data store:** JSON file (`tasks.json`)

---

## Getting Started

### Prerequisites
- Node.js v18+
- npm

### 1. Clone the repository

```bash
git clone https://github.com/WaiHlyanMinThein17/task-manager.git
cd task-manager
```

### 2. Start the backend

```bash
cd server
npm install
npm run dev
```

The server will run on `http://localhost:3001`

### 3. Start the frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

The app will run on `http://localhost:5173`

---

## API Endpoints

| Method |   Endpoint   |       Description      |
|--------|--------------|------------------------|
| GET    | `/tasks`     | Get all tasks          |
| POST   | `/tasks`     | Create a new task      |
| PATCH  | `/tasks/:id` | Toggle task completion |
| DELETE | `/tasks/:id` | Delete a task          |

---

## Design Decisions & Trade-offs

**JSON file vs in-memory storage**
I chose a JSON file over in-memory storage so that tasks persist across server restarts. This makes the app more realistic and ensures data is not lost during development. The trade-off is slightly slower read/write compared to in-memory, but this is negligible at this scale.

**No database**
For the scope of this assignment, a JSON file is a lightweight and dependency-free solution. In a production environment, I would replace this with a relational database such as PostgreSQL to support concurrent users, better querying, and data integrity.

**TypeScript on the frontend**
I used TypeScript to define a clear `Task` interface, which catches type errors at compile time and makes the code more readable and maintainable. This is especially useful when the data shape coming from the API needs to match exactly what the frontend expects.

**UUID for task IDs**
I used the `uuid` library to generate unique IDs rather than auto-incrementing integers. This is safer in distributed systems and avoids ID conflicts if tasks are ever created from multiple sources.
