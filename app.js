// CREATE LIST
// Creates a new list and adds it to the page
function createList() {
    // Create container for list
    const newList = document.createElement("div");
    newList.classList.add("list-container");
    // Add Title
    // const title = document.createElement("span");
    // title.classList.add("list-title");
    // title.innerText = "List Title";
    const title = document.createElement("input");
    title.classList.add("list-title");
    title.placeholder = "List Title";
    // Create list div
    const list = document.createElement("div");
    list.classList.add("list");
    // Populate with default task
    const defaultTask = document.createElement("div");
    defaultTask.dataset.state = "unfinished";
    defaultTask.className = "task unfinished";
    defaultTask.innerText = "Task 1";
    // Add Form
    const form = document.createElement("form");
    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("task-input");
    form.append(input);
    
    // Add it all together
    newList.append(title);
    newList.append(list);
    list.append(defaultTask);
    newList.append(form);

    // Setup List
    listSetup(newList);
    // Add to content section
    content.append(newList);
    //console.log(newList);
}

function listSetup(list) {
    //  add toggleState functionality to their task
    const tasks = Array.from(list.children[1].children);
    console.dir(list.children[1].children);
    tasks.forEach(task => {
        task.addEventListener("click", () => {
            // toggle state of task (finished/unfinished)
            toggleState(task);
        });
    });

    // stop default form functionality
    const form = list.querySelector("form");
    form.addEventListener("submit", e => {
        e.preventDefault();
    });

    // Add task to list by pressing Enter functionality
    const input = list.querySelector(".task-input");
    input.addEventListener("keyup", e => {
        if (e.code === "Enter") {
            const newTask = createTask(input.value);
            list.children[1].append(newTask);
            form.children[0].value = "";
        }
    });
}

// CREATE TASK
// Creates a new item for the list
function createTask(itemName) {
    const newTask = document.createElement("div");
    newTask.classList.add("task");
    newTask.classList.add("unfinished");
    newTask.innerText = itemName;
    newTask.dataset.state = "unfinished";

    newTask.addEventListener("click", () => {
        // toggle state of task (finished/unfinished)
        toggleState(newTask);
    });

    return newTask;
}

// TOGGLE STATE 
// Toggles the strikethrough of the item, so that when it is clicked
// the item reflects that it is complete. Or it sets the item back to
// unfinished.
function toggleState(task) {
    if (task.dataset.state === "unfinished") {
        task.dataset.state = "finished";
        task.className = "task finished";
    } else {
        task.dataset.state = "unfinished";
        task.className = "task unfinished";
    }
}

// Default config
const lists = document.querySelectorAll(".list-container");
// Get all lists on page and ...
lists.forEach(list => {
    listSetup(list);
});
// Add Control Buttons Functionality
const addListButton = document.querySelector("#add-list-button");
addListButton.addEventListener("click", () => {
    createList();
});


// // ******** CLEAR LIST BUTTON FUNCTIONALITY ********

// // When "Clear List" button is clicked this fires and removes all tasks
// // (finished or unfinished) from the list.
// clearListButton.addEventListener("click", () => {
//     const tasks = Array.from(list.children);
//     tasks.forEach(task => {
//         task.remove();
//     });
// });