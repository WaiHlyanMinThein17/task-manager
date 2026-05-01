const express = require('express')
const cors = require('cors')
const {v4 : uuidv4} = require('uuid')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3001
const DATA_FILE = path.join(__dirname, 'tasks.json')

app.use(cors())
app.use(express.json())

function readTasks() {
    if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, 'utf-8')
        return JSON.parse(data)
    } else {
        return []
    }
}

function writeTasks(tasks) { 
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2))
}

app.get('/tasks', (req, res) => {
    const tasks = readTasks()
    res.json(tasks)
})

app.post('/tasks', (req, res) => {
    const tasks = readTasks()
    const newTask = {
        id: uuidv4(),
        title: req.body.title,
        completed: false
    }
    tasks.push(newTask)
    writeTasks(tasks)
    res.status(201).json(newTask)
})

app.patch('/tasks/:id', (req, res) => {
    const tasks = readTasks()
    const task = tasks.find(t => t.id === req.params.id)
    if (!task) return res.status(404).json({error: 'Task not found'})
    task.completed = !task.completed
    writeTasks(tasks)
    res.json(task)
})

app.delete('/tasks/:id', (req, res) => {
    const tasks = readTasks()
    const updatedTasks = tasks.filter(t => t.id !== req.params.id)
    writeTasks(updatedTasks)
    res.status(204).send()
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})