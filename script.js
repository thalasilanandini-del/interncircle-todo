// =========================
// SELECT HTML ELEMENTS
// =========================

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const activeTasks = document.getElementById("activeTasks");
const completedTasks = document.getElementById("completedTasks");

const emptyMessage = document.getElementById("emptyMessage");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const inputMessage = document.getElementById("inputMessage");


// =========================
// LOAD TASKS FROM LOCALSTORAGE
// =========================

let tasks = JSON.parse(localStorage.getItem("interncircleTasks")) || [];


// =========================
// SAVE TASKS
// =========================

function saveTasks() {

    localStorage.setItem(
        "interncircleTasks",
        JSON.stringify(tasks)
    );
}


// =========================
// DISPLAY TASKS
// =========================

function displayTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

        tasks.forEach(function(task) {

            const li = document.createElement("li");

            li.className = "task-item";

            if (task.completed) {
                li.classList.add("completed");
            }


            // Left side
            const taskLeft = document.createElement("div");

            taskLeft.className = "task-left";


            // Checkbox
            const checkbox = document.createElement("input");

            checkbox.type = "checkbox";

            checkbox.className = "task-checkbox";

            checkbox.checked = task.completed;


            checkbox.addEventListener("change", function() {

                toggleTask(task.id);

            });


            // Task text
            const taskText = document.createElement("span");

            taskText.className = "task-text";

            taskText.textContent = task.text;


            // Add checkbox and text
            taskLeft.appendChild(checkbox);

            taskLeft.appendChild(taskText);


            // Delete button
            const deleteButton = document.createElement("button");

            deleteButton.className = "delete-btn";

            deleteButton.textContent = "Delete";


            deleteButton.addEventListener("click", function() {

                deleteTask(task.id);

            });


            // Add everything to list item
            li.appendChild(taskLeft);

            li.appendChild(deleteButton);

            taskList.appendChild(li);

        });
    }

    updateStats();
}


// =========================
// ADD TASK
// =========================

function addTask() {

    const taskText = taskInput.value.trim();


    // Prevent empty tasks
    if (taskText === "") {

        inputMessage.textContent =
            "Please enter a task before adding.";

        taskInput.focus();

        return;
    }


    // Clear error message
    inputMessage.textContent = "";


    // Create new task
    const newTask = {

        id: Date.now(),

        text: taskText,

        completed: false

    };


    // Add task to array
    tasks.push(newTask);


    // Save to LocalStorage
    saveTasks();


    // Update page
    displayTasks();


    // Clear input
    taskInput.value = "";

    taskInput.focus();
}


// =========================
// TOGGLE TASK
// =========================

function toggleTask(taskId) {

    tasks = tasks.map(function(task) {

        if (task.id === taskId) {

            return {
                ...task,
                completed: !task.completed
            };

        }

        return task;

    });


    saveTasks();

    displayTasks();
}


// =========================
// DELETE TASK
// =========================

function deleteTask(taskId) {

    tasks = tasks.filter(function(task) {

        return task.id !== taskId;

    });


    saveTasks();

    displayTasks();
}


// =========================
// CLEAR COMPLETED TASKS
// =========================

function clearCompletedTasks() {

    tasks = tasks.filter(function(task) {

        return !task.completed;

    });


    saveTasks();

    displayTasks();
}


// =========================
// UPDATE STATISTICS
// =========================

function updateStats() {

    const total = tasks.length;

    const completed = tasks.filter(function(task) {

        return task.completed;

    }).length;

    const active = total - completed;


    totalTasks.textContent = total;

    activeTasks.textContent = active;

    completedTasks.textContent = completed;
}


// =========================
// BUTTON EVENT
// =========================

addTaskBtn.addEventListener("click", addTask);


// =========================
// ENTER KEY EVENT
// =========================

taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});


// =========================
// CLEAR COMPLETED EVENT
// =========================

clearCompletedBtn.addEventListener(
    "click",
    clearCompletedTasks
);


// =========================
// INITIAL DISPLAY
// =========================

displayTasks();