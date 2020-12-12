let firstArray = [
  "мандарины",
  "апельсины",
  "бананы",
  "яблоки",
  "киви",
  "капуста",
];
let secondArray = ["молоко", "кефир", "сыр"];
let thirdArray = ["хлеб", "колбаса", "кофе", "игрушка"];

const form = document.querySelector("#task-form"); // форма

const taskList = document.querySelectorAll(".collection"); // наш ul - вывод
const fruits = document.querySelector("#fruits");
const milk = document.querySelector("#milk");
const different = document.querySelector("#different");

const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task"); // наш инпут с новым значением

// # 1
loadEventListener();

// # 2
function loadEventListener(event) {
  // # 8
  document.addEventListener('DOMContentLoaded', getTasks);

  // # 3
  form.addEventListener("submit", addTask);

  // # 4
  taskList.forEach((item) => {
    item.addEventListener("click", removeTask);
  });

  // # 5
  clearBtn.addEventListener("click", clearTasks);

  // # 6
  filter.addEventListener("keyup", filterTasks);
}

// # 8
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = "<i class='fa fa-remove'></i>";

    li.appendChild(link);

    if (firstArray.includes(li.textContent)) {
      fruits.appendChild(li);
    } else if (secondArray.includes(li.textContent)) {
      milk.appendChild(li);
    } else if (
        thirdArray.includes(li.textContent) ||
        !thirdArray.includes(li.textContent)
    ) {
      different.appendChild(li);
    }

  })
}

// # 3
function addTask(event) {
  if (taskInput.value === "") {
    alert("Add task");
  }

  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = "<i class='fa fa-remove'></i>";

  li.appendChild(link);

  if (firstArray.includes(li.textContent)) {
    fruits.appendChild(li);
  } else if (secondArray.includes(li.textContent)) {
    milk.appendChild(li);
  } else if (
    thirdArray.includes(li.textContent) ||
    !thirdArray.includes(li.textContent)
  ) {
    different.appendChild(li);
  }

  // # 7
  storeTaskInLocalStorage(taskInput.value);

  taskInput.value = "";

  event.preventDefault();
}

// # 7
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure")) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS # 7
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage (taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1)
    }
  })

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks() {
  taskList.forEach((item) => {
    item.innerHTML = "";
  });

  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  // наш li
  document.querySelectorAll(".collection-item").forEach((task) => {
    const item = task.firstChild.textContent;
    console.log(item);
    if (item.toLocaleLowerCase().includes(text)) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
