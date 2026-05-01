import './App.css'
import { useState, useEffect } from 'react'

interface Task {
  id: string
  title: string
  completed: boolean
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState("")

  // Fetch tasks from API on component mount
  useEffect(() => {
    fetch('http://localhost:3001/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
  }, [])

  // Add a new task
  function addTask() {
    if (input === "") return
    fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: input })
    })
      .then(res => res.json())
      .then(data => {
        setTasks([...tasks, data])
        setInput("")
      })
  }

  // Toggle completed status
  function toggleTask(id: string) {
    fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'PATCH'
    })
      .then(res => res.json())
      .then(updated => {
        setTasks(tasks.map(t => t.id === id ? updated : t))
      })
  }

  // Delete a task
  function deleteTask(id: string) {
    fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setTasks(tasks.filter(t => t.id !== id))
      })
  }

  return (
  <div className="container">
    <h1>Task Manager</h1>
    <div className="input-row">
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Add a new task..."
      />
      <button onClick={addTask}>Add</button>
    </div>
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          <span className={task.completed ? 'completed' : ''}>
            {task.title}
          </span>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
)
}