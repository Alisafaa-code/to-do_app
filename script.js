// Select elements
const themeToggleIcon = document.querySelector(".icon-sun");
const addIcon = document.querySelector(".add-icon");
const inputTodo = document.querySelector(".input-todo input");
const todosContainer = document.querySelector(".todos");
const itemsLeft = document.querySelector(".items-left");

// Select filter buttons
const filterAll = document.querySelector("[data-all]");
const filterActive = document.querySelector("[data-active]");
const filterCompleted = document.querySelector("[data-completed]");

// Theme toggle
themeToggleIcon.addEventListener("click", themeToggle);

function themeToggle() {
     const body = document.body;
     body.classList.toggle("light-mode");

     if (body.classList.contains("light-mode")) {
          themeToggleIcon.src = "./images/icon-moon.svg";
     } else {
          themeToggleIcon.src = "./images/icon-sun.svg";
     }
}

document.addEventListener("DOMContentLoaded", () => {
     const updateItemsLeft = () => {
          const uncheckedTodos = todosContainer.querySelectorAll(
               ".todo input[type='checkbox']:not(:checked)"
          ).length;

          itemsLeft.textContent = `${uncheckedTodos} item${
               uncheckedTodos !== 1 ? "s" : ""
          } left`;
     };

     addIcon.addEventListener("click", createDynamicTodo);

     // Add with Enter key
     inputTodo.addEventListener("keydown", (e) => {
          if (e.key === "Enter") createDynamicTodo();
     });

     function createDynamicTodo() {
          const inputValue = inputTodo.value.trim();

          if (inputValue) {
               const newTodo = document.createElement("label");
               newTodo.classList.add("todo");

               const checkbox = document.createElement("input");
               checkbox.type = "checkbox";
               checkbox.name = "checkbox";

               const checkmark = document.createElement("span");
               checkmark.classList.add("checkmark");

               const todoText = document.createElement("h5");
               todoText.textContent = inputValue;

               // Append elements
               newTodo.appendChild(checkbox);
               newTodo.appendChild(checkmark);
               newTodo.appendChild(todoText);
               todosContainer.appendChild(newTodo);

               // Clear input and update
               inputTodo.value = "";
               updateItemsLeft();

               // toggle completed class and update count on change
               checkbox.addEventListener("change", () => {
                    if (checkbox.checked) {
                         newTodo.classList.add("completed");
                    } else {
                         newTodo.classList.remove("completed");
                    }
                    updateItemsLeft();
               });
          }
     }

     // Initial update
     updateItemsLeft();

     // Filter functions
     const filterTodos = (filter) => {
          const todos = todosContainer.querySelectorAll(".todo");

          todos.forEach((todo) => {
               const checkbox = todo.querySelector("input[type='checkbox']");
               switch (filter) {
                    case "all":
                         todo.style.display = "flex";
                         break;
                    case "active":
                         todo.style.display =
                              checkbox && checkbox.checked ? "none" : "flex";
                         break;
                    case "completed":
                         todo.style.display =
                              checkbox && checkbox.checked ? "flex" : "none";
                         break;
                    default:
                         todo.style.display = "flex";
               }
          });
     };

     // Add event listeners for filters
     filterAll.addEventListener("click", () => filterTodos("all"));
     filterActive.addEventListener("click", () => filterTodos("active"));
     filterCompleted.addEventListener("click", () => filterTodos("completed"));

     // Clear completed
     document.querySelector(".clear").addEventListener("click", () => {
          const completed = todosContainer.querySelectorAll(
               ".todo input[type='checkbox']:checked"
          );
          completed.forEach((cb) => cb.closest(".todo").remove());
          updateItemsLeft();
     });
});
