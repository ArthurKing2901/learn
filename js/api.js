async function fetchTodos() {
  // Получение данных от сервера
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  const jsonTodos = await res.json();
  return jsonTodos;
}

async function deleteTask(taskId) {
  // Удаление данных НА сервере
  await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
    method: "DELETE",
  });
}

async function addTaskItem(newTask) {
  // Добавление данных НА сервер
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify(newTask),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const jsonNewTask = await response.json();
  return jsonNewTask;
}

async function updateTaskItem(updateTask) {
  // сказать серверу обновить данные
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${updateTask.id}`,
    {
      method: "PUT",
      body: JSON.stringify(updateTask),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  const jsonUpdateTask = await response.json();
  return jsonUpdateTask;
}

export default {
  fetchTodos,
  deleteTask,
  addTaskItem,
  updateTaskItem,
};
