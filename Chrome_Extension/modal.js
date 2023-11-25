document.getElementById('openModalButton').addEventListener('click', function() {
    document.getElementById('taskModal').style.display = 'block';
});

document.getElementById('closeModalButton').addEventListener('click', function() {
    document.getElementById('taskModal').style.display = 'none';
});

document.getElementById('addTaskButton').addEventListener('click', function() {
    var taskText = document.getElementById('taskText').value;
    var taskSchedule = document.getElementById('taskSchedule').value;
    var taskDelay = document.getElementById('taskDelay').value;
    
   /* var taskDiv = document.createElement('div');
    taskDiv.innerHTML = `<strong>Task:</strong> ${taskText}<br>
                         <strong>Schedule:</strong> ${taskSchedule}<br>
                         <strong>Delay:</strong> ${taskDelay} seconds`;*/
    document.getElementById('taskContainer').appendChild(taskDiv);

    // Clear Form Fields
    document.getElementById('taskText').value = '';
    document.getElementById('taskSchedule').value = '';
    document.getElementById('taskDelay').value = '';

    // Close Modal
    document.getElementById('taskModal').style.display = 'none';
});
