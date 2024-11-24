// // Drag-and-Drop Logic
// const tasks = document.querySelectorAll('.task');
// const sections = document.querySelectorAll('.taskHolder');

// const { status } = require("init");

// const { default: axios } = require("axios");

// tasks.forEach(task => {
//     task.addEventListener('dragstart', dragStart);
//     task.addEventListener('dragend', dragEnd);

//     const checkbox = task.querySelector('.task-checkbox');
//     checkbox.addEventListener('change', toggleTaskStatus);
// });

// sections.forEach(section => {
//     section.addEventListener('dragover', dragOver);
//     section.addEventListener('drop', dropTask);
// });

// function dragStart(event) {
//     event.dataTransfer.setData('text/plain', event.target.dataset.id);
//     event.target.classList.add('dragging');
// }

// function dragEnd(event) {
//     event.target.classList.remove('dragging');
// }

// function dragOver(event) {
//     event.preventDefault();
// }

// function dropTask(event) {
//     const draggedElement = document.querySelector('.dragging');
//     if (draggedElement) {
//         event.target.appendChild(draggedElement);
//         updateTaskStatus(draggedElement, event.target.id);
//     }
// }

// async function updateTaskStatus(task, targetId) {
//     const newStatus = targetId === 'doneTasks' ? 'done' : 'scheduled';
//     const taskId = task.dataset.id;

//     try {
//         await fetch(`/api/tasks/${taskId}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ status: newStatus }),
//         });

//         task.querySelector('.task-checkbox').checked = newStatus === 'done';
//         task.classList.toggle('completed', newStatus === 'done');
//     } catch (error) {
//         console.error('Error updating task:', error);
//     }
// }

// async function toggleTaskStatus(event) {
//     const checkbox = event.target;
//     const task = checkbox.closest('.task');
//     const targetSection = checkbox.checked ? 'doneTasks' : 'scheduledTasks';
//     const targetHolder = document.getElementById(targetSection);

//     targetHolder.appendChild(task);
//     updateTaskStatus(task, targetSection);
// }

document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.check');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskDiv = checkbox.closest('.task');
            const taskName = taskDiv.querySelector('p').textContent.trim();
            const isChecked = checkbox.checked;
            const tableName = document.querySelector('title').innerText;  // Replace with your dynamic table name logic if needed

            // Log data to verify
            let body = {
                tableName: tableName,
                taskName: taskName,
                status: isChecked
            };

            // Move the task div
            if (isChecked) {
                document.querySelector('.done.set').appendChild(taskDiv);
            } else {
                document.querySelector('.scheduled.set').appendChild(taskDiv);
            }

            // Send a POST request to update the database
            fetch('/updateTaskStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Task status updated:', data);
            })
            .catch(error => {
                console.error('Error updating task status:', error);
            });
        });
    });
});



 const tableName = document.querySelector('title').innerText;