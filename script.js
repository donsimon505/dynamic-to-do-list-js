// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load Tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }
    
    // Create the addTask Function with Local Storage support
    function addTask(taskText, save = true) {
        // If taskText is not provided (when called from input), get it from the input field
        if (typeof taskText === 'undefined') {
            // Retrieve and trim the value from the task input field
            taskText = taskInput.value.trim();
            
            // Check if taskText is not empty
            if (taskText === "") {
                alert("Please enter a task!");
                return;
            }
        }
        
        // Task Creation and Removal
        // Create a new li element and set its textContent
        const li = document.createElement('li');
        li.textContent = taskText;
        
        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        
        // Assign onclick event to remove button that removes the li element from taskList
        removeButton.onclick = function() {
            // Remove from DOM
            taskList.removeChild(li);
            
            // Remove from Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const taskIndex = storedTasks.indexOf(taskText);
            if (taskIndex > -1) {
                storedTasks.splice(taskIndex, 1);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }
        };
        
        // Append the remove button to the li element
        li.appendChild(removeButton);
        
        // Append the li to taskList
        taskList.appendChild(li);
        
        // Save to Local Storage if save parameter is true
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
        
        // Clear the task input field only when adding from user input
        if (save) {
            taskInput.value = "";
        }
    }

    // Initialize and Load Tasks from Local Storage
    loadTasks();
    
    // Attach Event Listeners
    // Add event listener to addButton that calls addTask when clicked
    addButton.addEventListener('click', function() {
        addTask(); // Call without parameters to get text from input
    });
    
    // Add event listener to taskInput for keypress event to allow adding tasks with Enter key
    taskInput.addEventListener('keypress', function(event) {
        // Check if the pressed key is 'Enter'
        if (event.key === 'Enter') {
            addTask(); // Call without parameters to get text from input
        }
    });
});