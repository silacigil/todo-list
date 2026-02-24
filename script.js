// Todo Eleman Seçimi

// Eleman Seçimi


const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let todos;


// load items
loadItems();

eventListener();

function eventListener() {
    // submit event
    form.addEventListener("submit", addNewItem)
    // delete an item
    taskList.addEventListener("click", deleteItem);
    // delete all item
    btnDeleteAll.addEventListener("click", deleteAllItems);

}

function loadItems() {
    todos = getItemsFromLS();
    todos.forEach(function (item) {
        creatItem(item);
    })

}

// get items from local storage

function getItemsFromLS() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;

}

// set item to local storage

function setItemToLS(newTodo) {
    todos = getItemsFromLS();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function creatItem(newTodo) {

    // li oluşturma

    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(newTodo));

    // a oluşturma

    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(a);

    taskList.appendChild(li);
}

function addNewItem(e) {
    e.preventDefault();
    if (input.value === '') {
        alert("add new item");
        return;
        // console.log("submit");

    }

    // create item

    creatItem(input.value);

    setItemToLS(input.value);

    input.value = "";

}

// Eleman silme

function deleteItem(e) {

    if (e.target.className === "fas fa-times") {
        if (confirm("Silmek istediğinize emin misiniz?")) {
            //console.log(e.target);
            e.target.parentElement.parentElement.remove();
            deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        }

    }

    e.preventDefault();
}

function deleteTodoFromStorage(deletetodo) {
    let todos = getItemsFromLS();

    todos.forEach(function (todo, index) {
        if (todo === deletetodo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));

}


// Tüm elemanları silme

function deleteAllItems(e) {

    if (confirm("Tüm elemanları silmek istediğinize emin misiniz?")) {
      
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();


    }

    // task.List.innerHTML="";  (alternatif yöntem)

}

