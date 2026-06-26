let tasks = JSON.parse(localStorage.getItem("tasks")) || []; //text to json conversion
displayTask();
let draggedIndex = null;

//function to add task
function addTask() {
  let input = document.getElementById("taskInput");

  let task = input.value.trim();

  if (task === "") {
    alert("Please enter a task");
    return;
  }

  tasks.push({
    id: Date.now(),
    text: task,
    completed: false,
  });

  saveTask();

  input.value = "";

  displayTask(); //to show task when page opened
}

//function to display task
function displayTask() {
  let list = document.getElementById("taskList");

  list.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    let li = document.createElement("li");
    li.className = "task-item";
    li.draggable = true;

    li.innerHTML = `            
            <input 
          
                type = "checkbox"
                ${tasks[i].completed ? "checked" : ""} 
                onchange="toggleTask(${i})" 
               >
                    
            <span class ="task-text">
                    ${tasks[i].text}

                </span>

            <button onClick="deleteTask(${i})" 
            class="delete-btn">
                 Delete task 
                 </button>
                 </li>`;

    li.addEventListener("dragstart", () => {
      draggedIndex = i;
    });

    li.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    li.addEventListener("drop", () => {
      if (draggedIndex === i) {
        return;
      }

      const draggedTask = tasks.splice(draggedIndex, 1)[0];

      tasks.splice(i, 0, draggedTask);

      saveTask();
      displayTask();
    });

    li.addEventListener("dragend", () => {
      draggedIndex = null;
    });

    list.appendChild(li);
  }
}

//to delete a task
function deleteTask(index) {
  if (confirm("Delete this task?")) {
    tasks.splice(index, 1);
    saveTask();
    displayTask();
  }
}

function clearTask() {
  if (confirm("Delete all tasks?")) {
    tasks = [];
    saveTask();
    displayTask();
  }
}

//to save a task in local storage
function saveTask() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//to mark task as completed or not
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;

  saveTask();
  displayTask();
}
