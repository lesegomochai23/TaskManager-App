const API_URL = 'http://localhost:5284/api/tasks';

document.addEventListener('DOMContentLoaded', fetchTasks);

async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

async function addTask() {
    const input = document.getElementById('taskInput');
    const title = input.value.trim();
    if (title === '') return;

    const newTask = { title: title, isCompleted: false };

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        });
        input.value = '';
        fetchTasks();
    } catch (error) {
        console.error("Error adding task:", error);
    }
}

async function toggleTask(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: 'PUT' });
        fetchTasks();
    } catch (error) {
        console.error("Error updating task:", error);
    }
}

async function deleteTask(id, event) {
    event.stopPropagation();
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchTasks();
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}

function renderTasks(tasks) {
    const list = document.getElementById('taskList');
    list.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        if (task.isCompleted) li.classList.add('completed');

        li.innerHTML = `
            <span onclick="toggleTask(${task.id})">${task.title}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id}, event)">Delete</button>
        `;
        list.appendChild(li);
    });
}