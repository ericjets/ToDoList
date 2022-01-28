// CREATE LIST
// Creates a new list and adds it to the page
function createList() {
  // Create container for list
  const newList = document.createElement("div");
  newList.classList.add("list-container");
  // Add Title
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
  // defaultTask.innerText = "Task 1";
  const span = document.createElement("span");
  span.innerText = "New Task";
  const optionsButton = document.createElement("button");
  optionsButton.classList.add("edit-button");
  const optionsImg = document.createElement("img");
  optionsImg.classList.add("options-img");
  optionsImg.src = "/imgs/settings.png";
  optionsImg.alt = "options";
  optionsButton.appendChild(optionsImg);
  optionsButton.addEventListener("click", e => {
    e.stopPropagation();
    editTask(optionsButton.parentElement);
  });
  defaultTask.appendChild(span);
  defaultTask.appendChild(optionsButton);
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
  newTask.dataset.state = "unfinished";
  //newTask.innerText = itemName;
  const span = document.createElement("span");
  span.innerText = itemName;

  newTask.addEventListener("click", () => {
    // toggle state of task (finished/unfinished)
    toggleState(newTask);
  });

  const optionsButton = document.createElement("button");
  optionsButton.classList.add("edit-button");
  const optionsImg = document.createElement("img");
  optionsImg.classList.add("options-img");
  optionsImg.src = "/imgs/settings.png";
  optionsImg.alt = "options";
  optionsButton.addEventListener("click", e => {
    e.stopPropagation();
    editTask(optionsButton.parentElement);
  });

  optionsButton.appendChild(optionsImg);
  newTask.appendChild(span);
  newTask.appendChild(optionsButton);

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

//STICKY NAVBAR
// Allows the navbar to follow the scroll of the page
window.onscroll = function () {
  navStick();
};

// NAV STICK
// Takes the current position of the navbar and when the user
// scrolls if the value is greater than the position of the
// navbar when its at the top then it adds the sticky class to
// the navbar and when its less than it removes the class.
function navStick() {
  if (window.scrollY >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

// Default config
const lists = document.querySelectorAll(".list-container");
const navbar = document.querySelector("nav");
const modal = document.querySelector("#modal");
const modalCloseSpan = modal.querySelector(".close");
const modalSaveBtn = modal.querySelector("#save-btn");
const modalRemoveBtn = modal.querySelector("#remove-btn");
// DELETE LATER
const task1 = document.querySelector(".task");
const options1 = document.querySelector(".edit-button");
options1.addEventListener("click", e => {
  e.stopPropagation();
  editTask(options1.parentElement);
});

// Allows the user to close the edit task modal
modalCloseSpan.addEventListener("click", e => {
  e.stopPropagation();
  modal.style.display = "none";
});

// Edit Task Code
function editTask(task) {
  console.log(task);
  modal.style.display = "flex";
  // Set modal input value to the value of the task that was clicked.
  const taskEditInput = modal.querySelector("input");
  const taskName = task.firstElementChild;
  taskEditInput.placeholder = taskName.innerText;

  // If save is clicked changed the value of the task to the input value
  // and close modal
  modalSaveBtn.addEventListener("click", e => {
    e.stopPropagation();
    if (taskEditInput.value === "") return;
    // const taskName = task.firstElementChild;
    taskName.innerText = taskEditInput.value;
    modal.style.display = "none";
  });

  // If remove is clicked, remove the task from list
  modalRemoveBtn.addEventListener("click", e => {
    e.stopPropagation();
    task.remove();
    modal.style.display = "none";
  });
}

let sticky = navbar.offsetTop;

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
