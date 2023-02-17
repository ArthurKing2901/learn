import api from "./api.js";

const todoList = document.querySelector("#todo-list");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");

api.fetchTodos().then((todos) => {
  renderTask(todos);
});

todoList.addEventListener("click", (e) => {
  if (e.target.dataset.action === "add-task") {
    addTask(e);
    return;
  }
  if (e.target.dataset.action === "clear-all") {
    clearAll(e);
    return;
  }
  if (e.target.dataset.action === "delete") {
    deleteTask(e);
    return;
  }
  if (e.target.dataset.action === "done") {
    doneTask(e);
    return;
  }
});

async function clearAll() {
  tasksList.innerHTML = "";
}

async function addTask(event) {
  const taskText = taskInput.value;

  const newTask = {
    userId: 2,
    title: taskText,
    completed: false,
  };

  taskInput.value = "";
  taskInput.focus();

  const newTaskHtml = taskItem(newTask);
  tasksList.insertAdjacentHTML("beforeend", newTaskHtml);

  await api.addTaskItem(newTask);
}

async function deleteTask(event) {
  const parentNode = event.target.closest(".list-group-item");
  const id = Number(parentNode.id);

  parentNode.remove();
  await api.deleteTask(id);
}

async function doneTask(event) {
  const parentNode = event.target.closest(".list-group-item");

  const id = Number(parentNode.id);

  const taskTitle = parentNode.querySelector(".task-title");
  taskTitle.classList.toggle("task-title--done");

  const completed = parentNode.dataset.completed === "true";
  parentNode.dataset.completed = completed;

  await api.updateTaskItem({
    id,
    userId: 2,
    completed: !completed,
  });
}

function renderTask(tasks = []) {
  if (tasks.length === 0) {
    const emptyListHTML = `
		<li id="emptyList" class="list-group-item empty-list">
			<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
			<div class="empty-list__title">Список дел пуст</div>
		</li>`;
    tasksList.insertAdjacentHTML("afterbegin", emptyListHTML);
  }

  const tasksHTML = tasks.map((task) => taskItem(task));

  tasksList.insertAdjacentHTML("beforeend", tasksHTML.join(""));
}

function taskItem(task) {
  const cssClass = task.completed
    ? "task-title task-title--done"
    : "task-title";
  return `
		<li id="${task.id}" data-completed="${task.completed}" class="list-group-item d-flex justify-content-between task-item">
			<span class="${cssClass}">${task.title}</span>
			<div class="task-item__buttons">
				<button type="button" data-action="done" class="btn-action">
					<img src="./img/tick.svg" alt="Done" width="18" height="18">
				</button>
				<button type="button" data-action="delete" class="btn-action">
					<img src="./img/cross.svg" alt="Done" width="18" height="18">
				</button>
			</div>
		</li>`;
}
