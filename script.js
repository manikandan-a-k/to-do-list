
const addTaskButton = document.getElementById('add-task');
const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');
const validationMsg = document.getElementById('validation-msg');


document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);


addTaskButton.addEventListener('click', addTask);


function addTask() {
  const taskText = taskInput.value.trim();

 
  if (taskText === '') {
    validationMsg.classList.remove('hidden');
    return;
  }
  validationMsg.classList.add('hidden');

  const listItem = createTaskElement(taskText);
  taskList.appendChild(listItem);

  saveTaskToLocalStorage(taskText);

  taskInput.value = ''; 
}


function createTaskElement(taskText) {
  const listItem = document.createElement('li');

  const taskCheckbox = document.createElement('input');
  taskCheckbox.type = 'checkbox';
  taskCheckbox.addEventListener('change', toggleComplete);

  const taskDescription = document.createElement('span');
  taskDescription.textContent = taskText;

  const taskActions = document.createElement('div');
  taskActions.classList.add('task-actions');

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => editTask(taskDescription));

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => deleteTask(listItem, taskText));

  taskActions.appendChild(editButton);
  taskActions.appendChild(deleteButton);

  listItem.appendChild(taskCheckbox);
  listItem.appendChild(taskDescription);
  listItem.appendChild(taskActions);

  return listItem;
}


function toggleComplete(event) {
  const listItem = event.target.parentElement;
  listItem.classList.toggle('completed');
}


function editTask(taskDescription) {
  const newDescription = prompt('Edit task:', taskDescription.textContent);
  if (newDescription !== null && newDescription.trim() !== '') {
    taskDescription.textContent = newDescription.trim();
    updateTaskInLocalStorage(taskDescription.textContent, newDescription.trim());
  }
}


function deleteTask(taskItem, taskText) {
  taskItem.remove();
  removeTaskFromLocalStorage(taskText);
}


function saveTaskToLocalStorage(taskText) {
  let tasks = getTasksFromLocalStorage();
  tasks.push(taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter(task => task !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  let tasks = getTasksFromLocalStorage();
  tasks.forEach(taskText => {
    const listItem = createTaskElement(taskText);
    taskList.appendChild(listItem);
  });
}

function getTasksFromLocalStorage() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

function updateTaskInLocalStorage(oldText, newText) {
  let tasks = getTasksFromLocalStorage();
  const taskIndex = tasks.indexOf(oldText);
  if (taskIndex !== -1) {
    tasks[taskIndex] = newText;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
