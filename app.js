

document.getElementById('add-task-button').addEventListener('click', addTask);

function addTask(){
    //Get users input
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    

    //Prevents empty tasks
    if (taskText === ''){
        alert('Please enter a task');
        return;
    }

    //Creates new list element
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    taskItem.className = 'task';

    //Adding task priority level
    const priority = document.getElementById('priority-select').value;
    taskItem.classList.add(priority);

    taskItem.innerHTML = `
        <input type="checkbox" class="task-checkbox" onclick="toggleComplete(this)">
        <span>${taskText}</span>
        
        <div class="task-buttons">
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        </div>
    `;
    
    // Add the new task to the list
    taskList.appendChild(taskItem);
    //Clears the input box
    taskInput.value = '';

    saveTasks();
}

function toggleComplete(checkbox){
    const taskItem = checkbox.parentElement;
    taskItem.classList.toggle('completed');
    saveTasks();
}


function deleteTask(button) {
    const taskItem = button.closest('li');
    taskItem.remove();
    saveTasks();
}

function editTask(button){
    const taskItem = button.parentElement;
    const span = taskItem.querySelector('span');

    const newText = prompt("Edit your task:", span.textContent);
    if (newText !== null && newText.trim() !== ""){
        span.textContent = newText.trim();
        saveTasks()
    }
}
// this saves todo list info for reopenning the app
function saveTasks(){
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {

        //saves priority
        let priority;
        if (li.classList.contains('high')) {
            priority = 'high';
        } else if (li.classList.contains('medium')) {
            priority = 'medium';
        } else {
            priority = 'low';
        }

        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed'),
            priority: priority
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

//Loading tasks when page starts 
function loadTasks() {
    const saved = JSON.parse(localStorage.getItem('tasks')) || [];

    // Sort by priority
    saved.sort((a, b) => {
        const order = { high: 1, medium: 2, low: 3 };
        return order[a.priority] - order[b.priority];
    })


    saved.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task';

        // restores task priority
        taskItem.classList.add(task.priority);

        // restores if task is completed
        if (task.completed) taskItem.classList.add('completed');
        
        //this is from earlier
        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" onclick="toggleComplete(this)" ${task.completed ? "checked" : ""}>
            <span>${task.text}</span>

            <div class="task-buttons">
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
            </div>
        `;

        document.getElementById('task-list').appendChild(taskItem);
    });
}
document.addEventListener("DOMContentLoaded", loadTasks);
