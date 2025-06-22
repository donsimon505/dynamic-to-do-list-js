// Setup Event Listener for Page Load
    document.addEventListener('DOMContentLoaded', function() {
            
        // Select DOM Elements
        const addButton = document.getElementById('add-task-btn');
        const taskInput = document.getElementById('task-input');
        const taskList = document.getElementById('task-list');
            
        // Create the addTask Function
        function addTask() {
            // Retrieve and trim the value from the task input field
            const taskText = taskInput.value.trim();
                
            // Check if taskText is not empty
            if (taskText === "") {
                    alert("Please enter a task!");
                    return;
                }
                
            // Remove empty state message if it exists
            const emptyState = taskList.querySelector('.empty-state');
            if (emptyState) {
                emptyState.remove();
            }
                
            // Task Creation and Removal
            // Create a new li element and set its content
            const li = document.createElement('li');
                
            // Create a span for the task text
            const taskTextSpan = document.createElement('span');
            taskTextSpan.className = 'task-text';
            taskTextSpan.textContent = taskText;
                
            // Create a new button element for removing the task
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-btn';
            
            // Assign onclick event to remove button
            removeButton.onclick = function() {
                // Add fade-out animation before removing
                li.style.transition = 'all 0.3s ease';
                li.style.opacity = '0';
                li.style.transform = 'translateX(-20px)';
                
                setTimeout(() => {
                    taskList.removeChild(li);
                    
                    // Show empty state if no tasks remain
                    if (taskList.children.length === 0) {
                        const emptyStateDiv = document.createElement('div');
                        emptyStateDiv.className = 'empty-state';
                        emptyStateDiv.textContent = 'No tasks yet! Add one above to get started.';
                        taskList.appendChild(emptyStateDiv);
                    }
                }, 300);
            };
            
            // Append the task text and remove button to the li element
            li.appendChild(taskTextSpan);
            li.appendChild(removeButton);
            
            // Append the li to taskList
            taskList.appendChild(li);
            
            // Clear the task input field
            taskInput.value = "";
            
            // Focus back on input for better UX
            taskInput.focus();
        }
            
            // Attach Event Listeners
            // Add event listener to addButton for click events
            addButton.addEventListener('click', addTask);
            
            // Add event listener to taskInput for keypress events
            taskInput.addEventListener('keypress', function(event) {
                // Check if the pressed key is 'Enter'
                if (event.key === 'Enter') {
                    addTask();
                }
            });
            
            // Focus on input field when page loads
            taskInput.focus();
        });
