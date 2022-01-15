const form = document.querySelector("#new-item-form");
const list = document.querySelector("#list");
const item = document.querySelector("#item-input");
const defaultItem = document.querySelector("#default-item");
const clearListButton = document.querySelector("#btn-clear-list");

// ******** FORM FUNCTIONALITY ********

// Adds new task to list and resets the input field.
form.addEventListener("submit", (e) => {
    e.preventDefault();

    list.append(createItem(item.value));
    form.children[1].value = "";
});

// ******** CLEAR LIST BUTTON FUNCTIONALITY ********

// When "Clear List" button is clicked this fires and removes all tasks
// (finished or unfinished) from the list.
clearListButton.addEventListener("click", () => {
    const tasks = Array.from(list.children);
    tasks.forEach(task => {
        task.remove();
    });
});

// ******** DEFAULT ITEM FUNCTIONALITY ********

defaultItem.addEventListener("click", () => {
    toggleState(defaultItem);
});

defaultItem.addEventListener("mouseover", () => {
    hover(defaultItem);
});

defaultItem.addEventListener("mouseout", () => {
    hoverReset(defaultItem);
});

// ******** UTILITY FUNCTIONS ********

// Toggles the strikethrough of the item, so that when it is clicked
// the item reflects that it is complete. Or it sets the item back to
// unfinished.
function toggleState(item) {
    if (item.dataset.state == "unfinished") {
        item.dataset.state = "finished";
        item.className = "list-item finished";
    } else {
        item.dataset.state = "unfinished";
        item.className = "list-item unfinished";
    }
}

// When the user hovers over an item in the list, this changes its display
// to reflect what the item will look like (finished or unfinished) once clicked.
function hover(item) {
    if (item.dataset.state == "unfinished") {
        item.style.textDecoration = "line-through";
    } else {
        item.style.textDecoration = "none";
    }
}

// Resets the display of the item back to what it was before hovering over it.
function hoverReset(item) {
    if (item.dataset.state == "unfinished") {
        item.style.textDecoration = "none";
    } else {
        item.style.textDecoration = "line-through";
    }
}

// Creates a new item for the list
function createItem(itemName) {
    const newItem = document.createElement("div");
    newItem.className = "list-item";
    newItem.textContent = itemName;
    newItem.dataset.state = "unfinished";

    newItem.addEventListener("click", (e) => {
        toggleState(newItem);
    });

    newItem.addEventListener("mouseover", (e) => {
        hover(newItem);
    });

    newItem.addEventListener("mouseout", (e) => {
        hoverReset(newItem);
    });

    return newItem;
}

