let todoList = [];

function saveTasks() {
    chrome.storage.sync.set({ todoList: todoList });
}

function loadTasks() {
    chrome.storage.sync.get(['todoList', 'theme'], function(data) {
        if (data.todoList) {
            todoList = data.todoList;
            updateList();
        }
        if (data.theme) {
            document.body.classList.add(data.theme);
            updateIcons();
        }
    });
}

function deleteTask(index) {
    todoList.splice(index, 1);
    saveTasks();
    updateList();
}

function toggleComplete(index) {
    todoList[index].completed = !todoList[index].completed;
    saveTasks();
    updateList();
}

document.getElementById('addTaskButton').addEventListener('click', function() {
    let taskText = document.getElementById('taskText').value.trim();
    let taskSchedule = document.getElementById('taskSchedule').value.trim();
    let taskDelay = document.getElementById('taskDelay').value.trim();
    if (taskText && taskSchedule && taskDelay) {
        todoList.push({ text: taskText, schedule: taskSchedule, delay: taskDelay, completed: false });
        document.getElementById('taskText').value = '';
        document.getElementById('taskSchedule').value = '';
        document.getElementById('taskDelay').value = '';
        saveTasks();
        updateList();
    } else {
        alert('Please fill in all fields.');
    }
});

function playSound(delay) {
    setTimeout(function() {
        let audio = document.getElementById('alertSound');
        audio.play();
    }, delay * 1000);
}

function updateList() {
    let listDiv = document.getElementById('todoList');
    listDiv.innerHTML = '';
    todoList.forEach((task, index) => {
        let taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';
        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = task.completed;
        checkBox.onchange = function() { toggleComplete(index); };
        taskDiv.appendChild(checkBox);
        let taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskDiv.appendChild(taskText);
        let playIcon = document.createElement('i');
        playIcon.className = 'fas fa-play';
        playIcon.onclick = function() { playSound(task.delay); };
        taskDiv.appendChild(playIcon);
        let deleteIcon = document.createElement('span');
        deleteIcon.textContent = 'X';
        deleteIcon.onclick = function() { deleteTask(index); };
        taskDiv.appendChild(deleteIcon);
        if (task.completed) {
            taskDiv.classList.add('completed');
        }
        listDiv.appendChild(taskDiv);
    });
}

document.getElementById('mode-toggler').addEventListener('click', function() {
    document.body.classList.toggle('dark');
    let mode = document.body.classList.contains('dark') ? 'dark' : 'light';
    chrome.storage.sync.set({ theme: mode });
    updateIcons();
});

function updateIcons() {
    let moonIcon = document.getElementById('moon-icon');
    let sunIcon = document.getElementById('sun-icon');
    if (document.body.classList.contains('dark')) {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'inline';
    } else {
        moonIcon.style.display = 'inline';
        sunIcon.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});


function playSound(index) {
    let task = todoList[index];
    let delay = parseInt(task.delay, 10);
    if (isNaN(delay) || delay <= 0) {
        console.log('Invalid or no delay specified. Playing sound immediately.');
        return;
    }

    let counterElement = document.getElementById(`counter-${index}`);
    counterElement.innerHTML = delay;
    let intervalId = setInterval(() => {
        delay--;
        if (delay <= 0) {
            clearInterval(intervalId);
            let audio = document.getElementById('alertSound');
            audio.play();
            counterElement.innerHTML = '';
        } else {
            counterElement.innerHTML = delay;
        }
    }, 1000);

    todoList[index].intervalId = intervalId;
}

function updateList() {
    let listDiv = document.getElementById('todoList');
    listDiv.innerHTML = '';
    todoList.forEach((task, index) => {
        let taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';

        let checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = task.completed;
        checkBox.onchange = () => toggleComplete(index);
        taskDiv.appendChild(checkBox);

        let taskText = document.createElement('span');
        taskText.className = task.completed ? 'task-text completed' : 'task-text';
        taskText.textContent = task.text;
        taskDiv.appendChild(taskText);

        let playIcon = document.createElement('i');
        playIcon.className = 'fas fa-play';
        playIcon.onclick = () => playSound(index);
        taskDiv.appendChild(playIcon);

        let deleteIcon = document.createElement('span');
        deleteIcon.textContent = 'X';
        deleteIcon.onclick = () => deleteTask(index);
        taskDiv.appendChild(deleteIcon);

        if (task.completed) {
            taskDiv.classList.add('completed');
        }

        let counterElement = document.createElement('span');
        counterElement.id = `counter-${index}`;
        counterElement.className = 'counter';
        taskDiv.appendChild(counterElement);

        listDiv.appendChild(taskDiv);
    });
}


// ... Rest of your existing JavaScript code ...
function updateList() {
    const listDiv = document.getElementById('todoList');
    listDiv.innerHTML = '';

    todoList.forEach((task, i) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';
        taskDiv.id = `task-${i}`; // Assign a unique ID to the task div

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = task.completed;
        checkBox.onchange = function() { toggleComplete(i); };
        taskDiv.appendChild(checkBox);

        const taskHeader = document.createElement('span');
        taskHeader.className = 'task-header';
        taskHeader.textContent = task.text;
        taskDiv.appendChild(taskHeader);

        const taskText = document.createElement('span');
taskText.className = 'task-text';
// Create a separate span for the text after <br> to apply marginLeft
taskText.innerHTML = '<br><span style="margin-left: 20px;">- ' + task.schedule + '</span>';
taskDiv.appendChild(taskText);


        const playIcon = document.createElement('span');
        playIcon.innerHTML = '<i class="fas fa-play"></i>';
        playIcon.style.cursor = 'pointer';
        playIcon.onclick = function() { playSound(i, task.delay); };
        taskDiv.appendChild(playIcon);

        const counterElement = document.createElement('span');
        counterElement.id = `counter-${i}`;
        counterElement.className = 'counter';
        taskDiv.appendChild(counterElement);

        const deleteIcon = document.createElement('span');
        deleteIcon.innerHTML = '&#x2716;';
        deleteIcon.className = 'delete-icon';
        deleteIcon.onclick = function() { deleteTask(i); };
        taskDiv.appendChild(deleteIcon);

        if (task.completed) {
            taskHeader.classList.add('completed');
            taskText.classList.add('completed');
        }

        listDiv.appendChild(taskDiv);
    });
}