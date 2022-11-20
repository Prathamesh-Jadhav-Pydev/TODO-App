const inputBox = document.querySelector(".task_input input");
const filters = document.querySelectorAll(".task_filter span");
const clearButton = document.querySelector(".clear_btn");
const taskList = document.querySelector(".task_list");

//onkeyup event
inputBox.addEventListener("keyup", e => {
    let usertask = inputBox.value.trim();
    if (e.key == "Enter" && usertask) {
        //if todolist doesn't exist,pass an empty array to todos.
        if (!todos) {
            todos = [];
        }
        inputBox.value = "";
        let taskinfo = { name: usertask, status: "pending" };
        todos.push(taskinfo) //adding new task to todos
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo("all");
    }
});



//getting localstorage todolist
let todos = JSON.parse(localStorage.getItem("todo-list"));


//function showtodo list
function showTodo(filters) {
    let li = "";
    if (todos) {
        todos.forEach((todo, id) => {
            //if todo status is completed,set the isCompleted status.
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if(filters==todo.status || filters=="all"){
                li += `<li class="task">
                        <label for="${id}">
                            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                            <p class="${isCompleted}">${todo.name}</p>
                        </label>  
                        <div class="action">
                            <span class="task_delete" onclick="deleteTask(${id})"><i class="fa-solid fa-x"></i></span>
                        </div>
                    </li>`;
            }
        });
    }
    // if li is empty insert default value into it.
    taskList.innerHTML = li || `<span class="msg">You don't have any task here</span>`;
}
showTodo("all");

//updatestatus of task
function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        //updating status of task
        todos[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}
// delete task
function deleteTask(deleteID) {
    todos.splice(deleteID, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
}

//fliters
filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    })
})
// clear all task
clearButton.addEventListener("click",()=>{
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
})