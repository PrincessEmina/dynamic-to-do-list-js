document.addEventListener('DOMContentLoaded', function() {

    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    } 

    function addTask(taskText, save = true) {
        const li = document.createElement('li');
        li.textContent = taskText; 

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        removeBtn.onclick = function () {
            li.remove();

            const updatedTasks = JSON.parse(localStorage.getItem('tasks') || '[]').filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = '';
        } else { alert("Please enter a task."); }
    });

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                addTask(taskText);
                taskInput.value = '';
            } else { alert("Please enter a task."); }
        }
    });
    
    loadTasks();
});