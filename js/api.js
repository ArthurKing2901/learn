function fetchTodos() {
  // Получение данных от сервера
  const tasks = JSON.parse(localStorage.getItem('tasks') || "[]");
	return tasks;
}

function deleteTask(taskId) {
	let tasks = JSON.parse(localStorage.getItem('tasks'));
	tasks = tasks.filter((task) => task.id !== taskId);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

 function addTaskItem(newTask) {
	let tasks = JSON.parse(localStorage.getItem('tasks') || "[]");
	tasks.push(newTask);
	localStorage.setItem('tasks', JSON.stringify(tasks));
		}

 function updateTaskItem(updateTask) {
	let tasks = JSON.parse(localStorage.getItem('tasks') || "[]");
	const indexUpdateTask = tasks.findIndex((task) => task.id === updateTask.id);
	tasks[indexUpdateTask].title = updateTask.title;
	localStorage.setItem('tasks', JSON.stringify(tasks));
	}



export default {
  fetchTodos,
  deleteTask,
  addTaskItem,
  updateTaskItem,
};
