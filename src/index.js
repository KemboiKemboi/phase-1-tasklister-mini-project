document.addEventListener("DOMContentLoaded", function () {
  let form = document.getElementById("create-task-form");
  let taskList = document.getElementById("tasks");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop page from refreshing

    let taskInput = document.getElementById("new-task-description");
    let taskText = taskInput.value;

    if (taskText !== "") {
      let li = document.createElement("li"); // Create a new list item
      li.innerText = taskText; // Set the text

      let deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Delete";
      deleteBtn.addEventListener("click", function () {
        li.remove(); // Remove task when button is clicked
      });

      li.appendChild(deleteBtn);
      taskList.appendChild(li);
      taskInput.value = ""; // Clear input after adding task
    }
  });
});
