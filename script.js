document.addEventListener("DOMContentLoaded", function () {
    const todoInput = document.getElementById("todoInput");
    const addButton = document.querySelector(".btn");
    const taskList = document.getElementById("taskList");
    const deleteButton = document.getElementById("deleteButton");
    const editTaskBtn = document.getElementById("editTaskBtn");
    const lineButton = document.getElementById("lineButton");
    const counterSpan = document.getElementById("counter");

    addButton.addEventListener("click", addTask);
    deleteButton.addEventListener("click", deleteSelectedTasks);
    editTaskBtn.addEventListener("click", editSelectedTask);
    lineButton.addEventListener("click", checkAsDone);
    todoInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });

    const sortable = new Sortable(taskList, {
        animation: 150,
        onUpdate: updateCounter,
    });

    function addTask() {
        const newTask = todoInput.value.trim();

        if (newTask !== "") {
            const listItem = createTaskListItem(newTask);
            taskList.appendChild(listItem);
            todoInput.value = "";

            updateCounter();
        }
    }

    function deleteSelectedTasks() {
        const selectedCheckboxes = document.querySelectorAll(".task-checkbox:checked");

        selectedCheckboxes.forEach((checkbox) => {
            const listItem = checkbox.closest("li");
            listItem.remove();
        });

        updateCounter();
    }

    function editSelectedTask() {
        const selectedCheckbox = document.querySelector(".task-checkbox:checked");

        if (selectedCheckbox) {
            const listItem = selectedCheckbox.closest("li");
            const taskTextElement = listItem.querySelector("p");
            const updatedText = prompt("Edit task:", taskTextElement.textContent);

            if (updatedText !== null) {
                taskTextElement.textContent = updatedText;
            }
        } else {
            alert("Please select a task to edit.");
        }
    }

    function checkAsDone() {
        const selectedCheckboxes = document.querySelectorAll(".task-checkbox:checked");

        selectedCheckboxes.forEach((checkbox) => {
            const listItem = checkbox.closest("li");
            listItem.classList.toggle("disabled");
        });
    }

    function updateCounter() {
        const taskItems = document.querySelectorAll("#taskList li");
        counterSpan.textContent = taskItems.length;
    }

    function createTaskListItem(taskText) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <div class="todo-container">
        <input type="checkbox" class="task-checkbox" id="checkbox-${taskList.childElementCount + 1}">
        <label for="checkbox-${taskList.childElementCount + 1}"></label>
        <p>${taskText}</p>
        </div>`;
        listItem.querySelector('.task-checkbox').checked = false;

        return listItem;
    }
});
